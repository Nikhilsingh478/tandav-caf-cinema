import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ethiopianImg from "@/assets/ethiopian-coffee.jpg";
import colombianImg from "@/assets/colombian-coffee.jpg";
import italianImg from "@/assets/italian-coffee.jpg";
import pouroverImg from "@/assets/pourover-coffee.jpg";

const brews = [
  { name: "Ethiopian Heritage", origin: "Yirgacheffe, Ethiopia", flavor: "Floral, citrus, bright acidity with a honey finish", image: ethiopianImg },
  { name: "Colombian Velvet", origin: "Huila, Colombia", flavor: "Caramel, walnut, silky body with chocolate undertones", image: colombianImg },
  { name: "Italian Romance", origin: "Naples, Italy", flavor: "Dark roast, bold, smoky with a bittersweet edge", image: italianImg },
  { name: "Artisan Pour", origin: "Single Origin Blend", flavor: "Clean, nuanced, delicate with fruit-forward notes", image: pouroverImg },
];

const SpecialtyBrewsSection = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="origins" className="section-padding">
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 40 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 md:mb-24"
      >
        <p className="label-sm mb-4">World Origins</p>
        <h2 className="heading-lg text-foreground">
          Specialty <span className="text-gradient-copper italic">Brews</span>
        </h2>
      </motion.div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {brews.map((brew, i) => (
          <BrewCard key={brew.name} brew={brew} index={i} />
        ))}
      </div>
    </section>
  );
};

const BrewCard = ({ brew, index }: { brew: typeof brews[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative rounded-2xl overflow-hidden cursor-pointer aspect-[3/4]"
    >
      <img
        src={brew.image}
        alt={brew.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

      <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        <p className="label-sm mb-2 text-primary">{brew.origin}</p>
        <h3 className="font-display text-xl text-foreground mb-2">{brew.name}</h3>
        <p className="text-sm text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          {brew.flavor}
        </p>
      </div>
    </motion.div>
  );
};

export default SpecialtyBrewsSection;
