
# Dynamic Weather-Based UI Theming Implementation Plan

## Overview
This plan outlines how to implement dynamic weather-based theming in the Sky Bulletin dashboard, where UI colors, typography, animations, and sounds adapt to current weather conditions.

---

## 1. Data Model for Weather State + Theme Tokens

### Weather Theme State Interface

```typescript
// types/theme.ts

export type WeatherCondition = 'sunny' | 'rainy' | 'cloudy' | 'stormy' | 'snowy';

export interface WeatherThemeTokens {
  // Color tokens
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    cardBg: string;
  };
  
  // Gradient configurations
  gradient: {
    type: 'sunbeams' | 'drifting-clouds' | 'rainfall' | 'snow-fall' | 'static';
    colors: string[];
    animationDuration: string; // e.g., '20s', '30s'
  };
  
  // Typography weight adjustments
  typography: {
    headingWeight: 'font-normal' | 'font-medium' | 'font-semibold' | 'font-bold' | 'font-extrabold';
    bodyWeight: 'font-light' | 'font-normal' | 'font-medium' | 'font-semibold';
    tempWeight: 'font-bold' | 'font-extrabold' | 'font-black';
  };
  
  // Motion preset
  motion: {
    preset: 'calm' | 'gentle' | 'dynamic' | 'intense';
    transitionDuration: string; // e.g., '300ms', '500ms'
    animationIntensity: number; // 0-1 scale
  };
  
  // Sound preset
  sound: {
    preset: 'silent' | 'ambient-rain' | 'wind-chimes' | 'thunder-distant' | 'birds-chirping';
    volume: number; // 0-1 scale
    enabled: boolean;
  };
}

export interface WeatherThemeState {
  condition: WeatherCondition;
  tokens: WeatherThemeTokens;
  timestamp: number;
  location: string;
}
```

### Theme Presets Configuration

