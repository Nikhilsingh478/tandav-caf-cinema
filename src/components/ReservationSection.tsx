import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Calendar, Clock, Users, Sparkles } from "lucide-react";

const ReservationSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success("Reservation request received! We'll confirm shortly.");
  };

  const inputFields = [
    { name: "name", placeholder: "Full Name", type: "text", icon: null },
    { name: "email", placeholder: "Email", type: "email", icon: null },
    { name: "phone", placeholder: "Phone", type: "tel", icon: null },
    { name: "guests", placeholder: "Number of Guests", type: "number", icon: Users },
    { name: "date", placeholder: "Date", type: "date", icon: Calendar },
    { name: "time", placeholder: "Time", type: "time", icon: Clock },
  ];

  return (
    <section id="reserve" className="section-padding relative overflow-hidden" ref={ref}>
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[200px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[150px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
        className="text-center mb-12 md:mb-16 relative"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
          className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-transparent flex items-center justify-center"
        >
          <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-primary" />
        </motion.div>

        <p className="label-sm mb-4">Book Your Experience</p>
        <h2 className="heading-lg text-foreground">
          Reserve a <span className="text-gradient-copper italic">Table</span>
        </h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="body-lg max-w-md mx-auto mt-4"
        >
          Secure your spot for an unforgettable coffee experience
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 1, delay: 0.3 }}
        className="max-w-2xl mx-auto relative"
      >
        {/* Form frame */}
        <div className="absolute -inset-3 md:-inset-4 border border-primary/10 rounded-[2rem] md:rounded-[2.5rem] pointer-events-none" />
        <div className="absolute -inset-6 md:-inset-8 border border-primary/5 rounded-[2.5rem] md:rounded-[3rem] pointer-events-none" />

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="glass-card-premium rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 space-y-4 md:space-y-6 relative"
        >
          {/* Subtle shimmer effect */}
          <div className="absolute inset-0 rounded-2xl md:rounded-3xl overflow-hidden pointer-events-none">
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 5 }}
              className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-primary/5 to-transparent"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {inputFields.map((field, i) => (
              <motion.div
                key={field.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                className="relative"
              >
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  required
                  min={field.type === "number" ? 1 : undefined}
                  max={field.type === "number" ? 20 : undefined}
                  onFocus={() => setFocusedField(field.name)}
                  onBlur={() => setFocusedField(null)}
                  className={`input-luxury w-full transition-all duration-500 ${
                    field.icon ? "pr-12" : ""
                  } ${focusedField === field.name ? "shadow-[0_0_30px_hsla(30,65%,47%,0.15)]" : ""}`}
                />
                {field.icon && (
                  <field.icon
                    className={`absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 transition-colors duration-300 ${
                      focusedField === field.name ? "text-primary" : "text-muted-foreground"
                    }`}
                  />
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <textarea
              placeholder="Special Requests (optional)"
              rows={3}
              onFocus={() => setFocusedField("special")}
              onBlur={() => setFocusedField(null)}
              className={`input-luxury w-full resize-none transition-all duration-500 ${
                focusedField === "special" ? "shadow-[0_0_30px_hsla(30,65%,47%,0.15)]" : ""
              }`}
            />
          </motion.div>

          <motion.button
            type="submit"
            disabled={submitted}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1 }}
            whileHover={{ scale: 1.02, boxShadow: "0 20px 50px -15px hsla(30, 65%, 47%, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary-luxury w-full disabled:opacity-50 disabled:cursor-not-allowed py-4 md:py-5"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {submitted ? (
                <>
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    ✓
                  </motion.span>
                  Request Sent
                </>
              ) : (
                <>
                  Reserve Now
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </>
              )}
            </span>
          </motion.button>

          {/* Privacy note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-center text-[10px] md:text-xs text-muted-foreground"
          >
            By reserving, you agree to our booking terms. We'll send a confirmation to your email.
          </motion.p>
        </form>
      </motion.div>
    </section>
  );
};

export default ReservationSection;
