import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, FileText, Linkedin, Github, Mail } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

export const Hero = () => {
  const { data } = usePortfolio();
  const images = data.hero?.images || [];
  const [idx, setIdx] = useState(0);

  const getSlide = (slide) => {
    if (!slide) return { url: "", position: "center 58%" };
    if (typeof slide === "string") return { url: slide, position: "center 58%" };
    return {
      url: slide.url || slide.src || "",
      position: slide.position || "center 58%",
    };
  };

  const currentSlide = getSlide(images[idx]);

  useEffect(() => {
    if (images.length < 2) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % images.length), 6500);
    return () => clearInterval(t);
  }, [images.length]);

  const scrollNext = () => {
    document.getElementById("journey")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" data-testid="section-hero" className="relative h-[100svh] w-full overflow-hidden">
      {/* Background carousel */}
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          {currentSlide.url && (
            <motion.div
              key={currentSlide.url + idx}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1.12 }}
              exit={{ opacity: 0 }}
              transition={{ opacity: { duration: 2 }, scale: { duration: 9, ease: "linear" } }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${currentSlide.url})`, backgroundPosition: currentSlide.position }}
            />
          )}
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F14] via-[#0B0F14]/70 to-[#0B0F14]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F14]/80 via-transparent to-[#0B0F14]/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-24 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mb-6"
        >
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl sm:text-7xl lg:text-[9rem] leading-[0.95] tracking-tighter text-white text-balance"
          data-testid="hero-name"
        >
          {data.settings.name?.split(" ")[0]}
          <br />
          <span className="italic font-light text-white/90">
            {data.settings.name?.split(" ").slice(1).join(" ")}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-8 max-w-xl text-base md:text-lg text-white/70 font-light leading-relaxed"
          data-testid="hero-intro"
        >
          {data.settings.intro}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.15, duration: 0.8 }}
          className="mt-6 text-sm md:text-base font-sans tracking-[0.25em] uppercase text-[#A8C3A0]"
          data-testid="hero-tagline"
        >
          {data.settings.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href={data.settings.resumeUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="hero-resume-btn"
            className="group inline-flex items-center gap-3 bg-white text-[#0B0F14] px-7 py-4 rounded-full text-sm tracking-[0.2em] uppercase hover:bg-[#A8C3A0] transition-all duration-500"
          >
            <FileText className="w-4 h-4" />
            Resume
          </a>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            data-testid="hero-contact-btn"
            className="inline-flex items-center gap-3 border border-white/20 text-white px-7 py-4 rounded-full text-sm tracking-[0.2em] uppercase hover:border-white hover:bg-white/5 transition-all"
          >
            Get in touch
          </button>

          <div className="flex items-center gap-2 ml-auto md:ml-2">
            <SocialBtn href={data.settings.socials?.linkedin} icon={Linkedin} label="LinkedIn" testid="hero-social-linkedin" />
            <SocialBtn href={data.settings.socials?.github} icon={Github} label="GitHub" testid="hero-social-github" />
            <SocialBtn href={data.settings.socials?.email} icon={Mail} label="Email" testid="hero-social-email" />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        data-testid="hero-scroll-indicator"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 text-white/50 hover:text-white transition-colors"
        aria-label="Scroll down"
      >
        <span className="text-[10px] tracking-[0.4em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.button>

      {/* Carousel dots */}
      {images.length > 1 && (
        <div className="absolute bottom-8 right-8 z-10 flex flex-col gap-2">
          {images.map((slide, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              data-testid={`hero-dot-${i}`}
              className={`h-px transition-all duration-500 ${
                i === idx ? "w-10 bg-white" : "w-6 bg-white/30"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

const SocialBtn = ({ href, icon: Icon, label, testid }) => (
  <a
    href={href || "#"}
    target="_blank"
    rel="noopener noreferrer"
    data-testid={testid}
    aria-label={label}
    className="w-11 h-11 rounded-full glass flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all"
  >
    <Icon className="w-4 h-4" />
  </a>
);
