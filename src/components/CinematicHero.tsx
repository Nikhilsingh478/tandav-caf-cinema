import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroBg from "@/assets/cafe-hero.webp";

const CinematicHero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[640px] w-full overflow-hidden grain">
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 will-change-transform"
      >
        <img
          src={heroBg}
          alt="Tandav Café"
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-background/30" />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex h-full items-center"
      >
        <div className="w-full px-6 sm:px-10 md:px-16 lg:px-24">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mb-8 flex items-center gap-3"
            >
              <span className="font-mono text-[0.7rem] tracking-[0.15em] text-copper">
                01 — TANDAV CAFÉ
              </span>
              <span className="h-px w-12 bg-copper/40" />
              <span className="font-mono text-[0.7rem] tracking-[0.15em] text-muted-foreground">
                EST. 2024
              </span>
            </motion.div>

            <h1 className="display-xl text-cream text-balance">
              <motion.span
                initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1.2, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                Coffee,
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="block italic text-copper"
                style={{ fontVariationSettings: '"opsz" 144' }}
              >
                chaos,
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1.2, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                & calm.
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="body-lg mt-10 max-w-sm"
            >
              A neighbourhood café in the city that doesn't try too hard —
              and that's exactly why it works.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4"
            >
              <a href="#menu" className="btn-primary">
                See the menu
                <span aria-hidden>→</span>
              </a>
              <a href="#visit" className="btn-ghost">
                Find us
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        style={{ opacity: contentOpacity }}
        className="absolute bottom-8 right-6 z-10 hidden md:block"
      >
        <div className="flex items-end gap-6">
          <div className="text-right">
            <p className="label mb-1">Now brewing</p>
            <p className="font-mono text-xs text-cream/70">165 items · 20 categories</p>
          </div>
          <div className="h-12 w-px bg-border" />
          <div className="text-right">
            <p className="label mb-1">Open</p>
            <p className="font-mono text-xs text-cream/70">7am — 11pm</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        style={{ opacity: contentOpacity }}
        className="absolute bottom-8 left-6 z-10 md:left-16 lg:left-24"
      >
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="h-8 w-px bg-copper/50"
          />
          <span className="label">Scroll</span>
        </div>
      </motion.div>
    </section>
  );
};

export default CinematicHero;
