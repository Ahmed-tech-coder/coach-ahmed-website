import { useState, useEffect } from "react";
import { Menu, X, LogOut, ChevronDown, User, Home, ShoppingBag, Briefcase, MessageSquare } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const navItems = [
  { label: "الرئيسية", href: "#hero", icon: Home },
  { label: "المنتجات", href: "/products", icon: ShoppingBag },
  { label: "الخدمات", href: "#services", icon: Briefcase },
  { label: "تواصل معنا", href: "#contact", icon: MessageSquare },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // منع التمرير عند فتح القائمة في الموبايل
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const handleNavigation = (href: string) => {
    setIsOpen(false);
    if (href.startsWith("/")) {
      navigate(href);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/");
        setTimeout(() => {
          document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${scrolled
            ? "bg-background/80 backdrop-blur-xl border-b py-2 shadow-lg"
            : "bg-transparent py-5"
          }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16 ">

            {/* Logo Section */}
            <motion.div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => navigate("/")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex flex-col leading-tight text-right hidden sm:flex">
                <span className="text-lg md:text-xl font-extrabold dark:text-white">
                  Coach <span className="text-primary font-black">Ahmed</span> Ramadan
                </span>
                <span className="text-[10px] text-muted-foreground uppercase opacity-80">
                  Fitness & Nutrition Expert
                </span>
              </div>
              <div className={`relative flex-shrink-0 transition-all duration-300 ${scrolled ? 'w-10 h-10' : 'w-12 h-12'}`}>
                <AnimatePresence>
                  {!logoLoaded && (
                    <motion.div exit={{ opacity: 0 }} className="absolute inset-0 bg-muted rounded-full animate-pulse z-10" />
                  )}
                </AnimatePresence>
                <img
                  src="/logo.jpeg"
                  alt="Logo"
                  onLoad={() => setLogoLoaded(true)}
                  className={`w-full h-full rounded-full object-cover border-2 transition-colors duration-300 ${scrolled ? 'border-border/50' : 'border-white/20'
                    } ${logoLoaded ? 'opacity-100' : 'opacity-0'}`}
                />
              </div>
            </motion.div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-1 bg-muted/40 p-1 rounded-full border border-border/40">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavigation(item.href)}
                  className="px-5 py-2 text-sm font-semibold hover:text-primary transition-all rounded-full hover:bg-background active:scale-95"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Desktop Actions / Mobile Toggle */}
            <div className="flex items-center gap-2 md:gap-4 flex-row-reverse">
              <div className="hidden md:block">
                <ThemeToggle />
              </div>

              {!user ? (
                <Button
                  onClick={() => navigate("/login")}
                  className="hidden md:flex rounded-full px-6 font-bold shadow-md active:scale-95"
                >
                  تسجيل الدخول
                </Button>
              ) : (
                <div className="relative hidden md:block">
                  <button
                    onClick={() => setOpenDropdown(!openDropdown)}
                    className="flex items-center gap-3 p-1 pr-4 bg-muted/60 rounded-full hover:bg-muted transition-all border border-border/50"
                  >
                    <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown ? 'rotate-180' : ''}`} />
                    <span className="text-sm font-semibold">{user.full_name.split(' ')[0]}</span>
                    <div className="w-9 h-9 rounded-full bg-primary text-black flex items-center justify-center font-black">
                      {user.full_name.charAt(0).toUpperCase()}
                    </div>
                  </button>
                  {/* Dropdown Menu (Desktop Only) */}
                  <AnimatePresence>
                    {openDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute left-0 mt-3 w-48 bg-popover border rounded-2xl shadow-xl p-2 z-50"
                      >
                        <button
                          onClick={() => { logout(); setOpenDropdown(false); toast.success("تم تسجيل الخروج"); }}
                          className="w-full flex items-center justify-between px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl"
                        >
                          <span>تسجيل الخروج</span>
                          <LogOut className="w-4 h-4" />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center gap-2">
                <ThemeToggle />
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)} className="rounded-full">
                  <Menu className="h-6 w-6" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden"
            />

            {/* Sidebar Content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-xs bg-background z-[70] md:hidden shadow-2xl flex flex-col"
            >
              <div className="p-6 flex items-center justify-between border-b">
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="rounded-full">
                  <X className="h-6 w-6" />
                </Button>
                <span className="font-bold text-lg">القائمة</span>
              </div>

              <div className="flex-1 overflow-y-auto py-6 px-4">
                <div className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => handleNavigation(item.href)}
                      className="flex items-center justify-end gap-4 p-4 text-xl font-bold rounded-2xl hover:bg-muted transition-colors text-right"
                    >
                      <span>{item.label}</span>
                      <item.icon className="w-6 h-6 text-primary" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6 border-t bg-muted/30">
                {!user ? (
                  <Button onClick={() => { navigate("/login"); setIsOpen(false); }} className="w-full py-6 text-lg rounded-xl font-bold">
                    تسجيل الدخول
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-end gap-3">
                      <div className="text-right">
                        <p className="font-bold">{user.full_name}</p>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-primary text-black flex items-center justify-center font-black text-xl">
                        {user.full_name.charAt(0).toUpperCase()}
                      </div>
                    </div>
                    <Button
                      variant="destructive"
                      onClick={() => { logout(); setIsOpen(false); }}
                      className="w-full rounded-xl py-6 font-bold"
                    >
                      تسجيل الخروج
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};