import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import coffeeGrinding from "@/assets/coffee-grinding.jpg";

const GrindParticle = ({ i }: { i: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 0, x: 0 }}
    whileInView={{
      opacity: [0, 0.6, 0],
      y: [0, 40 + Math.random() * 80],
      x: [(Math.random() - 0.5) * 60, (Math.random() - 0.5) * 120],
    }}
    viewport={{ once: false, margin: "-20%" }}
    transition={{
      duration: 2 + Math.random() * 2,
      delay: i * 0.3,
      repeat: Infinity,
      repeatDelay: 1,
    }}
    className="absolute w-0.5 h-0.5 rounded-full bg-primary/40"
    style={{ left: `${40 + Math.random() * 20}%`, top: `${30 + Math.random() * 20}%` }}
  />
);

const GrindSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageX = useTransform(scrollYProgress, [0, 0.5], [-80, 0]);
  const textX = useTransform(scrollYProgress, [0, 0.5], [80, 0]);
  const opacity = useTransform(scrollYProgress, [0.05, 0.25, 0.75, 0.95], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden py-20 md:py-0">
      {/* Background number */}
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[200px] md:text-[400px] font-display font-bold text-primary/[0.03] pointer-events-none select-none leading-none">
        02
      </span>

      <div className="w-full px-4 sm:px-6 md:px-12 lg:px-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 lg:gap-24 items-center max-w-7xl mx-auto">
          {/* Image side */}
          <motion.div
            style={{ x: imageX, opacity }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl md:rounded-3xl">
              <img
                src={coffeeGrinding}
                alt="Coffee grinding process"
                className="w-full h-[350px] sm:h-[450px] lg:h-[600px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
            </div>

            {/* Decorative frame */}
            <div className="absolute -inset-3 md:-inset-4 border border-primary/10 rounded-3xl md:rounded-[2rem] pointer-events-none" />

            {/* Coffee particles overlay */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {Array.from({ length: 8 }).map((_, i) => (
                <GrindParticle key={i} i={i} />
              ))}
            </div>
          </motion.div>

          {/* Text side */}
          <motion.div
            style={{ x: textX, opacity }}
            className="space-y-6 md:space-y-8"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={inView ? { width: 60 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-px bg-primary"
            />

            <span className="label-sm text-primary block">Chapter Two</span>

            <h2 className="heading-lg text-foreground">
              The Grind —{" "}
              <span className="text-gradient-copper italic">Precision</span>
            </h2>

            <p className="body-lg max-w-md">
              Precision ground moments before brewing to unlock peak flavor. 
              Every granule matters — the coarseness, the consistency, the timing. 
              This is where science meets ritual.
            </p>

            <div className="flex items-center gap-6 pt-4">
              {[
                { label: "Grind Size", value: "18μm" },
                { label: "Freshness", value: "<30s" },
                { label: "Precision", value: "±0.1g" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 + i * 0.15 }}
                  className="text-center"
                >
                  <span className="block text-xl md:text-2xl font-display text-primary">{stat.value}</span>
                  <span className="label-sm mt-1 block">{stat.label}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.8 }}
              className="h-px bg-gradient-to-r from-primary/30 to-transparent origin-left"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GrindSection;
