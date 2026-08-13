import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const details = [
  { label: "Address", lines: ["42 Artisan Lane, Connaught Place", "New Delhi, 110001"] },
  { label: "Hours", lines: ["Mon — Fri · 7am – 11pm", "Sat — Sun · 8am – 12am"] },
  { label: "Contact", lines: ["+91 98765 43210", "hello@tandavcafe.com"] },
];

const LocationSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="visit" ref={ref} className="section-pad grain">
      <div className="container-wide grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        <div className="lg:col-span-5">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="eyebrow mb-6"
          >
            05 — Visit
          </motion.p>

          <div className="space-y-8">
            {details.map((d, i) => (
              <motion.div
                key={d.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.12 }}
                className="border-t border-border pt-4"
              >
                <p className="label mb-2">{d.label}</p>
                {d.lines.map((line) => (
                  <p key={line} className="font-mono text-sm text-cream/80 leading-relaxed">
                    {line}
                  </p>
                ))}
              </motion.div>
            ))}
          </div>

          <motion.a
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            href="#reserve"
            className="btn-primary mt-10"
          >
            Reserve a table
            <span aria-hidden>→</span>
          </motion.a>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7 flex items-center"
        >
          <p className="display-lg text-cream text-balance">
            Find us in
            <br />
            the <span className="italic text-copper">old part</span> of the city.
            <br />
            Look for the smell.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default LocationSection;
