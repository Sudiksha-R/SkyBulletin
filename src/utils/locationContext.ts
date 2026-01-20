import { LocationWeather, CityMoodPreset, LocationContext } from '../types/weather';
export class LocationContextManager {
  private static STORAGE_KEY = 'sky-bulletin-location-context';

  // Default mood presets based on location purpose
  static getDefaultMoodPreset(purpose?: string): CityMoodPreset {
    switch (purpose) {
      case 'work':
        return {
          visualIntensity: 'calm',
          soundLevel: 0.3,
          contrastPreference: 'high',
          purpose: 'work'
        };
      case 'leisure':
        return {
          visualIntensity: 'expressive',
          soundLevel: 0.6,
          contrastPreference: 'standard',
          purpose: 'leisure'
        };
      case 'home':
        return {
          visualIntensity: 'balanced',
          soundLevel: 0.5,
          contrastPreference: 'standard',
          purpose: 'home'
        };
      default:
        return {
          visualIntensity: 'balanced',
          soundLevel: 0.5,
          contrastPreference: 'standard',
          purpose: 'routine'
        };
    }
  }

  // Interpolate between two mood presets for smooth transitions
  static interpolateMoodPresets(from: CityMoodPreset, to: CityMoodPreset, progress: number): CityMoodPreset {
    return {
      visualIntensity: progress < 0.5 ? from.visualIntensity : to.visualIntensity,
      soundLevel: from.soundLevel + (to.soundLevel - from.soundLevel) * progress,
      contrastPreference: progress < 0.5 ? from.contrastPreference : to.contrastPreference,
      purpose: progress < 0.5 ? from.purpose : to.purpose
    };
  }

  // Determine context roles for locations
  static assignContextRoles(locations: LocationWeather[], currentCityId?: string, nextCityId?: string, homeCityId?: string): LocationWeather[] {
    return locations.map(loc => ({
      ...loc,
      contextRole: loc.id === currentCityId ? 'current' : loc.id === nextCityId ? 'next' : loc.id === homeCityId ? 'home' : 'saved'
    }));
  }

  // Save location context to localStorage
  static saveContext(context: LocationContext): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(context));
    } catch (error) {
      console.error('Failed to save location context:', error);
    }
  }

  // Load location context from localStorage
  static loadContext(): LocationContext | null {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Failed to load location context:', error);
      return null;
    }
  }

  // Get accent color based on mood and next city
  static getContextAccentColor(currentMood: CityMoodPreset, nextCity?: LocationWeather): string {
    if (nextCity && nextCity.moodPreset?.accentColor) {
      return nextCity.moodPreset.accentColor;
    }

    // Default accent colors based on visual intensity
    switch (currentMood.visualIntensity) {
      case 'calm':
        return '#64B5F6';
      // Soft blue
      case 'expressive':
        return '#FF6B6B';
      // Vibrant red
      case 'balanced':
        return '#4CAF50';
      // Balanced green
      default:
        return '#42A5F5';
    }
  }

  // Calculate transition progress based on time or user action
  static calculateTransitionProgress(startTime: number, duration: number = 2000): number {
    const elapsed = Date.now() - startTime;
    return Math.min(elapsed / duration, 1);
  }
}