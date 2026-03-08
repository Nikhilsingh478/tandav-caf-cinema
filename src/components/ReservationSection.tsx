import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { toast } from "sonner";

const ReservationSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success("Reservation request received! We'll confirm shortly.");
  };

  return (
    <section id="reserve" className="section-padding" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <p className="label-sm mb-4">Book Your Experience</p>
        <h2 className="heading-lg text-foreground">
          Reserve a <span className="text-gradient-copper italic">Table</span>
        </h2>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto glass-card rounded-3xl p-8 md:p-12 space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input type="text" placeholder="Full Name" required className="input-luxury" />
          <input type="email" placeholder="Email" required className="input-luxury" />
          <input type="tel" placeholder="Phone" required className="input-luxury" />
          <input type="number" placeholder="Guests" min={1} max={20} required className="input-luxury" />
          <input type="date" required className="input-luxury" />
          <input type="time" required className="input-luxury" />
        </div>
        <textarea
          placeholder="Special Requests (optional)"
          rows={3}
          className="input-luxury w-full resize-none"
        />
        <motion.button
          type="submit"
          disabled={submitted}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn-primary-luxury w-full disabled:opacity-50"
        >
          {submitted ? "Request Sent ✓" : "Reserve Now"}
        </motion.button>
      </motion.form>
    </section>
  );
};

export default ReservationSection;
