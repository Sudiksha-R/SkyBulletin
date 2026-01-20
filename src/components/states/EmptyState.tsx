import React from 'react';
type EmptyStateProps = {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
};
export function EmptyState({
  title,
  description,
  actionLabel,
  onAction
}: EmptyStateProps) {
  return <div className="sb-empty" role="status" aria-live="polite">
      <div className="sb-empty__icon" aria-hidden="true">
        {/* Simple inline illustration (no dependency) */}
        <svg width="76" height="76" viewBox="0 0 64 64" fill="none">
          <path d="M22 40c-5.5 0-10-4.5-10-10 0-5 3.6-9.2 8.4-9.9C22.4 14.9 27 11 32.5 11c6.2 0 11.3 4.9 11.8 11.1C49.7 23 54 27.1 54 32.2 54 37.6 49.6 42 44.2 42H22z" stroke="currentColor" strokeWidth="2" opacity="0.8" />
          <path d="M24 49h16" stroke="currentColor" strokeWidth="2" opacity="0.6" />
        </svg>
      </div>

      <h3 className="sb-empty__title">{title}</h3>
      {description ? <p className="sb-empty__desc">{description}</p> : null}

      {actionLabel && onAction ? <button className="sb-btn" onClick={onAction}>
          {actionLabel}
        </button> : null}
    </div>;
}