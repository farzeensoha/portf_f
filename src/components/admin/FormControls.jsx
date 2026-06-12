import React from "react";
import { Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";

export const Field = ({ label, value, onChange, type = "text", placeholder, testid, textarea, rows = 3 }) => (
  <label className="block">
    <span className="text-[11px] tracking-[0.3em] uppercase text-white/50">{label}</span>
    {textarea ? (
      <textarea
        data-testid={testid}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full mt-2 bg-[#0B0F14] border border-white/10 focus:border-[#A8C3A0] rounded-lg px-4 py-3 text-white outline-none transition-colors resize-y"
      />
    ) : (
      <input
        data-testid={testid}
        type={type}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full mt-2 bg-[#0B0F14] border border-white/10 focus:border-[#A8C3A0] rounded-lg px-4 py-3 text-white outline-none transition-colors"
      />
    )}
  </label>
);

export const TagsField = ({ label, value = [], onChange, placeholder = "Comma separated", testid }) => (
  <Field
    label={label}
    testid={testid}
    value={(value || []).join(", ")}
    onChange={(v) => onChange(v.split(",").map((s) => s.trim()).filter(Boolean))}
    placeholder={placeholder}
  />
);

export const ListToolbar = ({ onAdd, label = "Add new", testid }) => (
  <button
    data-testid={testid}
    onClick={onAdd}
    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#A8C3A0] text-[#0B0F14] text-xs tracking-[0.2em] uppercase hover:bg-white transition"
  >
    <Plus className="w-3.5 h-3.5" /> {label}
  </button>
);

export const ItemActions = ({ onUp, onDown, onDelete, testidPrefix }) => (
  <div className="flex items-center gap-1">
    <button data-testid={`${testidPrefix}-up`} onClick={onUp} className="w-8 h-8 rounded-full border border-white/10 hover:bg-white/5 flex items-center justify-center" aria-label="Move up">
      <ArrowUp className="w-3.5 h-3.5" />
    </button>
    <button data-testid={`${testidPrefix}-down`} onClick={onDown} className="w-8 h-8 rounded-full border border-white/10 hover:bg-white/5 flex items-center justify-center" aria-label="Move down">
      <ArrowDown className="w-3.5 h-3.5" />
    </button>
    <button data-testid={`${testidPrefix}-delete`} onClick={onDelete} className="w-8 h-8 rounded-full border border-red-500/30 text-red-400 hover:bg-red-500/10 flex items-center justify-center" aria-label="Delete">
      <Trash2 className="w-3.5 h-3.5" />
    </button>
  </div>
);

export const Panel = ({ title, description, children, actions }) => (
  <div className="space-y-6">
    <div className="flex items-start justify-between gap-4 flex-wrap">
      <div>
        <h2 className="font-display text-3xl text-white">{title}</h2>
        {description && <p className="text-white/50 text-sm mt-1">{description}</p>}
      </div>
      {actions}
    </div>
    {children}
  </div>
);

export const Card = ({ children, testid }) => (
  <div data-testid={testid} className="glass rounded-xl p-5 space-y-4">
    {children}
  </div>
);
