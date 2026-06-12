import React, { useState } from "react";
import { motion } from "framer-motion";
import { usePortfolio } from "@/context/PortfolioContext";
import { SectionLabel } from "@/components/common/SectionLabel";
import { Modal } from "@/components/common/Modal";

export const Certifications = () => {
  const { data } = usePortfolio();
  const certs = data.certifications || [];
  const [active, setActive] = useState(null);

  return (
    <section id="certifications" data-testid="section-certifications" className="relative py-24 md:py-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 max-w-3xl">
          <SectionLabel index="04" label="Credentials" />
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tighter text-white"
          >
            Certifications <br />
            <span className="italic text-[#8BAFD9]">& courses.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certs.map((c, i) => (
            <motion.button
              key={c.id}
              data-testid={`cert-card-${c.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.06 }}
              onClick={() => setActive(c)}
              className="group text-left glass rounded-2xl overflow-hidden hover:border-white/20 transition-all"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <motion.img
                  src={c.image}
                  alt={c.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F14]/80 to-transparent" />
              </div>
              <div className="p-6">
                <p className="text-xs tracking-[0.3em] uppercase text-[#A8C3A0]">{c.provider} · {c.year}</p>
                <h3 className="font-display text-xl text-white mt-3 leading-snug">{c.name}</h3>
                {c.skills?.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {c.skills.slice(0, 3).map((s) => (
                      <span key={s} className="px-2.5 py-1 text-[11px] tracking-wide border border-white/10 rounded-full text-white/60">
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <Modal open={!!active} onClose={() => setActive(null)} testid="cert-modal">
        {active && (
          <div className="p-6 sm:p-10">
            <div className="overflow-hidden rounded-xl">
              <img src={active.image} alt={active.name} className="w-full h-auto" />
            </div>
            <p className="text-xs tracking-[0.3em] uppercase text-[#A8C3A0] mt-8">{active.provider} · {active.year}</p>
            <h3 className="font-display text-3xl md:text-4xl text-white mt-3" data-testid="cert-modal-title">{active.name}</h3>
            {active.skills?.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {active.skills.map((s) => (
                  <span key={s} className="px-3 py-1 text-xs tracking-wide border border-white/15 rounded-full text-white/80">
                    {s}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </Modal>
    </section>
  );
};
