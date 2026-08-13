import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Clock, Phone } from "lucide-react";

const contactItems = [
  { icon: MapPin, label: "Address", value: "42 Artisan Lane, Connaught Place\nNew Delhi, India 110001" },
  { icon: Clock, label: "Hours", value: "Mon — Fri: 7:00 AM – 11:00 PM\nSat — Sun: 8:00 AM – 12:00 AM" },
  { icon: Phone, label: "Contact", value: "+91 98765 43210\nhello@tandavcafe.com" },
];

const LocationSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[200px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
        className="text-center mb-12 md:mb-20 relative"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
          className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-6 rounded-full border border-primary/20 flex items-center justify-center"
        >
          <MapPin className="w-5 h-5 md:w-6 md:h-6 text-primary" />
        </motion.div>

        <p className="label-sm mb-4">Find Us</p>
        <h2 className="heading-lg text-foreground">
          Visit <span className="text-gradient-copper italic">Tandav</span>
        </h2>
      </motion.div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8 relative">
        {/* Contact cards */}
        <div className="lg:col-span-2 space-y-4 md:space-y-6">
          {contactItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ x: 10 }}
              className="glass-card-premium rounded-xl md:rounded-2xl p-5 md:p-6 flex items-start gap-4 group cursor-pointer"
            >
              <motion.div
                whileHover={{ rotate: 15, scale: 1.1 }}
                className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0"
              >
                <item.icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              </motion.div>
              <div>
                <p className="label-sm mb-2 group-hover:text-primary transition-colors">{item.label}</p>
                <p className="text-foreground text-sm md:text-base whitespace-pre-line font-body leading-relaxed">
                  {item.value}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="lg:col-span-3 relative"
        >
          {/* Map frame */}
          <div className="absolute -inset-2 md:-inset-3 border border-primary/10 rounded-2xl md:rounded-3xl pointer-events-none" />
          
          <div className="rounded-xl md:rounded-2xl overflow-hidden h-[300px] sm:h-[350px] lg:h-full min-h-[300px] relative">
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
            
            {/* Map overlay gradient */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/20 via-transparent to-transparent" />
          </div>

          {/* Floating location pin */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.8, type: "spring" }}
            className="absolute top-4 right-4 glass-card-premium rounded-lg px-3 py-2 md:px-4 md:py-3"
          >
            <span className="text-xs md:text-sm text-foreground font-body">New Delhi, India</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default LocationSection;
