import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// CTRL + SHIFT + A opens the admin route from anywhere on the site.
export function useAdminShortcut() {
  const navigate = useNavigate();
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "A" || e.key === "a")) {
        e.preventDefault();
        navigate("/admin");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [navigate]);
}
