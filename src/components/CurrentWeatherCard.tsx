import React from 'react';
import { Sun, Wind, Droplets, Thermometer, Sunrise, Sunset, Eye, Gauge, Navigation, AlertTriangle, Cloud, CloudRain, CloudLightning, CloudSnow } from 'lucide-react';
import { WeatherTheme, LocationContext } from '../types/weather';
import { WEATHER_THEMES } from '../config/weatherThemes';
interface CurrentWeatherCardProps {
  temperatureUnit: 'celsius' | 'fahrenheit';
  convertTemp: (temp: number) => number;
  currentTheme: WeatherTheme;
  themesEnabled: boolean;
  locationContext?: LocationContext;
}
export function CurrentWeatherCard({
  temperatureUnit,
  convertTemp,
  currentTheme,
  themesEnabled,
  locationContext
}: CurrentWeatherCardProps) {
  const theme = WEATHER_THEMES[currentTheme];
  const weatherCardClass = `weather-card-${currentTheme}`;
  const getWeatherIcon = () => {
    switch (currentTheme) {
      case 'sunny':
        return <Sun className="h-16 w-16 text-yellow-500" aria-hidden="true" />;
      case 'rainy':
        return <CloudRain className="h-16 w-16 text-blue-400" aria-hidden="true" />;
      case 'stormy':
        return <CloudLightning className="h-16 w-16 text-purple-400" aria-hidden="true" />;
      case 'snowy':
        return <CloudSnow className="h-16 w-16 text-blue-200" aria-hidden="true" />;
      case 'cloudy':
        return <Cloud className="h-16 w-16 text-gray-400" aria-hidden="true" />;
      case 'partly-cloudy':
        return <Cloud className="h-16 w-16 text-gray-400" aria-hidden="true" />;
      default:
        return <Sun className="h-16 w-16 text-yellow-500" aria-hidden="true" />;
    }
  };
  const getConditionText = () => {
    switch (currentTheme) {
      case 'sunny':
        return 'Sunny';
      case 'rainy':
        return 'Rainy';
      case 'stormy':
        return 'Thunderstorms';
      case 'snowy':
        return 'Snowy';
      case 'cloudy':
        return 'Cloudy';
      case 'partly-cloudy':
        return 'Partly Cloudy';
      case 'foggy':
        return 'Foggy';
      case 'windy':
        return 'Windy';
      case 'clear-night':
        return 'Clear Night';
      case 'heatwave':
        return 'Heatwave';
      case 'tornado':
        return 'Tornado Warning';
      case 'blizzard':
        return 'Blizzard';
      default:
        return 'Partly Cloudy';
    }
  };
  const currentCity = locationContext?.current?.city || 'Littleton';
  const currentCountry = locationContext?.current?.country || 'CO';
  return <article className="rounded-xl shadow-lg p-6 mb-6 relative overflow-hidden backdrop-blur-sm border-2" style={{
    backgroundColor: themesEnabled ? `${theme.colors.cardBg}E6` : '#FFFFFF',
    borderColor: themesEnabled ? `${theme.colors.primary}60` : '#E5E7EB'
  }} aria-label="Current weather conditions">
      {/* Realistic Weather Background Effect */}
      {themesEnabled && <div className={`weather-card-effect ${weatherCardClass}`} aria-hidden="true" style={{
      zIndex: 0
    }}></div>}

      {currentTheme === 'stormy' && themesEnabled && <div className="mb-4 p-3 bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 rounded relative z-10" role="alert" aria-live="polite">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-orange-800 dark:text-orange-300">
                Severe Weather Watch
              </p>
              <p className="text-xs text-orange-700 dark:text-orange-400 mt-1">
                Thunderstorms expected this evening. Stay updated.
              </p>
            </div>
          </div>
        </div>}

      <header className="flex justify-between items-start mb-6 relative z-10">
        <div>
          <h2 className="text-xl font-semibold mb-1 text-with-shadow" style={{
          color: themesEnabled ? theme.colors.text : undefined
        }}>
            {currentCity}, {currentCountry}
          </h2>
          <time className="text-sm text-with-shadow" style={{
          color: themesEnabled ? theme.colors.textSecondary : undefined
        }}>
            Monday, 26 May
          </time>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-4">
            {getWeatherIcon()}
            <div>
              <span className="text-5xl font-bold text-with-shadow" style={{
              color: themesEnabled ? theme.colors.text : undefined
            }}>
                {convertTemp(14)}°
              </span>
              <p className="font-medium text-with-shadow" style={{
              color: themesEnabled ? theme.colors.text : undefined
            }}>
                {getConditionText()}
              </p>
              <p className="text-sm text-with-shadow" style={{
              color: themesEnabled ? theme.colors.textSecondary : undefined
            }}>
                Day {convertTemp(16)}° • Night {convertTemp(7)}°
              </p>
            </div>
          </div>

          <div className="mt-2">
            <div className="text-3xl font-light text-with-shadow" style={{
            color: themesEnabled ? theme.colors.text : undefined
          }}>
              Feels like <span className="font-bold">{convertTemp(13)}°</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[{
          icon: Droplets,
          label: 'Humidity',
          value: '95%',
          color: theme.colors.accent
        }, {
          icon: Wind,
          label: 'Wind',
          value: 'NW 7 mph',
          color: theme.colors.accent
        }, {
          icon: Thermometer,
          label: 'Temperature',
          value: `${convertTemp(14)}°`,
          color: theme.colors.accent
        }, {
          icon: Sun,
          label: 'UV Index',
          value: 'Low (2)',
          color: theme.colors.accent
        }, {
          icon: Gauge,
          label: 'Pressure',
          value: '1013.3 mb',
          color: theme.colors.accent
        }, {
          icon: Eye,
          label: 'Visibility',
          value: 'Unlimited',
          color: theme.colors.accent
        }].map((item, index) => <div key={index} className="flex items-center gap-3 p-3 rounded-lg backdrop-blur-md border" style={{
          backgroundColor: themesEnabled ? `${theme.colors.cardBg}CC` : '#F7FAFC',
          borderColor: themesEnabled ? `${theme.colors.primary}40` : '#E5E7EB'
        }}>
              <item.icon className="h-5 w-5" style={{
            color: themesEnabled ? item.color : '#4299E1'
          }} aria-hidden="true" />
              <div>
                <p className="text-xs text-with-shadow" style={{
              color: themesEnabled ? theme.colors.textSecondary : undefined
            }}>
                  {item.label}
                </p>
                <p className="font-semibold text-with-shadow" style={{
              color: themesEnabled ? theme.colors.text : undefined
            }}>
                  {item.value}
                </p>
              </div>
            </div>)}
        </div>
      </div>

      <div className="mt-6 pt-6 border-t relative z-10" style={{
      borderColor: themesEnabled ? `${theme.colors.primary}40` : '#E5E7EB'
    }}>
        <div className="flex items-center justify-center gap-8">
          <div className="relative w-24 h-24" role="img" aria-label="Wind direction compass showing northwest">
            <div className="absolute inset-0 rounded-full border-2 backdrop-blur-sm" style={{
            borderColor: themesEnabled ? theme.colors.secondary : '#CBD5E0'
          }}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Navigation className="h-8 w-8 transform -rotate-45" style={{
              color: themesEnabled ? theme.colors.accent : '#4299E1'
            }} aria-hidden="true" />
            </div>
            {['N', 'S', 'W', 'E'].map((dir, i) => <span key={dir} className={`absolute text-xs font-semibold text-with-shadow ${i === 0 ? 'top-1 left-1/2 transform -translate-x-1/2' : i === 1 ? 'bottom-1 left-1/2 transform -translate-x-1/2' : i === 2 ? 'left-1 top-1/2 transform -translate-y-1/2' : 'right-1 top-1/2 transform -translate-y-1/2'}`} style={{
            color: themesEnabled ? theme.colors.textSecondary : undefined
          }} aria-hidden="true">
                {dir}
              </span>)}
          </div>
          <div>
            <p className="text-sm text-with-shadow" style={{
            color: themesEnabled ? theme.colors.textSecondary : undefined
          }}>
              Wind Direction
            </p>
            <p className="text-lg font-bold text-with-shadow" style={{
            color: themesEnabled ? theme.colors.text : undefined
          }}>
              Northwest
            </p>
            <p className="text-sm text-with-shadow" style={{
            color: themesEnabled ? theme.colors.textSecondary : undefined
          }}>
              7 mph gusts
            </p>
          </div>
        </div>
      </div>

      <footer className="mt-8 pt-6 border-t relative z-10" style={{
      borderColor: themesEnabled ? `${theme.colors.primary}40` : '#E5E7EB'
    }}>
        <div className="flex justify-between items-center max-w-md mx-auto">
          <div className="flex flex-col items-center">
            <Sunrise className="h-6 w-6 text-orange-400 mb-1" aria-hidden="true" />
            <span className="text-xs font-medium text-with-shadow" style={{
            color: themesEnabled ? theme.colors.textSecondary : undefined
          }}>
              Sunrise
            </span>
            <time className="text-sm font-bold text-with-shadow" style={{
            color: themesEnabled ? theme.colors.text : undefined
          }}>
              4:11 am
            </time>
          </div>

          <div className="relative w-full h-16 mx-4 overflow-hidden" aria-hidden="true">
            <div className="absolute bottom-0 left-0 w-full h-32 border-t-2 border-dashed border-orange-300 rounded-full"></div>
            <div className="absolute bottom-0 left-1/4 w-4 h-4 bg-yellow-400 rounded-full shadow-lg shadow-yellow-200 transform -translate-x-1/2 translate-y-1/2"></div>
          </div>

          <div className="flex flex-col items-center">
            <Sunset className="h-6 w-6 text-indigo-400 mb-1" aria-hidden="true" />
            <span className="text-xs font-medium text-with-shadow" style={{
            color: themesEnabled ? theme.colors.textSecondary : undefined
          }}>
              Sunset
            </span>
            <time className="text-sm font-bold text-with-shadow" style={{
            color: themesEnabled ? theme.colors.text : undefined
          }}>
              7:04 pm
            </time>
          </div>
        </div>
      </footer>
    </article>;
}