import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Settings } from "lucide-react";

export const AdminFab = () => {
  const navigate = useNavigate();
  return (
    <motion.button
      data-testid="admin-fab"
      onClick={() => navigate("/admin")}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.15 }}
      whileHover={{ opacity: 1, scale: 1.05 }}
      transition={{ duration: 0.3 }}
      aria-label="Open admin"
      className="fixed bottom-6 left-6 z-[60] w-12 h-12 rounded-full glass-strong flex items-center justify-center text-white/70 hover:text-white"
    >
      <Settings className="w-4 h-4" />
    </motion.button>
  );
};
