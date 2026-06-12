import React from "react";
import { motion } from "framer-motion";
import { usePortfolio } from "@/context/PortfolioContext";
import { SectionLabel } from "@/components/common/SectionLabel";

export const PersonalNote = () => {
  const { data } = usePortfolio();
  const note = data.personalNote || {};

  return (
    <section id="note" data-testid="section-personal-note" className="relative py-24 md:py-40">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <SectionLabel index="06" label="A note" />
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tighter text-white"
        >
          {note.headline}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="mt-10 text-left space-y-5"
        >
          {(note.body || "").split("\n").map((p, i) =>
            p.trim() ? (
              <p key={i} className="font-display text-xl md:text-2xl text-white/80 leading-relaxed italic">
                {p}
              </p>
            ) : null
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex items-center justify-center gap-3 text-[#D8B4A0]"
        >
          <span className="h-px w-12 bg-[#D8B4A0]/50" />
          <span className="text-xs tracking-[0.4em] uppercase">— Farzeen</span>
          <span className="h-px w-12 bg-[#D8B4A0]/50" />
        </motion.div>
      </div>
    </section>
  );
};
