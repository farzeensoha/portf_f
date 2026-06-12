import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Github, Star, ArrowLeft, ArrowRight } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";
import { SectionLabel } from "@/components/common/SectionLabel";
import { Modal } from "@/components/common/Modal";

export const Projects = () => {
  const { data } = usePortfolio();
  const projects = data.projects || [];
  const [active, setActive] = useState(null);
  const scrollerRef = useRef(null);

  const scroll = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector("[data-card]");
    const w = card ? card.getBoundingClientRect().width + 32 : 600;
    el.scrollBy({ left: dir === "next" ? w : -w, behavior: "smooth" });
  };

  return (
    <section id="projects" data-testid="section-projects" className="relative py-24 md:py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <SectionLabel index="02" label="Selected Work" />
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tighter text-white"
            >
              Things I've <br />
              <span className="italic text-[#8BAFD9]">made.</span>
            </motion.h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              data-testid="projects-prev-btn"
              onClick={() => scroll("prev")}
              className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/10 transition"
              aria-label="Previous"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              data-testid="projects-next-btn"
              onClick={() => scroll("next")}
              className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/10 transition"
              aria-label="Next"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory no-scrollbar px-4 sm:px-6 lg:px-8 pb-6"
        style={{ scrollPaddingLeft: "1rem" }}
      >
        {projects.map((p, i) => (
          <motion.article
            key={p.id}
            data-card
            data-testid={`project-card-${p.id}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setActive(p)}
            className="snap-start shrink-0 w-[88vw] sm:w-[70vw] md:w-[58vw] lg:w-[44vw] xl:w-[40vw] cursor-pointer group"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <motion.img
                src={p.images?.[0]}
                alt={p.name}
                className="absolute inset-0 w-full h-full object-cover"
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F14] via-[#0B0F14]/40 to-transparent" />

              {p.featured && (
                <div className="absolute top-5 left-5 inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs tracking-[0.2em] uppercase text-[#D8B4A0]">
                  <Star className="w-3 h-3" /> Featured
                </div>
              )}

              <div className="absolute top-5 right-5 w-12 h-12 rounded-full glass flex items-center justify-center text-white opacity-0 group-hover:opacity-100 group-hover:rotate-0 -rotate-45 transition-all duration-500">
                <ArrowUpRight className="w-4 h-4" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <p className="text-xs tracking-[0.3em] uppercase text-[#A8C3A0] mb-3">{p.subtitle}</p>
                <h3 className="font-display text-3xl md:text-4xl text-white leading-tight">
                  {p.name}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {(p.tech || []).slice(0, 4).map((t) => (
                    <span key={t} className="px-3 py-1 text-[11px] tracking-wide border border-white/15 rounded-full text-white/80">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.article>
        ))}
        <div className="shrink-0 w-4 sm:w-8" />
      </div>

      <Modal open={!!active} onClose={() => setActive(null)} testid="project-modal">
        {active && (
          <div className="p-6 sm:p-10">
            <p className="text-xs tracking-[0.3em] uppercase text-[#A8C3A0]">{active.subtitle}</p>
            <h3 className="font-display text-4xl md:text-5xl text-white mt-3" data-testid="project-modal-title">{active.name}</h3>
            <p className="mt-6 text-white/70 leading-relaxed max-w-3xl">{active.description}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {(active.tech || []).map((t) => (
                <span key={t} className="px-3 py-1 text-xs tracking-wide border border-white/15 rounded-full text-white/80">
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {active.github && (
                <a
                  href={active.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/20 text-sm uppercase tracking-[0.2em] hover:bg-white/5"
                >
                  <Github className="w-4 h-4" /> GitHub
                </a>
              )}
              {active.live && (
                <a
                  href={active.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white text-[#0B0F14] text-sm uppercase tracking-[0.2em] hover:bg-[#A8C3A0]"
                >
                  <ExternalLink className="w-4 h-4" /> Visit
                </a>
              )}
            </div>

            <div className="mt-10 space-y-4">
              {(active.images || []).map((img, i) => (
                <div key={i} className="overflow-hidden rounded-xl">
                  <img src={img} alt={`${active.name} ${i + 1}`} className="w-full h-auto" />
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};
