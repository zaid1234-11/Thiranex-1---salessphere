import { ErrorBoundary } from '@/components/feedback/ErrorBoundary';

interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ErrorBoundary>
      {/* We can add TooltipProvider, ThemeProvider, etc. here later */}
      {children}
    </ErrorBoundary>
  );
}
