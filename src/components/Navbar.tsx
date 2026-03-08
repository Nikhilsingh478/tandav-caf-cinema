import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Story", href: "#story" },
  { label: "Menu", href: "#menu" },
  { label: "Origins", href: "#origins" },
  { label: "About", href: "#about" },
  { label: "Reserve", href: "#reserve" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { scrollY } = useScroll();
  const navBackground = useTransform(
    scrollY,
    [0, 100],
    ["hsla(0, 0%, 4%, 0)", "hsla(0, 0%, 4%, 0.8)"]
  );
  const navBlur = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(20px)"]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        style={{
          backgroundColor: navBackground,
          backdropFilter: navBlur,
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "py-3 md:py-4 border-b border-border/50" : "py-4 md:py-6"
        }`}
      >
        <div className="flex items-center justify-between px-4 sm:px-6 md:px-12 lg:px-24">
          <motion.a
            href="#"
            whileHover={{ scale: 1.02 }}
            className="font-display text-lg sm:text-xl md:text-2xl tracking-wider text-foreground"
          >
            TANDAV <span className="text-gradient-copper">CAFÉ</span>
          </motion.a>

          <div className="hidden md:flex items-center gap-6 lg:gap-10">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                whileHover={{ y: -2 }}
                className="label-sm hover:text-primary transition-all duration-300 relative group"
              >
                {link.label}
                <motion.span
                  className="absolute -bottom-1 left-0 h-px bg-primary"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </div>

          <motion.button
            onClick={() => setMobileOpen(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="md:hidden text-foreground p-2"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </motion.button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/95 backdrop-blur-xl"
              onClick={() => setMobileOpen(false)}
            />

            {/* Content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-background/98 backdrop-blur-2xl border-l border-border flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-border">
                <span className="font-display text-lg tracking-wider text-foreground">
                  TANDAV <span className="text-gradient-copper">CAFÉ</span>
                </span>
                <motion.button
                  onClick={() => setMobileOpen(false)}
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  aria-label="Close menu"
                  className="p-2"
                >
                  <X size={22} className="text-foreground" />
                </motion.button>
              </div>

              <div className="flex flex-col items-start justify-center flex-1 gap-1 px-6 py-8">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + 0.1, duration: 0.5 }}
                    whileHover={{ x: 10 }}
                    className="w-full py-4 text-2xl font-display text-foreground hover:text-primary transition-colors border-b border-border/50"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>

              {/* Bottom section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="px-6 py-6 border-t border-border"
              >
                <a
                  href="#reserve"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary-luxury w-full justify-center"
                >
                  <span className="relative z-10">Reserve Table</span>
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
