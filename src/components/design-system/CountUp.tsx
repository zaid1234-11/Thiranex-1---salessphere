import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface CountUpProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
}

export function CountUp({ value, prefix = '', suffix = '', decimals = 0, duration = 1000 }: CountUpProps) {
  const [hasStarted, setHasStarted] = useState(false);
  const spring = useSpring(0, { bounce: 0, duration });
  const display = useTransform(spring, (current) => {
    const formatted = current.toFixed(decimals);
    // Add commas if needed, simple logic for formatting
    const parts = formatted.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return `${prefix}${parts.join('.')}${suffix}`;
  });

  useEffect(() => {
    setHasStarted(true);
    spring.set(value);
  }, [value, spring]);

  return <motion.span>{display}</motion.span>;
}
