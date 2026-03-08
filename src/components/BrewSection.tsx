import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import coffeeBrewing from "@/assets/coffee-brewing.jpg";

const BrewSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.05, 1]);
  const imageY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const textOpacity = useTransform(scrollYProgress, [0.15, 0.35, 0.7, 0.9], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.15, 0.35], [60, 0]);

  return (
    <section ref={ref} className="relative min-h-[130vh] flex items-center justify-center overflow-hidden">
      {/* Background number */}
      <span className="absolute top-20 left-4 md:left-20 text-[150px] md:text-[300px] font-display font-bold text-primary/[0.03] pointer-events-none select-none leading-none">
        03
      </span>

      {/* Central image with zoom on scroll */}
      <motion.div
        style={{ scale: imageScale, y: imageY }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-8">
          <div className="relative rounded-3xl md:rounded-[2.5rem] overflow-hidden">
            <img
              src={coffeeBrewing}
              alt="Espresso extraction"
              className="w-full h-[50vh] md:h-[70vh] object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-background/30" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-transparent" />
          </div>
        </div>
      </motion.div>

      {/* Text overlay */}
      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="relative z-10 text-center px-4 sm:px-6 max-w-2xl mx-auto"
      >
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="w-16 h-px bg-primary mx-auto mb-6 md:mb-8"
        />

        <span className="label-sm text-primary mb-4 block">Chapter Three</span>

        <h2 className="heading-lg text-foreground mb-6 md:mb-8">
          The Brew —{" "}
          <span className="text-gradient-copper italic">Alchemy</span>
        </h2>

        <p className="body-lg max-w-lg mx-auto">
          Water meets ground at precisely 93°C. Pressure builds. Time slows. 
          What emerges is not just coffee — it is the culmination of a thousand careful decisions, 
          distilled into a single, perfect pour.
        </p>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="w-20 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent mx-auto mt-8"
        />
      </motion.div>
    </section>
  );
};

export default BrewSection;
