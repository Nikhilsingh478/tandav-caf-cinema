import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import heroBg from "@/assets/hero-coffee.jpg";

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const y = useTransform(smoothProgress, [0, 1], [0, 300]);
  const opacity = useTransform(smoothProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(smoothProgress, [0, 1], [1, 1.2]);
  const textY = useTransform(smoothProgress, [0, 1], [0, -100]);

  const letterVariants = {
    hidden: { opacity: 0, y: 100, rotateX: -90 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.08,
        ease: [0.215, 0.61, 0.355, 1] as const,
      },
    }),
  };

  const titleLetters = "TANDAV".split("");

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      {/* Background with parallax */}
      <motion.div style={{ scale }} className="absolute inset-0">
        <img
          src={heroBg}
          alt="Tandav Café interior"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-background/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-transparent" />
      </motion.div>

      {/* Floating decorative elements */}
      <motion.div
        style={{ y: useTransform(smoothProgress, [0, 1], [0, 150]) }}
        className="absolute top-20 right-10 md:right-32 w-32 h-32 md:w-48 md:h-48 rounded-full border border-primary/10 float-slow"
      />
      <motion.div
        style={{ y: useTransform(smoothProgress, [0, 1], [0, 200]) }}
        className="absolute bottom-40 left-10 md:left-20 w-20 h-20 md:w-32 md:h-32 rounded-full border border-primary/5"
      />

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-6 md:mb-8"
        >
          <span className="label-sm inline-flex items-center gap-3">
            <span className="w-8 h-px bg-primary/50" />
            Est. 2024 · Premium Coffee Experience
            <span className="w-8 h-px bg-primary/50" />
          </span>
        </motion.div>

        {/* Animated title */}
        <div className="overflow-hidden mb-4 md:mb-6">
          <h1 className="heading-xl text-foreground flex justify-center perspective-1000">
            {titleLetters.map((letter, i) => (
              <motion.span
                key={i}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={letterVariants}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
          </h1>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 1.2, ease: [0.215, 0.61, 0.355, 1] }}
          className="overflow-hidden"
        >
          <h1 className="heading-xl text-gradient-copper italic font-normal">
            Café
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "120px" }}
          transition={{ duration: 1.5, delay: 1.5 }}
          className="h-px bg-gradient-to-r from-transparent via-primary to-transparent my-6 md:my-8"
        />

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="body-lg max-w-sm md:max-w-md mb-10 md:mb-14"
        >
          Where every sip tells a story.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.1 }}
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
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                className="inline-block"
              >
                →
              </motion.span>
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

      {/* Enhanced scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
      >
        <motion.span
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="label-sm text-[10px]"
        >
          Scroll to explore
        </motion.span>
        <div className="relative w-6 h-10 rounded-full border border-foreground/20 flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 bg-primary rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
