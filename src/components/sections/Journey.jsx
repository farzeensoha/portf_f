import React from "react";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";
import { SectionLabel } from "@/components/common/SectionLabel";

const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
};

const Node = ({ accent }) => (
  <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-[#0B0F14] flex items-center justify-center">
    <span className="w-2 h-2 rounded-full" style={{ background: accent }} />
  </div>
);

const ExperienceItem = ({ item }) => (
  <motion.div {...reveal} className="relative pl-12 pb-14 group" data-testid={`exp-item-${item.id}`}>
    <Node accent="#A8C3A0" />
    <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
      <div>
        <p className="text-xs tracking-[0.3em] uppercase text-[#A8C3A0]">{item.role}</p>
        <h3 className="font-display text-3xl md:text-4xl text-white mt-2">{item.company}</h3>
      </div>
      <p className="text-sm font-sans tracking-wider text-white/50 md:text-right shrink-0">
        {item.duration}
      </p>
    </div>
    {item.location && (
      <p className="text-xs text-white/40 mt-1 tracking-wide">{item.location}</p>
    )}
    <p className="mt-4 text-white/70 leading-relaxed max-w-2xl">{item.description}</p>
    {item.tech?.length > 0 && (
      <div className="mt-5 flex flex-wrap gap-2">
        {item.tech.map((t) => (
          <span
            key={t}
            className="px-3 py-1 text-xs tracking-wide border border-white/10 rounded-full text-white/70 hover:border-[#A8C3A0]/40 transition-colors"
          >
            {t}
          </span>
        ))}
      </div>
    )}
  </motion.div>
);

const EducationItem = ({ item }) => (
  <motion.div {...reveal} className="relative pl-12 pb-14 group" data-testid={`edu-item-${item.id}`}>
    <Node accent="#D8B4A0" />
    <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
      <div>
        <p className="text-xs tracking-[0.3em] uppercase text-[#D8B4A0]">{item.degree} · {item.specialization}</p>
        <h3 className="font-display text-3xl md:text-4xl text-white mt-2">{item.institution}</h3>
      </div>
      <p className="text-sm font-sans tracking-wider text-white/50 md:text-right shrink-0">
        {item.duration}
      </p>
    </div>
    {item.grade && <p className="text-sm text-[#8BAFD9] mt-2">{item.grade}</p>}
    {item.description && (
      <p className="mt-4 text-white/70 leading-relaxed max-w-2xl">{item.description}</p>
    )}
  </motion.div>
);

export const Journey = () => {
  const { data } = usePortfolio();

  return (
    <section id="journey" data-testid="section-journey" className="relative py-24 md:py-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Sticky heading */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionLabel index="01" label="Journey" />
              <motion.h2
                {...reveal}
                className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tighter text-white"
              >
                Journey of <br />
                <span className="italic text-[#A8C3A0]">growth.</span>
              </motion.h2>
              <motion.p {...reveal} transition={{ ...reveal.transition, delay: 0.1 }} className="mt-6 text-white/60 max-w-md leading-relaxed">
                A timeline of the rooms I've worked in and the classrooms that shaped me — each one taught me a different way to build.
              </motion.p>
            </div>
          </div>

          {/* Timeline */}
          <div className="lg:col-span-7">
            <motion.div {...reveal} className="flex items-center gap-3 mb-8">
              <Briefcase className="w-4 h-4 text-[#A8C3A0]" />
              <span className="text-xs tracking-[0.3em] uppercase text-white/50">Experience</span>
            </motion.div>
            <div className="relative rail">
              {(data.experience || []).map((item) => (
                <ExperienceItem key={item.id} item={item} />
              ))}
            </div>

            <motion.div {...reveal} className="flex items-center gap-3 mt-8 mb-8">
              <GraduationCap className="w-4 h-4 text-[#D8B4A0]" />
              <span className="text-xs tracking-[0.3em] uppercase text-white/50">Education</span>
            </motion.div>
            <div className="relative rail">
              {(data.education || []).map((item) => (
                <EducationItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
