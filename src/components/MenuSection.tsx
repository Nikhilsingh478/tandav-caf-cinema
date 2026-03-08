import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

const drinks = [
  { name: "Signature Espresso", desc: "Bold, rich, unmistakably smooth", price: "₹280", category: "espresso" },
  { name: "Vanilla Latte", desc: "Velvety milk, Madagascar vanilla", price: "₹350", category: "latte" },
  { name: "Caramel Macchiato", desc: "Layered espresso, buttery caramel", price: "₹380", category: "specialty" },
  { name: "Cold Brew Tonic", desc: "Sparkling tonic, citrus, cold brew", price: "₹320", category: "cold" },
  { name: "Classic Cappuccino", desc: "Traditional foam, perfect balance", price: "₹300", category: "espresso" },
  { name: "Tiramisu Latte", desc: "Espresso, mascarpone, cocoa dust", price: "₹400", category: "specialty" },
];

const MenuSection = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section id="menu" className="section-padding relative overflow-hidden" ref={sectionRef}>
      {/* Animated background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[200px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-coffee/10 rounded-full blur-[150px]" />
      </motion.div>

      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 60 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-12 md:mb-20 relative"
      >
        <motion.div
          initial={{ scaleX: 0 }}
          animate={headerInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="w-20 md:w-32 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-6 md:mb-8"
        />
        <p className="label-sm mb-4">Crafted Beverages</p>
        <h2 className="heading-lg text-foreground">
          Signature <span className="text-gradient-copper italic">Menu</span>
        </h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="body-lg max-w-md mx-auto mt-4"
        >
          Each drink crafted with intention and precision
        </motion.p>
      </motion.div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 relative">
        {drinks.map((drink, i) => (
          <DrinkCard
            key={drink.name}
            drink={drink}
            index={i}
            isHovered={hoveredIndex === i}
            onHover={() => setHoveredIndex(i)}
            onLeave={() => setHoveredIndex(null)}
          />
        ))}
      </div>

      {/* Decorative bottom element */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="flex justify-center mt-12 md:mt-20"
      >
        <div className="flex items-center gap-3">
          <span className="w-8 md:w-16 h-px bg-border" />
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          <span className="w-8 md:w-16 h-px bg-border" />
        </div>
      </motion.div>
    </section>
  );
};

const DrinkCard = ({
  drink,
  index,
  isHovered,
  onHover,
  onLeave,
}: {
  drink: typeof drinks[0];
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -10, transition: { duration: 0.4 } }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="glass-card-premium rounded-2xl md:rounded-3xl p-6 md:p-8 cursor-pointer group relative overflow-hidden"
    >
      {/* Hover glow effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none"
      />

      {/* Shimmer on hover */}
      <motion.div
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: isHovered ? "100%" : "-100%", opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent pointer-events-none"
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3 md:mb-4">
          <h3 className="font-display text-lg md:text-xl text-foreground group-hover:text-primary transition-colors duration-500">
            {drink.name}
          </h3>
          <motion.span
            animate={{ scale: isHovered ? 1.1 : 1 }}
            className="text-gradient-copper font-display text-base md:text-lg"
          >
            {drink.price}
          </motion.span>
        </div>
        <p className="text-xs md:text-sm text-muted-foreground font-body">{drink.desc}</p>
        
        {/* Animated line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0.15 }}
          transition={{ duration: 0.6 }}
          className="mt-4 md:mt-6 h-px bg-gradient-to-r from-primary to-transparent origin-left"
        />
      </div>
    </motion.div>
  );
};

export default MenuSection;
