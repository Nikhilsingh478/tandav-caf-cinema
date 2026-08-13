import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import cafeInterior from "@/assets/cafe-interior.jpg";

const CafeExperience = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 0.98]);
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const textOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.7, 0.9], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative h-[90vh] min-h-[500px] w-full overflow-hidden grain">
      <motion.div style={{ scale, y }} className="absolute inset-0 will-change-transform">
        <img
          src={cafeInterior}
          alt="Inside Tandav Café"
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-background/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
      </motion.div>

      <motion.div
        style={{ opacity: textOpacity }}
        className="relative z-10 flex h-full items-center justify-center px-6"
      >
        <div className="max-w-2xl text-center">
          <p className="eyebrow mb-6">04 — The Room</p>
          <p className="display-md text-cream text-balance">
            Come for the coffee.
            <br />
            Stay because <span className="italic text-copper">it feels right</span>.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default CafeExperience;
