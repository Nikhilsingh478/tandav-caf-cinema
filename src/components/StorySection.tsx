import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import coffeeBeans from "@/assets/coffee-beans.jpg";
import coffeeGrinding from "@/assets/coffee-grinding.jpg";
import coffeeBrewing from "@/assets/coffee-brewing.jpg";
import latteArt from "@/assets/latte-art.jpg";

const StorySection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0.05, 0.55], ["2%", "-68%"]);

  return (
    <section id="story" ref={ref} className="relative">
      {/* Opening: quiet typographic statement */}
      <div className="section-pad grain">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <p className="eyebrow mb-6">02 — The Ritual</p>
            <h2 className="display-lg text-cream text-balance">
              We don't just serve coffee.
              <br />
              We stage <span className="italic text-copper">a small performance</span>,
              <br />
              every single cup.
            </h2>
          </motion.div>
        </div>
      </div>

      {/* Pinned horizontal image sequence */}
      <div className="relative h-[260vh]">
        <div className="sticky top-0 h-[100svh] flex items-center overflow-hidden">
          <motion.div style={{ x }} className="flex gap-[3vw] pl-[6vw] pr-[20vw] will-change-transform">
            <figure className="relative flex-shrink-0 w-[78vw] sm:w-[60vw] md:w-[44vw] lg:w-[38vw]">
              <div className="relative h-[62vh] overflow-hidden">
                <img src={coffeeBeans} alt="Coffee beans" className="h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              </div>
              <figcaption className="mt-4 flex items-baseline justify-between">
                <span className="label">i. The Bean</span>
                <span className="font-mono text-[0.65rem] text-muted-foreground">Sourced</span>
              </figcaption>
            </figure>

            <figure className="relative flex-shrink-0 w-[78vw] sm:w-[60vw] md:w-[44vw] lg:w-[38vw]">
              <div className="relative h-[62vh] overflow-hidden">
                <img src={coffeeGrinding} alt="Grinding coffee" className="h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-background/40" />
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="display-sm text-cream text-balance">
                    Ground to the second.
                    <br />
                    <span className="italic text-copper">Nothing sits.</span>
                  </p>
                </div>
              </div>
              <figcaption className="mt-4 flex items-baseline justify-between">
                <span className="label">ii. The Grind</span>
                <span className="font-mono text-[0.65rem] text-muted-foreground">Fresh</span>
              </figcaption>
            </figure>

            <figure className="relative flex-shrink-0 w-[78vw] sm:w-[60vw] md:w-[44vw] lg:w-[38vw]">
              <div className="relative h-[62vh] overflow-hidden">
                <img src={coffeeBrewing} alt="Brewing coffee" className="h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              </div>
              <figcaption className="mt-4 flex items-baseline justify-between">
                <span className="label">iii. The Pour</span>
                <span className="font-mono text-[0.65rem] text-muted-foreground">93°C</span>
              </figcaption>
            </figure>
          </motion.div>
        </div>
      </div>

      {/* Closing: split layout, latte art + quote */}
      <div className="section-pad grain">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ opacity: 1, clipPath: "inset(0 0 0 0)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
            className="lg:col-span-7 relative"
          >
            <div className="relative h-[50vh] md:h-[65vh] overflow-hidden">
              <img src={latteArt} alt="Latte art" className="h-full w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/30" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 lg:pt-24"
          >
            <p className="eyebrow mb-6">iv. The Finish</p>
            <blockquote className="display-md text-cream text-balance">
              <span className="text-copper">"</span>
              The final pour isn't decoration.
              <br />
              It's the <span className="italic">signature</span>.
              <span className="text-copper">"</span>
            </blockquote>
            <p className="body-md mt-6 max-w-sm">
              Every cup leaves the bar with a mark — a small, deliberate gesture
              that says this one was made for you.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
