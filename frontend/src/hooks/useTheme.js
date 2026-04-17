import { useEffect, useState } from "react";

export default function useTheme() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "dark";
    setTheme(saved);

    applyTheme(saved);
  }, []);

  const applyTheme = (theme) => {
    if (theme === "light") {
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";

    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    applyTheme(newTheme);
  };

  return { theme, toggleTheme };
}