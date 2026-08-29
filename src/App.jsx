import React, { useEffect, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform
} from 'framer-motion';
import { ShoppingCart, MapPin, Plus, Minus, Trash2, Send, Clock, Sparkles, Check, ChevronRight, Star, Navigation, X } from 'lucide-react';

const fullMenuData = [
  {
    category: "Appetizers & Starters",
    items: [
      { id: "app-1", name: "Broadway Special Fries", price: 550, desc: "Fries, Mushroom, Olives, Jalapeño, BBQ Sauce", badge: "Bestseller", image: "https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=400&q=80" },
      { id: "app-2", name: "Broadway Crispy Chicken Fries", price: 600, desc: "Fries, Crispy Chicken, Jalapeño, Olive, House Sauce", image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=400&q=80" },
      { id: "app-3", name: "Loaded Cheese Fries", price: 500, desc: "Golden Fries, Shredded Chicken, Melted Cheese, Jalapeño", image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=400&q=80" },
      { id: "app-4", name: "Tender Fries", price: 450, desc: "Tender Chicken Strips, Iceberg Lettuce, Jalapeño, Creamy Sauce", image: "https://images.unsplash.com/photo-1623238913973-21e45cced554?auto=format&fit=crop&w=400&q=80" },
      { id: "app-5", name: "Simple Salted Fries", price: 250, desc: "Classic Crispy Golden Cut Potato Fries", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=400&q=80" },
      { id: "app-6", name: "Spicy Masala Fries", price: 250, desc: "Crispy Fries Tossed in House Peri-Masala Blend", image: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=400&q=80" },
      { id: "app-7", name: "Crispy Wings (6pcs)", price: 350, desc: "Golden Fried Whole Wings with Garlic Dip", image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=400&q=80" },
      { id: "app-8", name: "Honey Glazed Wings (6pcs)", price: 400, desc: "Sweet & Spicy Sticky Glazed Chicken Wings", badge: "Hot", image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=400&q=80" },
      { id: "app-9", name: "Honey B.B.Q Wings (6pcs)", price: 400, desc: "Smoky BBQ Glaze with Honey Drizzle", image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=400&q=80" },
      { id: "app-10", name: "Chicken Strips (6pcs)", price: 400, desc: "Juicy Boneless Tender Strips with Dip", image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=400&q=80" },
      { id: "app-11", name: "Chicken Nuggets (6pcs)", price: 350, desc: "Crispy Golden Chicken Nuggets", image: "https://images.unsplash.com/photo-1562967916-eb82221dfb92?auto=format&fit=crop&w=400&q=80" }
    ]
  },
  {
    category: "Gourmet Burgers",
    items: [
      { id: "burg-1", name: "Zinger Burger", price: 450, desc: "Crispy Fried Chicken Fillet, Iceberg, Mayo Sauce", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80" },
      { id: "burg-2", name: "Zinger Double Decker", price: 800, desc: "Double Crispy Patty, Double Cheese, Signature Dressing", badge: "Heavy Meal", image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=400&q=80" },
      { id: "burg-3", name: "Broadway Special Burger", price: 650, desc: "Grilled Patty, Cheese Slice, Jalapeño, Caramelized Onions", badge: "Chef Choice", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80" },
      { id: "burg-4", name: "Honey Glazed Chicken Burger", price: 600, desc: "Glazed Chicken Patty, Pickles, Iceberg, Sweet Mustard Sauce", image: "https://images.unsplash.com/photo-1610614819513-58e34989848b?auto=format&fit=crop&w=400&q=80" },
      { id: "burg-5", name: "Beef Smash Burger (Single)", price: 650, desc: "Pure Beef Smash Patty, Cheddar Cheese, House Burger Sauce", image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=400&q=80" },
      { id: "burg-6", name: "Beef Smash Burger (Double)", price: 800, desc: "Double Beef Smash Patty, Double Cheddar, Pickles", badge: "Top Beef", image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=400&q=80" },
      { id: "burg-7", name: "Jalapeño Beef Burger", price: 700, desc: "Spicy Beef Patty, Flame Roasted Jalapeños, Hot Lava Sauce", image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=400&q=80" },
      { id: "burg-8", name: "Pizza Burger", price: 450, desc: "Mozzarella Stuffed Patty, Pizza Sauce, Olives & Mushrooms", image: "https://images.unsplash.com/photo-1534790566855-4cb788d389ec?auto=format&fit=crop&w=400&q=80" },
      { id: "burg-9", name: "Classic Patty Burger", price: 350, desc: "Juicy Chicken Patty, Salad & Mayo", image: "https://images.unsplash.com/photo-1512152272829-e3139592d56f?auto=format&fit=crop&w=400&q=80" }
    ]
  },
  {
    category: "Sandwiches & Rolls",
    items: [
      { id: "sp-1", name: "Broadway Special Sandwich", price: 500, desc: "Club Layers, Smoked Chicken, Egg, Cheese Slice", badge: "Top Order", image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=400&q=80" },
      { id: "sp-2", name: "Pizza Lava Sandwich", price: 450, desc: "Loaded Stuffed Pizza Sandwich with Molten Cheese", image: "https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&w=400&q=80" },
      { id: "sp-3", name: "Chicken Parmesan Sandwich", price: 500, desc: "Parmesan Crusted Fillet, Marinara Sauce, Melted Cheese", image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=400&q=80" },
      { id: "sp-4", name: "Pesto Chicken Panini", price: 450, desc: "Toasted Panini, Basil Pesto, Grilled Chicken, Cheese", image: "https://images.unsplash.com/photo-1539252554453-80ab65ce3586?auto=format&fit=crop&w=400&q=80" },
      { id: "sp-5", name: "B.B.Q Chicken Panini", price: 400, desc: "Smoky BBQ Chicken, Peppers, Melted Cheddar Panini", image: "https://images.unsplash.com/photo-1521305916504-4a1121188589?auto=format&fit=crop&w=400&q=80" },
      { id: "sp-6", name: "Chicken Paratha Roll", price: 450, desc: "Crispy Paratha, Charcoal Grilled Chicken, Green Chutney", image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=400&q=80" },
      { id: "sp-7", name: "Malai Boti Paratha Roll", price: 450, desc: "Creamy Malai Boti Chunks, Garlic Mayo, Onion Rings", image: "https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=400&q=80" },
      { id: "sp-8", name: "Zinger Paratha Roll", price: 480, desc: "Crispy Zinger Strips, Spicy Mayo in Golden Paratha", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=400&q=80" }
    ]
  },
  {
    category: "Pastas & Chinese",
    items: [
      { id: "pc-1", name: "Alfredo White Sauce Pasta", price: 750, desc: "Fettuccine, Creamy Parmesan Alfredo Sauce, Grilled Chicken", badge: "Popular", image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=400&q=80" },
      { id: "pc-2", name: "Mac n Cheese Pasta", price: 750, desc: "Baked Elbow Macaroni in Rich Cheesy Cream", image: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=400&q=80" },
      { id: "pc-3", name: "Pesto Chicken Cheese Pasta", price: 700, desc: "Penne Pasta, Herb Pesto Cream, Grilled Chicken Chunks", image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=400&q=80" },
      { id: "pc-4", name: "Baked Chicken Lasagna", price: 750, desc: "Layered Pasta Sheet, Minced Chicken, Marinara, Baked Cheese", badge: "Must Try", image: "https://images.unsplash.com/photo-1619895092538-128341789043?auto=format&fit=crop&w=400&q=80" },
      { id: "pc-5", name: "Chicken Chilli Dry + Rice", price: 950, desc: "Wok-Tossed Spicy Green Chilli Chicken with Egg Fried Rice", image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=400&q=80" },
      { id: "pc-6", name: "Chicken Cashew Nut + Rice", price: 950, desc: "Stir Fry Chicken, Roasted Cashew Nuts, Seasoned Rice", image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=400&q=80" },
      { id: "pc-7", name: "Chicken Manchurian + Rice", price: 950, desc: "Classic Red Manchurian Gravy with Fried Rice", image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=400&q=80" },
      { id: "pc-8", name: "Chicken Chow Mein", price: 800, desc: "Stir-Fried Noodles, Shredded Vegetables, Tender Chicken", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=400&q=80" }
    ]
  },
  {
    category: "Exclusive Combos",
    items: [
      { id: "dl-1", name: "Combo Deal 1", price: 1200, desc: "Lava Sandwich + Zinger Burger + Masala Fries + 1L Drink", badge: "Save Rs. 200", image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=400&q=80" },
      { id: "dl-2", name: "Combo Deal 2", price: 1450, desc: "2x Zinger Burgers + Loaded Chicken Fries + 2x Drinks (300ml)", image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f6?auto=format&fit=crop&w=400&q=80" },
      { id: "dl-3", name: "Combo Deal 3", price: 1250, desc: "2x Chicken Wraps + 6pc Honey Wings + 1L Drink", image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=400&q=80" },
      { id: "dl-4", name: "Combo Deal 4", price: 1100, desc: "1x Zinger + 1x Paratha Roll + Simple Fries + 1L Drink", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80" },
      { id: "dl-5", name: "Combo Deal 5", price: 1950, desc: "3x Zingers + 6pc Wings + Simple Fries + 1L Drink", badge: "Family Pick", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80" },
      { id: "dl-6", name: "Combo Deal 6", price: 2500, desc: "4x Zingers + 6pc Wings + Masala Fries + 1.5L Drink", badge: "Mega Deal", image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80" }
    ]
  }
];

const customerReviews = [
  { id: 1, name: "Hamza Khan", rating: 5, comment: "Best Zinger Double Decker in Kohat! Super crispy and served hot." },
  { id: 2, name: "Dr. Ayesha", rating: 5, comment: "The Alfredo Pasta quality is top notch. Clean packaging & super fast delivery." },
  { id: 3, name: "Saad Malik", rating: 5, comment: "Broadway special fries are addicted! 10/10 recommendation." }
];

const formatPKR = (n) => `Rs. ${n.toLocaleString('en-US')}`;

const heroContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } }
};
const heroItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
};


const revealUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
  }
};

const revealScale = {
  hidden: { opacity: 0, scale: 0.96, y: 18 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  }
};

function Reveal({ children, className = "", delay = 0, amount = 0.18, once = true }) {
  return (
    <motion.div
      className={className}
      variants={revealUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

function WordLoop({ words, interval = 2200 }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % words.length);
    }, interval);

    return () => window.clearInterval(timer);
  }, [words, interval]);

  return (
    <span className="relative inline-flex min-w-[9ch] justify-center overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: "100%", opacity: 0, filter: "blur(8px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-100%", opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    mass: 0.18
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[70] bg-[var(--gold-500)]"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}

export default function App() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, reduceMotion ? 0 : 70]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, reduceMotion ? 1 : 0.72]);

  const [activeCategory, setActiveCategory] = useState("Appetizers & Starters");
  const [heroWordSet] = useState(["CRAVING", "FLAVOR", "CRISPY", "HUNGRY"]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [addedNotice, setAddedNotice] = useState(null);

  const addToCart = (item) => {
    const existing = cart.find(i => i.id === item.id);
    if (existing) {
      setCart(cart.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
    setAddedNotice(item.name);
    setTimeout(() => setAddedNotice(null), 1500);
  };

  const removeFromCart = (id) => setCart(cart.filter(item => item.id !== id));

  const updateQuantity = (id, delta) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : item;
      }
      return item;
    }));
  };

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const cartCount = cart.reduce((a, c) => a + c.qty, 0);

  const sendWhatsAppOrder = () => {
    if (cart.length === 0) return;
    let text = `*NEW WEBSITE ORDER - BROADWAY EATERY*\n\n`;
    if (customerName) text += `*Customer Name:* ${customerName}\n`;
    if (customerAddress) text += `*Delivery Address:* ${customerAddress}\n\n`;
    text += `*Ordered Items:*\n`;
    cart.forEach(item => {
      text += `• ${item.name} (x${item.qty}) - Rs. ${item.price * item.qty}\n`;
    });
    text += `\n*Total Bill Amount:* Rs. ${totalAmount}\n`;
    text += `\nPlease confirm order preparation & delivery status.`;
    window.open(`https://wa.me/923235356087?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[var(--cream-50)] text-[var(--ink-900)] font-body pb-28 selection:bg-[var(--gold-500)] selection:text-[var(--emerald-900)]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700;800;900&display=swap');

        :root {
          --emerald-950: #082019;
          --emerald-900: #0d382c;
          --emerald-800: #144c3b;
          --gold-500: #f1b811;
          --gold-300: #f6cf5c;
          --gold-100: #fdecc0;
          --cream-50: #faf6ee;
          --paper: #ffffff;
          --ink-900: #16241f;
          --ink-500: #66756c;
          --line: #e6e0d1;
        }

        html {
          scroll-behavior: smooth;
          scroll-padding-top: 96px;
        }

        body {
          overflow-x: hidden;
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
        }

        img, video {
          transform: translateZ(0);
        }

        .motion-safe {
          will-change: transform, opacity;
        }

        .reveal-section {
          content-visibility: auto;
          contain-intrinsic-size: 500px;
        }
        .font-display { font-family: 'Anton', sans-serif; }
        .font-body { font-family: 'Inter', sans-serif; }

        .marquee-trim {
          background-image: radial-gradient(circle, var(--gold-500) 2.1px, transparent 2.5px);
          background-size: 16px 16px;
          background-position: center;
        }
        .marquee-trim.chase { animation: chase 1.1s linear infinite; }
        @keyframes chase { from { background-position: 0 center; } to { background-position: 16px center; } }

        .ticket-divider {
          height: 22px;
          background-image: radial-gradient(circle, var(--cream-50) 6.5px, transparent 7px);
          background-size: 22px 22px;
          background-position: top center;
        }

        .badge-stub { position: relative; }
        .badge-stub::before, .badge-stub::after {
          content: ''; position: absolute; width: 6px; height: 6px;
          background: var(--paper); border-radius: 9999px; top: 50%; transform: translateY(-50%);
        }
        .badge-stub::before { left: -3px; }
        .badge-stub::after { right: -3px; }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .float-slow { animation: float 4.5s ease-in-out infinite; }
        .float-med { animation: float 3.2s ease-in-out infinite; }
        .float-fast { animation: float 2.4s ease-in-out infinite; }
        .delay-1 { animation-delay: .3s; }
        .delay-2 { animation-delay: .7s; }
        .delay-3 { animation-delay: 1.1s; }
        .delay-4 { animation-delay: 1.6s; }

        .shimmer-text {
          background: linear-gradient(100deg, var(--gold-500) 20%, #fff8e1 40%, var(--gold-300) 60%, var(--gold-500) 80%);
          background-size: 250% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: shimmer 3.5s linear infinite;
        }
        @keyframes shimmer { to { background-position: -250% center; } }

        @media (prefers-reduced-motion: reduce) {
          .marquee-trim.chase, .float-slow, .float-med, .float-fast, .shimmer-text { animation: none; }
        }
      `}</style>

      {/* Toast Notification */}
      <AnimatePresence>
        {addedNotice && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[var(--gold-500)] text-[var(--emerald-900)] px-4 py-2 rounded-full font-extrabold text-xs shadow-xl flex items-center gap-1.5 border border-[var(--gold-300)]"
          >
            <Check size={14} /> Added {addedNotice} to order
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[var(--emerald-900)] text-white shadow-lg">
        <div className="h-[3px] w-full marquee-trim chase opacity-90" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <motion.div initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full border-2 border-[var(--gold-500)] bg-[var(--emerald-950)] overflow-hidden flex items-center justify-center shrink-0 shadow-[0_0_0_3px_rgba(241,184,17,0.15)]">
              <img
                src="/logo.png"
                alt="Broadway Eatery Logo"
                className="w-full h-full object-cover"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <span className="text-xs font-black text-[var(--gold-500)] font-display">BE</span>
            </div>
            <div>
              <p className="text-[9px] font-bold tracking-[0.22em] text-[var(--gold-300)] uppercase">Est. Kohat Cantt</p>
              <h1 className="text-lg sm:text-xl font-display tracking-wide text-[var(--gold-500)] leading-none">BROADWAY EATERY</h1>
              <p className="text-[10px] text-emerald-200/80 flex items-center gap-1 mt-0.5">
                <Clock size={10} className="text-[var(--gold-500)]" /> Express delivery, Kohat Cantt
              </p>
            </div>
          </motion.div>

          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="Open your bag"
            className="relative bg-[var(--gold-500)] hover:bg-[var(--gold-300)] text-[var(--emerald-900)] px-3.5 sm:px-4 py-2.5 rounded-xl font-black flex items-center gap-2 text-xs shadow transition active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          >
            <ShoppingCart size={16} />
            <span className="hidden xs:inline sm:inline">Bag</span>
            {cartCount > 0 && (
              <span className="bg-[var(--emerald-900)] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      <ScrollProgress />

      <div className="relative overflow-hidden bg-[var(--gold-500)] text-[var(--emerald-950)] border-b border-[var(--gold-300)]">
        <motion.div
          className="flex w-max whitespace-nowrap py-2 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.28em]"
          animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(2)].map((_, copy) => (
            <span key={copy} className="flex items-center">
              {["FRESH • HOT • CRISPY", "KOHAT CANTT", "ORDER NOW", "MADE WITH ATTITUDE"].map((label) => (
                <span key={`${copy}-${label}`} className="mx-7">{label} ✦</span>
              ))}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[var(--emerald-900)] via-[var(--emerald-900)] to-[var(--emerald-950)] text-white overflow-hidden pt-8 sm:pt-12">
        <div className="pointer-events-none absolute -top-24 -right-16 w-72 h-72 rounded-full bg-[var(--gold-500)]/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -left-16 w-72 h-72 rounded-full bg-[var(--gold-500)]/10 blur-3xl" />

        <span className="pointer-events-none absolute top-10 left-[8%] text-[var(--gold-500)]/40 text-lg float-slow select-none hidden sm:inline">✦</span>
        <span className="pointer-events-none absolute top-24 right-[12%] text-[var(--gold-500)]/30 text-sm float-med delay-2 select-none hidden sm:inline">✦</span>
        <span className="pointer-events-none absolute bottom-20 left-[15%] text-[var(--gold-300)]/30 text-xs float-fast delay-1 select-none hidden sm:inline">✦</span>
        <span className="pointer-events-none absolute top-1/3 right-[6%] text-[var(--gold-500)]/25 text-base float-slow delay-3 select-none hidden sm:inline">✦</span>

        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate="show"
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative max-w-5xl mx-auto px-4 sm:px-6 pb-10 motion-safe"
        >
          <motion.p variants={heroItem} className="text-center mb-3">
            <span className="inline-block float-med text-[10px] sm:text-[11px] font-bold tracking-[0.3em] text-[var(--gold-300)] uppercase">
              ✦ Now Showing in Kohat Cantt ✦
            </span>
          </motion.p>
          <motion.h2 variants={heroItem} className="font-display text-center text-4xl sm:text-5xl md:text-6xl leading-[0.95] tracking-wide">
            <span className="text-white">EVERY BITE GETS A</span>
            <br />
            <span className="shimmer-text inline-block">STANDING OVATION</span>
          </motion.h2>
          <motion.p variants={heroItem} className="text-center text-emerald-100/80 text-sm sm:text-base max-w-xl mx-auto mt-4">
            Golden crispy classics, loaded burgers &amp; fresh combos — plated fast and delivered hot, right to your door.
          </motion.p>

          <motion.div variants={heroItem} className="flex items-center justify-center gap-3 mt-6">
            <a href="#menu" className="bg-[var(--gold-500)] hover:bg-[var(--gold-300)] text-[var(--emerald-900)] text-xs font-black px-5 py-3 rounded-xl shadow-lg transition active:scale-95">
              Explore the Menu
            </a>
            <a
              href="https://maps.google.com/?q=Kohat+Cantt+Pakistan"
              target="_blank"
              rel="noreferrer"
              className="border border-[var(--gold-500)]/50 hover:border-[var(--gold-500)] text-white text-xs font-bold px-5 py-3 rounded-xl transition flex items-center gap-1.5"
            >
              <Navigation size={14} /> Get Directions
            </a>
          </motion.div>

          <motion.div variants={heroItem} className="mt-8 bg-[var(--emerald-950)]/80 p-3 rounded-2xl border border-[var(--gold-500)]/40 shadow-2xl">
            <div className="flex items-center justify-between mb-2 px-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--gold-500)] animate-pulse"></span>
                <h3 className="text-xs font-black tracking-wider text-[var(--gold-500)] uppercase">
                  Atmosphere &amp; Food Showcase
                </h3>
              </div>
              <span className="inline-flex items-center gap-1 bg-[var(--gold-500)]/20 text-[var(--gold-500)] text-[9px] font-bold px-2 py-0.5 rounded-full float-slow">
                <Sparkles size={10} /> Official Video
              </span>
            </div>

            <div className="relative rounded-xl overflow-hidden bg-black aspect-video max-h-80 shadow-inner ring-1 ring-[var(--gold-500)]/20">
              <video
                controls
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="/promo-video.mp4" type="video/mp4" />
                Your browser does not support video playback.
              </video>
            </div>

            <p className="text-[11px] text-emerald-200/80 mt-3 px-1 flex items-center justify-between flex-wrap gap-1.5">
              <span className="flex items-center gap-1">
                <MapPin size={11} className="text-[var(--gold-500)]" /> Al-Fateh Ext. Plaza, Opp. Broadway Sweets
              </span>
              <span className="text-[var(--gold-500)] font-bold">Kohat Cantt</span>
            </p>
          </motion.div>
        </motion.div>

        <div className="ticket-divider bg-[var(--emerald-950)]" />
      </section>

      {/* Sticky Animated Category Pills Navigation */}
      <div className="sticky top-[72px] z-30 bg-[var(--paper)]/95 backdrop-blur border-b border-[var(--line)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-2.5 flex gap-2 overflow-x-auto no-scrollbar">
          {fullMenuData.map(cat => {
            const active = activeCategory === cat.category;
            return (
              <button
                key={cat.category}
                onClick={() => setActiveCategory(cat.category)}
                className={`relative px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--gold-500)] ${
                  active ? 'text-[var(--emerald-900)]' : 'text-[var(--ink-500)] hover:text-[var(--emerald-900)]'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="activePill"
                    className="absolute inset-0 bg-[var(--gold-500)] rounded-full -z-10 shadow-sm"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                {cat.category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Menu Cards Layout */}
      <main id="menu" className="max-w-5xl mx-auto px-4 sm:px-6 mt-7 scroll-mt-32">
        <AnimatePresence mode="wait">
          {fullMenuData
            .filter(cat => cat.category === activeCategory)
            .map(cat => (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -14 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="space-y-5"
              >
                <div className="flex items-center justify-between border-b border-[var(--line)] pb-2.5">
                  <h3 className="text-lg sm:text-xl font-display tracking-wide text-[var(--emerald-900)] flex items-center gap-2">
                    <span className="w-2 h-5 bg-[var(--gold-500)] rounded-full inline-block"></span>
                    {cat.category}
                  </h3>
                  <span className="badge-stub text-[10px] font-bold text-[var(--emerald-900)] bg-[var(--gold-100)] px-2.5 py-1 rounded-full">
                    {cat.items.length} items
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cat.items.map((item, idx) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.03, duration: 0.35 }}
                      className="group bg-[var(--paper)] p-3 rounded-2xl border border-[var(--line)] shadow-sm hover:shadow-lg hover:border-[var(--gold-500)]/50 transition-all duration-300 flex items-center gap-3.5"
                    >
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 bg-[var(--gold-100)] relative shadow-inner">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-[1.08] transition-transform duration-700 ease-out will-change-transform" />
                      </div>

                      <div className="flex-1 min-w-0">
                        {item.badge && (
                          <span className="badge-stub float-fast inline-block bg-[var(--emerald-900)] text-[var(--gold-500)] text-[8px] font-black px-2 py-0.5 rounded mb-1 uppercase tracking-wider">
                            {item.badge}
                          </span>
                        )}
                        <h4 className="font-bold text-[var(--ink-900)] text-xs sm:text-[13px] leading-tight truncate">{item.name}</h4>
                        <p className="text-[10px] text-[var(--ink-500)] mt-0.5 line-clamp-2 leading-relaxed">{item.desc}</p>
                        <p className="text-xs sm:text-sm font-black text-[var(--emerald-900)] mt-1.5">{formatPKR(item.price)}</p>
                      </div>

                      <button
                        onClick={() => addToCart(item)}
                        aria-label={`Add ${item.name} to bag`}
                        className="bg-[var(--emerald-900)] hover:bg-[var(--emerald-800)] text-white p-2.5 rounded-xl font-bold flex items-center justify-center transition active:scale-90 shadow-sm shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--gold-500)]"
                      >
                        <Plus size={16} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
        </AnimatePresence>
      </main>

      {/* Customer Reviews Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 mt-12 reveal-section">
        <Reveal><div className="bg-[var(--paper)] p-5 sm:p-6 rounded-2xl border border-[var(--line)] shadow-sm">
          <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] text-[var(--gold-500)] uppercase">Word on the street</p>
              <h3 className="text-lg font-display tracking-wide text-[var(--emerald-900)]">Customer Experiences</h3>
            </div>
            <div className="flex items-center gap-1.5 bg-[var(--gold-100)] text-[var(--emerald-900)] font-black px-3 py-1.5 rounded-lg text-xs border border-[var(--gold-500)]/30 float-slow">
              <Star size={14} className="fill-[var(--gold-500)] text-[var(--gold-500)]" /> 4.9 / 5.0
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {customerReviews.map(rev => (
              <div key={rev.id} className="bg-[var(--cream-50)] p-4 rounded-xl border border-[var(--line)]">
                <div className="flex gap-1 mb-1.5">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={11} className="fill-[var(--gold-500)] text-[var(--gold-500)]" />
                  ))}
                </div>
                <p className="text-[11.5px] text-[var(--ink-900)]/80 italic leading-relaxed">"{rev.comment}"</p>
                <p className="text-[10px] font-bold text-[var(--emerald-900)] mt-2.5">— {rev.name}</p>
              </div>
            ))}
          </div>
        </div></Reveal>
      </section>

      {/* Embedded Location Map Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 mt-8 reveal-section">
        <Reveal variants={revealScale}><div className="bg-[var(--emerald-900)] text-white p-5 sm:p-6 rounded-2xl shadow-lg border border-[var(--emerald-800)] overflow-hidden relative">
          <div className="h-[3px] w-full marquee-trim absolute top-0 left-0 opacity-70" />
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 mt-1">
            <div>
              <span className="inline-block float-med text-[10px] bg-[var(--gold-500)] text-[var(--emerald-900)] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                Find Us Easily
              </span>
              <h3 className="text-base sm:text-lg font-display tracking-wide text-white mt-1.5">Visit Broadway Eatery</h3>
              <p className="text-xs text-emerald-200/80 flex items-center gap-1 mt-0.5">
                <MapPin size={12} className="text-[var(--gold-500)]" /> Al-Fateh Ext. Plaza, Opp. Broadway Sweets, Kohat Cantt
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=Kohat+Cantt+Pakistan"
              target="_blank"
              rel="noreferrer"
              className="bg-[var(--gold-500)] hover:bg-[var(--gold-300)] text-[var(--emerald-900)] text-xs font-black px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow transition shrink-0"
            >
              <Navigation size={14} /> Get Directions
            </a>
          </div>

          <div className="w-full h-52 rounded-xl overflow-hidden border border-[var(--emerald-800)] shadow-inner bg-[var(--emerald-950)]">
            <iframe
              title="Broadway Eatery Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13264.402372553905!2d71.432087!3d33.585521!2m3!1f0!0f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38d9333908f515f1%3A0x1d582069b16858e3!2sKohat%20Cantt%2C%20Kohat%2C%20Khyber%20Pakhtunkhwa%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div></Reveal>
      </section>

      {/* Footer */}
      <Reveal className="max-w-5xl mx-auto px-4 sm:px-6 mt-12 pt-6"><footer className="pt-6 border-t border-[var(--line)] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-full bg-[var(--emerald-900)] flex items-center justify-center text-[var(--gold-500)] font-display text-xs shrink-0">BE</span>
          <div>
            <p className="text-xs font-black text-[var(--emerald-900)]">BROADWAY EATERY</p>
            <p className="text-[10px] text-[var(--ink-500)]">Al-Fateh Ext. Plaza, Kohat Cantt · Open daily</p>
          </div>
        </div>
        <p className="text-[10px] text-[var(--ink-500)]">© {new Date().getFullYear()} Broadway Eatery. Website by WebFlex by Musab.</p>
      </footer></Reveal>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 220 }}
              className="bg-[var(--paper)] w-full max-w-md h-full flex flex-col justify-between p-5 shadow-2xl"
            >
              <div className="flex-1 flex flex-col min-h-0">
                <div className="flex justify-between items-center border-b border-[var(--line)] pb-3 shrink-0">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="text-[var(--emerald-900)]" size={20} />
                    <h3 className="font-extrabold text-base text-[var(--emerald-900)]">Your Selected Items</h3>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    aria-label="Close bag"
                    className="text-[var(--ink-500)] hover:text-[var(--emerald-900)] bg-[var(--cream-50)] p-1.5 rounded-lg transition"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="mt-4 space-y-3 max-h-[48vh] overflow-y-auto pr-1">
                  {cart.length === 0 ? (
                    <div className="text-center text-[var(--ink-500)] text-xs py-12">
                      <ShoppingCart size={32} className="mx-auto mb-2 opacity-30" />
                      Your order tray is empty.<br />Tap (+) next to items to add.
                    </div>
                  ) : (
                    cart.map(item => (
                      <div key={item.id} className="flex justify-between items-center bg-[var(--cream-50)] p-3 rounded-xl border border-[var(--line)]">
                        <div className="min-w-0 pr-2">
                          <p className="text-xs font-bold text-[var(--ink-900)] truncate">{item.name}</p>
                          <p className="text-[11px] font-semibold text-[var(--emerald-900)]">{formatPKR(item.price * item.qty)}</p>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button onClick={() => updateQuantity(item.id, -1)} aria-label={`Decrease ${item.name} quantity`} className="bg-[var(--line)] hover:bg-[var(--gold-100)] w-6 h-6 rounded-md flex items-center justify-center transition"><Minus size={12} /></button>
                          <span className="text-xs font-extrabold w-4 text-center">{item.qty}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} aria-label={`Increase ${item.name} quantity`} className="bg-[var(--line)] hover:bg-[var(--gold-100)] w-6 h-6 rounded-md flex items-center justify-center transition"><Plus size={12} /></button>
                          <button onClick={() => removeFromCart(item.id)} aria-label={`Remove ${item.name}`} className="text-red-500 ml-1.5 hover:text-red-700"><Trash2 size={15} /></button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {cart.length > 0 && (
                  <div className="mt-4 space-y-2 border-t border-[var(--line)] pt-3 shrink-0">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full text-xs p-2.5 border border-[var(--line)] rounded-xl focus:outline-none focus:border-[var(--emerald-900)] transition"
                    />
                    <input
                      type="text"
                      placeholder="Delivery Address (Kohat Cantt area)"
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      className="w-full text-xs p-2.5 border border-[var(--line)] rounded-xl focus:outline-none focus:border-[var(--emerald-900)] transition"
                    />
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t border-[var(--line)] pt-3 shrink-0">
                  <div className="flex justify-between font-extrabold text-sm mb-1">
                    <span>Grand Total:</span>
                    <span className="text-[var(--emerald-900)] text-base">{formatPKR(totalAmount)}</span>
                  </div>
                  <p className="text-[10px] text-[var(--ink-500)] mb-3">Final total is confirmed with you on WhatsApp.</p>
                  <button
                    onClick={sendWhatsAppOrder}
                    className="w-full bg-[#25D366] hover:bg-[#1eb856] text-white font-extrabold py-3.5 rounded-xl flex items-center justify-center gap-2 text-xs shadow-md transition active:scale-95"
                  >
                    <Send size={15} /> Confirm Order via WhatsApp
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Bottom Order Bar */}
      {cart.length > 0 && !isCartOpen && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-4 left-4 right-4 max-w-xl mx-auto z-40"
        >
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-[var(--emerald-900)] text-white p-3.5 rounded-2xl shadow-xl flex justify-between items-center border border-[var(--gold-500)]/50 hover:bg-[var(--emerald-800)] transition active:scale-98"
          >
            <div className="flex items-center gap-2">
              <span className="bg-[var(--gold-500)] text-[var(--emerald-900)] font-black text-[11px] px-2.5 py-1 rounded-full">
                {cartCount} Items
              </span>
              <span className="text-xs font-bold">Review Order Tray</span>
            </div>
            <span className="font-black text-xs text-[var(--gold-500)] flex items-center gap-1">
              {formatPKR(totalAmount)} <ChevronRight size={14} />
            </span>
          </button>
        </motion.div>
      )}
    </div>
  );
}