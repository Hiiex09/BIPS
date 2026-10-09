/**
 * Reusable, accessible loading indicator styled with Tailwind CSS and DaisyUI.
 * Can be used as a full-page screen loader or a localized section loader.
 */
const PageLoader = ({ fullScreen = false, message = "Loading..." }) => {
  if (fullScreen) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="min-h-screen w-full flex flex-col items-center justify-center bg-base-100 p-6 gap-4"
      >
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="text-sm font-medium text-base-content/70 animate-pulse">
          {message}
        </p>
      </div>
    );
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="w-full py-16 flex flex-col items-center justify-center gap-3"
    >
      <span className="loading loading-spinner loading-md text-primary"></span>
      <p className="text-xs font-medium text-base-content/60">
        {message}
      </p>
    </div>
  );
};

export default PageLoader;
