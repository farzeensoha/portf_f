import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Lock, ArrowRight, ArrowLeft } from "lucide-react";
import { authService } from "@/services/storageService";

const ADMIN_PASSWORD = process.env.REACT_APP_ADMIN_PASSWORD || "";

export default function AdminLogin({ onSuccess }) {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (authService.login(password, ADMIN_PASSWORD)) {
      setError("");
      onSuccess?.();
    } else {
      setError("Incorrect password.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F14] text-white flex items-center justify-center px-4 grain">
      <button
        onClick={() => navigate("/")}
        data-testid="admin-back-home"
        className="absolute top-6 left-6 inline-flex items-center gap-2 text-white/60 hover:text-white text-xs tracking-[0.2em] uppercase"
      >
        <ArrowLeft className="w-4 h-4" /> Home
      </button>

      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-strong w-full max-w-md p-10 rounded-2xl"
      >
        <div className="w-12 h-12 rounded-full bg-[#A8C3A0]/10 border border-[#A8C3A0]/30 flex items-center justify-center mb-6">
          <Lock className="w-4 h-4 text-[#A8C3A0]" />
        </div>
        <p className="text-xs tracking-[0.3em] uppercase text-[#A8C3A0]">Restricted</p>
        <h1 className="font-display text-4xl mt-2">Admin <span className="italic">access.</span></h1>
        <p className="text-white/50 mt-3 text-sm">Enter the dashboard password to manage portfolio content.</p>

        <div className="mt-8">
          <label htmlFor="pwd" className="text-[11px] tracking-[0.3em] uppercase text-white/40">Password</label>
          <input
            id="pwd"
            data-testid="admin-password-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            className="w-full bg-transparent border-b border-white/15 focus:border-[#A8C3A0] outline-none py-3 mt-1 text-white"
            placeholder="••••••••"
          />
          {error && <p data-testid="admin-error" className="mt-3 text-sm text-red-400">{error}</p>}
        </div>

        <button
          type="submit"
          data-testid="admin-login-btn"
          className="mt-8 w-full inline-flex items-center justify-center gap-3 bg-white text-[#0B0F14] px-7 py-4 rounded-full text-sm tracking-[0.2em] uppercase hover:bg-[#A8C3A0] transition"
        >
          Enter dashboard <ArrowRight className="w-4 h-4" />
        </button>
      </motion.form>
    </div>
  );
}
