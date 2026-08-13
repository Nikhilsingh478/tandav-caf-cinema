import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Instagram, Facebook, Twitter } from "lucide-react";

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
];

const quickLinks = ["Menu", "Our Story", "Origins", "Reserve"];

const FooterSection = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-border">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background to-transparent pointer-events-none" />

      <div className="px-4 sm:px-6 md:px-12 lg:px-24 py-12 md:py-20 relative">
        <div className="max-w-7xl mx-auto">
          {/* Top section with logo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-16"
          >
            <span className="font-brand text-3xl md:text-4xl tracking-wider text-foreground">
              TANDAV <span className="text-gradient-copper">CAFÉ</span>
            </span>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
              className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto mt-4 md:mt-6"
            />
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {/* About */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="col-span-2 md:col-span-1"
            >
              <p className="label-sm mb-4 text-foreground">About</p>
              <p className="text-sm text-muted-foreground font-body leading-relaxed mb-4 md:mb-6">
                Where every sip tells a story. Premium coffee experiences crafted with intention.
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social, i) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                    whileHover={{ scale: 1.2, color: "hsl(30 65% 47%)" }}
                    className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-primary transition-colors duration-300"
                    aria-label={social.label}
                  >
                    <social.icon size={16} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <p className="label-sm mb-4 text-foreground">Quick Links</p>
              <div className="space-y-2 md:space-y-3">
                {quickLinks.map((link, i) => (
                  <motion.a
                    key={link}
                    href={`#${link.toLowerCase().replace(" ", "-")}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                    whileHover={{ x: 5, color: "hsl(30 65% 47%)" }}
                    className="block text-sm text-muted-foreground hover:text-primary transition-all duration-300 font-body"
                  >
                    {link}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="label-sm mb-4 text-foreground">Hours</p>
              <div className="space-y-2 md:space-y-3 text-sm text-muted-foreground font-body">
                <p>Mon — Fri</p>
                <p className="text-foreground">7AM – 11PM</p>
                <p className="mt-3">Sat — Sun</p>
                <p className="text-foreground">8AM – 12AM</p>
              </div>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <p className="label-sm mb-4 text-foreground">Contact</p>
              <div className="space-y-2 md:space-y-3 text-sm text-muted-foreground font-body">
                <p>42 Artisan Lane</p>
                <p>Connaught Place</p>
                <p>New Delhi, 110001</p>
                <motion.a
                  href="mailto:hello@tandavcafe.com"
                  whileHover={{ color: "hsl(30 65% 47%)" }}
                  className="block mt-3 transition-colors duration-300"
                >
                  hello@tandavcafe.com
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Bottom bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 md:mt-16 pt-6 md:pt-8 border-t border-border"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-[10px] md:text-xs text-muted-foreground font-body order-2 sm:order-1">
                © 2024 Tandav Café. All rights reserved.
              </p>
              <div className="flex gap-4 md:gap-6 order-1 sm:order-2">
                {["Privacy", "Terms", "Cookies"].map((item) => (
                  <motion.a
                    key={item}
                    href="#"
                    whileHover={{ color: "hsl(30 65% 47%)" }}
                    className="text-[10px] md:text-xs text-muted-foreground hover:text-primary transition-colors font-body"
                  >
                    {item}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
