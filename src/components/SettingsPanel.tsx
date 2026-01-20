import React, { useState } from 'react';
import { X, Moon, Sun, MapPin, User, Image, Volume2, VolumeX, Zap, Cloud, CloudRain, CloudLightning, CloudSnow, Check, Wind, CloudDrizzle, Cloudy, Palette, Crown, ZapOff } from 'lucide-react';
import { TemperatureUnit, TimeFormat, WeatherTheme } from '../types/weather';
import { WEATHER_THEMES } from '../config/weatherThemes';
interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  temperatureUnit: TemperatureUnit;
  setTemperatureUnit: (unit: TemperatureUnit) => void;
  timeFormat: TimeFormat;
  setTimeFormat: (format: TimeFormat) => void;
  currentTheme: WeatherTheme;
  onThemeChange: (theme: WeatherTheme) => void;
  autoTheme: boolean;
  setAutoTheme: (auto: boolean) => void;
  themesEnabled: boolean;
  setThemesEnabled: (enabled: boolean) => void;
}
export function SettingsPanel({
  isOpen,
  onClose,
  darkMode,
  toggleDarkMode,
  temperatureUnit,
  setTemperatureUnit,
  timeFormat,
  setTimeFormat,
  currentTheme,
  onThemeChange,
  autoTheme,
  setAutoTheme,
  themesEnabled,
  setThemesEnabled
}: SettingsPanelProps) {
  const [notificationSetting, setNotificationSetting] = useState<'severe' | 'daily' | 'none'>('severe');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  if (!isOpen) return null;
  const getThemeIcon = (theme: WeatherTheme) => {
    switch (theme) {
      case 'sunny':
        return <Sun className="h-5 w-5 text-yellow-500" />;
      case 'rainy':
        return <CloudRain className="h-5 w-5 text-blue-400" />;
      case 'stormy':
        return <CloudLightning className="h-5 w-5 text-purple-400" />;
      case 'snowy':
        return <CloudSnow className="h-5 w-5 text-blue-200" />;
      case 'cloudy':
        return <Cloud className="h-5 w-5 text-gray-400" />;
      case 'partly-cloudy':
        return <Cloudy className="h-5 w-5 text-gray-300" />;
      case 'foggy':
        return <CloudDrizzle className="h-5 w-5 text-gray-400" />;
      case 'windy':
        return <Wind className="h-5 w-5 text-cyan-400" />;
      case 'clear-night':
        return <Moon className="h-5 w-5 text-purple-400" />;
      case 'heatwave':
        return <Sun className="h-5 w-5 text-orange-500" />;
      case 'tornado':
        return <CloudLightning className="h-5 w-5 text-amber-700" />;
      case 'blizzard':
        return <CloudSnow className="h-5 w-5 text-blue-300" />;
    }
  };
  return <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300">
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Settings
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors focus:outline-none focus:ring-4 focus:ring-blue-300">
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>

          <div className="space-y-8">
            {/* Theme Toggle */}
            <section>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 rounded-lg border-2 border-blue-200 dark:border-slate-600">
                <div className="flex items-center gap-3">
                  <Palette className={`h-5 w-5 ${themesEnabled ? 'text-blue-500' : 'text-gray-400'}`} />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      Weather Themes
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Dynamic backgrounds
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setThemesEnabled(false)} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all focus:outline-none focus:ring-4 focus:ring-blue-300 ${!themesEnabled ? 'bg-gray-600 text-white shadow-md' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`} aria-pressed={!themesEnabled}>
                    OFF
                  </button>
                  <button onClick={() => setThemesEnabled(true)} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all focus:outline-none focus:ring-4 focus:ring-blue-300 ${themesEnabled ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`} aria-pressed={themesEnabled}>
                    ON
                  </button>
                </div>
              </div>

              {!themesEnabled && <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 bg-gray-50 dark:bg-slate-800 p-3 rounded">
                  ℹ️ Themes are disabled. Enable to experience dynamic weather
                  backgrounds.
                </p>}
            </section>

            {/* Premium Notice */}
            {themesEnabled && <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-yellow-300 dark:border-yellow-700 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Crown className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-yellow-900 dark:text-yellow-200 mb-1">
                      Premium Feature - Free Trial
                    </p>
                    <p className="text-xs text-yellow-800 dark:text-yellow-300">
                      Weather themes are free for 30 days! After the trial,
                      upgrade to Sky Bulletin Premium to continue enjoying
                      dynamic themes.
                    </p>
                  </div>
                </div>
              </div>}

            {/* Weather Theme Selector */}
            {themesEnabled && <section>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    Select Theme
                  </h3>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={autoTheme} onChange={e => setAutoTheme(e.target.checked)} className="rounded focus:ring-4 focus:ring-blue-300" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      Auto
                    </span>
                  </label>
                </div>

                <div className="grid grid-cols-3 gap-3 max-h-96 overflow-y-auto pr-2">
                  {(Object.keys(WEATHER_THEMES) as WeatherTheme[]).map(themeKey => {
                const theme = WEATHER_THEMES[themeKey];
                const isActive = currentTheme === themeKey;
                return <button key={themeKey} onClick={() => onThemeChange(themeKey)} disabled={autoTheme} className={`relative p-3 rounded-lg border-2 transition-all focus:outline-none focus:ring-4 focus:ring-blue-300 ${isActive ? 'border-blue-500 shadow-lg scale-105' : 'border-gray-200 dark:border-slate-700 hover:border-gray-300 hover:scale-102'} ${autoTheme ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`} style={{
                  background: `linear-gradient(135deg, ${theme.gradient[0]}, ${theme.gradient[1]})`
                }}>
                          {isActive && <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full p-1 shadow-lg">
                              <Check className="h-3 w-3 text-white" />
                            </div>}
                          <div className="flex flex-col items-center gap-1">
                            {getThemeIcon(themeKey)}
                            <span className="text-xs font-semibold text-center leading-tight" style={{
                      color: theme.colors.text
                    }}>
                              {theme.name}
                            </span>
                          </div>
                        </button>;
              })}
                </div>

                <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
                  {autoTheme ? '🔄 Theme automatically changes based on current weather' : '✋ Manual theme selected. Enable Auto to sync with weather.'}
                </p>
              </section>}

            {/* Units */}
            <section>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Temperature Units
              </h3>
              <div className="bg-gray-100 dark:bg-slate-800 rounded-lg p-1 flex">
                <button onClick={() => setTemperatureUnit('celsius')} className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all focus:outline-none focus:ring-4 focus:ring-blue-300 ${temperatureUnit === 'celsius' ? 'bg-white dark:bg-slate-700 shadow-sm text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900'}`}>
                  Celsius (°C)
                </button>
                <button onClick={() => setTemperatureUnit('fahrenheit')} className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all focus:outline-none focus:ring-4 focus:ring-blue-300 ${temperatureUnit === 'fahrenheit' ? 'bg-white dark:bg-slate-700 shadow-sm text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900'}`}>
                  Fahrenheit (°F)
                </button>
              </div>
            </section>

            {/* Display Mode */}
            <section>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Display Mode
              </h3>
              <div className="bg-gray-100 dark:bg-slate-800 rounded-lg p-1 flex">
                <button onClick={() => darkMode && toggleDarkMode()} className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-4 focus:ring-blue-300 ${!darkMode ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400'}`}>
                  <Sun className="h-4 w-4" /> LIGHT
                </button>
                <button onClick={() => !darkMode && toggleDarkMode()} className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-4 focus:ring-blue-300 ${darkMode ? 'bg-slate-700 shadow-sm text-white' : 'text-gray-500 hover:text-gray-900'}`}>
                  <Moon className="h-4 w-4" /> DARK
                </button>
              </div>
            </section>

            {/* Notifications */}
            <section>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Notifications
              </h3>
              <div className="bg-gray-100 dark:bg-slate-800 rounded-lg p-1 flex">
                <button onClick={() => setNotificationSetting('severe')} className={`flex-1 py-2 px-2 rounded-md text-xs font-medium transition-all focus:outline-none focus:ring-4 focus:ring-blue-300 ${notificationSetting === 'severe' ? 'bg-white dark:bg-slate-700 shadow-sm text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900'}`}>
                  Severe only
                </button>
                <button onClick={() => setNotificationSetting('daily')} className={`flex-1 py-2 px-2 rounded-md text-xs font-medium transition-all focus:outline-none focus:ring-4 focus:ring-blue-300 ${notificationSetting === 'daily' ? 'bg-white dark:bg-slate-700 shadow-sm text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900'}`}>
                  Daily
                </button>
                <button onClick={() => setNotificationSetting('none')} className={`flex-1 py-2 px-2 rounded-md text-xs font-medium transition-all focus:outline-none focus:ring-4 focus:ring-blue-300 ${notificationSetting === 'none' ? 'bg-white dark:bg-slate-700 shadow-sm text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900'}`}>
                  None
                </button>
              </div>
            </section>

            {/* Time Format */}
            <section>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Time Format
              </h3>
              <div className="flex items-center gap-8 bg-gray-50 dark:bg-slate-800 p-4 rounded-lg">
                <label className="flex items-center gap-3 cursor-pointer">
                  <div onClick={() => setTimeFormat('24h')} className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-300 ${timeFormat === '24h' ? 'border-blue-500' : 'border-gray-300 dark:border-gray-600'}`} role="radio" aria-checked={timeFormat === '24h'} tabIndex={0}>
                    {timeFormat === '24h' && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>}
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    24 HR
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <div onClick={() => setTimeFormat('12h')} className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-300 ${timeFormat === '12h' ? 'border-blue-500' : 'border-gray-300 dark:border-gray-600'}`} role="radio" aria-checked={timeFormat === '12h'} tabIndex={0}>
                    {timeFormat === '12h' && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>}
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    12 HR
                  </span>
                </label>
              </div>
            </section>

            {/* Sound & Animations */}
            <section>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Accessibility
              </h3>

              {/* Sound Toggle */}
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800 rounded-lg mb-3">
                <div className="flex items-center gap-3">
                  {soundEnabled ? <Volume2 className="h-5 w-5 text-blue-500" /> : <VolumeX className="h-5 w-5 text-gray-400" />}
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      Sound Effects
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Weather audio
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setSoundEnabled(false)} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all focus:outline-none focus:ring-4 focus:ring-blue-300 ${!soundEnabled ? 'bg-gray-600 text-white shadow-md' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`} aria-pressed={!soundEnabled}>
                    OFF
                  </button>
                  <button onClick={() => setSoundEnabled(true)} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all focus:outline-none focus:ring-4 focus:ring-blue-300 ${soundEnabled ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`} aria-pressed={soundEnabled}>
                    ON
                  </button>
                </div>
              </div>

              {/* Animations Toggle */}
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800 rounded-lg">
                <div className="flex items-center gap-3">
                  {animationsEnabled ? <Zap className="h-5 w-5 text-blue-500" /> : <ZapOff className="h-5 w-5 text-gray-400" />}
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      Animations
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Motion effects
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setAnimationsEnabled(false)} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all focus:outline-none focus:ring-4 focus:ring-blue-300 ${!animationsEnabled ? 'bg-gray-600 text-white shadow-md' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`} aria-pressed={!animationsEnabled}>
                    OFF
                  </button>
                  <button onClick={() => setAnimationsEnabled(true)} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all focus:outline-none focus:ring-4 focus:ring-blue-300 ${animationsEnabled ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`} aria-pressed={animationsEnabled}>
                    ON
                  </button>
                </div>
              </div>
            </section>

            {/* Profile Settings */}
            <section>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Profile
              </h3>
              <div className="space-y-2">
                <button className="w-full flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-left focus:outline-none focus:ring-4 focus:ring-blue-300">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Locations
                  </span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-left focus:outline-none focus:ring-4 focus:ring-blue-300">
                  <Image className="h-5 w-5 text-gray-400" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Picture
                  </span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-left focus:outline-none focus:ring-4 focus:ring-blue-300">
                  <User className="h-5 w-5 text-gray-400" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Details
                  </span>
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>;
}