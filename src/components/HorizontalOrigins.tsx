import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ethiopianCoffee from "@/assets/ethiopian-coffee.jpg";
import colombianCoffee from "@/assets/colombian-coffee.jpg";
import italianCoffee from "@/assets/italian-coffee.jpg";
import pouroverCoffee from "@/assets/pourover-coffee.jpg";

const origins = [
  {
    name: "Ethiopian Heritage",
    origin: "Yirgacheffe, Ethiopia",
    flavor: "Bright citrus, jasmine florals, wine-like body",
    image: ethiopianCoffee,
  },
  {
    name: "Colombian Velvet",
    origin: "Huila, Colombia",
    flavor: "Caramel sweetness, nutty undertones, smooth finish",
    image: colombianCoffee,
  },
  {
    name: "Italian Romance",
    origin: "Napoli, Italy",
    flavor: "Dark chocolate, roasted almond, bold intensity",
    image: italianCoffee,
  },
  {
    name: "Artisan Pour",
    origin: "Kyoto, Japan",
    flavor: "Delicate clarity, clean brightness, tea-like elegance",
    image: pouroverCoffee,
  },
];

const HorizontalOrigins = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section id="origins" ref={sectionRef} className="relative h-[300vh]">
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        {/* Header */}
        <div className="px-4 sm:px-6 md:px-12 lg:px-24 mb-8 md:mb-12">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="label-sm mb-3 text-primary"
          >
            World Origins
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="heading-lg text-foreground"
          >
            Coffee <span className="text-gradient-copper italic">Origins</span>
          </motion.h2>
        </div>

        {/* Horizontal scrolling cards */}
        <motion.div style={{ x }} className="flex gap-6 md:gap-8 pl-4 sm:pl-6 md:pl-12 lg:pl-24 pr-[20vw]">
          {origins.map((origin, i) => (
            <motion.div
              key={origin.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="relative flex-shrink-0 w-[75vw] sm:w-[55vw] md:w-[40vw] lg:w-[30vw] group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl md:rounded-3xl h-[50vh] md:h-[60vh]">
                <img
                  src={origin.image}
                  alt={origin.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Dark overlay that lightens on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent transition-opacity duration-500 group-hover:opacity-70" />

                {/* Content overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                  <motion.span
                    className="label-sm text-primary mb-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    {origin.origin}
                  </motion.span>

                  <h3 className="font-display text-xl md:text-3xl text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {origin.name}
                  </h3>

                  <p className="text-sm text-muted-foreground font-body opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    {origin.flavor}
                  </p>

                  <motion.div
                    className="h-px bg-gradient-to-r from-primary/40 to-transparent mt-4 origin-left"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll progress indicator */}
        <div className="px-4 sm:px-6 md:px-12 lg:px-24 mt-8 md:mt-12">
          <div className="max-w-xs h-px bg-border relative overflow-hidden">
            <motion.div
              style={{ scaleX: scrollYProgress }}
              className="absolute inset-y-0 left-0 right-0 bg-primary origin-left"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HorizontalOrigins;
