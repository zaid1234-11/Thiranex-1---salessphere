import React from 'react';
import { RefreshCw, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface ErrorStateProps {
  title?: string;
  message?: string;
  lastSync?: string;
  onRetry?: () => void;
}

export function ErrorState({ 
  title = "We couldn't refresh performance data.", 
  message = "There was an issue connecting to the data source.", 
  lastSync = "10:42 AM",
  onRetry 
}: ErrorStateProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center p-12 text-center h-full min-h-[300px] bg-card border border-surface/50 rounded-xl shadow-sm"
    >
      <div className="w-12 h-12 rounded-full bg-danger/10 text-danger flex items-center justify-center mb-4">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-medium text-primary mb-2">{title}</h3>
      <p className="text-sm text-secondary mb-6 max-w-sm">
        {message}
      </p>
      
      <div className="flex flex-col items-center gap-4">
        {onRetry && (
          <button 
            onClick={onRetry}
            className="flex items-center gap-2 px-4 py-2 bg-surface hover:bg-surface/80 text-primary text-sm font-medium rounded-lg transition-colors border border-surface/50"
          >
            <RefreshCw className="w-4 h-4" />
            Retry
          </button>
        )}
        <span className="text-[11px] text-secondary uppercase tracking-widest font-medium">
          Last successful sync • {lastSync}
        </span>
      </div>
    </motion.div>
  );
}
