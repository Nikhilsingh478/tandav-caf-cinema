import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { toast } from "sonner";

const fields = [
  { name: "name", placeholder: "Your name", type: "text", half: true },
  { name: "phone", placeholder: "Phone", type: "tel", half: true },
  { name: "guests", placeholder: "Guests", type: "number", half: true },
  { name: "date", placeholder: "Date", type: "date", half: true },
];

const ReservationSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success("Reservation requested. We'll confirm by phone.");
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="reserve" ref={ref} className="section-pad grain">
      <div className="container-wide grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5"
        >
          <p className="eyebrow mb-6">06 — Reserve</p>
          <h2 className="display-lg text-cream text-balance">
            Save your <span className="italic text-copper">corner</span>.
          </h2>
          <p className="body-lg mt-6 max-w-sm">
            Walk-ins are welcome, but the good seats go fast on weekends.
            Leave us a note and we'll hold a table.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {fields.map((field) => (
                <div key={field.name}>
                  <label className="label mb-2 block">{field.placeholder}</label>
                  <input
                    type={field.type}
                    name={field.name}
                    required
                    min={field.type === "number" ? 1 : undefined}
                    max={field.type === "number" ? 20 : undefined}
                    className="input-clean w-full"
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="label mb-2 block">Special requests</label>
              <textarea
                name="notes"
                rows={3}
                placeholder="Window seat, birthday, allergies…"
                className="input-clean w-full resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitted}
              className="btn-primary w-full justify-center sm:w-auto disabled:opacity-50"
            >
              {submitted ? "✓ Request sent" : "Request reservation"}
              {!submitted && <span aria-hidden>→</span>}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ReservationSection;
