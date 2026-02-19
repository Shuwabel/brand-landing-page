"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export const navbar = [
  { label: "Collection", href: "#collection" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: "easeOut", duration: 0.6, delay: 0.2 }}
        className="w-full fixed top-0 left-0 h-16 flex items-center justify-between px-8 z-[999] bg-background/80 backdrop-blur-md"
      >
        <nav className="flex items-center w-full justify-between">
          {/* Logo */}
          <button
            onClick={() => {
              // @ts-ignore
              if (window.lenis) {
                // @ts-ignore
                window.lenis.scrollTo(0);
              } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="relative w-8 h-8 cursor-pointer"
            aria-label="Scroll to top"
          >
            <Image
              src="/Logo.png"
              alt="ancientika"
              fill
              className="object-contain"
            />
          </button>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8 clash text-sm tracking-wider">
            {navbar.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="relative text-foreground/80 hover:text-foreground transition-colors duration-300 after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden z-[1001] w-8 h-8 flex items-center justify-center relative cursor-pointer"
            aria-label="Menu"
          >
            <div className="flex flex-col gap-1.5 w-6">
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="w-full h-0.5 bg-foreground block origin-center"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                className="w-full h-0.5 bg-foreground block"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="w-full h-0.5 bg-foreground block origin-center"
              />
            </div>
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[1000] md:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 250 }}
              className="fixed top-0 right-0 h-full w-[65%] max-w-[260px] bg-secondary z-[1000] md:hidden flex flex-col p-10 pt-28 gap-6 shadow-2xl"
            >
              <div className="flex flex-col gap-1 mb-8">
                <span className="text-[10px] uppercase tracking-[3px] text-white/40 clash">Navigation</span>
                <div className="h-px w-8 bg-accent/50" />
              </div>
              {navbar.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 + 0.1, duration: 0.4 }}
                  className="text-2xl porsha text-white/90 hover:text-accent transition-colors duration-300 tracking-wider"
                >
                  {item.label}
                </motion.a>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
