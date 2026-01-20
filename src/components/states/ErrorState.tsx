import React from 'react';
type ErrorStateProps = {
  title?: string;
  message?: string;
  onRetry?: () => void;
};
export function ErrorState({
  title = "Couldn't load weather",
  message = 'Please check your connection and try again.',
  onRetry
}: ErrorStateProps) {
  return <div className="sb-error" role="alert">
      <div className="sb-error__head">
        <span className="sb-error__dot" aria-hidden="true" />
        <h3 className="sb-error__title">{title}</h3>
      </div>
      <p className="sb-error__msg">{message}</p>
      {onRetry ? <button className="sb-btn" onClick={onRetry}>
          Retry
        </button> : null}
    </div>;
}