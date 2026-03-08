import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import cafeInterior from "@/assets/cafe-interior.jpg";

const stats = [
  { value: "12+", label: "Origins Sourced" },
  { value: "5K+", label: "Cups Daily" },
  { value: "98%", label: "Happy Guests" },
];

const OurStorySection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const textY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="about" className="section-padding overflow-hidden" ref={containerRef}>
      <div ref={ref} className="max-w-7xl mx-auto">
        {/* Section header - visible on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 lg:hidden"
        >
          <p className="label-sm mb-4">Our Story</p>
          <h2 className="heading-lg text-foreground">
            A Dance of <span className="text-gradient-copper italic">Craft</span>
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12 lg:gap-20">
          {/* Image with parallax and frame */}
          <motion.div
            initial={{ opacity: 0, x: -80, rotate: -3 }}
            animate={inView ? { opacity: 1, x: 0, rotate: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 w-full relative"
          >
            <motion.div style={{ y: imageY }} className="relative">
              {/* Decorative frame */}
              <div className="absolute -inset-3 md:-inset-4 border border-primary/10 rounded-2xl md:rounded-3xl" />
              <div className="absolute -inset-6 md:-inset-8 border border-primary/5 rounded-3xl md:rounded-[2rem]" />

              <div className="relative rounded-xl md:rounded-2xl overflow-hidden">
                <img
                  src={cafeInterior}
                  alt="Tandav Café interior"
                  className="w-full h-[300px] sm:h-[400px] lg:h-[550px] object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 glass-card-premium rounded-xl md:rounded-2xl p-4 md:p-6"
              >
                <span className="font-display text-2xl md:text-3xl text-gradient-copper">Est.</span>
                <span className="block font-display text-lg md:text-xl text-foreground">2024</span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Text content */}
          <motion.div style={{ y: textY }} className="flex-1 space-y-6 md:space-y-8 px-2 md:px-0">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <p className="label-sm mb-4">Our Story</p>
              <h2 className="heading-lg text-foreground">
                A Dance of <span className="text-gradient-copper italic">Craft</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-4 md:space-y-6"
            >
              <p className="body-lg">
                <span className="text-foreground font-medium">Tandav</span> — the cosmic dance. Inspired by the rhythm and ritual of coffee making,
                Tandav Café treats every cup as a performance. From the first crack of the roast
                to the final pour, each step is choreographed with intention.
              </p>
              <p className="body-lg">
                We believe coffee is more than a beverage — it's a moment of meditation,
                a bridge between cultures, and an art form perfected through generations
                of craft.
              </p>
            </motion.div>

            {/* Stats with staggered animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-3 gap-4 md:gap-8 pt-6 md:pt-8"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 + i * 0.15 }}
                  className="text-center lg:text-left"
                >
                  <motion.span
                    initial={{ scale: 0.5 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 1 + i * 0.15, type: "spring" }}
                    className="font-display text-2xl md:text-3xl lg:text-4xl text-gradient-copper block"
                  >
                    {stat.value}
                  </motion.span>
                  <p className="text-[10px] md:text-sm text-muted-foreground mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Decorative divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 1.2 }}
              className="h-px bg-gradient-to-r from-primary/30 via-primary/10 to-transparent origin-left"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurStorySection;
