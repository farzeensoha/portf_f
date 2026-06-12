import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LogOut, Home, Settings as SettingsIcon, Image as ImageIcon, Briefcase, GraduationCap,
  Layers, Sparkles, Award, Wrench, Notebook, RefreshCw, Download, Upload
} from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";
import { authService, storageService } from "@/services/storageService";
import { Field, TagsField, ListToolbar, ItemActions, Panel, Card } from "@/components/admin/FormControls";

const TABS = [
  { id: "settings", label: "Portfolio Settings", icon: SettingsIcon },
  { id: "hero", label: "Hero Carousel", icon: ImageIcon },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "projects", label: "Projects", icon: Layers },
  { id: "events", label: "Spotlight Events", icon: Sparkles },
  { id: "certifications", label: "Certifications", icon: Award },
  { id: "skills", label: "Skills", icon: Wrench },
  { id: "personalNote", label: "Personal Note", icon: Notebook },
];

const newId = (prefix) => `${prefix}-${Math.random().toString(36).slice(2, 8)}`;

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { data, setData, update, addItem, updateItem, deleteItem, reorderItem,
          addHeroImage, updateHeroImage, deleteHeroImage, moveHeroImage, resetAll } = usePortfolio();
  const [tab, setTab] = useState("settings");

  const logout = () => { authService.logout(); navigate("/"); };

  const downloadJson = () => {
    const blob = new Blob([storageService.export()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "farzeen-portfolio-content.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const importJson = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (storageService.import(ev.target.result)) window.location.reload();
    };
    reader.readAsText(f);
  };

  return (
    <div className="min-h-screen bg-[#0B0F14] text-white grain">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-white/5 bg-[#0B0F14]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#A8C3A0] animate-pulse" />
            <p className="font-display text-lg">Admin <span className="italic text-white/60">dashboard</span></p>
          </div>
          <div className="flex items-center gap-2">
            <button data-testid="admin-export" onClick={downloadJson} title="Export JSON" className="w-10 h-10 rounded-full border border-white/10 hover:bg-white/5 flex items-center justify-center"><Download className="w-4 h-4" /></button>
            <label title="Import JSON" className="w-10 h-10 rounded-full border border-white/10 hover:bg-white/5 flex items-center justify-center cursor-pointer">
              <Upload className="w-4 h-4" />
              <input data-testid="admin-import" type="file" accept="application/json" onChange={importJson} className="hidden" />
            </label>
            <button data-testid="admin-reset" onClick={() => { if (confirm("Reset all content to defaults?")) resetAll(); }} title="Reset" className="w-10 h-10 rounded-full border border-white/10 hover:bg-white/5 flex items-center justify-center"><RefreshCw className="w-4 h-4" /></button>
            <button data-testid="admin-view-site" onClick={() => navigate("/")} className="hidden sm:inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-white/60 hover:text-white px-3 py-2"><Home className="w-3.5 h-3.5" /> View site</button>
            <button data-testid="admin-logout" onClick={logout} className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase bg-white text-[#0B0F14] px-4 py-2 rounded-full hover:bg-[#A8C3A0]"><LogOut className="w-3.5 h-3.5" /> Logout</button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 py-10">
        {/* Sidebar */}
        <aside className="lg:col-span-3">
          <nav className="space-y-1 sticky top-24">
            {TABS.map((t) => {
              const Icon = t.icon;
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  data-testid={`admin-tab-${t.id}`}
                  onClick={() => setTab(t.id)}
                  className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl border transition-all ${
                    active
                      ? "bg-[#A8C3A0]/10 border-[#A8C3A0]/30 text-white"
                      : "border-transparent text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? "text-[#A8C3A0]" : ""}`} />
                  <span className="text-sm">{t.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Editor */}
        <motion.section
          key={tab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-9 space-y-6"
          data-testid={`admin-panel-${tab}`}
        >
          {tab === "settings" && <SettingsPanel data={data} update={update} />}
          {tab === "hero" && (
            <HeroPanel
              images={data.hero?.images || []}
              addImage={addHeroImage}
              updateImage={updateHeroImage}
              updatePosition={updateHeroPosition}
              deleteImage={deleteHeroImage}
              moveImage={moveHeroImage}
            />
          )}
          {tab === "experience" && (
            <ListPanel
              title="Experience"
              description="Roles and companies. Order shown matches the timeline."
              items={data.experience || []}
              listKey="experience"
              addItem={addItem}
              updateItem={updateItem}
              deleteItem={deleteItem}
              reorderItem={reorderItem}
              factory={() => ({ id: newId("exp"), company: "", role: "", duration: "", location: "", tech: [], description: "" })}
              renderFields={(item, set) => (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="Company" value={item.company} onChange={set("company")} />
                  <Field label="Role" value={item.role} onChange={set("role")} />
                  <Field label="Duration" value={item.duration} onChange={set("duration")} placeholder="2024 — Present" />
                  <Field label="Location" value={item.location} onChange={set("location")} />
                  <div className="md:col-span-2"><TagsField label="Tech stack" value={item.tech} onChange={set("tech")} /></div>
                  <div className="md:col-span-2"><Field label="Description" textarea value={item.description} onChange={set("description")} /></div>
                </div>
              )}
            />
          )}
          {tab === "education" && (
            <ListPanel
              title="Education"
              description="Degrees, schools and learning milestones."
              items={data.education || []}
              listKey="education"
              addItem={addItem}
              updateItem={updateItem}
              deleteItem={deleteItem}
              reorderItem={reorderItem}
              factory={() => ({ id: newId("edu"), institution: "", degree: "", specialization: "", grade: "", duration: "", description: "" })}
              renderFields={(item, set) => (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="Institution" value={item.institution} onChange={set("institution")} />
                  <Field label="Degree" value={item.degree} onChange={set("degree")} />
                  <Field label="Specialization" value={item.specialization} onChange={set("specialization")} />
                  <Field label="Grade / CGPA" value={item.grade} onChange={set("grade")} />
                  <Field label="Duration" value={item.duration} onChange={set("duration")} />
                  <div className="md:col-span-2"><Field label="Description" textarea value={item.description} onChange={set("description")} /></div>
                </div>
              )}
            />
          )}
          {tab === "projects" && (
            <ListPanel
              title="Projects"
              description="Showcased work — drag order matters."
              items={data.projects || []}
              listKey="projects"
              addItem={addItem}
              updateItem={updateItem}
              deleteItem={deleteItem}
              reorderItem={reorderItem}
              factory={() => ({ id: newId("proj"), name: "", subtitle: "", description: "", tech: [], github: "", live: "", featured: false, images: [] })}
              renderFields={(item, set) => (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="Name" value={item.name} onChange={set("name")} />
                  <Field label="Subtitle" value={item.subtitle} onChange={set("subtitle")} />
                  <div className="md:col-span-2"><Field label="Description" textarea value={item.description} onChange={set("description")} rows={4} /></div>
                  <TagsField label="Tech stack" value={item.tech} onChange={set("tech")} />
                  <Field label="GitHub URL" value={item.github} onChange={set("github")} placeholder="https://github.com/…" />
                  <Field label="Live URL" value={item.live} onChange={set("live")} placeholder="(optional)" />
                  <label className="flex items-center gap-3 mt-7">
                    <input
                      type="checkbox"
                      checked={!!item.featured}
                      onChange={(e) => set("featured")(e.target.checked)}
                      className="w-4 h-4 accent-[#A8C3A0]"
                    />
                    <span className="text-sm text-white/70">Featured project</span>
                  </label>
                  <div className="md:col-span-2"><TagsField label="Image URLs" value={item.images} onChange={set("images")} placeholder="https://…, https://…" /></div>
                </div>
              )}
            />
          )}
          {tab === "events" && (
            <ListPanel
              title="Spotlight Events"
              description="Workshops, talks, leadership and hackathon moments."
              items={data.events || []}
              listKey="events"
              addItem={addItem}
              updateItem={updateItem}
              deleteItem={deleteItem}
              reorderItem={reorderItem}
              factory={() => ({ id: newId("ev"), title: "", description: "", image: "", link: "" })}
              renderFields={(item, set) => (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="Title" value={item.title} onChange={set("title")} />
                  <Field label="Image URL" value={item.image} onChange={set("image")} />
                  <Field label="Related link" value={item.link} onChange={set("link")} placeholder="(optional)" />
                  <div className="md:col-span-2"><Field label="Description" textarea value={item.description} onChange={set("description")} /></div>
                </div>
              )}
            />
          )}
          {tab === "certifications" && (
            <ListPanel
              title="Certifications"
              description="Credentials and continuing-education milestones."
              items={data.certifications || []}
              listKey="certifications"
              addItem={addItem}
              updateItem={updateItem}
              deleteItem={deleteItem}
              reorderItem={reorderItem}
              factory={() => ({ id: newId("cert"), name: "", provider: "", year: "", image: "", skills: [] })}
              renderFields={(item, set) => (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="Certificate Name" value={item.name} onChange={set("name")} />
                  <Field label="Provider" value={item.provider} onChange={set("provider")} />
                  <Field label="Year" value={item.year} onChange={set("year")} />
                  <Field label="Image URL" value={item.image} onChange={set("image")} />
                  <div className="md:col-span-2"><TagsField label="Skills learned" value={item.skills} onChange={set("skills")} /></div>
                </div>
              )}
            />
          )}
          {tab === "skills" && <SkillsPanel data={data} setData={setData} />}
          {tab === "personalNote" && <PersonalNotePanel data={data} update={update} />}
        </motion.section>
      </div>
    </div>
  );
}

/* ───────────────────────── PANELS ───────────────────────── */

function SettingsPanel({ data, update }) {
  const s = data.settings || {};
  const set = (key) => (val) => update("settings", { ...s, [key]: val });
  const setSocial = (key) => (val) => update("settings", { ...s, socials: { ...(s.socials || {}), [key]: val } });
  return (
    <Panel title="Portfolio Settings" description="Identity, resume and social links.">
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Name" value={s.name} onChange={set("name")} testid="settings-name" />
          <Field label="Tagline" value={s.tagline} onChange={set("tagline")} />
          <div className="md:col-span-2"><Field label="Intro" textarea value={s.intro} onChange={set("intro")} /></div>
          <Field label="Resume URL" value={s.resumeUrl} onChange={set("resumeUrl")} placeholder="https://…" />
          <Field label="Email" value={s.email} onChange={set("email")} />
          <Field label="Location" value={s.location} onChange={set("location")} />
        </div>
      </Card>
      <Card>
        <h3 className="text-xs tracking-[0.3em] uppercase text-white/50">Social Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="LinkedIn" value={s.socials?.linkedin} onChange={setSocial("linkedin")} />
          <Field label="GitHub" value={s.socials?.github} onChange={setSocial("github")} />
          <Field label="Email link" value={s.socials?.email} onChange={setSocial("email")} placeholder="mailto:you@…" />
        </div>
      </Card>
    </Panel>
  );
}

function HeroPanel({ images, addImage, updateImage, updatePosition, deleteImage, moveImage }) {
  const [draft, setDraft] = useState("");
  const onAdd = () => {
    if (!draft.trim()) return;
    addImage(draft.trim());
    setDraft("");
  };
  return (
    <Panel
      title="Hero Carousel"
      description="Background images shown behind the hero. Add URLs only — no uploads."
    >
      <Card>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            data-testid="hero-image-url-input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="https://images.unsplash.com/…"
            className="flex-1 bg-[#0B0F14] border border-white/10 focus:border-[#A8C3A0] rounded-lg px-4 py-3 text-white outline-none"
          />
          <ListToolbar onAdd={onAdd} testid="hero-image-add" label="Add image" />
        </div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((slide, i) => {
          const url = typeof slide === "string" ? slide : slide?.url || "";
          const position = typeof slide === "string" ? "center 58%" : slide?.position || "center 58%";
          return (
          <Card key={i} testid={`hero-image-card-${i}`}>
            <div className="aspect-video overflow-hidden rounded-lg">
              <img src={url} alt="" className="w-full h-full object-cover" />
            </div>
            <Field label={`Image URL #${i + 1}`} value={url} onChange={(v) => updateImage(i, v)} />
            <Field
              label="Focus position"
              value={position}
              onChange={(v) => updatePosition(i, v)}
              placeholder="center 58%"
            />
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/40">Position {i + 1}</span>
              <ItemActions
                onUp={() => moveImage(i, "up")}
                onDown={() => moveImage(i, "down")}
                onDelete={() => deleteImage(i)}
                testidPrefix={`hero-image-${i}`}
              />
            </div>
          </Card>
          );
        })}
        {images.length === 0 && (
          <p className="text-white/40 text-sm">No images yet. Paste an image URL above to add the first slide.</p>
        )}
      </div>
    </Panel>
  );
}

function ListPanel({ title, description, items, listKey, addItem, updateItem, deleteItem, reorderItem, factory, renderFields }) {
  const onAdd = () => addItem(listKey, factory());
  return (
    <Panel
      title={title}
      description={description}
      actions={<ListToolbar onAdd={onAdd} testid={`${listKey}-add`} />}
    >
      <div className="space-y-4">
        {items.map((item) => {
          const set = (key) => (val) => updateItem(listKey, item.id, { [key]: val });
          return (
            <Card key={item.id} testid={`${listKey}-card-${item.id}`}>
              <div className="flex items-start justify-between gap-4">
                <p className="text-[11px] tracking-[0.3em] uppercase text-white/40">{item.id}</p>
                <ItemActions
                  onUp={() => reorderItem(listKey, item.id, "up")}
                  onDown={() => reorderItem(listKey, item.id, "down")}
                  onDelete={() => deleteItem(listKey, item.id)}
                  testidPrefix={`${listKey}-${item.id}`}
                />
              </div>
              {renderFields(item, set)}
            </Card>
          );
        })}
        {items.length === 0 && <p className="text-white/40 text-sm">Empty. Click <em>Add new</em> to start.</p>}
      </div>
    </Panel>
  );
}

function SkillsPanel({ data, setData }) {
  const skills = data.skills || {};
  const set = (key) => (val) => setData({ ...data, skills: { ...skills, [key]: val } });
  return (
    <Panel title="Skills" description="Edit by category. Comma-separated lists.">
      <Card>
        <div className="space-y-4">
          <TagsField label="Languages & Frameworks" value={skills.languagesFrameworks} onChange={set("languagesFrameworks")} testid="skills-lang" />
          <TagsField label="Tools" value={skills.tools} onChange={set("tools")} testid="skills-tools" />
          <TagsField label="Technologies" value={skills.technologies} onChange={set("technologies")} testid="skills-tech" />
          <TagsField label="Soft Skills" value={skills.soft} onChange={set("soft")} testid="skills-soft" />
        </div>
      </Card>
    </Panel>
  );
}

function PersonalNotePanel({ data, update }) {
  const n = data.personalNote || {};
  const set = (key) => (val) => update("personalNote", { ...n, [key]: val });
  return (
    <Panel title="Personal Note" description="A short, editorial reflection shown before the contact section.">
      <Card>
        <div className="space-y-4">
          <Field label="Headline" value={n.headline} onChange={set("headline")} testid="note-headline" />
          <Field label="Body (use blank lines for paragraphs)" textarea rows={8} value={n.body} onChange={set("body")} testid="note-body" />
        </div>
      </Card>
    </Panel>
  );
}
