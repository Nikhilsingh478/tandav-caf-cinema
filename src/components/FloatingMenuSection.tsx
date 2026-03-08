import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const drinks = [
  { name: "Signature Espresso", desc: "Bold, rich, and unapologetically intense", price: "₹280" },
  { name: "Vanilla Latte", desc: "Madagascar vanilla meets silky steamed milk", price: "₹350" },
  { name: "Caramel Macchiato", desc: "Layers of caramel, espresso, and velvety foam", price: "₹380" },
  { name: "Cold Brew Tonic", desc: "Sparkling tonic meets slow-steeped cold brew", price: "₹320" },
  { name: "Classic Cappuccino", desc: "The perfect trinity — espresso, milk, foam", price: "₹300" },
  { name: "Tiramisu Latte", desc: "Italian dessert reimagined in a cup", price: "₹400" },
];

const FloatingMenuSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const headerInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="menu" className="section-padding relative overflow-hidden">
      {/* Ambient background */}
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
          transition={{ duration: 1, delay: 0.4 }}
          className="heading-lg text-foreground"
        >
          Signature <span className="text-gradient-copper italic">Menu</span>
        </motion.h2>
      </div>

      {/* Floating glass panels */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 relative">
        {drinks.map((drink, i) => (
          <motion.div
            key={drink.name}
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.8,
              delay: i * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            whileHover={{ y: -12, scale: 1.02 }}
            className="relative group cursor-pointer"
          >
            {/* Glass panel */}
            <div className="glass-card-premium rounded-2xl md:rounded-3xl p-6 md:p-8 h-full transition-all duration-500 group-hover:border-primary/20">
              {/* Glow effect on hover */}
              <motion.div
                animate={{
                  opacity: hoveredIndex === i ? 0.15 : 0,
                  scale: hoveredIndex === i ? 1 : 0.8,
                }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-transparent pointer-events-none"
              />

              {/* Shimmer */}
              {hoveredIndex === i && (
                <motion.div
                  initial={{ x: "-100%", opacity: 0 }}
                  animate={{ x: "200%", opacity: 1 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-primary/10 to-transparent pointer-events-none"
                />
              )}

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-display text-lg md:text-xl text-foreground group-hover:text-primary transition-colors duration-300">
                    {drink.name}
                  </h3>
                  <span className="text-primary font-display text-lg md:text-xl shrink-0 ml-4">
                    {drink.price}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground font-body leading-relaxed">
                  {drink.desc}
                </p>

                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: hoveredIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                  className="h-px bg-gradient-to-r from-primary/40 to-transparent mt-5 origin-left"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FloatingMenuSection;
