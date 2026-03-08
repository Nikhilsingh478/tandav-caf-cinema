import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import cafeInterior from "@/assets/cafe-interior.jpg";

const OurStorySection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding" ref={ref}>
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 rounded-2xl overflow-hidden"
        >
          <img
            src={cafeInterior}
            alt="Tandav Café interior"
            className="w-full h-[400px] lg:h-[550px] object-cover"
            loading="lazy"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 space-y-6"
        >
          <p className="label-sm">Our Story</p>
          <h2 className="heading-lg text-foreground">
            A Dance of <span className="text-gradient-copper italic">Craft</span>
          </h2>
          <p className="body-lg">
            Tandav — the cosmic dance. Inspired by the rhythm and ritual of coffee making,
            Tandav Café treats every cup as a performance. From the first crack of the roast
            to the final pour, each step is choreographed with intention.
          </p>
          <p className="body-lg">
            We believe coffee is more than a beverage — it's a moment of meditation,
            a bridge between cultures, and an art form perfected through generations
            of craft.
          </p>
          <div className="flex gap-12 pt-4">
            <div>
              <span className="font-display text-3xl text-gradient-copper">12+</span>
              <p className="text-sm text-muted-foreground mt-1">Origins Sourced</p>
            </div>
            <div>
              <span className="font-display text-3xl text-gradient-copper">5K+</span>
              <p className="text-sm text-muted-foreground mt-1">Cups Daily</p>
            </div>
            <div>
              <span className="font-display text-3xl text-gradient-copper">98%</span>
              <p className="text-sm text-muted-foreground mt-1">Happy Guests</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OurStorySection;
