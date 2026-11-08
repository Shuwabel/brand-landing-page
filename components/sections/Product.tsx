import { brand } from "@/lib/brand";
import { useState } from "react";
import Image from "next/image";
import { PiMinus, PiPlus } from "react-icons/pi";
import { AnimatePresence, motion } from "framer-motion";

const hotspots = [
  {
    id: 0,
    top: "top-20",
    left: "left-30",
    topsm: "max-sm:top-20",
    leftsm: "max-sm:left-10",
    img: "/img9.jpg",
    title: "The Essential Tee",
    desc: "A foundational piece crafted for ease, movement, and everyday confidence.",
  },
  {
    id: 1,
    top: "top-70",
    left: "left-80",
    topsm: "max-sm:top-20",
    leftsm: "max-sm:left-70",
    img: "/img7.jpg",
    title: "Urban Layer",
    desc: "Structured yet relaxed. Built to move effortlessly through your day.",
  },
  {
    id: 2,
    top: "top-100",
    left: "left-30",
    topsm: "max-sm:top-160",
    leftsm: "max-sm:left-40",
    img: "/img8.jpg",
    title: "Studio Essential",
    desc: "Minimal form, maximum intent. A timeless wardrobe staple.",
  },
];

const Product = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section
      id="collection"
      className="w-full min-h-screen p-8 max-sm:p-5 flex max-sm:flex-col max-sm:gap-6 bg-white"
    >
      {/* LEFT TEXT */}
      <div className="w-full flex flex-col justify-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-xs clash uppercase font-bold text-accent tracking-[4px] mb-3"
        >
          Interactive Lookbook
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-6xl max-sm:text-4xl porsha uppercase tracking-tighter leading-none"
        >
          Lookbook
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="clash text-sm text-foreground/60 mt-4 max-w-sm"
        >
          Tap the hotspots to explore each piece. Every detail is intentional.
        </motion.p>
      </div>

      {/* IMAGE SECTION */}
      <div className="w-full h-[90vh] max-sm:h-[70vh] relative overflow-hidden">
        <motion.div
          initial={{ scale: 1.05, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          className="w-full h-full relative"
        >
          <Image
            src="/img16.jpg"
            alt={`${brand.name} editorial`}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover"
          />
        </motion.div>

        {/* HOTSPOTS */}
        {hotspots.map((spot) => (
          <motion.div
            key={spot.id}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 + spot.id * 0.2, duration: 0.5, type: "spring" }}
            viewport={{ once: true }}
            className={`w-10 h-10 rounded-full shadow-xl border border-white/30 absolute 
            ${spot.top} ${spot.left} ${spot.leftsm} ${spot.topsm} bg-white/20 backdrop-blur-xl flex items-center justify-center cursor-pointer z-50 hover:bg-white/40 transition-colors duration-300`}
            onClick={() =>
              setActiveIndex(activeIndex === spot.id ? null : spot.id)
            }
          >
            <AnimatePresence mode="wait">
              {activeIndex === spot.id ? (
                <motion.div
                  key="minus"
                  initial={{ rotate: -90, scale: 0, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: 90, scale: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <PiMinus className="text-white text-sm" />
                </motion.div>
              ) : (
                <motion.div
                  key="plus"
                  initial={{ rotate: 90, scale: 0, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: -90, scale: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <PiPlus className="text-white text-sm" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}

        {/* OVERLAY CARD */}
        <AnimatePresence>
          {activeIndex !== null && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm pointer-events-none z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-72 bg-white overflow-hidden shadow-2xl"
              >
                <div className="relative h-56 w-full">
                  <Image
                    src={hotspots[activeIndex].img}
                    alt={hotspots[activeIndex].title}
                    fill
                    sizes="288px"
                    className="object-cover"
                  />
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="text-base fontmelo font-bold">
                    {hotspots[activeIndex].title}
                  </h3>
                  <p className="text-xs text-foreground/60 clash leading-relaxed">
                    {hotspots[activeIndex].desc}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Product;
