import React from 'react';

type SpinnerSize = 'sm' | 'md' | 'lg';

interface LoadingSpinnerProps {
  /** Spinner diameter: sm (default), md (80px), lg (160px) */
  size: SpinnerSize;
  /** If true, centers the spinner vertically for full-page loading states */
  fullPage: boolean;
}

const SIZES: Record<SpinnerSize, string | undefined> = {
  sm: undefined, // uses Bootstrap's default size
  md: '80px',
  lg: '160px',
};

/**
 * Reusable loading spinner that replaces the 5+ duplicated spinner
 * blocks across the app. Uses Bootstrap's spinner-border with the
 * app's info color, and supports three sizes plus an optional
 * full-page centering mode for route-level loading states.
 */
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size,
  fullPage,
}: LoadingSpinnerProps) => {
  const dimension = SIZES[size];

  const spinnerStyle: React.CSSProperties = dimension
    ? { width: dimension, height: dimension }
    : {};

  const spinner = (
    <div
      className="spinner-border text-info"
      role="status"
      style={spinnerStyle}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );

  if (fullPage) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
        }}
      >
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;
