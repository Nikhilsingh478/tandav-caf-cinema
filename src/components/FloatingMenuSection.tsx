import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { menu, menuCategories, formatPrice, type MenuItem } from "@/data/menu";

const FloatingMenuSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [activeCategory, setActiveCategory] = useState<string>("tea");
  const [query, setQuery] = useState("");

  const activeLabel = menuCategories.find((c) => c.id === activeCategory)?.label ?? "";

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return menu.filter((i) => i.category === activeCategory);
    return menu.filter((i) => {
      const hay = [i.name, i.category, ...(i.includes ?? [])].join(" ").toLowerCase();
      return hay.includes(q);
    });
  }, [activeCategory, query]);

  const grouped = useMemo(() => {
    if (query) {
      const map = new Map<string, MenuItem[]>();
      filtered.forEach((item) => {
        const arr = map.get(item.category) ?? [];
        arr.push(item);
        map.set(item.category, arr);
      });
      return Array.from(map.entries());
    }
    return [[activeCategory, filtered]] as [string, MenuItem[]][];
  }, [filtered, query, activeCategory]);

  return (
    <section id="menu" ref={ref} className="section-pad grain relative">
      <div className="container-wide">
        <div className="mb-12 md:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="eyebrow mb-4"
          >
            03 — The Menu
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="display-lg text-cream text-balance max-w-2xl"
          >
            One hundred and sixty-five
            <br />
            reasons to <span className="italic text-copper">stay a while</span>.
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative mb-8 max-w-sm"
        >
          <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the menu…"
            className="w-full bg-transparent border-0 border-b border-border pl-7 pr-8 py-2.5 text-sm text-cream placeholder:text-muted-foreground focus:outline-none focus:border-copper/50 transition-colors"
            aria-label="Search menu"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-copper transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </motion.div>

        {!query && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-10 md:mb-14 -mx-6 sm:mx-0 overflow-x-auto hide-scrollbar"
          >
            <div className="flex gap-1 px-6 sm:px-0 flex-nowrap">
              {menuCategories.map((cat) => {
                const active = cat.id === activeCategory;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`relative flex-shrink-0 px-4 py-2.5 font-mono text-[0.7rem] tracking-[0.1em] uppercase transition-colors duration-300 ${
                      active ? "text-copper" : "text-muted-foreground hover:text-cream"
                    }`}
                  >
                    {cat.label}
                    {active && (
                      <motion.div
                        layoutId="cat-underline"
                        className="absolute bottom-0 left-2 right-2 h-px bg-copper"
                        transition={{ type: "spring", stiffness: 400, damping: 35 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="body-lg py-20 text-center"
            >
              Nothing matches "{query}".
            </motion.p>
          ) : (
            <motion.div
              key={query ? "search" : activeCategory}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-16"
            >
              {grouped.map(([catId, items]) => {
                const cat = menuCategories.find((c) => c.id === catId);
                return (
                  <div key={catId}>
                    {query && (
                      <div className="mb-6 flex items-baseline gap-4 border-b border-border pb-3">
                        <span className="display-sm text-cream">{cat?.label}</span>
                        <span className="label">{items.length}</span>
                      </div>
                    )}
                    <MenuList items={items} />
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="label mt-20 pt-8 border-t border-border"
        >
          {query ? `Results for "${query}"` : `Showing ${activeLabel} · ${filtered.length} items`}
        </motion.p>
      </div>
    </section>
  );
};

const MenuList = ({ items }: { items: MenuItem[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20">
      {items.map((item, i) => (
        <MenuRow key={item.id} item={item} index={i} />
      ))}
    </div>
  );
};

const MenuRow = ({ item, index }: { item: MenuItem; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  const isCombo = !!item.isCombo;
  const isAddon = !!item.isAddon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: Math.min(index * 0.03, 0.3), ease: [0.22, 1, 0.36, 1] }}
      className={`group py-4 ${isCombo ? "md:col-span-2" : ""}`}
    >
      <div className="flex items-baseline gap-3">
        <span
          className={`text-cream transition-colors duration-300 group-hover:text-copper ${
            isCombo ? "display-sm" : "font-display text-base md:text-lg"
          }`}
        >
          {item.name}
        </span>

        {!isCombo && (
          <span className="flex-1 border-b border-dotted border-border/60 translate-y-[-3px]" aria-hidden />
        )}

        <span
          className={`font-mono text-copper flex-shrink-0 ${
            isCombo ? "text-lg" : "text-sm"
          }`}
        >
          {formatPrice(item.price)}
        </span>
      </div>

      {isCombo && item.includes && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {item.includes.map((inc, j) => (
            <span key={inc} className="flex items-center gap-2">
              <span className="font-mono text-xs text-muted-foreground">{inc}</span>
              {j < item.includes!.length - 1 && (
                <span className="text-copper/40 text-xs">+</span>
              )}
            </span>
          ))}
        </div>
      )}

      {isAddon && (
        <span className="label mt-1 block">optional extra</span>
      )}
    </motion.div>
  );
};

export default FloatingMenuSection;
