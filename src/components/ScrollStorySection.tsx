import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import coffeeBeans from "@/assets/coffee-beans.jpg";
import coffeeGrinding from "@/assets/coffee-grinding.jpg";
import coffeeBrewing from "@/assets/coffee-brewing.jpg";
import latteArt from "@/assets/latte-art.jpg";

const steps = [
  { num: "01", title: "The Beans", desc: "Hand-selected single-origin beans, sourced from the world's finest estates across Ethiopia, Colombia, and beyond.", image: coffeeBeans },
  { num: "02", title: "The Grind", desc: "Precision ground moments before brewing to unlock peak flavor — every granule matters in our ritual.", image: coffeeGrinding },
  { num: "03", title: "The Brew", desc: "Expertly extracted at optimal temperature and pressure, respecting the art that has been perfected over centuries.", image: coffeeBrewing },
  { num: "04", title: "The Art", desc: "Each cup finished with signature latte art — a ritual of beauty that transforms coffee into canvas.", image: latteArt },
];

const StoryStep = ({ step, index }: { step: typeof steps[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });
  const isEven = index % 2 === 0;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.95]);

  return (
    <div
      ref={ref}
      className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-8 md:gap-12 lg:gap-24`}
    >
      {/* Image with parallax */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -100 : 100, rotate: isEven ? -5 : 5 }}
        animate={isInView ? { opacity: 1, x: 0, rotate: 0 } : {}}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 w-full overflow-hidden rounded-2xl lg:rounded-3xl relative group"
      >
        <motion.div style={{ y: imageY, scale: imageScale }} className="relative">
          <img
            src={step.image}
            alt={step.title}
            className="w-full h-[280px] sm:h-[350px] md:h-[400px] lg:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
        </motion.div>
        
        {/* Floating number */}
        <motion.span
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 0.1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute -top-6 md:-top-10 -right-4 md:-right-10 text-[100px] sm:text-[150px] md:text-[200px] font-display font-bold text-primary pointer-events-none"
        >
          {step.num}
        </motion.span>
      </motion.div>

      {/* Text content */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 space-y-4 md:space-y-6 text-center lg:text-left px-4 lg:px-0"
      >
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: "60px" } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className={`h-px bg-primary mx-auto lg:mx-0 ${isEven ? "lg:ml-0" : "lg:mr-0 lg:ml-auto"}`}
        />
        
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="block label-sm text-primary"
        >
          Step {step.num}
        </motion.span>

        <h3 className="heading-md md:heading-lg text-foreground">
          {step.title}
        </h3>

        <p className="body-lg max-w-md mx-auto lg:mx-0">{step.desc}</p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className={`h-px bg-border origin-left mt-6 ${isEven ? "" : "lg:origin-right"}`}
        />
      </motion.div>
    </div>
  );
};

const ScrollStorySection = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section id="story" className="section-padding relative overflow-hidden" ref={sectionRef}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[120px]" />
      </div>

      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 60 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
        className="text-center mb-16 md:mb-24 lg:mb-32 relative"
      >
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={headerInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-6 md:mb-8 rounded-full border border-primary/20 flex items-center justify-center"
        >
          <span className="w-2 h-2 md:w-3 md:h-3 bg-primary rounded-full" />
        </motion.div>

        <p className="label-sm mb-4">The Process</p>
        
        <h2 className="heading-lg text-foreground">
          The Ritual of{" "}
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-gradient-copper italic inline-block"
          >
            Coffee
          </motion.span>
        </h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="body-lg max-w-xl mx-auto mt-4 md:mt-6"
        >
          Every cup is a journey through four sacred stages
        </motion.p>
      </motion.div>

      <div className="max-w-7xl mx-auto space-y-20 md:space-y-32 lg:space-y-48 relative">
        {steps.map((step, i) => (
          <StoryStep key={step.num} step={step} index={i} />
        ))}
      </div>
    </section>
  );
};

export default ScrollStorySection;
