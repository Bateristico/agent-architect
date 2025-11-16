import { Component, type ErrorInfo, type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * ErrorBoundary Component
 *
 * Catches JavaScript errors anywhere in the child component tree,
 * logs errors, and displays a fallback UI instead of crashing.
 *
 * Usage:
 * <ErrorBoundary>
 *   <YourComponent />
 * </ErrorBoundary>
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error to console
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    // Store error info in state
    this.setState({
      error,
      errorInfo,
    });

    // Call optional error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Custom fallback provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default retro-styled error UI
      return (
        <div
          className="min-h-screen flex items-center justify-center p-4"
          style={{
            background: 'linear-gradient(135deg, var(--background) 0%, var(--card) 100%)',
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl w-full p-8"
            style={{
              background: 'var(--card)',
              border: '4px solid var(--error-color)',
              boxShadow: '8px 8px 0px rgba(0, 0, 0, 0.3)',
            }}
          >
            {/* Error Header */}
            <div
              className="text-center mb-6 pb-4"
              style={{
                borderBottom: '3px solid var(--error-color)',
              }}
            >
              <div
                className="text-4xl mb-2"
                style={{
                  color: 'var(--error-color)',
                  fontFamily: 'var(--font-pixel)',
                  textShadow: '3px 3px 0px rgba(0, 0, 0, 0.3)',
                }}
              >
                ERROR!
              </div>
              <div
                className="text-sm uppercase"
                style={{
                  color: 'var(--muted-foreground)',
                  fontFamily: 'var(--font-sans)',
                  letterSpacing: '0.1em',
                }}
              >
                Something went wrong
              </div>
            </div>

            {/* Error Message */}
            <div
              className="mb-6 p-4"
              style={{
                background: 'var(--muted)',
                border: '2px solid var(--border)',
                fontFamily: 'monospace',
                fontSize: '12px',
                color: 'var(--error-color)',
              }}
            >
              <div className="mb-2 font-bold">Error Message:</div>
              <div className="text-foreground">
                {this.state.error?.message || 'Unknown error occurred'}
              </div>
            </div>

            {/* Error Stack (collapsed by default in production) */}
            {import.meta.env.DEV && this.state.errorInfo && (
              <details className="mb-6">
                <summary
                  className="cursor-pointer p-3 mb-2"
                  style={{
                    background: 'var(--muted)',
                    border: '2px solid var(--border)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '12px',
                    fontWeight: 'bold',
                  }}
                >
                  Show Error Details
                </summary>
                <div
                  className="p-4 overflow-auto max-h-64"
                  style={{
                    background: 'var(--background)',
                    border: '2px solid var(--border)',
                    fontFamily: 'monospace',
                    fontSize: '10px',
                    color: 'var(--muted-foreground)',
                  }}
                >
                  <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                    {this.state.errorInfo.componentStack}
                  </pre>
                </div>
              </details>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              <motion.button
                onClick={this.handleReset}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 font-bold uppercase"
                style={{
                  background: 'var(--success-color)',
                  color: 'var(--background)',
                  border: '3px solid var(--border)',
                  boxShadow: '4px 4px 0px rgba(0, 0, 0, 0.3)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                Try Again
              </motion.button>

              <motion.button
                onClick={() => window.location.reload()}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 font-bold uppercase"
                style={{
                  background: 'var(--accent)',
                  color: 'var(--background)',
                  border: '3px solid var(--border)',
                  boxShadow: '4px 4px 0px rgba(0, 0, 0, 0.3)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                Reload Page
              </motion.button>
            </div>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}
