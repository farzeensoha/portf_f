import React from "react";
import { usePortfolio } from "@/context/PortfolioContext";

export const Footer = () => {
  const { data } = usePortfolio();
  const year = new Date().getFullYear();
  return (
    <footer data-testid="footer" className="relative border-t border-white/5 py-12">
    </footer>
  );
};
