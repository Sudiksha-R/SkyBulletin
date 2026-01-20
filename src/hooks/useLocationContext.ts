import { useState, useEffect, useCallback } from 'react';
import { LocationWeather, LocationContext, CityMoodPreset } from '../types/weather';
import { LocationContextManager } from '../utils/locationContext';
export function useLocationContext(locations: LocationWeather[]) {
  const [context, setContext] = useState<LocationContext>({
    current: null,
    next: null,
    home: null,
    transitionProgress: 1
  });
  const [transitionStartTime, setTransitionStartTime] = useState<number>(0);

  // Load saved context on mount
  useEffect(() => {
    const savedContext = LocationContextManager.loadContext();
    if (savedContext) {
      setContext(savedContext);
    } else {
      // Initialize with first location as current
      if (locations.length > 0) {
        const homeLocation = locations.find(loc => loc.label === 'Home') || locations[0];
        setContext({
          current: homeLocation,
          next: null,
          home: homeLocation,
          transitionProgress: 1
        });
      }
    }
  }, []);

  // Save context when it changes
  useEffect(() => {
    if (context.current || context.next || context.home) {
      LocationContextManager.saveContext(context);
    }
  }, [context]);

  // Animate transition progress
  useEffect(() => {
    if (transitionStartTime > 0 && context.transitionProgress < 1) {
      const animationFrame = requestAnimationFrame(() => {
        const progress = LocationContextManager.calculateTransitionProgress(transitionStartTime);
        setContext(prev => ({
          ...prev,
          transitionProgress: progress
        }));
      });
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [transitionStartTime, context.transitionProgress]);
  const setCurrentCity = useCallback((location: LocationWeather) => {
    setContext(prev => ({
      ...prev,
      current: location,
      transitionProgress: 0
    }));
    setTransitionStartTime(Date.now());
  }, []);
  const setNextCity = useCallback((location: LocationWeather | null) => {
    setContext(prev => ({
      ...prev,
      next: location
    }));
  }, []);
  const setHomeCity = useCallback((location: LocationWeather) => {
    setContext(prev => ({
      ...prev,
      home: location
    }));
  }, []);
  const getCurrentMoodPreset = useCallback((): CityMoodPreset => {
    if (!context.current) {
      return LocationContextManager.getDefaultMoodPreset();
    }
    const currentMood = context.current.moodPreset || LocationContextManager.getDefaultMoodPreset(context.current.label);

    // If transitioning to next city, interpolate moods
    if (context.next && context.transitionProgress < 1) {
      const nextMood = context.next.moodPreset || LocationContextManager.getDefaultMoodPreset(context.next.label);
      return LocationContextManager.interpolateMoodPresets(currentMood, nextMood, context.transitionProgress);
    }
    return currentMood;
  }, [context]);
  const getContextAccentColor = useCallback((): string => {
    const mood = getCurrentMoodPreset();
    return LocationContextManager.getContextAccentColor(mood, context.next || undefined);
  }, [context, getCurrentMoodPreset]);
  return {
    context,
    setCurrentCity,
    setNextCity,
    setHomeCity,
    getCurrentMoodPreset,
    getContextAccentColor
  };
}