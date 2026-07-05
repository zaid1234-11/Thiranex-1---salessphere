
import { AlertTriangle, RefreshCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { cardVariants } from '@/styles/motion';

interface ErrorStateProps {
  title?: string;
  message: string;
  errorId?: string;
  onRetry?: () => void;
}

export function ErrorState({ 
  title = "Something went wrong", 
  message, 
  errorId,
  onRetry 
}: ErrorStateProps) {
  return (
    <motion.div 
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center p-8 text-center rounded-xl border border-destructive/20 bg-destructive/5"
    >
      <div className="mb-4 rounded-full bg-destructive/10 p-3 text-destructive">
        <AlertTriangle className="h-8 w-8" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-foreground">{title}</h3>
      <p className="mb-4 max-w-md text-sm text-muted-foreground">
        {message}
      </p>
      
      {errorId && (
        <p className="mb-6 text-xs text-muted-foreground/70 font-mono">
          Error ID: {errorId}
        </p>
      )}

      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4"
        >
          <RefreshCcw className="mr-2 h-4 w-4" />
          Retry
        </button>
      )}
    </motion.div>
  );
}
