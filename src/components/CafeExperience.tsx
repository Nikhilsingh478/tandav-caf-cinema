import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import cafeInterior from "@/assets/cafe-interior.jpg";

const CafeExperience = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 0.95]);
  const bgY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const textOpacity = useTransform(scrollYProgress, [0.15, 0.35, 0.7, 0.9], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.15, 0.35], [80, 0]);

  return (
    <section id="about" ref={ref} className="relative min-h-[120vh] flex items-center justify-center overflow-hidden">
      {/* Full-bleed background */}
      <motion.div style={{ scale: bgScale, y: bgY }} className="absolute inset-0">
        <img
          src={cafeInterior}
          alt="Tandav Café interior"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-background/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/50" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="relative z-10 text-center px-4 sm:px-6 max-w-3xl mx-auto"
      >
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="w-16 h-px bg-primary mx-auto mb-8"
        />

        <span className="label-sm text-primary mb-6 block">The Experience</span>

        <h2 className="heading-lg text-foreground mb-8">
          A Dance of{" "}
          <span className="text-gradient-copper italic">Craft</span>
        </h2>

        <p className="body-lg max-w-2xl mx-auto mb-8 text-lg md:text-xl leading-relaxed">
          Tandav Café is inspired by the ancient concept of Tandava — the cosmic dance 
          of creation and destruction. Here, coffee is not simply prepared. It is choreographed. 
          Every step, from bean selection to the final pour, is a deliberate act of artistry.
        </p>

        <p className="body-lg max-w-xl mx-auto">
          We believe that the ritual of coffee-making deserves the same reverence 
          as any great performance. Welcome to the stage.
        </p>

        {/* Stats */}
        <div className="flex items-center justify-center gap-8 md:gap-16 mt-12 md:mt-16">
          {[
            { value: "12+", label: "Origins" },
            { value: "2024", label: "Est." },
            { value: "∞", label: "Passion" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
              className="text-center"
            >
              <span className="block text-3xl md:text-4xl font-display text-primary">
                {stat.value}
              </span>
              <span className="label-sm mt-2 block">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default CafeExperience;
