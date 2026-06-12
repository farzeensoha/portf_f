import React from "react";
import { motion } from "framer-motion";

export const SectionLabel = ({ index, label }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6 }}
    className="flex items-center gap-3 text-[#A8C3A0]"
  >
    <span className="text-xs font-sans tracking-[0.3em] uppercase">
      {index}
    </span>
    <span className="h-px w-10 bg-[#A8C3A0]/40" />
    <span className="text-xs font-sans tracking-[0.3em] uppercase text-white/60">
      {label}
    </span>
  </motion.div>
);
