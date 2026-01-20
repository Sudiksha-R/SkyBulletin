import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { TabNavigation } from './components/TabNavigation';
import { CurrentWeatherCard } from './components/CurrentWeatherCard';
import { HourlyForecast } from './components/HourlyForecast';
import { OtherLocations } from './components/OtherLocations';
import { DailyForecast } from './components/DailyForecast';
import { MonthlyCalendar } from './components/MonthlyCalendar';
import { SettingsPanel } from './components/SettingsPanel';
import { TabType, LocationWeather, TemperatureUnit, TimeFormat, WeatherTheme } from './types/weather';
import { WEATHER_THEMES } from './config/weatherThemes';
import { useLocationContext } from './hooks/useLocationContext';
export function App() {
  const [activeTab, setActiveTab] = useState<TabType>('today');
  const [darkMode, setDarkMode] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnit>('celsius');
  const [timeFormat, setTimeFormat] = useState<TimeFormat>('24h');
  const [expandedDays, setExpandedDays] = useState<Set<string>>(new Set(['Monday 26']));
  const [currentWeatherTheme, setCurrentWeatherTheme] = useState<WeatherTheme>('sunny');
  const [autoTheme, setAutoTheme] = useState(true);
  const [themesEnabled, setThemesEnabled] = useState(true);
  const [locations, setLocations] = useState<LocationWeather[]>([{
    id: '1',
    city: 'Littleton',
    country: 'CO',
    temp: 14,
    condition: 'Partly Cloudy',
    high: 16,
    low: 7,
    isFavorite: true,
    label: 'Home',
    contextRole: 'current'
  }, {
    id: '2',
    city: 'San Francisco',
    country: 'CA',
    temp: 13,
    condition: 'Cloudy',
    high: 15,
    low: 10,
    label: 'Work',
    contextRole: 'next'
  }, {
    id: '3',
    city: 'Dubai',
    country: 'UAE',
    temp: 17,
    condition: 'Sunny',
    high: 30,
    low: 20,
    label: 'Work 2',
    contextRole: 'saved'
  }]);
  // Multi-City Split Awareness
  const {
    context: locationContext,
    setCurrentCity,
    setNextCity,
    setHomeCity,
    getCurrentMoodPreset,
    getContextAccentColor
  } = useLocationContext(locations);
  // Initialize location context
  useEffect(() => {
    const currentLoc = locations.find(loc => loc.contextRole === 'current') || locations[0];
    const nextLoc = locations.find(loc => loc.contextRole === 'next');
    const homeLoc = locations.find(loc => loc.label === 'Home') || locations[0];
    if (currentLoc) setCurrentCity(currentLoc);
    if (nextLoc) setNextCity(nextLoc);
    if (homeLoc) setHomeCity(homeLoc);
  }, []);
  useEffect(() => {
    const theme = WEATHER_THEMES[currentWeatherTheme];
    const root = document.documentElement;
    root.style.setProperty('--theme-primary', theme.colors.primary);
    root.style.setProperty('--theme-secondary', theme.colors.secondary);
    root.style.setProperty('--theme-accent', theme.colors.accent);
    root.style.setProperty('--theme-background', theme.colors.background);
    root.style.setProperty('--theme-card-bg', theme.colors.cardBg);
    root.style.setProperty('--theme-text', theme.colors.text);
    root.style.setProperty('--theme-text-secondary', theme.colors.textSecondary);
  }, [currentWeatherTheme]);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };
  const toggleTemperatureUnit = () => {
    setTemperatureUnit(prev => prev === 'celsius' ? 'fahrenheit' : 'celsius');
  };
  const convertTemp = (temp: number): number => {
    if (temperatureUnit === 'fahrenheit') {
      return Math.round(temp * 9 / 5 + 32);
    }
    return temp;
  };
  const addLocation = (location: LocationWeather) => {
    setLocations(prev => [...prev, {
      ...location,
      id: Date.now().toString(),
      contextRole: 'saved'
    }]);
  };
  const deleteLocation = (id: string) => {
    setLocations(prev => prev.filter(loc => loc.id !== id));
  };
  const toggleFavorite = (id: string) => {
    setLocations(prev => prev.map(loc => loc.id === id ? {
      ...loc,
      isFavorite: !loc.isFavorite
    } : loc));
  };
  const updateLocationLabel = (id: string, label: string) => {
    setLocations(prev => prev.map(loc => loc.id === id ? {
      ...loc,
      label
    } : loc));
  };
  const updateLocationContext = (id: string, role: 'current' | 'next' | 'home' | 'saved') => {
    const location = locations.find(loc => loc.id === id);
    if (!location) return;
    setLocations(prev => prev.map(loc => ({
      ...loc,
      contextRole: loc.id === id ? role : loc.contextRole
    })));
    if (role === 'current') setCurrentCity(location);
    if (role === 'next') setNextCity(location);
    if (role === 'home') setHomeCity(location);
  };
  const toggleDayExpansion = (day: string) => {
    setExpandedDays(prev => {
      const newSet = new Set(prev);
      if (newSet.has(day)) {
        newSet.delete(day);
      } else {
        newSet.add(day);
      }
      return newSet;
    });
  };
  const changeTheme = (theme: WeatherTheme) => {
    setCurrentWeatherTheme(theme);
    setAutoTheme(false);
  };
  const theme = themesEnabled ? WEATHER_THEMES[currentWeatherTheme] : WEATHER_THEMES['partly-cloudy'];
  const gradientClass = themesEnabled ? `gradient-${currentWeatherTheme}` : 'bg-[#f0f9ff]';
  const weatherAnimationClass = themesEnabled ? `weather-${currentWeatherTheme}` : '';
  const contextAccentColor = getContextAccentColor();
  return <div className={`min-h-screen w-full theme-transition ${darkMode ? 'dark' : ''}`} role="main">
      <div className={`fixed inset-0 ${gradientClass} ${weatherAnimationClass} weather-bg -z-10`} aria-hidden="true"></div>

      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded">
        Skip to main content
      </a>

      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} toggleSettings={() => setSettingsOpen(true)} temperatureUnit={temperatureUnit} toggleTemperatureUnit={toggleTemperatureUnit} themeColors={themesEnabled ? {
      primary: theme.colors.primary,
      text: theme.colors.text,
      cardBg: theme.colors.cardBg
    } : undefined} locationContext={locationContext} contextAccentColor={contextAccentColor} />

      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} themeColors={themesEnabled ? {
      primary: theme.colors.primary,
      text: theme.colors.text,
      accent: theme.colors.accent
    } : undefined} />

      <main id="main-content" className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            {activeTab === 'today' && <div className="animate-in fade-in duration-500">
                <CurrentWeatherCard temperatureUnit={temperatureUnit} convertTemp={convertTemp} currentTheme={themesEnabled ? currentWeatherTheme : 'partly-cloudy'} themesEnabled={themesEnabled} locationContext={locationContext} />
                <HourlyForecast temperatureUnit={temperatureUnit} convertTemp={convertTemp} themeColors={themesEnabled ? theme.colors : undefined} />
              </div>}

            {activeTab === '5day' && <div className="animate-in fade-in duration-500">
                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-4 text-with-shadow" style={{
                color: themesEnabled ? theme.colors.text : undefined
              }}>
                    5 Day Weather -{' '}
                    {locationContext.current?.city || 'Littleton'},{' '}
                    {locationContext.current?.country || 'CO'}
                  </h2>
                  <DailyForecast temperatureUnit={temperatureUnit} convertTemp={convertTemp} expandedDays={expandedDays} toggleDayExpansion={toggleDayExpansion} themeColors={themesEnabled ? theme.colors : undefined} />
                </div>
              </div>}

            {activeTab === 'monthly' && <div className="animate-in fade-in duration-500">
                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-4 text-with-shadow" style={{
                color: themesEnabled ? theme.colors.text : undefined
              }}>
                    Monthly Weather -{' '}
                    {locationContext.current?.city || 'Littleton'},{' '}
                    {locationContext.current?.country || 'CO'}
                  </h2>
                  <MonthlyCalendar temperatureUnit={temperatureUnit} convertTemp={convertTemp} themeColors={themesEnabled ? theme.colors : undefined} />
                </div>
              </div>}
          </div>

          <aside className="w-full lg:w-80 space-y-6" aria-label="Sidebar">
            <OtherLocations locations={locations} onAddLocation={addLocation} onDeleteLocation={deleteLocation} onToggleFavorite={toggleFavorite} onUpdateLabel={updateLocationLabel} onUpdateContext={updateLocationContext} temperatureUnit={temperatureUnit} convertTemp={convertTemp} themeColors={themesEnabled ? theme.colors : undefined} locationContext={locationContext} />

            <div className="rounded-xl shadow-lg p-6 backdrop-blur-md border-2 card-contrast-overlay" style={{
            backgroundColor: themesEnabled ? `${theme.colors.cardBg}E6` : '#FFFFFF',
            borderColor: themesEnabled ? `${theme.colors.primary}60` : '#E5E7EB'
          }} role="region" aria-label="Air Quality Information">
              <h3 className="font-semibold mb-4" style={{
              color: themesEnabled ? theme.colors.text : undefined
            }}>
                Air Quality Index
              </h3>
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 flex items-center justify-center rounded-full border-4 border-green-500" role="img" aria-label="Air quality index 31 out of 100">
                  <span className="text-xl font-bold" style={{
                  color: themesEnabled ? theme.colors.text : undefined
                }}>
                    31
                  </span>
                </div>
                <div>
                  <p className="font-bold" style={{
                  color: themesEnabled ? theme.colors.text : undefined
                }}>
                    Good
                  </p>
                  <p className="text-xs mt-1" style={{
                  color: themesEnabled ? theme.colors.textSecondary : undefined
                }}>
                    Air quality is considered satisfactory, and air pollution
                    poses little or no risk.
                  </p>
                </div>
              </div>
            </div>

            {activeTab === 'today' && <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-6 text-white shadow-xl border-2 border-blue-400" role="region" aria-label="Premium subscription offer">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold">Sky Bulletin Premium</h3>
                  <span className="px-2 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full" role="status">
                    PRO
                  </span>
                </div>
                <p className="text-blue-100 text-sm mb-4">
                  Unlock premium weather themes & features
                </p>
                <ul className="space-y-2 text-sm text-blue-50 mb-6" role="list">
                  <li className="flex items-center gap-2" role="listitem">
                    ✨ 12 Premium Weather Themes
                  </li>
                  <li className="flex items-center gap-2" role="listitem">
                    📊 Advanced Forecasts
                  </li>
                  <li className="flex items-center gap-2" role="listitem">
                    🔔 Priority Alerts
                  </li>
                  <li className="flex items-center gap-2" role="listitem">
                    📍 Unlimited Locations
                  </li>
                </ul>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 mb-4 border border-white/20">
                  <p className="text-xs text-blue-100 mb-1">🎁 Free Trial</p>
                  <p className="text-sm font-semibold">
                    Premium themes free for 30 days!
                  </p>
                </div>
                <button className="w-full py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-all hover:scale-105 shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300" aria-label="Start 30-day free trial of Sky Bulletin Premium">
                  Start Free Trial
                </button>
              </div>}
          </aside>
        </div>
      </main>

      <SettingsPanel isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} darkMode={darkMode} toggleDarkMode={toggleDarkMode} temperatureUnit={temperatureUnit} setTemperatureUnit={setTemperatureUnit} timeFormat={timeFormat} setTimeFormat={setTimeFormat} currentTheme={currentWeatherTheme} onThemeChange={changeTheme} autoTheme={autoTheme} setAutoTheme={setAutoTheme} themesEnabled={themesEnabled} setThemesEnabled={setThemesEnabled} />
    </div>;
}