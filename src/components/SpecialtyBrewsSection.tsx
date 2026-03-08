import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import ethiopianImg from "@/assets/ethiopian-coffee.jpg";
import colombianImg from "@/assets/colombian-coffee.jpg";
import italianImg from "@/assets/italian-coffee.jpg";
import pouroverImg from "@/assets/pourover-coffee.jpg";

const brews = [
  { name: "Ethiopian Heritage", origin: "Yirgacheffe, Ethiopia", flavor: "Floral, citrus, bright acidity with a honey finish", image: ethiopianImg, accent: "from-amber-500/20" },
  { name: "Colombian Velvet", origin: "Huila, Colombia", flavor: "Caramel, walnut, silky body with chocolate undertones", image: colombianImg, accent: "from-orange-500/20" },
  { name: "Italian Romance", origin: "Naples, Italy", flavor: "Dark roast, bold, smoky with a bittersweet edge", image: italianImg, accent: "from-red-500/20" },
  { name: "Artisan Pour", origin: "Single Origin Blend", flavor: "Clean, nuanced, delicate with fruit-forward notes", image: pouroverImg, accent: "from-yellow-500/20" },
];

const SpecialtyBrewsSection = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="origins" className="section-padding relative overflow-hidden" ref={sectionRef}>
      {/* Floating background text */}
      <motion.div
        style={{ x }}
        className="absolute top-1/2 -translate-y-1/2 left-0 whitespace-nowrap pointer-events-none select-none"
      >
        <span className="text-[150px] md:text-[250px] lg:text-[350px] font-display font-bold text-foreground/[0.02] tracking-tight">
          ORIGINS
        </span>
      </motion.div>

      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 60 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-12 md:mb-20 relative"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={headerInView ? { scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
          className="w-10 h-10 md:w-14 md:h-14 mx-auto mb-6 md:mb-8 rounded-full bg-gradient-to-br from-primary/20 to-transparent flex items-center justify-center"
        >
          <span className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-primary/60" />
        </motion.div>

        <p className="label-sm mb-4">World Origins</p>
        <h2 className="heading-lg text-foreground">
          Specialty <span className="text-gradient-copper italic">Brews</span>
        </h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="body-lg max-w-lg mx-auto mt-4"
        >
          Explore the world through our curated collection of single-origin coffees
        </motion.p>
      </motion.div>

      {/* Bento-style grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 relative">
        {brews.map((brew, i) => (
          <BrewCard
            key={brew.name}
            brew={brew}
            index={i}
            isActive={activeIndex === i}
            onActivate={() => setActiveIndex(i)}
            onDeactivate={() => setActiveIndex(null)}
          />
        ))}
      </div>

      {/* Bottom decoration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="flex justify-center items-center gap-4 mt-12 md:mt-20"
      >
        <span className="w-12 md:w-24 h-px bg-gradient-to-r from-transparent to-border" />
        <span className="text-muted-foreground text-xs tracking-widest uppercase">From Bean to Cup</span>
        <span className="w-12 md:w-24 h-px bg-gradient-to-l from-transparent to-border" />
      </motion.div>
    </section>
  );
};

const BrewCard = ({
  brew,
  index,
  isActive,
  onActivate,
  onDeactivate,
}: {
  brew: typeof brews[0];
  index: number;
  isActive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={onActivate}
      onMouseLeave={onDeactivate}
      className={`group relative rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer ${
        index === 0 ? "sm:col-span-2 lg:col-span-1 lg:row-span-2 aspect-[3/4] lg:aspect-auto" : "aspect-[4/5]"
      }`}
    >
      <motion.img
        src={brew.image}
        alt={brew.name}
        animate={{ scale: isActive ? 1.15 : 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="w-full h-full object-cover"
        loading="lazy"
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-80" />
      <motion.div
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className={`absolute inset-0 bg-gradient-to-br ${brew.accent} to-transparent`}
      />

      {/* Border glow on hover */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        className="absolute inset-0 rounded-2xl md:rounded-3xl border border-primary/30 pointer-events-none"
      />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
        <motion.div
          animate={{ y: isActive ? 0 : 10, opacity: isActive ? 1 : 0.8 }}
          transition={{ duration: 0.5 }}
        >
          <motion.span
            animate={{ x: isActive ? 0 : -5 }}
            className="label-sm text-primary mb-1 md:mb-2 block"
          >
            {brew.origin}
          </motion.span>
        </motion.div>

        <h3 className="font-display text-lg md:text-xl text-foreground mb-2">{brew.name}</h3>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xs md:text-sm text-muted-foreground"
        >
          {brew.flavor}
        </motion.p>

        {/* Reveal line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isActive ? 1 : 0 }}
          transition={{ duration: 0.6 }}
          className="h-px bg-primary/50 mt-3 md:mt-4 origin-left"
        />
      </div>
    </motion.div>
  );
};

export default SpecialtyBrewsSection;
