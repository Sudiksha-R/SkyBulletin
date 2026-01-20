export interface WeatherCondition {
  temp: number;
  condition: string;
  high: number;
  low: number;
  windSpeed: number;
  humidity: number;
  precipitation: number;
  icon: 'sun' | 'cloud' | 'rain' | 'storm' | 'snow' | 'partly-cloudy';
}
export interface HourlyForecast {
  time: string;
  temp: number;
  condition: string;
  precipChance: number;
  icon: 'sun' | 'cloud' | 'rain' | 'storm' | 'snow' | 'partly-cloudy';
  windSpeed?: number;
  humidity?: number;
}
export interface DailyForecast {
  day: string;
  date: string;
  high: number;
  low: number;
  condition: string;
  precipChance: number;
  windSpeed: number;
  humidity: number;
  icon: 'sun' | 'cloud' | 'rain' | 'storm' | 'snow' | 'partly-cloudy';
  hourlyData?: HourlyForecast[];
  sunrise?: string;
  sunset?: string;
  uvIndex?: number;
  visibility?: string;
}
export interface LocationWeather {
  id: string;
  city: string;
  country?: string;
  temp: number;
  condition: string;
  high: number;
  low: number;
  isCurrent?: boolean;
  isFavorite?: boolean;
  label?: 'Home' | 'Work' | 'Work 2' | string;
  lat?: number;
  lon?: number;
  timezone?: string;
  contextRole?: 'current' | 'next' | 'home' | 'saved';
  moodPreset?: CityMoodPreset;
}
export interface WeatherAlert {
  id: string;
  type: 'warning' | 'watch' | 'advisory';
  severity: 'extreme' | 'severe' | 'moderate' | 'minor';
  title: string;
  description: string;
  startTime: string;
  endTime: string;
}
export type TabType = 'today' | '5day' | 'monthly';
export type TemperatureUnit = 'celsius' | 'fahrenheit';
export type TimeFormat = '12h' | '24h';
export type WeatherTheme = 'sunny' | 'rainy' | 'cloudy' | 'stormy' | 'snowy' | 'partly-cloudy' | 'foggy' | 'windy' | 'clear-night' | 'heatwave' | 'tornado' | 'blizzard';
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  cardBg: string;
  text: string;
  textSecondary: string;
}
export interface WeatherThemeConfig {
  name: string;
  colors: ThemeColors;
  gradient: string[];
  animation: 'sunny' | 'rainy' | 'cloudy' | 'stormy' | 'snowy' | 'none';
  icon: 'sun' | 'cloud' | 'rain' | 'storm' | 'snow' | 'partly-cloudy';
}

// Multi-City Split Awareness Types
export interface CityMoodPreset {
  visualIntensity: 'calm' | 'balanced' | 'expressive';
  soundLevel: number; // 0-1
  contrastPreference: 'standard' | 'high';
  accentColor?: string;
  purpose?: 'work' | 'leisure' | 'home' | 'routine';
}
export interface LocationContext {
  current: LocationWeather | null;
  next: LocationWeather | null;
  home: LocationWeather | null;
  transitionProgress: number; // 0-1 for smooth interpolation
}
export interface LocationContextPreferences {
  defaultLanguage: string;
  defaultSoundLevel: number;
  defaultContrast: 'standard' | 'high';
  travelFrequency: 'low' | 'medium' | 'high';
}