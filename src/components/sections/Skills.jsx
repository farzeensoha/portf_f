import React from "react";
import { motion } from "framer-motion";
import { usePortfolio } from "@/context/PortfolioContext";
import { SectionLabel } from "@/components/common/SectionLabel";

const groups = [
  { key: "languagesFrameworks", label: "Languages & Frameworks", accent: "#A8C3A0" },
  { key: "tools", label: "Tools", accent: "#8BAFD9" },
  { key: "technologies", label: "Technologies", accent: "#D8B4A0" },
  { key: "soft", label: "Soft Skills", accent: "#A8C3A0" },
];

export const Skills = () => {
  const { data } = usePortfolio();
  const skills = data.skills || {};

  return (
    <section id="skills" data-testid="section-skills" className="relative py-24 md:py-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 max-w-3xl">
          <SectionLabel index="05" label="Toolkit" />
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tighter text-white"
          >
            What I work <br />
            <span className="italic text-[#A8C3A0]">with.</span>
          </motion.h2>
        </div>

        <div className="space-y-14">
          {groups.map((g, gi) => (
            <motion.div
              key={g.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: gi * 0.08 }}
              data-testid={`skills-group-${g.key}`}
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="w-2 h-2 rounded-full" style={{ background: g.accent }} />
                <h3 className="text-xs tracking-[0.3em] uppercase text-white/60">{g.label}</h3>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {(skills[g.key] || []).map((s, i) => (
                  <motion.span
                    key={s}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.02 }}
                    className="group inline-flex items-center px-4 py-2 rounded-full border border-white/10 text-sm text-white/80 hover:border-white/40 hover:bg-white/5 hover:text-white transition-all cursor-default"
                  >
                    {s}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
