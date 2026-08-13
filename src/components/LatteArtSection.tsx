import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import latteArt from "@/assets/latte-art.jpg";

const LatteArtSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Mask reveal: clip-path transitions from hidden to fully visible
  const clipProgress = useTransform(scrollYProgress, [0.1, 0.45], [100, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.25, 0.4, 0.7, 0.9], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.25, 0.4], [80, 0]);

  return (
    <section ref={ref} className="relative min-h-[140vh] flex items-center justify-center overflow-hidden">
      {/* Background number */}
      <span className="absolute bottom-10 right-4 md:right-20 text-[150px] md:text-[300px] font-display font-bold text-primary/[0.03] pointer-events-none select-none leading-none">
        04
      </span>

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
        {/* Image with mask reveal */}
        <motion.div
          style={{
            clipPath: useTransform(clipProgress, (v) => `inset(0 ${v}% 0 0)`),
          }}
          className="relative"
        >
          <div className="relative rounded-3xl overflow-hidden">
            <img
              src={latteArt}
              alt="Latte art"
              className="w-full h-[400px] md:h-[600px] object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" />
          </div>
          <div className="absolute -inset-3 border border-primary/8 rounded-[2rem] pointer-events-none" />
        </motion.div>

        {/* Text */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="space-y-6 md:space-y-8"
        >
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-px bg-primary"
          />

          <span className="label-sm text-primary block">Chapter Four</span>

          <h2 className="heading-lg text-foreground">
            The Art —{" "}
            <span className="text-gradient-copper italic">Canvas</span>
          </h2>

          <p className="body-lg max-w-md">
            Each cup is finished with a signature pour — milk meets crema 
            in a dance of precision and instinct. The surface becomes a canvas 
            where craft is made visible.
          </p>

          <blockquote className="border-l-2 border-primary/30 pl-6 py-2">
            <p className="font-display text-lg md:text-xl text-foreground/80 italic">
              "The final gesture is not decoration — it is the artist's signature."
            </p>
          </blockquote>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-px bg-gradient-to-r from-primary/30 to-transparent origin-left"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default LatteArtSection;