```typescript
// config/themePresets.ts

export const WEATHER_THEME_PRESETS: Record<WeatherCondition, WeatherThemeTokens> = {
  sunny: {
    colors: {
      primary: '#FFD700',        // Vibrant yellow
      secondary: '#87CEEB',      // Sky blue
      accent: '#FFA500',         // Orange accent
      background: '#FFFACD',     // Light yellow background
      text: '#2C3E50',           // Dark text for contrast
      cardBg: '#FFFFFF',
    },
    gradient: {
      type: 'sunbeams',
      colors: ['#FFD700', '#FFA500', '#FF8C00', '#FFD700'],
      animationDuration: '20s',
    },
    typography: {
      headingWeight: 'font-semibold',
      bodyWeight: 'font-normal',
      tempWeight: 'font-bold',
    },
    motion: {
      preset: 'gentle',
      transitionDuration: '500ms',
      animationIntensity: 0.6,
    },
    sound: {
      preset: 'birds-chirping',
      volume: 0.3,
      enabled: true,
    },
  },
  
  rainy: {
    colors: {
      primary: '#4A5568',        // Deep gray
      secondary: '#2C5282',      // Navy blue
      accent: '#4299E1',         // Lighter blue highlight
      background: '#E2E8F0',     // Light gray background
      text: '#1A202C',           // Very dark text
      cardBg: '#F7FAFC',
    },
    gradient: {
      type: 'rainfall',
      colors: ['#4A5568', '#2D3748', '#1A202C', '#4A5568'],
      animationDuration: '15s',
    },
    typography: {
      headingWeight: 'font-medium',
      bodyWeight: 'font-normal',
      tempWeight: 'font-bold',
    },
    motion: {
      preset: 'dynamic',
      transitionDuration: '400ms',
      animationIntensity: 0.8,
    },
    sound: {
      preset: 'ambient-rain',
      volume: 0.4,
      enabled: true,
    },
  },
  
  stormy: {
    colors: {
      primary: '#2D3748',        // Very deep gray
      secondary: '#1A365D',      // Dark navy
      accent: '#ED8936',         // Orange/amber for alerts
      background: '#2D3748',     // Dark background
      text: '#F7FAFC',           // Light text for dark mode
      cardBg: '#4A5568',
    },
    gradient: {
      type: 'rainfall',
      colors: ['#1A202C', '#2D3748', '#4A5568', '#1A202C'],
      animationDuration: '10s',
    },
    typography: {
      headingWeight: 'font-extrabold',  // Heavier for readability
      bodyWeight: 'font-semibold',      // Heavier for readability
      tempWeight: 'font-black',         // Maximum weight
    },
    motion: {
      preset: 'intense',
      transitionDuration: '300ms',
      animationIntensity: 1.0,
    },
    sound: {
      preset: 'thunder-distant',
      volume: 0.5,
      enabled: true,
    },
  },
  
  cloudy: {
    colors: {
      primary: '#718096',        // Medium gray
      secondary: '#4A5568',      // Darker gray
      accent: '#A0AEC0',         // Light gray accent
      background: '#EDF2F7',     // Very light gray
      text: '#2D3748',           // Dark gray text
      cardBg: '#FFFFFF',
    },
    gradient: {
      type: 'drifting-clouds',
      colors: ['#CBD5E0', '#E2E8F0', '#F7FAFC', '#CBD5E0'],
      animationDuration: '30s',
    },
    typography: {
      headingWeight: 'font-medium',
      bodyWeight: 'font-normal',
      tempWeight: 'font-bold',
    },
    motion: {
      preset: 'calm',
      transitionDuration: '600ms',
      animationIntensity: 0.4,
    },
    sound: {
      preset: 'wind-chimes',
      volume: 0.2,
      enabled: true,
    },
  },
  
  snowy: {
    colors: {
      primary: '#E2E8F0',        // Very light gray/white
      secondary: '#CBD5E0',      // Light gray
      accent: '#63B3ED',         // Icy blue
      background: '#F7FAFC',     // Almost white
      text: '#2D3748',           // Dark text
      cardBg: '#FFFFFF',
    },
    gradient: {
      type: 'snow-fall',
      colors: ['#F7FAFC', '#EDF2F7', '#E2E8F0', '#F7FAFC'],
      animationDuration: '25s',
    },
    typography: {
      headingWeight: 'font-semibold',
      bodyWeight: 'font-normal',
      tempWeight: 'font-bold',
    },
    motion: {
      preset: 'gentle',
      transitionDuration: '500ms',
      animationIntensity: 0.5,
    },
    sound: {
      preset: 'silent',
      volume: 0.1,
      enabled: false,
    },
  },
};
```

---

## 2. Tailwind-Compatible CSS Strategy

### CSS Variables Approach

```css
/* index.css - Add CSS variables for dynamic theming */

:root {
  /* Color tokens - updated dynamically via JavaScript */
  --color-primary: #FFD700;
  --color-secondary: #87CEEB;
  --color-accent: #FFA500;
  --color-background: #FFFACD;
  --color-text: #2C3E50;
  --color-card-bg: #FFFFFF;
  
  /* Gradient tokens */
  --gradient-color-1: #FFD700;
  --gradient-color-2: #FFA500;
  --gradient-color-3: #FF8C00;
  --gradient-color-4: #FFD700;
  --gradient-duration: 20s;
  
  /* Motion tokens */
  --transition-duration: 500ms;
  --animation-intensity: 0.6;
  
  /* Typography tokens */
  --heading-weight: 600;
  --body-weight: 400;
  --temp-weight: 700;
}

/* Animated background gradients */
.bg-weather-gradient {
  background: linear-gradient(
    135deg,
    var(--gradient-color-1),
    var(--gradient-color-2),
    var(--gradient-color-3),
    var(--gradient-color-4)
  );
  background-size: 400% 400%;
  transition: background var(--transition-duration) ease-in-out;
}

/* Sunbeams animation */
@keyframes sunbeams {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-sunbeams {
  animation: sunbeams var(--gradient-duration) ease infinite;
}

/* Drifting clouds animation */
@keyframes drifting-clouds {
  0% { background-position: 0% 0%; }
  100% { background-position: 100% 0%; }
}

.animate-drifting-clouds {
  animation: drifting-clouds var(--gradient-duration) linear infinite;
  background-size: 200% 100%;
}

/* Rainfall animation */
@keyframes rainfall {
  0% { background-position: 0% 0%; }
  100% { background-position: 0% 100%; }
}

.animate-rainfall {
  animation: rainfall var(--gradient-duration) linear infinite;
  background-size: 100% 200%;
}

/* Snowfall animation */
@keyframes snowfall {
  0% { background-position: 0% 0%; }
  100% { background-position: 0% 100%; }
}

.animate-snowfall {
  animation: snowfall var(--gradient-duration) ease-in-out infinite;
  background-size: 100% 200%;
}

/* Micro-animations for weather moods */
@keyframes pulse-calm {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.02); opacity: 0.95; }
}

@keyframes pulse-intense {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.9; }
}

.animate-pulse-calm {
  animation: pulse-calm 3s ease-in-out infinite;
}

.animate-pulse-intense {
  animation: pulse-intense 1.5s ease-in-out infinite;
}

/* Accessibility: Respect prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  .bg-weather-gradient,
  .animate-sunbeams,
  .animate-drifting-clouds,
  .animate-rainfall,
  .animate-snowfall,
  .animate-pulse-calm,
  .animate-pulse-intense {
    animation: none !important;
    transition: none !important;
  }
}

/* Dynamic typography weights */
.heading-dynamic {
  font-weight: var(--heading-weight);
}

.body-dynamic {
  font-weight: var(--body-weight);
}

.temp-dynamic {
  font-weight: var(--temp-weight);
}
```

