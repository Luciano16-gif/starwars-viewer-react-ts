import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#181818] flex items-center justify-center">
          <div className="text-center p-8 max-w-md">
            <h1 className="text-4xl font-bold text-yellow-400 mb-4">
              This is not the page you're looking for
            </h1>
            <p className="text-gray-100 mb-8">
              The Force encountered a disturbance. Please try again.
            </p>
            <div className="space-x-4">
              <button
                className="px-6 py-3 rounded border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-200"
                onClick={() => window.location.href = '/'}
              >
                Return Home
              </button>
              <button
                className="px-6 py-3 rounded border-2 border-yellow-400/50 text-yellow-400/70 hover:border-yellow-400 hover:text-yellow-400 transition-all duration-200"
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
            </div>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-yellow-400/60">
                  Error Details (Development Only)
                </summary>
                <pre className="mt-2 p-4 bg-black/50 border border-yellow-400/20 text-yellow-400/80 text-xs overflow-auto rounded">
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;