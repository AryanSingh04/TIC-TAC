import React from 'react';
import { motion } from 'framer-motion';

// Define animation variants
const iconVariants = {
  hidden: {
    pathLength: 0,
    fill: "rgba(255, 255, 255, 0)"
  },
  visible: {
    pathLength: 1,
    fill: "rgba(255, 255, 255, 1)"
  }
};

const AnimatedCross = () => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    initial={iconVariants.hidden}
    animate={iconVariants.visible}
    variants={iconVariants}
    transition={{ duration: 2 }}
  >
    <motion.path
      d="M20 20L80 80M80 20L20 80"
      stroke="white"
      strokeWidth="10"
      strokeLinecap="round"
    />
  </motion.svg>
);

const AnimatedCircle = () => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    initial={iconVariants.hidden}
    animate={iconVariants.visible}
    variants={iconVariants}
    transition={{ duration: 2 }}
  >
    <motion.circle
      cx="50"
      cy="50"
      r="30"
      stroke="white"
      strokeWidth="10"
      fill="transparent"
    />
  </motion.svg>
);

export { AnimatedCross, AnimatedCircle };