### Tailwind Config Extension

```javascript
// tailwind.config.js - Extend with custom utilities

module.exports = {
  theme: {
    extend: {
      colors: {
        'weather-primary': 'var(--color-primary)',
        'weather-secondary': 'var(--color-secondary)',
        'weather-accent': 'var(--color-accent)',
        'weather-bg': 'var(--color-background)',
        'weather-text': 'var(--color-text)',
        'weather-card': 'var(--color-card-bg)',
      },
      fontWeight: {
        'dynamic-heading': 'var(--heading-weight)',
        'dynamic-body': 'var(--body-weight)',
        'dynamic-temp': 'var(--temp-weight)',
      },
      transitionDuration: {
        'dynamic': 'var(--transition-duration)',
      },
    },
  },
  plugins: [],
}
```

---

## 3. Theme Update Logic (Pseudocode)

### React Hook for Weather Theme Management

```typescript
// hooks/useWeatherTheme.ts

import { useState, useEffect, useCallback } from 'react';
import { WeatherCondition, WeatherThemeState, WeatherThemeTokens } from '../types/theme';
import { WEATHER_THEME_PRESETS } from '../config/themePresets';

export function useWeatherTheme(currentWeather: WeatherCondition) {
  const [themeState, setThemeState] = useState<WeatherThemeState | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Apply theme to CSS variables
  const applyThemeToDOM = useCallback((tokens: WeatherThemeTokens) => {
    const root = document.documentElement;
    
    // Apply color tokens
    root.style.setProperty('--color-primary', tokens.colors.primary);
    root.style.setProperty('--color-secondary', tokens.colors.secondary);
    root.style.setProperty('--color-accent', tokens.colors.accent);
    root.style.setProperty('--color-background', tokens.colors.background);
    root.style.setProperty('--color-text', tokens.colors.text);
    root.style.setProperty('--color-card-bg', tokens.colors.cardBg);
    
    // Apply gradient tokens
    root.style.setProperty('--gradient-color-1', tokens.gradient.colors[0]);
    root.style.setProperty('--gradient-color-2', tokens.gradient.colors[1]);
    root.style.setProperty('--gradient-color-3', tokens.gradient.colors[2]);
    root.style.setProperty('--gradient-color-4', tokens.gradient.colors[3]);
    root.style.setProperty('--gradient-duration', tokens.gradient.animationDuration);
    
    // Apply typography tokens
    const headingWeightMap = {
      'font-normal': '400',
      'font-medium': '500',
      'font-semibold': '600',
      'font-bold': '700',
      'font-extrabold': '800',
    };
    const bodyWeightMap = {
      'font-light': '300',
      'font-normal': '400',
      'font-medium': '500',
      'font-semibold': '600',
    };
    const tempWeightMap = {
      'font-bold': '700',
      'font-extrabold': '800',
      'font-black': '900',
    };
    
    root.style.setProperty('--heading-weight', headingWeightMap[tokens.typography.headingWeight]);
    root.style.setProperty('--body-weight', bodyWeightMap[tokens.typography.bodyWeight]);
    root.style.setProperty('--temp-weight', tempWeightMap[tokens.typography.tempWeight]);
    
    // Apply motion tokens (respect prefers-reduced-motion)
    if (!prefersReducedMotion) {
      root.style.setProperty('--transition-duration', tokens.motion.transitionDuration);
      root.style.setProperty('--animation-intensity', tokens.motion.animationIntensity.toString());
    } else {
      root.style.setProperty('--transition-duration', '0ms');
      root.style.setProperty('--animation-intensity', '0');
    }
    
    // Apply gradient animation class to body
    const body = document.body;
    body.classList.remove(
      'animate-sunbeams',
      'animate-drifting-clouds',
      'animate-rainfall',
      'animate-snowfall'
    );
    
    if (!prefersReducedMotion) {
      switch (tokens.gradient.type) {
        case 'sunbeams':
          body.classList.add('animate-sunbeams');
          break;
        case 'drifting-clouds':
          body.classList.add('animate-drifting-clouds');
          break;
        case 'rainfall':
          body.classList.add('animate-rainfall');
          break;
        case 'snow-fall':
          body.classList.add('animate-snowfall');
          break;
      }
    }
  }, [prefersReducedMotion]);

  // Play ambient sound
  const playAmbientSound = useCallback((soundPreset: string, volume: number) => {
    if (!soundEnabled) return;
    
    // Pseudocode for sound playback
    // const audio = new Audio(`/sounds/${soundPreset}.mp3`);
    // audio.volume = volume;
    // audio.loop = true;
    // audio.play();
    
    console.log(`Playing ambient sound: ${soundPreset} at volume ${volume}`);
  }, [soundEnabled]);

  // Update theme when weather changes
  useEffect(() => {
    const tokens = WEATHER_THEME_PRESETS[currentWeather];
    
    if (!tokens) {
      console.warn(`No theme preset found for weather: ${currentWeather}`);
      return;
    }
    
    // Create new theme state
    const newThemeState: WeatherThemeState = {
      condition: currentWeather,
      tokens,
      timestamp: Date.now(),
      location: 'Current Location', // Replace with actual location
    };
    
    // Apply theme to DOM
    applyThemeToDOM(tokens);
    
    // Play ambient sound
    if (tokens.sound.enabled && soundEnabled) {
      playAmbientSound(tokens.sound.preset, tokens.sound.volume);
    }
    
    // Update state
    setThemeState(newThemeState);
    
    console.log(`Theme updated to: ${currentWeather}`, tokens);
  }, [currentWeather, soundEnabled, applyThemeToDOM, playAmbientSound]);

  // Toggle sound
  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => !prev);
  }, []);

  return {
    themeState,
    soundEnabled,
    toggleSound,
    prefersReducedMotion,
  };
}
```

