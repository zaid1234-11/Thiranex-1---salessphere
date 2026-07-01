import React from 'react';
import { FileSearch } from 'lucide-react';
import { motion } from 'framer-motion';
import { cardVariants } from '@/styles/motion';

interface EmptyStateProps {
  title: string;
  message: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export function EmptyState({ 
  title, 
  message, 
  icon = <FileSearch className="h-10 w-10 text-muted-foreground opacity-50" />,
  action
}: EmptyStateProps) {
  return (
    <motion.div 
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center p-12 text-center rounded-xl border border-dashed border-border bg-card/50"
    >
      <div className="mb-4 rounded-full bg-muted/50 p-4">
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-semibold text-foreground">{title}</h3>
      <p className="mb-6 max-w-sm text-sm text-muted-foreground">
        {message}
      </p>
      {action && (
        <div>{action}</div>
      )}
    </motion.div>
  );
}
