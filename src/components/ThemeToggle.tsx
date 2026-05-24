import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "@/store/themeStore";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative transition-smooth hover:bg-accent"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ scale: theme === 'dark' ? 0 : 1, rotate: theme === 'dark' ? 180 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <Sun className="h-5 w-5" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{ scale: theme === 'dark' ? 1 : 0, rotate: theme === 'dark' ? 0 : -180 }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <Moon className="h-5 w-5" />
      </motion.div>
    </Button>
  );
};
