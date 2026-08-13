import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import coffeeBeans from "@/assets/coffee-beans.jpg";

const BeanSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 0.95]);
  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const textY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]);
  const numberX = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <section ref={ref} id="story" className="relative min-h-[120vh] flex items-center overflow-hidden">
      {/* Full-screen background image with parallax */}
      <motion.div style={{ scale: imageScale, y: imageY }} className="absolute inset-0">
        <img
          src={coffeeBeans}
          alt="Coffee beans close-up"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-background/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
      </motion.div>

      {/* Floating section number */}
      <motion.span
        style={{ x: numberX }}
        className="absolute top-10 md:top-20 right-4 md:right-20 text-[120px] md:text-[250px] font-display font-bold text-primary/[0.04] pointer-events-none select-none leading-none"
      >
        01
      </motion.span>

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 px-4 sm:px-6 md:px-12 lg:px-24 max-w-3xl"
      >
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 80 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="h-px bg-primary mb-8"
        />

        <span className="label-sm text-primary mb-4 block">Chapter One</span>

        <h2 className="heading-lg text-foreground mb-6 md:mb-8">
          The Beginning —{" "}
          <span className="text-gradient-copper italic">The Bean</span>
        </h2>

        <p className="body-lg max-w-xl mb-8">
          Hand-selected single-origin beans from the world's most revered highlands. 
          Each bean carries the story of its soil, its climate, its people — 
          a narrative that begins long before the first sip.
        </p>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="h-px bg-gradient-to-r from-primary/30 to-transparent max-w-sm origin-left"
        />
      </motion.div>
    </section>
  );
};

export default BeanSection;
