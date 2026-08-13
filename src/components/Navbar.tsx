import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Story", href: "#story" },
  { label: "Menu", href: "#menu" },
  { label: "Visit", href: "#visit" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const { scrollY } = useScroll();
  const navBackground = useTransform(
    scrollY,
    [0, 80],
    ["hsla(25, 16%, 7%, 0)", "hsla(25, 16%, 7%, 0.85)"]
  );
  const navBorder = useTransform(
    scrollY,
    [0, 80],
    ["hsla(25, 12%, 18%, 0)", "hsla(25, 12%, 18%, 0.6)"]
  );

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        style={{
          backgroundColor: navBackground,
          borderBottomColor: navBorder,
          backdropFilter: useTransform(scrollY, [0, 80], ["blur(0px)", "blur(16px)"]),
        }}
        className="fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500"
      >
        <div className="flex items-center justify-between px-6 sm:px-10 md:px-16 lg:px-24 py-4 md:py-5">
          <a href="#" className="group flex items-baseline gap-2">
            <span className="font-brand text-xl sm:text-2xl tracking-wider text-cream">
              Tandav
            </span>
            <span className="font-mono text-[0.6rem] tracking-[0.2em] text-copper uppercase opacity-0 -translate-x-2 transition-all duration-400 group-hover:opacity-100 group-hover:translate-x-0">
              Café
            </span>
          </a>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
                className="group relative font-mono text-xs tracking-[0.12em] uppercase text-muted-foreground hover:text-cream transition-colors duration-300"
              >
                <span className="mr-1.5 text-copper/40">0{i + 1}</span>
                {link.label}
              </motion.a>
            ))}
          </div>

          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2 -mr-2 text-cream"
            aria-label="Open menu"
          >
            <Menu size={20} strokeWidth={1.5} />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] md:hidden bg-background"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <span className="font-brand text-xl tracking-wider text-cream">Tandav</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 -mr-2 text-cream"
                aria-label="Close menu"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex flex-col px-6 py-10">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                  className="group flex items-baseline gap-4 py-5 border-b border-border"
                >
                  <span className="font-mono text-xs text-copper/50">0{i + 1}</span>
                  <span className="display-md text-cream group-hover:text-copper transition-colors">
                    {link.label}
                  </span>
                </motion.a>
              ))}
            </div>

            <div className="absolute bottom-8 left-6 right-6">
              <p className="label mb-2">Visit</p>
              <p className="font-mono text-xs text-cream/60 leading-relaxed">
                42 Artisan Lane, Connaught Place<br />
                New Delhi · 7am — 11pm
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
