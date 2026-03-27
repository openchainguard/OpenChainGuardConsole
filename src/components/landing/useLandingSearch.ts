import { useCallback, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export function useLandingSearch() {
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const goToSection = useCallback(
    (id: string) => {
      setSearchOpen(false);
      const scroll = () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      if (location.pathname === "/") {
        window.history.replaceState(null, "", `#${id}`);
        scroll();
      } else {
        navigate(`/#${id}`);
        window.setTimeout(scroll, 100);
      }
    },
    [location.pathname, navigate],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return { searchOpen, setSearchOpen, goToSection, navigate };
}
