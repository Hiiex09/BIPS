import { Component } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    // If the error looks like a chunk loading failure, reload the window to fetch fresh chunks
    const isChunkFailed =
      this.state.error?.message?.includes("Failed to fetch dynamically imported module") ||
      this.state.error?.name === "ChunkLoadError";

    if (isChunkFailed) {
      window.location.reload();
    } else {
      this.setState({ hasError: false, error: null });
    }
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const isChunkFailed =
        this.state.error?.message?.includes("Failed to fetch dynamically imported module") ||
        this.state.error?.name === "ChunkLoadError";

      return (
        <div
          role="alert"
          className="min-h-screen flex items-center justify-center bg-base-100 p-6"
        >
          <div className="card w-full max-w-md bg-base-200 border border-base-300 shadow-xl">
            <div className="card-body items-center text-center gap-4">
              <div className="w-14 h-14 rounded-full bg-error/15 text-error flex items-center justify-center">
                <AlertTriangle size={32} />
              </div>

              <div>
                <h2 className="card-title text-xl font-bold justify-center">
                  {isChunkFailed ? "Application Update Available" : "Something Went Wrong"}
                </h2>
                <p className="text-sm text-base-content/70 mt-2">
                  {isChunkFailed
                    ? "A newer version of this page is available or your connection was interrupted. Please reload."
                    : "An unexpected error occurred while loading this section of the portal."}
                </p>
              </div>

              <div className="card-actions mt-2">
                <button
                  onClick={this.handleReset}
                  className="btn btn-primary gap-2"
                >
                  <RotateCcw size={16} />
                  {isChunkFailed ? "Reload Application" : "Try Again"}
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
