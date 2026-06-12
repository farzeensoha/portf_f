import React, { useState } from "react";
import { motion } from "framer-motion";
import { send } from "@emailjs/browser";
import { Mail, Linkedin, Github, MapPin, Send, Check, AlertCircle } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";
import { SectionLabel } from "@/components/common/SectionLabel";

const initial = { name: "", email: "", subject: "", message: "" };
const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const CONTACT_EMAIL = process.env.REACT_APP_CONTACT_EMAIL;

export const Contact = () => {
  const { data } = usePortfolio();
  const s = data.settings || {};
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState("");

  const validate = () => {
    if (!form.name.trim()) return "Please add your name.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) return "Please add a valid email.";
    if (!form.subject.trim()) return "What's this about?";
    if (form.message.trim().length < 8) return "A few more words would help.";
    return "";
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const err = validate();
    if (err) {
      setError(err);
      setStatus("error");
      return;
    }

    if (!PUBLIC_KEY || !SERVICE_ID || !TEMPLATE_ID || !CONTACT_EMAIL) {
      setError("Contact form is not configured. Please set EmailJS environment variables.");
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      const templateParams = {
        from_name: form.name,
        from_email: form.email,
        subject: form.subject,
        message: form.message,
        to_email: CONTACT_EMAIL,
      };

      await send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      setStatus("success");
      setForm(initial);
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      console.error("EmailJS send error:", err);
      setError("Unable to send message. Please try again later.");
      setStatus("error");
    }
  };

  return (
    <section id="contact" data-testid="section-contact" className="relative py-24 md:py-40 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 self-start">
            <SectionLabel index="07" label="Say hello" />
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tighter text-white"
            >
              Let's <br />
              <span className="italic text-[#A8C3A0]">connect.</span>
            </motion.h2>

            <p className="mt-6 text-white/60 leading-relaxed max-w-md">
              I'm open to full time roles, collaborations, or just a hello with a question attached.
            </p>

            <div className="mt-10 space-y-5">
              <ContactLink href={`mailto:${s.email}`} icon={Mail} label={s.email} testid="contact-email" />
              <ContactLink href={s.socials?.linkedin} icon={Linkedin} label="LinkedIn" testid="contact-linkedin" />
              <ContactLink href={s.socials?.github} icon={Github} label="GitHub" testid="contact-github" />
              {s.location && (
                <div className="flex items-center gap-3 text-white/60">
                  <MapPin className="w-4 h-4 text-[#D8B4A0]" />
                  <span>{s.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Form */}
          <form
            data-testid="contact-form"
            onSubmit={onSubmit}
            className="lg:col-span-7 glass rounded-2xl p-6 md:p-10 space-y-6"
          >
            <Field label="Name" id="name">
              <input
                id="name"
                data-testid="contact-input-name"
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-transparent border-b border-white/15 focus:border-[#A8C3A0] outline-none py-3 text-white placeholder-white/30 transition-colors"
                placeholder="Your name"
              />
            </Field>
            <Field label="Email" id="email">
              <input
                id="email"
                data-testid="contact-input-email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-transparent border-b border-white/15 focus:border-[#A8C3A0] outline-none py-3 text-white placeholder-white/30 transition-colors"
                placeholder="you@somewhere.com"
              />
            </Field>
            <Field label="Subject" id="subject">
              <input
                id="subject"
                data-testid="contact-input-subject"
                type="text"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full bg-transparent border-b border-white/15 focus:border-[#A8C3A0] outline-none py-3 text-white placeholder-white/30 transition-colors"
                placeholder="What's on your mind?"
              />
            </Field>
            <Field label="Message" id="message">
              <textarea
                id="message"
                data-testid="contact-input-message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={5}
                className="w-full bg-transparent border-b border-white/15 focus:border-[#A8C3A0] outline-none py-3 text-white placeholder-white/30 transition-colors resize-none"
                placeholder="Tell me more…"
              />
            </Field>

            {error && (
              <div data-testid="contact-error" className="flex items-center gap-2 text-sm text-red-400">
                <AlertCircle className="w-4 h-4" /> {error}
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <p className="text-xs text-white/40">Replies within 48 hours.</p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={status === "loading"}
                data-testid="contact-submit-btn"
                type="submit"
                className="inline-flex items-center gap-3 bg-white text-[#0B0F14] px-7 py-4 rounded-full text-sm tracking-[0.2em] uppercase hover:bg-[#A8C3A0] transition disabled:opacity-50"
              >
                {status === "loading" ? "Sending…" : status === "success" ? (
                  <><Check className="w-4 h-4" /> Sent</>
                ) : (
                  <><Send className="w-4 h-4" /> Send</>
                )}
              </motion.button>
            </div>

            {status === "success" && (
              <motion.div
                data-testid="contact-success"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-[#A8C3A0] flex items-center gap-2"
              >
                <Check className="w-4 h-4" /> Thanks — your note is on its way (mock).
              </motion.div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

const Field = ({ label, id, children }) => (
  <div>
    <label htmlFor={id} className="text-[11px] tracking-[0.3em] uppercase text-white/40">{label}</label>
    {children}
  </div>
);

const ContactLink = ({ href, icon: Icon, label, testid }) => (
  <a
    href={href || "#"}
    target="_blank"
    rel="noopener noreferrer"
    data-testid={testid}
    className="group flex items-center gap-4 text-white/80 hover:text-white transition-colors"
  >
    <span className="w-10 h-10 rounded-full glass flex items-center justify-center">
      <Icon className="w-4 h-4 text-[#A8C3A0]" />
    </span>
    <span className="text-base group-hover:translate-x-1 transition-transform">{label}</span>
  </a>
);
