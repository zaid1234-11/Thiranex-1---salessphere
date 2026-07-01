import { ErrorBoundary } from '@/components/feedback/ErrorBoundary';
import { Toaster } from 'sonner';

interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ErrorBoundary>
      {/* We can add TooltipProvider, ThemeProvider, etc. here later */}
      {children}
      <Toaster position="bottom-right" richColors />
    </ErrorBoundary>
  );
}
