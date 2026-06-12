import React, { useState } from "react";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import { authService } from "@/services/storageService";

export default function Admin() {
  const [authed, setAuthed] = useState(authService.isAuthed());
  if (!authed) return <AdminLogin onSuccess={() => setAuthed(true)} />;
  return <AdminDashboard />;
}
