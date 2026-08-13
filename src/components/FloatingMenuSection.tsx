import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import { Search, X, Plus, Sparkles } from "lucide-react";
import { menu, menuCategories, formatPrice, type MenuItem } from "@/data/menu";

const FloatingMenuSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const headerInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [query, setQuery] = useState<string>("");
  const [added, setAdded] = useState<Record<string, boolean>>({});

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return menu.filter((item) => {
      const catMatch = activeCategory === "all" || item.category === activeCategory;
      if (!catMatch) return false;
      if (!q) return true;
      const hay = [
        item.name,
        item.category,
        ...(item.includes ?? []),
      ].join(" ").toLowerCase();
      return hay.includes(q);
    });
  }, [activeCategory, query]);

  const handleAdd = (item: MenuItem) => {
    setAdded((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAdded((prev) => ({ ...prev, [item.id]: false }));
    }, 1500);
  };

  return (
    <section id="menu" className="section-padding relative overflow-hidden">
      {/* Ambient background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[200px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[150px]" />
      </div>

      <div ref={ref} className="text-center mb-10 md:mb-14 relative">
        <motion.div
          initial={{ scale: 0 }}
          animate={headerInView ? { scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
          className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-6 rounded-full border border-primary/20 flex items-center justify-center"
        >
          <span className="w-2 h-2 md:w-3 md:h-3 bg-primary rounded-full" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="label-sm mb-4"
        >
          The Collection
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="heading-lg text-foreground"
        >
          Signature <span className="text-gradient-copper italic">Menu</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="body-lg max-w-md mx-auto mt-4"
        >
          {menu.length} crafted offerings across {menuCategories.length} categories
        </motion.p>
      </div>

      {/* Search bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="max-w-md mx-auto mb-8 md:mb-10 relative"
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search menu, combos, categories..."
            className="input-luxury w-full pl-11 pr-11"
            aria-label="Search menu"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </motion.div>

      {/* Category tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mb-10 md:mb-14 -mx-4 sm:mx-0"
      >
        <div className="flex gap-2 overflow-x-auto px-4 sm:px-6 md:justify-center hide-scrollbar pb-2">
          <CategoryPill
            label="All"
            active={activeCategory === "all"}
            onClick={() => setActiveCategory("all")}
          />
          {menuCategories.map((cat) => (
            <CategoryPill
              key={cat.id}
              label={cat.label}
              active={activeCategory === cat.id}
              onClick={() => setActiveCategory(cat.id)}
            />
          ))}
        </div>
      </motion.div>

      {/* Results count */}
      <div className="max-w-6xl mx-auto mb-6 md:mb-8 flex items-center justify-between">
        <p className="label-sm">
          {filtered.length} {filtered.length === 1 ? "item" : "items"}
          {activeCategory !== "all" && (
            <span className="ml-2 text-primary/70">
              in {menuCategories.find((c) => c.id === activeCategory)?.label}
            </span>
          )}
        </p>
        {query && filtered.length === 0 && (
          <p className="text-sm text-muted-foreground">No matches found</p>
        )}
      </div>

      {/* Menu grid */}
      <AnimatePresence mode="wait">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-6xl mx-auto text-center py-20"
          >
            <p className="font-display text-2xl text-muted-foreground">No items match your search</p>
            <p className="body-lg mt-2">Try a different keyword or category</p>
          </motion.div>
        ) : (
          <motion.div
            key={activeCategory + query}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 relative"
          >
            {filtered.map((item, i) => (
              <MenuCard
                key={item.id}
                item={item}
                index={i}
                isAdded={!!added[item.id]}
                onAdd={() => handleAdd(item)}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const CategoryPill = ({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`flex-shrink-0 px-4 md:px-5 py-2 md:py-2.5 rounded-full text-xs md:text-sm tracking-wider uppercase transition-all duration-300 font-body border ${
      active
        ? "bg-primary text-primary-foreground border-primary"
        : "bg-transparent text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
    }`}
  >
    {label}
  </button>
);

const MenuCard = ({
  item,
  index,
  isAdded,
  onAdd,
}: {
  item: MenuItem;
  index: number;
  isAdded: boolean;
  onAdd: () => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-40px" });
  const [hovered, setHovered] = useState(false);

  const isCombo = !!item.isCombo;
  const isAddon = !!item.isAddon;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.05, 0.4),
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative group ${
        isCombo ? "sm:col-span-2 lg:col-span-3" : ""
      }`}
    >
      <motion.div
        animate={{
          y: hovered ? -6 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`relative overflow-hidden h-full ${
          isCombo
            ? "rounded-2xl md:rounded-3xl p-6 md:p-8"
            : "rounded-2xl md:rounded-3xl p-5 md:p-6"
        } ${
          isAddon
            ? "bg-primary/[0.03] border border-dashed border-primary/20"
            : "glass-card-premium"
        }`}
        style={{
          borderColor: hovered && !isAddon ? "hsla(30, 65%, 47%, 0.2)" : undefined,
          boxShadow: hovered && !isAddon
            ? "0 30px 60px -15px hsla(0, 0%, 0%, 0.5), 0 0 40px -10px hsla(30, 65%, 47%, 0.15)"
            : undefined,
        }}
      >
        {/* Shimmer sweep on hover */}
        {hovered && !isAddon && (
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: "250%", opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-primary/8 to-transparent pointer-events-none"
          />
        )}

        <div className="relative z-10">
          {/* Combo badge */}
          {isCombo && (
            <span className="inline-flex items-center gap-1.5 text-[9px] tracking-[0.2em] uppercase text-primary bg-primary/10 px-3 py-1 rounded-full mb-4 font-body">
              <Sparkles className="w-3 h-3" />
              Combo
            </span>
          )}
          {/* Add-on badge */}
          {isAddon && (
            <span className="inline-block text-[9px] tracking-[0.2em] uppercase text-primary/80 bg-primary/5 px-3 py-1 rounded-full mb-3 font-body">
              Add On
            </span>
          )}

          <div className="flex items-start justify-between gap-3 mb-2">
            <h3
              className={`font-display text-foreground group-hover:text-primary transition-colors duration-500 ${
                isCombo ? "text-xl md:text-2xl" : "text-base md:text-lg"
              }`}
            >
              {item.name}
            </h3>
            <motion.span
              animate={{ scale: hovered ? 1.08 : 1 }}
              className={`text-primary font-display shrink-0 ${
                isCombo ? "text-xl md:text-2xl" : "text-base md:text-lg"
              }`}
            >
              {formatPrice(item.price)}
            </motion.span>
          </div>

          {/* Combo includes */}
          {isCombo && item.includes && (
            <div className="mt-3 flex flex-wrap gap-2">
              {item.includes.map((inc) => (
                <span
                  key={inc}
                  className="text-xs md:text-sm text-muted-foreground font-body bg-background/40 border border-border/50 rounded-full px-3 py-1"
                >
                  {inc}
                </span>
              ))}
            </div>
          )}

          {/* Bottom line */}
          <motion.div
            animate={{ scaleX: hovered ? 1 : 0.15 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="h-px bg-gradient-to-r from-primary/50 via-primary/20 to-transparent mt-4 origin-left"
          />

          {/* Add button */}
          <button
            onClick={onAdd}
            className="mt-4 inline-flex items-center gap-2 text-xs tracking-wider uppercase text-muted-foreground hover:text-primary transition-colors font-body"
            aria-label={`Add ${item.name}`}
          >
            {isAdded ? (
              <>
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                  className="text-primary"
                >
                  ✓
                </motion.span>
                Added
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                Add
              </>
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FloatingMenuSection;
