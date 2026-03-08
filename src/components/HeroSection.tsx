import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroBg from "@/assets/hero-coffee.jpg";

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      {/* Background */}
      <motion.div style={{ scale }} className="absolute inset-0">
        <img
          src={heroBg}
          alt="Tandav Café interior"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-background/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="label-sm mb-6"
        >
          Est. 2024 · Premium Coffee Experience
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="heading-xl text-foreground mb-6"
        >
          TANDAV{" "}
          <span className="text-gradient-copper italic">Café</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="body-lg max-w-md mb-12"
        >
          Where every sip tells a story.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a href="#menu" className="btn-primary-luxury">
            Explore Menu
          </a>
          <a href="#reserve" className="btn-outline-luxury">
            Reserve Table
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="label-sm text-xs">Scroll</span>
        <div className="w-px h-8 bg-foreground/30 relative overflow-hidden">
          <div className="w-full h-3 bg-primary animate-scroll-hint" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
