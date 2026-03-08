import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import coffeeBeans from "@/assets/coffee-beans.jpg";
import coffeeGrinding from "@/assets/coffee-grinding.jpg";
import coffeeBrewing from "@/assets/coffee-brewing.jpg";
import latteArt from "@/assets/latte-art.jpg";

const steps = [
  { num: "01", title: "The Beans", desc: "Hand-selected single-origin beans, sourced from the world's finest estates.", image: coffeeBeans },
  { num: "02", title: "The Grind", desc: "Precision ground moments before brewing to unlock peak flavor.", image: coffeeGrinding },
  { num: "03", title: "The Brew", desc: "Expertly extracted at optimal temperature and pressure.", image: coffeeBrewing },
  { num: "04", title: "The Art", desc: "Each cup finished with signature latte art — a ritual of beauty.", image: latteArt },
];

const StoryStep = ({ step, index }: { step: typeof steps[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-12 md:gap-20`}
    >
      <motion.div
        initial={{ opacity: 0, x: isEven ? -60 : 60 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 overflow-hidden rounded-2xl"
      >
        <img
          src={step.image}
          alt={step.title}
          className="w-full h-[300px] md:h-[450px] object-cover"
          loading="lazy"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 space-y-4"
      >
        <span className="text-gradient-copper font-display text-6xl md:text-8xl font-bold opacity-30">
          {step.num}
        </span>
        <h3 className="heading-md text-foreground">{step.title}</h3>
        <p className="body-lg max-w-sm">{step.desc}</p>
      </motion.div>
    </div>
  );
};

const ScrollStorySection = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="story" className="section-padding">
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 40 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-20 md:mb-32"
      >
        <p className="label-sm mb-4">The Process</p>
        <h2 className="heading-lg text-foreground">
          The Ritual of <span className="text-gradient-copper italic">Coffee</span>
        </h2>
      </motion.div>

      <div className="max-w-6xl mx-auto space-y-24 md:space-y-40">
        {steps.map((step, i) => (
          <StoryStep key={step.num} step={step} index={i} />
        ))}
      </div>
    </section>
  );
};

export default ScrollStorySection;