### Theme Update Flow (Pseudocode)

```typescript
// Pseudocode: How theme updates when forecast changes

FUNCTION updateThemeBasedOnWeather(newWeatherCondition: WeatherCondition):
  
  // Step 1: Fetch theme preset for new weather condition
  themeTokens = WEATHER_THEME_PRESETS[newWeatherCondition]
  
  IF themeTokens is NULL:
    LOG "No theme preset found, using default"
    RETURN
  
  // Step 2: Check accessibility preferences
  prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  soundEnabled = getUserSoundPreference() // from localStorage or settings
  
  // Step 3: Apply color tokens to CSS variables
  FOR EACH colorKey IN themeTokens.colors:
    document.documentElement.style.setProperty(`--color-${colorKey}`, themeTokens.colors[colorKey])
  
  // Step 4: Apply gradient tokens
  FOR EACH gradientColor IN themeTokens.gradient.colors:
    document.documentElement.style.setProperty(`--gradient-color-${index}`, gradientColor)
  
  document.documentElement.style.setProperty('--gradient-duration', themeTokens.gradient.animationDuration)
  
  // Step 5: Apply typography weights
  document.documentElement.style.setProperty('--heading-weight', convertWeightToNumber(themeTokens.typography.headingWeight))
  document.documentElement.style.setProperty('--body-weight', convertWeightToNumber(themeTokens.typography.bodyWeight))
  document.documentElement.style.setProperty('--temp-weight', convertWeightToNumber(themeTokens.typography.tempWeight))
  
  // Step 6: Apply motion settings (respect prefers-reduced-motion)
  IF prefersReducedMotion:
    document.documentElement.style.setProperty('--transition-duration', '0ms')
    document.documentElement.style.setProperty('--animation-intensity', '0')
    removeAllAnimationClasses()
  ELSE:
    document.documentElement.style.setProperty('--transition-duration', themeTokens.motion.transitionDuration)
    document.documentElement.style.setProperty('--animation-intensity', themeTokens.motion.animationIntensity)
    applyGradientAnimationClass(themeTokens.gradient.type)
  
  // Step 7: Handle ambient sound
  IF soundEnabled AND themeTokens.sound.enabled:
    stopCurrentAmbientSound()
    playAmbientSound(themeTokens.sound.preset, themeTokens.sound.volume)
  ELSE:
    stopCurrentAmbientSound()
  
  // Step 8: Apply micro-animations based on motion preset
  IF NOT prefersReducedMotion:
    SWITCH themeTokens.motion.preset:
      CASE 'calm':
        addMicroAnimationClass('animate-pulse-calm')
      CASE 'intense':
        addMicroAnimationClass('animate-pulse-intense')
      DEFAULT:
        removeMicroAnimationClasses()
  
  // Step 9: Log theme change for analytics
  logThemeChange(newWeatherCondition, themeTokens, timestamp)
  
  // Step 10: Trigger re-render of components using theme
  notifyComponentsOfThemeChange()

END FUNCTION


// Helper: Apply gradient animation class
FUNCTION applyGradientAnimationClass(gradientType: string):
  body = document.body
  
  // Remove existing animation classes
  body.classList.remove('animate-sunbeams', 'animate-drifting-clouds', 'animate-rainfall', 'animate-snowfall')
  
  // Add new animation class
  SWITCH gradientType:
    CASE 'sunbeams':
      body.classList.add('bg-weather-gradient', 'animate-sunbeams')
    CASE 'drifting-clouds':
      body.classList.add('bg-weather-gradient', 'animate-drifting-clouds')
    CASE 'rainfall':
      body.classList.add('bg-weather-gradient', 'animate-rainfall')
    CASE 'snow-fall':
      body.classList.add('bg-weather-gradient', 'animate-snowfall')
    DEFAULT:
      body.classList.add('bg-weather-gradient')

END FUNCTION


// Helper: Convert Tailwind weight class to CSS number
FUNCTION convertWeightToNumber(weightClass: string): string
  weightMap = {
    'font-light': '300',
    'font-normal': '400',
    'font-medium': '500',
    'font-semibold': '600',
    'font-bold': '700',
    'font-extrabold': '800',
    'font-black': '900',
  }
  
  RETURN weightMap[weightClass] OR '400'

END FUNCTION
```

