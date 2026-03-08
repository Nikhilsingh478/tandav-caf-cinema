import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const drinks = [
  { name: "Signature Espresso", desc: "Bold, rich, unmistakably smooth", price: "₹280" },
  { name: "Vanilla Latte", desc: "Velvety milk, Madagascar vanilla", price: "₹350" },
  { name: "Caramel Macchiato", desc: "Layered espresso, buttery caramel", price: "₹380" },
  { name: "Cold Brew Tonic", desc: "Sparkling tonic, citrus, cold brew", price: "₹320" },
  { name: "Classic Cappuccino", desc: "Traditional foam, perfect balance", price: "₹300" },
  { name: "Tiramisu Latte", desc: "Espresso, mascarpone, cocoa dust", price: "₹400" },
];

const MenuSection = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="menu" className="section-padding">
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 40 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 md:mb-24"
      >
        <p className="label-sm mb-4">Crafted Beverages</p>
        <h2 className="heading-lg text-foreground">
          Signature <span className="text-gradient-copper italic">Menu</span>
        </h2>
      </motion.div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {drinks.map((drink, i) => (
          <DrinkCard key={drink.name} drink={drink} index={i} />
        ))}
      </div>
    </section>
  );
};

const DrinkCard = ({ drink, index }: { drink: typeof drinks[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="glass-card rounded-2xl p-8 cursor-pointer group transition-shadow duration-500 hover:shadow-[0_20px_60px_-15px_hsla(30,65%,47%,0.15)]"
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="font-display text-xl text-foreground group-hover:text-primary transition-colors duration-300">
          {drink.name}
        </h3>
        <span className="text-gradient-copper font-display text-lg">{drink.price}</span>
      </div>
      <p className="text-sm text-muted-foreground font-body">{drink.desc}</p>
      <div className="mt-6 w-8 h-px bg-border group-hover:w-full group-hover:bg-primary transition-all duration-700" />
    </motion.div>
  );
};

export default MenuSection;
