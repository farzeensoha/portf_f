import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";
import { SectionLabel } from "@/components/common/SectionLabel";
import { Modal } from "@/components/common/Modal";

export const Audience = () => {
  const { data } = usePortfolio();
  const events = data.events || [];
  const [active, setActive] = useState(null);
  const [imageIdx, setImageIdx] = useState(0);

  return (
    <section id="audience" data-testid="section-audience" className="relative py-24 md:py-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 max-w-4xl">
          <div>
            <SectionLabel index="03" label="Spotlight" />
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tighter text-white"
            >
              Me, not in <br />
              <span className="italic text-[#D8B4A0]">the audience.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="mt-6 text-white/60 leading-relaxed text-balance"
            >
              Hackathons, Workshops, conferences and leadership moments where I traded the seat for the spotlight. And times i've given back to society.
            </motion.p>
          </div>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
          {events.map((e, i) => (
            <motion.button
              key={e.id}
              data-testid={`event-card-${e.id}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setActive(e)}
              className={`group relative w-full text-left mb-6 overflow-hidden rounded-2xl block break-inside-avoid ${
                i % 3 === 0 ? "aspect-[3/4]" : i % 3 === 1 ? "aspect-[4/3]" : "aspect-[3/4]"
              }`}
            >
              <motion.img
                src={(e.images || [e.image])?.[0] || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23162029' width='400' height='300'/%3E%3C/svg%3E"}
                alt={e.title}
                className="absolute inset-0 w-full h-full object-cover"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F14] via-[#0B0F14]/20 to-transparent" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 glass" />

              <div className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-transform duration-500">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                <h3 className="font-display text-xl md:text-2xl text-white leading-tight">{e.title}</h3>
                <p className="mt-2 text-xs md:text-sm text-white/60 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {e.description}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <Modal open={!!active} onClose={() => { setActive(null); setImageIdx(0); }} testid="event-modal">
        {active && (
          <div>
            <div className="relative w-full max-h-[60vh] overflow-hidden group bg-[#162029] flex items-center justify-center">
              <motion.img 
                key={imageIdx}
                src={(active.images || [active.image])?.[imageIdx] || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect fill='%23162029' width='800' height='600'/%3E%3C/svg%3E"} 
                alt={`${active.title} - ${imageIdx + 1}`} 
                className="max-w-full max-h-[60vh] w-auto h-auto object-contain"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#162029] to-transparent" />
              
              {(active.images || [active.image]).length > 1 && (
                <>
                  <button
                    onClick={() => setImageIdx((imageIdx - 1 + (active.images || [active.image]).length) % (active.images || [active.image]).length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5 text-white" />
                  </button>
                  <button
                    onClick={() => setImageIdx((imageIdx + 1) % (active.images || [active.image]).length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5 text-white" />
                  </button>
                  
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {(active.images || [active.image]).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setImageIdx(i)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          i === imageIdx ? "bg-white w-6" : "bg-white/40 hover:bg-white/60"
                        }`}
                        aria-label={`Go to image ${i + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className="p-6 sm:p-10 -mt-20 relative">
              <h3 className="font-display text-3xl md:text-5xl text-white" data-testid="event-modal-title">{active.title}</h3>
              <p className="mt-6 text-white/70 leading-relaxed max-w-3xl">{active.description}</p>
              {(active.images || [active.image]).length > 1 && (
                <p className="mt-4 text-xs text-white/40">
                  Image {imageIdx + 1} of {(active.images || [active.image]).length}
                </p>
              )}
              {active.link && (
                <a
                  href={active.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-6 text-[#A8C3A0] hover:text-white transition-colors text-sm uppercase tracking-[0.2em]"
                >
                  View related <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};