---

## 4. Accessibility Hooks

### Prefers-Reduced-Motion Hook

```typescript
// hooks/usePrefersReducedMotion.ts

import { useState, useEffect } from 'react';

export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check initial preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for changes
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
      
      // When user enables reduced motion, remove all animations
      if (event.matches) {
        document.body.classList.remove(
          'animate-sunbeams',
          'animate-drifting-clouds',
          'animate-rainfall',
          'animate-snowfall',
          'animate-pulse-calm',
          'animate-pulse-intense'
        );
        
        // Set transition duration to 0
        document.documentElement.style.setProperty('--transition-duration', '0ms');
        document.documentElement.style.setProperty('--animation-intensity', '0');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return prefersReducedMotion;
}
```

### Sound Toggle Hook

```typescript
// hooks/useSoundToggle.ts

import { useState, useEffect, useCallback } from 'react';

interface SoundControl {
  enabled: boolean;
  toggle: () => void;
  setVolume: (volume: number) => void;
  volume: number;
}

export function useSoundToggle(): SoundControl {
  const [enabled, setEnabled] = useState(() => {
    // Load from localStorage
    const saved = localStorage.getItem('weather-sound-enabled');
    return saved !== null ? JSON.parse(saved) : true;
  });
  
  const [volume, setVolumeState] = useState(() => {
    const saved = localStorage.getItem('weather-sound-volume');
    return saved !== null ? parseFloat(saved) : 0.5;
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('weather-sound-enabled', JSON.stringify(enabled));
  }, [enabled]);

  useEffect(() => {
    localStorage.setItem('weather-sound-volume', volume.toString());
  }, [volume]);

  const toggle = useCallback(() => {
    setEnabled(prev => {
      const newValue = !prev;
      
      // If disabling, stop all ambient sounds
      if (!newValue) {
        // Pseudocode: stop all audio
        // audioManager.stopAll();
        console.log('Stopping all ambient sounds');
      }
      
      return newValue;
    });
  }, []);

  const setVolume = useCallback((newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolumeState(clampedVolume);
    
    // Update volume of currently playing sounds
    // audioManager.setGlobalVolume(clampedVolume);
    console.log(`Setting global volume to ${clampedVolume}`);
  }, []);

  return {
    enabled,
    toggle,
    setVolume,
    volume,
  };
}
```

