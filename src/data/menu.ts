export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  description?: string;
  includes?: string[];
  isAddon?: boolean;
  isCombo?: boolean;
}

export interface MenuCategory {
  id: string;
  label: string;
}

export const menuCategories: MenuCategory[] = [
  { id: "tea", label: "Tea" },
  { id: "coffee", label: "Coffee" },
  { id: "buns", label: "Buns" },
  { id: "shakes", label: "Shakes" },
  { id: "fries", label: "Fries" },
  { id: "pizza", label: "Pizza" },
  { id: "burger", label: "Burger" },
  { id: "maggie", label: "Maggie" },
  { id: "garlic-bread", label: "Garlic Bread" },
  { id: "nachos", label: "Nachos" },
  { id: "pasta", label: "Pasta" },
  { id: "cold-coffee", label: "Cold Coffee" },
  { id: "mocktails", label: "Mocktails" },
  { id: "combos", label: "Combos" },
  { id: "waffle-sandwich", label: "Waffle Sandwich" },
  { id: "bubble-waffle", label: "Bubble Waffle" },
  { id: "waffle-pop", label: "Waffle Pop" },
  { id: "mini-pancake", label: "Mini Pancake" },
  { id: "brownie", label: "Brownie" },
  { id: "add-on", label: "Add On" },
];

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const raw: Omit<MenuItem, "id">[] = [
  // 1. TEA
  { name: "Tandav Spl. Tea", price: 12, category: "tea" },
  { name: "Tandav Spl. Ginger", price: 30, category: "tea" },
  { name: "Tandav Spl. Masala Tea", price: 30, category: "tea" },
  { name: "Tandav Spl. Elaichi Tea", price: 30, category: "tea" },
  { name: "Tandav Spl. Mint Tea", price: 30, category: "tea" },
  { name: "Tandav Spl. Lemon Grass", price: 30, category: "tea" },
  { name: "Tandav Spl. Manchali", price: 30, category: "tea" },
  { name: "Tandav Spl. Badam Ukala", price: 30, category: "tea" },
  { name: "Tandav Spl. Green Tea", price: 30, category: "tea" },
  { name: "Tandav Spl. Detox Tea", price: 40, category: "tea" },
  { name: "Tandav Spl. Kawa", price: 30, category: "tea" },
  { name: "Tandav Spl. Black Lemon Tea", price: 25, category: "tea" },
  { name: "Tandav Spl. Black Lemon Pineapple", price: 30, category: "tea" },
  { name: "Tandav Spl. Lemon Ice Tea", price: 50, category: "tea" },
  { name: "Tandav Spl. Lemon Pineapple Ice Tea", price: 60, category: "tea" },

  // 2. COFFEE
  { name: "Regular Coffee", price: 30, category: "coffee" },
  { name: "Black Coffee", price: 30, category: "coffee" },
  { name: "Hot Chocolate", price: 50, category: "coffee" },
  { name: "Hazelnut Hot Coffee", price: 50, category: "coffee" },
  { name: "Irish Hot Coffee", price: 50, category: "coffee" },
  { name: "Mochaccino Hot Coffee", price: 50, category: "coffee" },
  { name: "Cappuccino", price: 50, category: "coffee" },

  // 3. BUNS
  { name: "Bun Maska", price: 25, category: "buns" },
  { name: "Bun Jam", price: 35, category: "buns" },
  { name: "Bun Italian", price: 45, category: "buns" },
  { name: "Bun Cheese", price: 45, category: "buns" },
  { name: "Bun N Schezwan", price: 45, category: "buns" },
  { name: "Bun N Nutella", price: 70, category: "buns" },

  // 4. SHAKES
  { name: "Chocolate Shake", price: 100, category: "shakes" },
  { name: "Nutella Shake", price: 130, category: "shakes" },
  { name: "Oreo Shake", price: 130, category: "shakes" },
  { name: "KitKat Shake", price: 150, category: "shakes" },

  // 5. FRIES
  { name: "Salted Fries", price: 110, category: "fries" },
  { name: "Peri-Peri Fries", price: 120, category: "fries" },
  { name: "Peri-Peri Cheese Fries", price: 150, category: "fries" },
  { name: "Cheesy Mayo Fries", price: 140, category: "fries" },
  { name: "Tandoori Fries", price: 140, category: "fries" },
  { name: "Chipotle Fries", price: 140, category: "fries" },
  { name: "Cheesy Overloaded Fries", price: 140, category: "fries" },
  { name: "Jalapeno Fries", price: 150, category: "fries" },
  { name: "Tandav Special Fries", price: 200, category: "fries" },

  // 6. PIZZA
  { name: "Veg Margherita", price: 110, category: "pizza" },
  { name: "Onion Cheese Pizza", price: 120, category: "pizza" },
  { name: "Farm House Pizza", price: 160, category: "pizza" },
  { name: "Paneer Punch Pizza", price: 180, category: "pizza" },
  { name: "Tandoori Paneer Pizza", price: 200, category: "pizza" },
  { name: "Cheese Burst Pizza", price: 200, category: "pizza" },
  { name: "Tandav Special Pizza", price: 250, category: "pizza" },

  // 7. BURGER
  { name: "Vegetable Burger", price: 60, category: "burger" },
  { name: "Cheese Vegetable Burger", price: 70, category: "burger" },
  { name: "Chipotle Burger", price: 70, category: "burger" },
  { name: "Tandoori Burger", price: 70, category: "burger" },
  { name: "Jalapeno Burger", price: 80, category: "burger" },
  { name: "Paneer Burger", price: 90, category: "burger" },
  { name: "Paneer Cheese Burger", price: 110, category: "burger" },
  { name: "Tandav Special Korean Burger", price: 140, category: "burger" },

  // 8. MAGGIE
  { name: "Plain Maggie", price: 50, category: "maggie" },
  { name: "Masala Maggie Double", price: 70, category: "maggie" },
  { name: "Schezwan Maggie", price: 80, category: "maggie" },
  { name: "Peri-Peri Maggie", price: 80, category: "maggie" },
  { name: "Cheese Burst Maggie", price: 90, category: "maggie" },
  { name: "Tandav Special Maggie", price: 120, category: "maggie" },

  // 9. GARLIC BREAD
  { name: "Plain Garlic Bread", price: 100, category: "garlic-bread" },
  { name: "Cheese Garlic Bread", price: 130, category: "garlic-bread" },
  { name: "Chilli Cheese Garlic Bread", price: 140, category: "garlic-bread" },
  { name: "Peri-Peri Cheese Garlic Bread", price: 150, category: "garlic-bread" },
  { name: "Paneer Cheese Garlic Bread", price: 160, category: "garlic-bread" },
  { name: "Tandav Special Garlic Bread", price: 200, category: "garlic-bread" },

  // 10. NACHOS
  { name: "Salsa Nachos", price: 110, category: "nachos" },
  { name: "Cheesy Nachos", price: 130, category: "nachos" },
  { name: "Salsa & Cheese Nachos", price: 150, category: "nachos" },
  { name: "Mexican Nachos", price: 170, category: "nachos" },
  { name: "Tandav Special Nachos", price: 200, category: "nachos" },

  // 11. PASTA
  { name: "Cheesy White Sauce", price: 200, category: "pasta" },
  { name: "Red Sauce Pasta", price: 220, category: "pasta" },
  { name: "Pink Sauce Pasta", price: 250, category: "pasta" },
  { name: "4 Cheese Pasta", price: 270, category: "pasta" },
  { name: "Tandav Special Pasta", price: 300, category: "pasta" },

  // 12. COLD COFFEE
  { name: "Coffee", price: 110, category: "cold-coffee" },
  { name: "Hazelnut Coffee", price: 130, category: "cold-coffee" },
  { name: "Irish Caramel Coffee", price: 130, category: "cold-coffee" },
  { name: "Mochaccino Coffee", price: 130, category: "cold-coffee" },
  { name: "Cappuccino Coffee", price: 130, category: "cold-coffee" },

  // 13. MOCKTAILS
  { name: "Virgin Mojito", price: 110, category: "mocktails" },
  { name: "Green Apple", price: 110, category: "mocktails" },
  { name: "Blueberry Mojito", price: 120, category: "mocktails" },
  { name: "Blue Lagoon", price: 120, category: "mocktails" },
  { name: "Watermelon Mojito", price: 120, category: "mocktails" },
  { name: "Chilli Guava", price: 120, category: "mocktails" },
  { name: "Spicy Mango", price: 120, category: "mocktails" },

  // 14. COMBOS
  { name: "Classic Combo", price: 249, category: "combos", isCombo: true, includes: ["Burger", "Fries", "Cold Coffee"] },
  { name: "Cheesy Delight", price: 329, category: "combos", isCombo: true, includes: ["Pizza", "Fries", "Mocktail"] },
  { name: "Italian Treat", price: 349, category: "combos", isCombo: true, includes: ["Pasta", "Nachos", "Shake"] },
  { name: "Snack & Sip", price: 199, category: "combos", isCombo: true, includes: ["Nachos", "Mocktail"] },
  { name: "Cheesy Burger Meal", price: 279, category: "combos", isCombo: true, includes: ["Burger", "Fries", "Shake"] },
  { name: "Maggie Masala Combo", price: 229, category: "combos", isCombo: true, includes: ["Maggie", "Fries", "Cold Coffee"] },
  { name: "Maggie Lovers Combo", price: 199, category: "combos", isCombo: true, includes: ["Maggie", "Shake"] },
  { name: "Spicy Maggie Snack Combo", price: 259, category: "combos", isCombo: true, includes: ["Maggie", "Nachos", "Mocktail"] },

  // 15. WAFFLE SANDWICH
  { name: "Belgium Chocolate [Milk / White]", price: 100, category: "waffle-sandwich" },
  { name: "Dark Chocolate Waffle Sandwich", price: 110, category: "waffle-sandwich" },
  { name: "Dark White Waffle Sandwich", price: 120, category: "waffle-sandwich" },
  { name: "Billionaire Waffle Sandwich", price: 120, category: "waffle-sandwich" },
  { name: "Triple Chocolate Waffle Sandwich", price: 120, category: "waffle-sandwich" },
  { name: "Five Star Waffle Sandwich", price: 160, category: "waffle-sandwich" },
  { name: "Swiss Almond Waffle Sandwich", price: 160, category: "waffle-sandwich" },
  { name: "Kit-Kat Waffle Sandwich", price: 160, category: "waffle-sandwich" },
  { name: "Lotus Biscoff Waffle Sandwich", price: 170, category: "waffle-sandwich" },
  { name: "Nutella Waffle Sandwich", price: 160, category: "waffle-sandwich" },
  { name: "Brownie Nutella Waffle Sandwich", price: 180, category: "waffle-sandwich" },
  { name: "Red Velvet Waffle Sandwich", price: 160, category: "waffle-sandwich" },
  { name: "Choco Chips & Gems Waffle Sandwich", price: 160, category: "waffle-sandwich" },
  { name: "Brownie Chocolate Waffle Sandwich", price: 160, category: "waffle-sandwich" },
  { name: "Rainbow Waffle Sandwich", price: 140, category: "waffle-sandwich" },

  // 16. BUBBLE WAFFLE
  { name: "Belgium Chocolate [Milk / White]", price: 150, category: "bubble-waffle" },
  { name: "Dark Chocolate Bubble Waffle", price: 160, category: "bubble-waffle" },
  { name: "Dark White Bubble Waffle", price: 160, category: "bubble-waffle" },
  { name: "Billionaire Bubble Waffle", price: 160, category: "bubble-waffle" },
  { name: "Triple Chocolate Bubble Waffle", price: 160, category: "bubble-waffle" },
  { name: "Five Star Bubble Waffle", price: 200, category: "bubble-waffle" },
  { name: "KitKat Bubble Waffle", price: 160, category: "bubble-waffle" },
  { name: "Swiss Almond Bubble Waffle", price: 190, category: "bubble-waffle" },
  { name: "Lotus Biscoff Bubble Waffle", price: 190, category: "bubble-waffle" },
  { name: "Nutella Bubble Waffle", price: 190, category: "bubble-waffle" },
  { name: "Brownie Nutella Bubble Waffle", price: 220, category: "bubble-waffle" },
  { name: "Red Velvet Bubble Waffle", price: 200, category: "bubble-waffle" },
  { name: "Choco Chips & Gems Bubble Waffle", price: 190, category: "bubble-waffle" },
  { name: "Brownie Chocolate Bubble Waffle", price: 200, category: "bubble-waffle" },
  { name: "Rainbow Bubble Waffle", price: 170, category: "bubble-waffle" },

  // 17. WAFFLE POP
  { name: "Belgium Chocolate [Milk / White]", price: 50, category: "waffle-pop" },
  { name: "Dark Chocolate Waffle Pop", price: 60, category: "waffle-pop" },
  { name: "Dark White Waffle Pop", price: 70, category: "waffle-pop" },
  { name: "Billionaire Waffle Pop", price: 70, category: "waffle-pop" },
  { name: "Triple Chocolate Waffle Pop", price: 70, category: "waffle-pop" },
  { name: "Five Star Waffle Pop", price: 90, category: "waffle-pop" },
  { name: "Swiss Almond Waffle Pop", price: 90, category: "waffle-pop" },
  { name: "Kit-Kat Waffle Pop", price: 90, category: "waffle-pop" },
  { name: "Lotus Biscoff Waffle Pop", price: 90, category: "waffle-pop" },
  { name: "Nutella Waffle Pop", price: 90, category: "waffle-pop" },

  // 18. MINI PANCAKE
  { name: "Belgium Chocolate [Milk / White]", price: 100, category: "mini-pancake" },
  { name: "Dark Chocolate Mini Pancake", price: 110, category: "mini-pancake" },
  { name: "Dark White Mini Pancake", price: 130, category: "mini-pancake" },
  { name: "Billionaire Mini Pancake", price: 130, category: "mini-pancake" },
  { name: "Triple Chocolate Mini Pancake", price: 140, category: "mini-pancake" },
  { name: "Five Star Mini Pancake", price: 150, category: "mini-pancake" },
  { name: "KitKat Mini Pancake", price: 160, category: "mini-pancake" },
  { name: "Swiss Almond Mini Pancake", price: 150, category: "mini-pancake" },
  { name: "Lotus Biscoff Mini Pancake", price: 170, category: "mini-pancake" },
  { name: "Nutella Mini Pancake", price: 170, category: "mini-pancake" },
  { name: "Brownie Nutella Mini Pancake", price: 170, category: "mini-pancake" },
  { name: "Red Velvet Mini Pancake", price: 170, category: "mini-pancake" },
  { name: "Choco Chips & Gems Mini Pancake", price: 170, category: "mini-pancake" },
  { name: "Brownie Chocolate Mini Pancake", price: 170, category: "mini-pancake" },
  { name: "Rainbow Mini Pancake", price: 140, category: "mini-pancake" },

  // 19. BROWNIE
  { name: "Belgium Brownie", price: 100, category: "brownie" },
  { name: "Triple Chocolate Brownie", price: 130, category: "brownie" },
  { name: "Five Star Brownie", price: 160, category: "brownie" },
  { name: "Nutella Brownie", price: 170, category: "brownie" },
  { name: "Swiss Almond Brownie", price: 150, category: "brownie" },

  // 20. ADD ON
  { name: "Vanilla Ice-Cream", price: 30, category: "add-on", isAddon: true },
  { name: "Dark Base", price: 20, category: "add-on", isAddon: true },
  { name: "Gems", price: 10, category: "add-on", isAddon: true },
  { name: "Brownie", price: 40, category: "add-on", isAddon: true },
  { name: "Choco Chips", price: 20, category: "add-on", isAddon: true },
  { name: "Belgium Chocolate", price: 30, category: "add-on", isAddon: true },
  { name: "Nutella", price: 50, category: "add-on", isAddon: true },
];

const seen = new Set<string>();
export const menu: MenuItem[] = raw.map((item, i) => {
  let id = `${item.category}-${slug(item.name)}`;
  let n = 1;
  while (seen.has(id)) {
    id = `${item.category}-${slug(item.name)}-${n++}`;
  }
  seen.add(id);
  return { ...item, id };
});

export const formatPrice = (price: number) => `₹${price}`;
