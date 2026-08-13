import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Instagram, Facebook, Twitter } from "lucide-react";

const socials = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
];

const FooterSection = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-border grain">
      <div className="container-wide px-6 sm:px-10 md:px-16 lg:px-24 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="display-lg text-cream">
            Tandav <span className="italic text-copper">Café</span>
          </h2>
          <p className="label mt-4">New Delhi · Est. 2024</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="col-span-2 md:col-span-1"
          >
            <p className="label mb-4">About</p>
            <p className="body-md max-w-xs">
              A neighbourhood café for coffee, conversation, and the kind of evenings that run long.
            </p>
            <div className="flex gap-3 mt-6">
              {socials.map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  whileHover={{ y: -2 }}
                  className="text-muted-foreground hover:text-copper transition-colors"
                  aria-label={s.label}
                >
                  <s.icon size={18} strokeWidth={1.5} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="label mb-4">Explore</p>
            <div className="space-y-2.5">
              {["Story", "Menu", "Visit", "Reserve"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="block text-sm text-muted-foreground hover:text-copper transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="label mb-4">Hours</p>
            <div className="space-y-2 text-sm text-cream/70 font-mono">
              <p>Mon — Fri · 7–23</p>
              <p>Sat — Sun · 8–24</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <p className="label mb-4">Contact</p>
            <div className="space-y-2 text-sm text-cream/70 font-mono">
              <p>42 Artisan Lane</p>
              <p>Connaught Place</p>
              <a href="mailto:hello@tandavcafe.com" className="block text-copper hover:underline mt-2">
                hello@tandavcafe.com
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="label">© 2024 Tandav Café</p>
          <div className="flex gap-6">
            {["Privacy", "Terms"].map((item) => (
              <a key={item} href="#" className="label hover:text-copper transition-colors">
                {item}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterSection;
