import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import heroBg from "@/assets/cafe-hero.webp";

const SteamParticle = ({ delay, x }: { delay: number; x: number }) => (
  <motion.div
    initial={{ y: 0, opacity: 0 }}
    animate={{
      y: [-20, -200, -400],
      opacity: [0, 0.3, 0],
      x: [0, Math.sin(x) * 30, Math.sin(x) * 60],
    }}
    transition={{
      duration: 8 + Math.random() * 4,
      delay,
      repeat: Infinity,
      ease: "linear",
    }}
    className="absolute w-1 h-1 rounded-full bg-foreground/15 will-change-transform"
    style={{ left: `${45 + x * 3}%`, bottom: "30%" }}
  />
);
const CinematicHero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 30 });
  const bgScale = useTransform(smoothProgress, [0, 1], [1, 1.3]);
  const textY = useTransform(smoothProgress, [0, 1], [0, -200]);
  const textOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);
  const overlayOpacity = useTransform(smoothProgress, [0, 0.5], [0.55, 0.9]);

  const [particles] = useState(() =>
    Array.from({ length: 6 }, (_, i) => ({
      delay: i * 1.5,
      x: (i % 3) - 1,
    }))
  );

  return (
    <section ref={ref} className="relative h-[120vh] overflow-hidden vignette">
      {/* Parallax background */}
      <motion.div style={{ scale: bgScale }} className="absolute inset-0">
        <img
          src={heroBg}
          alt="Tandav Café exterior"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-background"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/40" />
      </motion.div>

      {/* Steam particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p, i) => (
          <SteamParticle key={i} delay={p.delay} x={p.x} />
        ))}
      </div>

      {/* Decorative lines */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-8 md:left-16 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/10 to-transparent origin-top"
      />
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-8 md:right-16 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/10 to-transparent origin-top"
      />

      {/* Main content */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 flex flex-col items-center justify-center h-screen text-center px-4 sm:px-6"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="label-sm mb-8 md:mb-12 flex items-center gap-4"
        >
          <span className="w-12 h-px bg-primary/30" />
          Est. 2024
          <span className="w-12 h-px bg-primary/30" />
        </motion.span>

        {/* Title with blur animation - no staggered letters */}
        <div className="overflow-hidden">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-medium tracking-tight leading-none text-foreground flex justify-center items-baseline font-brand">
            <motion.span
              initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              TANDAV
            </motion.span>
            <motion.span
              initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.5, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="text-gradient-copper ml-3 sm:ml-4 md:ml-6"
            >
              Café
            </motion.span>
          </h1>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 1.5 }}
          className="w-24 md:w-40 h-px bg-gradient-to-r from-transparent via-primary to-transparent my-10 md:my-14"
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <motion.a
            href="#menu"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary-luxury group"
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore Menu
              <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
            </span>
          </motion.a>
          <motion.a
            href="#reserve"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-outline-luxury"
          >
            Reserve Table
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
      >
        <motion.span
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="label-sm text-[10px]"
        >
          Begin the ritual
        </motion.span>
        <div className="w-5 h-10 rounded-full border border-foreground/15 flex justify-center">
          <motion.div
            animate={{ y: [2, 16, 2], opacity: [1, 0.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-0.5 h-2 bg-primary rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default CinematicHero;
