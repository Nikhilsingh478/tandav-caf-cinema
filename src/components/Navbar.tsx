import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);
  });

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

  // Magnetic CTA effect
  const handleCtaMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ctaRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 2.5;
    const y = (e.clientY - rect.top - rect.height / 2) / 2.5;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };
  const handleCtaLeave = () => {
    const el = ctaRef.current;
    if (!el) return;
    el.style.transform = "translate(0px, 0px)";
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-3 bg-background/70 backdrop-blur-2xl border-b border-border/40"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-4 sm:px-6 md:px-12 lg:px-24">
          {/* Logo */}
          <motion.a
            href="#"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="text-xl sm:text-2xl md:text-3xl tracking-wider text-foreground font-brand relative z-10"
          >
            TANDAV <span className="text-gradient-copper">CAFÉ</span>
          </motion.a>

          {/* Desktop links with sliding indicator */}
          <div
            className="hidden md:flex items-center gap-1 relative"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {navLinks.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                onMouseEnter={() => setHoveredIndex(i)}
                className="relative px-5 py-2 text-[11px] tracking-[0.22em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300 font-body"
              >
                <span className="relative z-10">{link.label}</span>
              </a>
            ))}
            {/* Sliding underline indicator */}
            <motion.div
              className="absolute bottom-0 h-[1.5px] bg-primary"
              initial={false}
              animate={{
                left: hoveredIndex === null ? "50%" : `${hoveredIndex * 20}%`,
                width: hoveredIndex === null ? "0px" : "20%",
                opacity: hoveredIndex === null ? 0 : 1,
              }}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
              style={{ marginLeft: 0 }}
            />
          </div>

          {/* Desktop CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <a
              ref={ctaRef}
              href="#reserve"
              onMouseMove={handleCtaMove}
              onMouseLeave={handleCtaLeave}
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[11px] tracking-[0.2em] uppercase font-medium border border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300 will-change-transform"
              style={{ transition: "transform 0.3s cubic-bezier(0.2,0,0.2,1), background-color 0.3s, color 0.3s" }}
            >
              Reserve
            </a>

            <motion.button
              onClick={() => setMobileOpen(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="md:hidden text-foreground p-2 relative z-10"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/95 backdrop-blur-2xl"
              onClick={() => setMobileOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ clipPath: "circle(0% at 100% 0%)" }}
              animate={{ clipPath: "circle(150% at 100% 0%)" }}
              exit={{ clipPath: "circle(0% at 100% 0%)" }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-0 bg-background/98 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-border">
                <span className="font-brand text-xl tracking-wider text-foreground">
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

              {/* Links with staggered reveal */}
              <div className="flex flex-col justify-center flex-1 gap-1 px-6 py-8">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="group flex items-baseline gap-4 py-4 border-b border-border/40"
                  >
                    <span className="text-[10px] tracking-[0.2em] text-primary/60 font-body">
                      0{i + 1}
                    </span>
                    <span className="font-display text-3xl text-foreground group-hover:text-primary transition-colors duration-300">
                      {link.label}
                    </span>
                  </motion.a>
                ))}
              </div>

              {/* Bottom CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="px-6 py-6 border-t border-border"
              >
                <a
                  href="#reserve"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary-luxury w-full justify-center"
                >
                  <span className="relative z-10">Reserve a Table</span>
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
