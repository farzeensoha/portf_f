import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { id: "hero", label: "Home" },
  { id: "journey", label: "Experience" },
  { id: "audience", label: "Spotlight" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export const Navigation = ({ name }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <div className={`mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex items-center justify-between ${
        scrolled ? "glass rounded-full !py-2 !px-4 max-w-3xl" : ""
      }`}>
        <button
          data-testid="nav-logo"
          onClick={() => scrollTo("hero")}
          className="font-display text-lg tracking-tight text-white hover:text-[#A8C3A0] transition-colors"
        >
          {name?.split(" ")[0] || "Farzeen"}
          <span className="text-[#D8B4A0]">.</span>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <button
              key={l.id}
              data-testid={`nav-link-${l.id}`}
              onClick={() => scrollTo(l.id)}
              className="px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors"
            >
              {l.label}
            </button>
          ))}
        </div>

        <button
          data-testid="nav-mobile-toggle"
          onClick={() => setOpen((o) => !o)}
          className="md:hidden w-10 h-10 rounded-full glass flex items-center justify-center"
          aria-label="Menu"
        >
          {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden mx-4 mt-3 glass-strong rounded-2xl py-4"
        >
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="w-full text-left px-6 py-3 text-sm uppercase tracking-[0.2em] text-white/70 hover:text-white hover:bg-white/5"
            >
              {l.label}
            </button>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
};