### Accessibility Settings Component

```typescript
// components/AccessibilitySettings.tsx

import React from 'react';
import { Volume2, VolumeX, Zap, ZapOff } from 'lucide-react';

interface AccessibilitySettingsProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  soundVolume: number;
  onVolumeChange: (volume: number) => void;
  prefersReducedMotion: boolean;
}

export function AccessibilitySettings({
  soundEnabled,
  onToggleSound,
  soundVolume,
  onVolumeChange,
  prefersReducedMotion,
}: AccessibilitySettingsProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
        Accessibility
      </h3>

      {/* Sound Toggle */}
      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800 rounded-lg">
        <div className="flex items-center gap-3">
          {soundEnabled ? (
            <Volume2 className="h-5 w-5 text-blue-500" />
          ) : (
            <VolumeX className="h-5 w-5 text-gray-400" />
          )}
          <div>
            <p className="font-medium text-gray-900 dark:text-white">
              Ambient Sounds
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Weather-based audio feedback
            </p>
          </div>
        </div>
        <button
          onClick={onToggleSound}
          className={`
            relative inline-flex h-6 w-11 items-center rounded-full
            transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            ${soundEnabled ? 'bg-blue-600' : 'bg-gray-300'}
          `}
          role="switch"
          aria-checked={soundEnabled}
          aria-label="Toggle ambient sounds"
        >
          <span
            className={`
              inline-block h-4 w-4 transform rounded-full bg-white transition-transform
              ${soundEnabled ? 'translate-x-6' : 'translate-x-1'}
            `}
          />
        </button>
      </div>

      {/* Volume Slider (only shown when sound is enabled) */}
      {soundEnabled && (
        <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Volume: {Math.round(soundVolume * 100)}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={soundVolume * 100}
            onChange={(e) => onVolumeChange(parseInt(e.target.value) / 100)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            aria-label="Adjust sound volume"
          />
        </div>
      )}

      {/* Reduced Motion Indicator */}
      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800 rounded-lg">
        <div className="flex items-center gap-3">
          {prefersReducedMotion ? (
            <ZapOff className="h-5 w-5 text-gray-400" />
          ) : (
            <Zap className="h-5 w-5 text-blue-500" />
          )}
          <div>
            <p className="font-medium text-gray-900 dark:text-white">
              Animations
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {prefersReducedMotion
                ? 'Reduced motion enabled (system preference)'
                : 'Full animations enabled'}
            </p>
          </div>
        </div>
        <span
          className={`
            px-2 py-1 text-xs font-medium rounded
            ${prefersReducedMotion
              ? 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
              : 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'}
          `}
        >
          {prefersReducedMotion ? 'Reduced' : 'Active'}
        </span>
      </div>

      {/* Info Box */}
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <p className="text-xs text-blue-800 dark:text-blue-200">
          <strong>Accessibility Note:</strong> Weather-based animations and sounds
          automatically respect your system preferences. You can override these
          settings here.
        </p>
      </div>
    </div>
  );
}
```

---

## 5. Smart Location Suggestions (Bonus Feature)

### Travel Frequency Tracking

```typescript
// utils/travelTracker.ts

interface LocationVisit {
  city: string;
  country: string;
  timestamp: number;
  duration: number; // in milliseconds
}

interface TravelPattern {
  frequentLocations: string[];
  upcomingDestinations: string[];
  travelFrequency: 'low' | 'medium' | 'high';
}

export class TravelTracker {
  private visits: LocationVisit[] = [];
  private readonly STORAGE_KEY = 'weather-travel-history';
  private readonly HIGH_FREQUENCY_THRESHOLD = 5; // visits per month
  private readonly MEDIUM_FREQUENCY_THRESHOLD = 2;

  constructor() {
    this.loadFromStorage();
  }

  // Track a location visit
  trackVisit(city: string, country: string, duration: number = 0): void {
    const visit: LocationVisit = {
      city,
      country,
      timestamp: Date.now(),
      duration,
    };

    this.visits.push(visit);
    this.saveToStorage();
  }

  // Analyze travel patterns
  analyzeTravelPattern(): TravelPattern {
    const now = Date.now();
    const oneMonthAgo = now - (30 * 24 * 60 * 60 * 1000);
    
    // Filter visits from last month
    const recentVisits = this.visits.filter(v => v.timestamp > oneMonthAgo);
    
    // Count visits per location
    const locationCounts = new Map<string, number>();
    recentVisits.forEach(visit => {
      const key = `${visit.city}, ${visit.country}`;
      locationCounts.set(key, (locationCounts.get(key) || 0) + 1);
    });
    
    // Sort by frequency
    const sortedLocations = Array.from(locationCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([location]) => location);
    
    // Determine travel frequency
    const totalVisits = recentVisits.length;
    let travelFrequency: 'low' | 'medium' | 'high';
    
    if (totalVisits >= this.HIGH_FREQUENCY_THRESHOLD) {
      travelFrequency = 'high';
    } else if (totalVisits >= this.MEDIUM_FREQUENCY_THRESHOLD) {
      travelFrequency = 'medium';
    } else {
      travelFrequency = 'low';
    }
    
    return {
      frequentLocations: sortedLocations.slice(0, 5),
      upcomingDestinations: this.predictUpcomingDestinations(sortedLocations),
      travelFrequency,
    };
  }

  // Predict upcoming destinations based on patterns
  private predictUpcomingDestinations(frequentLocations: string[]): string[] {
    // Simple heuristic: suggest top 3 frequent locations
    // In production, use ML model or calendar integration
    return frequentLocations.slice(0, 3);
  }

  // Suggest locations for dashboard
  suggestLocationsForDashboard(): string[] {
    const pattern = this.analyzeTravelPattern();
    
    if (pattern.travelFrequency === 'high') {
      // Show upcoming destinations prominently
      return pattern.upcomingDestinations;
    } else {
      // Show frequent locations
      return pattern.frequentLocations;
    }
  }

  private saveToStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.visits));
  }

  private loadFromStorage(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      this.visits = JSON.parse(stored);
    }
  }
}

// Usage example
const travelTracker = new TravelTracker();

// Track when user views a location
travelTracker.trackVisit('San Francisco', 'USA', 3600000); // 1 hour

// Get suggestions
const suggestions = travelTracker.suggestLocationsForDashboard();
console.log('Suggested locations:', suggestions);
```

---

## 6. Integration Example

### Updated App.tsx with Theme System

```typescript
// App.tsx - Integrated with weather theming

import React, { useState, useEffect } from 'react';
import { useWeatherTheme } from './hooks/useWeatherTheme';
import { useSoundToggle } from './hooks/useSoundToggle';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';
import { WeatherCondition } from './types/theme';
// ... other imports

export function App() {
  const [activeTab, setActiveTab] = useState<TabType>('today');
  const [darkMode, setDarkMode] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  
  // Weather condition (derived from current weather data)
  const [currentWeatherCondition, setCurrentWeatherCondition] = useState<WeatherCondition>('sunny');
  
  // Weather theme system
  const { themeState } = useWeatherTheme(currentWeatherCondition);
  const { enabled: soundEnabled, toggle: toggleSound, volume, setVolume } = useSoundToggle();
  const prefersReducedMotion = usePrefersReducedMotion();

  // Derive weather condition from actual weather data
  useEffect(() => {
    // Pseudocode: Map actual weather to theme condition
    // const condition = mapWeatherDataToCondition(currentWeatherData);
    // setCurrentWeatherCondition(condition);
    
    // Example: Change theme every 10 seconds for demo
    const conditions: WeatherCondition[] = ['sunny', 'rainy', 'cloudy', 'stormy', 'snowy'];
    let index = 0;
    
    const interval = setInterval(() => {
      index = (index + 1) % conditions.length;
      setCurrentWeatherCondition(conditions[index]);
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`min-h-screen w-full bg-weather-bg transition-colors duration-dynamic ${darkMode ? 'dark' : ''}`}>
      {/* Background gradient with animation */}
      <div className="fixed inset-0 bg-weather-gradient -z-10" />
      
      <Header 
        darkMode={darkMode} 
        toggleDarkMode={() => setDarkMode(!darkMode)}
        toggleSettings={() => setSettingsOpen(true)}
      />
      
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        {/* Weather condition indicator */}
        <div className="mb-4 flex items-center gap-2 text-weather-text">
          <span className="text-sm font-dynamic-body">
            Current theme: <strong className="font-dynamic-heading">{currentWeatherCondition}</strong>
          </span>
        </div>
        
        {/* Main content with dynamic typography */}
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            {activeTab === 'today' && (
              <div className="animate-in fade-in duration-500">
                <CurrentWeatherCard />
                <HourlyForecast />
              </div>
            )}
            
            {activeTab === '5day' && (
              <div className="animate-in fade-in duration-500">
                <DailyForecast />
              </div>
            )}
            
            {activeTab === 'monthly' && (
              <div className="animate-in fade-in duration-500">
                <MonthlyCalendar />
              </div>
            )}
          </div>

          <div className="w-full lg:w-80 space-y-6">
            <OtherLocations locations={otherLocations} />
          </div>
        </div>
      </main>

      <SettingsPanel 
        isOpen={settingsOpen} 
        onClose={() => setSettingsOpen(false)}
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(!darkMode)}
      >
        {/* Add accessibility settings to settings panel */}
        <AccessibilitySettings
          soundEnabled={soundEnabled}
          onToggleSound={toggleSound}
          soundVolume={volume}
          onVolumeChange={setVolume}
          prefersReducedMotion={prefersReducedMotion}
        />
      </SettingsPanel>
    </div>
  );
}
```

---

## 7. Summary

This implementation plan provides:

1. **Data Model**: Complete TypeScript interfaces for weather theme state and tokens
2. **CSS Strategy**: CSS variables + Tailwind utilities for dynamic theming
3. **Theme Update Logic**: React hooks and pseudocode for automatic theme switching
4. **Accessibility**: Hooks for prefers-reduced-motion and sound toggle with localStorage persistence
5. **Bonus**: Travel frequency tracking for smart location suggestions

### Key Features:
- ✅ Weather-based color schemes (sunny, rainy, stormy, etc.)
- ✅ Animated background gradients (sunbeams, clouds, rainfall)
- ✅ Dynamic typography weights (heavier in storms)
- ✅ Mood presets with sounds and micro-animations
- ✅ Smart location suggestions based on travel patterns
- ✅ Full accessibility support (reduced motion, sound toggle)
- ✅ Tailwind-compatible with CSS variables
- ✅ TypeScript type safety throughout

### Next Steps:
1. Implement the hooks (useWeatherTheme, useSoundToggle, usePrefersReducedMotion)
2. Add CSS animations to index.css
3. Extend Tailwind config with custom utilities
4. Create AccessibilitySettings component
5. Integrate TravelTracker for location suggestions
6. Add ambient sound files and audio manager
7. Test across different weather conditions and accessibility settings
