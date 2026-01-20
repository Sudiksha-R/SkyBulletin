import React from 'react';
type OfflineBannerProps = {
  isOffline: boolean;
  lastUpdatedLabel?: string | null;
};
export function OfflineBanner({
  isOffline,
  lastUpdatedLabel
}: OfflineBannerProps) {
  if (!isOffline) return null;
  return <div className="sb-offline" role="status" aria-live="polite">
      <strong>Offline</strong>
      <span style={{
      marginLeft: 10,
      opacity: 0.9
    }}>
        Showing last saved weather
        {lastUpdatedLabel ? ` • Updated: ${lastUpdatedLabel}` : ''}
      </span>
    </div>;
}