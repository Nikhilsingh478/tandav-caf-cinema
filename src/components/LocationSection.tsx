import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Clock, Phone } from "lucide-react";

const LocationSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <p className="label-sm mb-4">Find Us</p>
        <h2 className="heading-lg text-foreground">
          Visit <span className="text-gradient-copper italic">Tandav</span>
        </h2>
      </motion.div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          {[
            { icon: MapPin, label: "Address", value: "42 Artisan Lane, Connaught Place\nNew Delhi, India 110001" },
            { icon: Clock, label: "Hours", value: "Mon — Fri: 7:00 AM – 11:00 PM\nSat — Sun: 8:00 AM – 12:00 AM" },
            { icon: Phone, label: "Contact", value: "+91 98765 43210\nhello@tandavcafe.com" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              className="glass-card rounded-2xl p-6 flex items-start gap-4"
            >
              <item.icon size={20} className="text-primary mt-1 shrink-0" />
              <div>
                <p className="label-sm mb-2">{item.label}</p>
                <p className="text-foreground text-sm whitespace-pre-line font-body">{item.value}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="rounded-2xl overflow-hidden h-[400px] lg:h-full min-h-[300px]"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.6743!2d77.2167!3d28.6328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM3JzU4LjEiTiA3N8KwMTMnMDAuMSJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2)" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Tandav Café Location"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default LocationSection;
