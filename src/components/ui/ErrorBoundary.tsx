import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}
interface State {
  failed: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Portfolio crashed:", error, info.componentStack);
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div role="alert" className="flex min-h-screen flex-col items-center justify-center bg-beige px-6 text-center">
        <h1 className="font-serif text-4xl text-ink">Something went wrong</h1>
        <p className="mt-4 max-w-md text-ink/75">
          The page hit an unexpected error. Reload to try again.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-8 rounded-full bg-olive px-6 py-3 font-display font-semibold text-cream hover:bg-olive-dark"
        >
          Reload page
        </button>
      </div>
    );
  }
}
