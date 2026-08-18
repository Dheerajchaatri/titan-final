"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion, Variants, Easing } from "framer-motion";

interface BinocularCharacterProps {
  className?: string;
}

export const BinocularCharacter: React.FC<BinocularCharacterProps> = ({ className = "" }) => {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Eagerly preload character image asset for instant render
    if (typeof window !== "undefined") {
      const img = new Image();
      img.src = "/api/asset/hero-character?v=5";
    }
  }, []);

  /*
   * Natural Human Searching Motion:
   * Starts immediately with continuous rotation & physical turning.
   */
  const naturalSearchingVariants: Variants = {
    initial: { x: 0, y: 0, rotateZ: 0, scaleX: 1, scaleY: 1 },
    searching: shouldReduceMotion
      ? { x: 0, y: 0, rotateZ: 0, scaleX: 1, scaleY: 1 }
      : {
          scaleX: [
             1.0,   1.0,   1.0,  -1.0,  -1.0,  -1.0,  -1.0,   1.0,   1.0,   1.0
          ],
          scaleY: [
             1.0,   1.0,  0.96,  0.96,   1.0,   1.0,  0.96,  0.96,   1.0,   1.0
          ],
          rotateZ: [
             0.0,   0.0,  -2.5,   2.5,   0.0,   0.0,   2.5,  -2.5,   0.0,   0.0
          ],
          x: [
               0,     0,    -8,   -20,   -28,   -28,   -20,    -8,     0,     0
          ],
          y: [
               0,     0,     4,     4,     0,     0,     4,     4,     0,     0
          ],
          transition: {
            duration: 6.0,
            ease: "easeInOut" as Easing,
            repeat: Infinity,
            repeatDelay: 0,
            times: [
              0.0,   0.30,  0.34,  0.36,  0.40,  0.70,  0.74,  0.76,  0.80,  1.0
            ],
          },
        },
  };

  return (
    <motion.div
      initial={shouldReduceMotion ? { y: 0, opacity: 1, scale: 1 } : { y: 20, opacity: 0, scale: 0.98 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{
        duration: 0.3,
        ease: "easeOut" as Easing,
      }}
      className={`relative flex items-center justify-center select-none ${className}`}
    >
      {/* Dynamic Floor Shadow tracking body weight and pan shift */}
      <motion.div
        className="absolute bottom-1 w-52 h-6 bg-primary-navy/15 rounded-full blur-lg -z-10"
        animate={
          !shouldReduceMotion
            ? {
                x: [0, 0, -6, -15, -22, -22, -15, -6, 0, 0],
                scaleX: [1.0, 1.0, 0.96, 0.96, 1.0, 1.0, 0.96, 0.96, 1.0, 1.0],
                opacity: [0.7, 0.7, 0.6, 0.6, 0.7, 0.7, 0.6, 0.6, 0.7, 0.7],
              }
            : { x: 0, scaleX: 1, opacity: 0.7 }
        }
        transition={{
          duration: 6.0,
          ease: "easeInOut" as Easing,
          repeat: Infinity,
          repeatDelay: 0,
          times: [
            0.0, 0.30, 0.34, 0.36, 0.40, 0.70, 0.74, 0.76, 0.80, 1.0
          ],
        }}
      />

      {/* Solid Character Asset Container */}
      <motion.div
        className="relative flex items-center justify-center"
        variants={naturalSearchingVariants}
        initial="initial"
        animate="searching"
      >
        <img
          src="/api/asset/hero-character?v=5"
          alt="Job Seeker with Binoculars"
          className="h-48 sm:h-56 w-auto object-contain pointer-events-none drop-shadow-md"
          loading="eager"
        />
      </motion.div>
    </motion.div>
  );
};
