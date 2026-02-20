"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const galleryItems = [
  { src: "/img5.jpg", label: "The Edit" },
  { src: "/img3.jpg", label: "Essentials" },
  { src: "/img2.jpg", label: "Studio" },
  { src: "/img6.jpg", label: "Form" },
];

const Philosophy = () => {
  return (
    <section
      id="about"
      className="flex flex-col w-full items-center justify-center py-20 max-sm:py-12 cursor-default bg-white overflow-hidden"
    >
      {/* Header */}
      <div className="flex flex-col items-center justify-center gap-4 px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative w-14 h-14"
        >
          <Image
            src="/Logo.png"
            className="object-contain"
            fill
            alt="ancientika"
          />
        </motion.div>

        <div className="text-center max-w-2xl flex flex-col items-center gap-3">
          <motion.p
            className="uppercase text-xs clash font-bold text-accent tracking-[4px]"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Our Philosophy
          </motion.p>
          <motion.h2
            className="fontmelo font-black text-4xl max-sm:text-3xl"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            The Luxury of Less
          </motion.h2>
          <motion.p
            className="clash text-base max-sm:text-sm text-foreground/70 leading-relaxed"
            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            viewport={{ once: true }}
          >
            A study in texture, form, and time. Our garments are crafted with
            precision and care — designed to transcend trends and last beyond
            seasons.
          </motion.p>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="flex flex-col gap-5 px-8 max-sm:px-4 w-full items-center">
        <div className="flex items-end max-sm:items-end justify-center gap-5 max-sm:gap-3 w-full">
          {galleryItems.slice(0, 2).map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`relative overflow-hidden group ${i === 0
                ? "w-[400px] h-80 max-sm:w-[45%] max-sm:h-auto max-sm:aspect-[5/4]"
                : "w-[520px] h-72 max-sm:w-[55%] max-sm:h-auto max-sm:aspect-[16/9]"
                }`}
            >
              <Image
                src={item.src}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                width={800}
                height={800}
                sizes="(max-width: 640px) 50vw, 520px"
                alt={item.label}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 max-sm:opacity-100 transition-opacity duration-500">
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-sm clash tracking-wider">{item.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="flex items-start max-sm:items-start justify-center gap-5 max-sm:gap-3 w-full">
          {galleryItems.slice(2, 4).map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`relative overflow-hidden group ${i === 0
                ? "w-[520px] h-72 max-sm:w-[55%] max-sm:h-auto max-sm:aspect-[16/9]"
                : "w-[400px] h-80 max-sm:w-[45%] max-sm:h-auto max-sm:aspect-[5/4]"
                }`}
            >
              <Image
                src={item.src}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                width={800}
                height={800}
                sizes="(max-width: 640px) 50vw, 520px"
                alt={item.label}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 max-sm:opacity-100 transition-opacity duration-500">
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-sm clash tracking-wider">{item.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
