'use client'

import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-scc-dark-bg px-4">
          <div className="text-center max-w-md">
            <div className="mb-6">
              <div className="text-6xl mb-4"> </div>
              <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                Something went wrong
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                We apologize for the inconvenience. Please try again.
              </p>
            </div>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="px-6 py-3 bg-scc-primary dark:bg-blue-600 text-white rounded-lg hover:bg-scc-primary/90 dark:hover:bg-blue-700 transition-colors font-semibold"
            >
              Try again
            </button>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-left">
                <p className="text-sm text-red-800 dark:text-red-400 font-mono">
                  {this.state.error.message}
                </p>
              </div>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
