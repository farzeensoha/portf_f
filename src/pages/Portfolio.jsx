import React from "react";
import { Navigation } from "@/components/layout/Navigation";
import { Hero } from "@/components/sections/Hero";
import { Journey } from "@/components/sections/Journey";
import { Projects } from "@/components/sections/Projects";
import { Audience } from "@/components/sections/Audience";
import { Certifications } from "@/components/sections/Certifications";
import { Skills } from "@/components/sections/Skills";
import { PersonalNote } from "@/components/sections/PersonalNote";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { AdminFab } from "@/components/common/AdminFab";
import { useAdminShortcut } from "@/hooks/useAdminShortcut";
import { usePortfolio } from "@/context/PortfolioContext";

export default function Portfolio() {
  useAdminShortcut();
  const { data } = usePortfolio();
  return (
    <div className="relative bg-[#0B0F14] text-white grain">
      <Navigation name={data.settings?.name} />
      <main>
        <Hero />
        <Journey />
        <Audience />
        <Projects />
        <Certifications />
        <Skills />
        <PersonalNote />
        <Contact />
      </main>
      <Footer />
      <AdminFab />
    </div>
  );
}
