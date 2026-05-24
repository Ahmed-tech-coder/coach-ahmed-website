import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ScrollToTopButton = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 50 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed bottom-10 right-10 z-[999]"
        >
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.15, y: -4 }}
            whileTap={{ scale: 0.9 }}
            className="
              relative p-2 lg:p-5 rounded-full
              backdrop-blur-2xl
              bg-[hsl(var(--background)/0.55)]
              shadow-[0_0_25px_hsl(var(--primary)/0.25)]
              border border-[hsl(var(--primary)/0.5)]
              transition-smooth
            "
          >
            {/* Outer Pulse Ring */}
            <span
              className="
                absolute inset-0 rounded-full
                border-2 border-[hsl(var(--primary)/0.3)]
                animate-ping
              "
            ></span>

            {/* Neon Edge Ring */}
            <span
              className="
                absolute inset-0 rounded-full 
                bg-[hsl(var(--primary)/0.15)]
                blur-md opacity-70
              "
            ></span>

            {/* Inner Glow */}
            <span
              className="
                absolute inset-0 rounded-full 
                shadow-[inset_0_0_18px_hsl(var(--primary)/0.45)]
              "
            ></span>

            {/* Arrow Icon */}
            <ArrowUp
              className="relative z-10 w-6 h-6 text-[hsl(var(--primary))]"
              strokeWidth={2.8}
            />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTopButton;
