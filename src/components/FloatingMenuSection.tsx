import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const drinks = [
  { name: "Signature Espresso", desc: "Bold, rich, and unapologetically intense", price: "₹280", tag: "Bestseller" },
  { name: "Vanilla Latte", desc: "Madagascar vanilla meets silky steamed milk", price: "₹350", tag: null },
  { name: "Caramel Macchiato", desc: "Layers of caramel, espresso, and velvety foam", price: "₹380", tag: "Popular" },
  { name: "Cold Brew Tonic", desc: "Sparkling tonic meets slow-steeped cold brew", price: "₹320", tag: "New" },
  { name: "Classic Cappuccino", desc: "The perfect trinity — espresso, milk, foam", price: "₹300", tag: null },
  { name: "Tiramisu Latte", desc: "Italian dessert reimagined in a cup", price: "₹400", tag: "Chef's Pick" },
];

const DrinkCard = ({ drink, index, hoveredIndex, setHoveredIndex }: {
  drink: typeof drinks[0];
  index: number;
  hoveredIndex: number | null;
  setHoveredIndex: (i: number | null) => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  const isHovered = hoveredIndex === index;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      className="relative group"
    >
      <motion.div
        animate={{
          y: isHovered ? -8 : 0,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="glass-card-premium rounded-2xl md:rounded-3xl p-6 md:p-8 h-full relative overflow-hidden transition-all duration-500"
        style={{
          borderColor: isHovered ? 'hsla(30, 65%, 47%, 0.2)' : undefined,
          boxShadow: isHovered 
            ? '0 30px 60px -15px hsla(0, 0%, 0%, 0.5), 0 0 40px -10px hsla(30, 65%, 47%, 0.15)' 
            : '0 4px 30px hsla(0, 0%, 0%, 0.3)',
        }}
      >
        {/* Animated glow */}
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-radial from-primary/10 to-transparent rounded-full" />
        </motion.div>

        {/* Shimmer sweep */}
        {isHovered && (
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: "250%", opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-primary/8 to-transparent pointer-events-none"
          />
        )}

        <div className="relative z-10">
          {/* Tag */}
          {drink.tag && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.08 }}
              className="inline-block text-[9px] tracking-[0.2em] uppercase text-primary bg-primary/10 px-3 py-1 rounded-full mb-4 font-body"
            >
              {drink.tag}
            </motion.span>
          )}

          <div className="flex items-start justify-between mb-3">
            <h3 className="font-display text-lg md:text-xl text-foreground group-hover:text-primary transition-colors duration-500">
              {drink.name}
            </h3>
            <motion.span
              animate={{ scale: isHovered ? 1.1 : 1 }}
              className="text-primary font-display text-lg md:text-xl shrink-0 ml-4"
            >
              {drink.price}
            </motion.span>
          </div>

          <p className="text-sm text-muted-foreground font-body leading-relaxed">
            {drink.desc}
          </p>

          {/* Bottom line */}
          <motion.div
            animate={{ scaleX: isHovered ? 1 : 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="h-px bg-gradient-to-r from-primary/50 via-primary/20 to-transparent mt-5 origin-left"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

const FloatingMenuSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const headerInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="menu" className="section-padding relative overflow-hidden">
      {/* Ambient background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[200px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[150px]" />
      </div>

      <div ref={ref} className="text-center mb-16 md:mb-24 relative">
        <motion.div
          initial={{ scale: 0 }}
          animate={headerInView ? { scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
          className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-6 rounded-full border border-primary/20 flex items-center justify-center"
        >
          <span className="w-2 h-2 md:w-3 md:h-3 bg-primary rounded-full" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="label-sm mb-4"
        >
          The Collection
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="heading-lg text-foreground"
        >
          Signature <span className="text-gradient-copper italic">Menu</span>
        </motion.h2>
      </div>

      {/* Cards grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 relative">
        {drinks.map((drink, i) => (
          <DrinkCard
            key={drink.name}
            drink={drink}
            index={i}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
          />
        ))}
      </div>
    </section>
  );
};

export default FloatingMenuSection;
