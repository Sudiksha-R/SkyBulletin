import React from 'react';
import { Skeleton } from '../ui/Skeleton';
export function CurrentWeatherSkeleton() {
  return <div className="card">
      <Skeleton style={{
      height: 18,
      width: 140,
      marginBottom: 12
    }} />
      <Skeleton style={{
      height: 44,
      width: 220,
      marginBottom: 12
    }} />
      <div style={{
      display: 'flex',
      gap: 12
    }}>
        <Skeleton style={{
        height: 80,
        flex: 1
      }} />
        <Skeleton style={{
        height: 80,
        flex: 1
      }} />
      </div>
    </div>;
}