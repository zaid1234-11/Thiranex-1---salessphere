import React from 'react';
import { Inbox } from 'lucide-react';
import { motion } from 'framer-motion';

interface EmptyStateProps {
  title?: string;
  message?: string;
  actionText?: string;
}

export function EmptyState({ 
  title = "No opportunities detected.", 
  message = "Current performance is operating within expected thresholds. We'll notify you when new recommendations become available.",
  actionText
}: EmptyStateProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center p-12 text-center h-full min-h-[300px] bg-card border border-surface/50 rounded-xl shadow-sm"
    >
      <div className="w-12 h-12 rounded-full bg-surface/50 text-secondary flex items-center justify-center mb-4">
        <Inbox className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-medium text-primary mb-2">{title}</h3>
      <p className="text-sm text-secondary max-w-sm leading-relaxed mb-6">
        {message}
      </p>
      {actionText && (
        <span className="text-xs text-info font-medium hover:underline cursor-pointer">
          {actionText}
        </span>
      )}
    </motion.div>
  );
}
