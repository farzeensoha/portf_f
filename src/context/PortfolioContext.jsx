import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { defaultData } from "@/data/mockData";
import { storageService } from "@/services/storageService";

const PortfolioContext = createContext(null);

const DEFAULT_HERO_POSITION = "center 58%";

function normalizeHeroSlide(slide) {
  if (!slide) return { url: "", position: DEFAULT_HERO_POSITION };
  if (typeof slide === "string") return { url: slide, position: DEFAULT_HERO_POSITION };
  return {
    url: slide.url || slide.src || "",
    position: slide.position || DEFAULT_HERO_POSITION,
  };
}

function hydrate() {
  const persisted = storageService.load();
  if (!persisted) return structuredClone(defaultData);
  // Shallow-merge top-level keys so new defaults appear without wiping user edits.
  return { ...structuredClone(defaultData), ...persisted };
}

export function PortfolioProvider({ children }) {
  const [data, setData] = useState(hydrate);

  useEffect(() => {
    storageService.save(data);
  }, [data]);

  const api = useMemo(() => ({
    data,
    setData,
    update: (key, value) => setData((prev) => ({ ...prev, [key]: value })),

    // Generic list helpers used by the admin dashboard
    addItem: (key, item) => setData((prev) => ({
      ...prev,
      [key]: [...(prev[key] || []), item],
    })),
    updateItem: (key, id, patch) => setData((prev) => ({
      ...prev,
      [key]: (prev[key] || []).map((it) => (it.id === id ? { ...it, ...patch } : it)),
    })),
    deleteItem: (key, id) => setData((prev) => ({
      ...prev,
      [key]: (prev[key] || []).filter((it) => it.id !== id),
    })),
    reorderItem: (key, id, direction) => setData((prev) => {
      const list = [...(prev[key] || [])];
      const idx = list.findIndex((it) => it.id === id);
      if (idx === -1) return prev;
      const swap = direction === "up" ? idx - 1 : idx + 1;
      if (swap < 0 || swap >= list.length) return prev;
      [list[idx], list[swap]] = [list[swap], list[idx]];
      return { ...prev, [key]: list };
    }),

    // Hero carousel image helpers
    addHeroImage: (url) => setData((prev) => ({
      ...prev,
      hero: { images: [...(prev.hero?.images || []), { url, position: DEFAULT_HERO_POSITION }] },
    })),
    updateHeroImage: (idx, url) => setData((prev) => {
      const imgs = [...(prev.hero?.images || [])].map(normalizeHeroSlide);
      imgs[idx] = { ...imgs[idx], url };
      return { ...prev, hero: { images: imgs } };
    }),
    updateHeroPosition: (idx, position) => setData((prev) => {
      const imgs = [...(prev.hero?.images || [])].map(normalizeHeroSlide);
      imgs[idx] = { ...imgs[idx], position };
      return { ...prev, hero: { images: imgs } };
    }),
    deleteHeroImage: (idx) => setData((prev) => ({
      ...prev,
      hero: { images: (prev.hero?.images || []).filter((_, i) => i !== idx) },
    })),
    moveHeroImage: (idx, direction) => setData((prev) => {
      const imgs = [...(prev.hero?.images || [])].map(normalizeHeroSlide);
      const swap = direction === "up" ? idx - 1 : idx + 1;
      if (swap < 0 || swap >= imgs.length) return prev;
      [imgs[idx], imgs[swap]] = [imgs[swap], imgs[idx]];
      return { ...prev, hero: { images: imgs } };
    }),

    resetAll: () => {
      storageService.reset();
      setData(structuredClone(defaultData));
    },
  }), [data]);

  return <PortfolioContext.Provider value={api}>{children}</PortfolioContext.Provider>;
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error("usePortfolio must be used within PortfolioProvider");
  return ctx;
}
