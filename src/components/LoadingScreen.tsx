import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center"
    >
      {/* Grain overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` 
        }} 
      />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-12"
      >
        <h1 className="font-brand text-4xl md:text-5xl text-foreground tracking-wider">
          TANDAV <span className="text-gradient-copper">Café</span>
        </h1>
      </motion.div>

      {/* Coffee cup animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="relative w-16 h-16 mb-8"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border-2 border-primary/20 border-t-primary"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute inset-3 rounded-full bg-primary/10 flex items-center justify-center"
        >
          <span className="text-primary text-lg">☕</span>
        </motion.div>
      </motion.div>

      {/* Progress bar */}
      <div className="w-48 h-px bg-border relative overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(progress, 100)}%` }}
          transition={{ duration: 0.3 }}
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-primary/60"
        />
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="label-sm mt-6 text-muted-foreground"
      >
        Crafting your experience...
      </motion.p>
    </motion.div>
  );
};

export default LoadingScreen;
