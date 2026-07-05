export const motionTokens = {
  duration: {
    hover: 0.15,
    cardEnter: 0.25,
    pageTransition: 0.35,
    kpiCount: 0.7,
    modal: 0.2,
  },
  easing: {
    default: [0.4, 0.0, 0.2, 1] as [number, number, number, number], // Standard Material/Tailwind ease
    bouncy: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
    smooth: [0.16, 1, 0.3, 1] as [number, number, number, number],
  },
};

export const pageVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: motionTokens.duration.pageTransition,
      ease: motionTokens.easing.default,
      staggerChildren: 0.05
    }
  },
  exit: { opacity: 0, y: -10 }
};

export const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: motionTokens.duration.cardEnter,
      ease: motionTokens.easing.smooth
    }
  }
};

export const hoverVariants = {
  hover: {
    y: -4,
    transition: {
      duration: motionTokens.duration.hover,
      ease: motionTokens.easing.default
    }
  }
};
