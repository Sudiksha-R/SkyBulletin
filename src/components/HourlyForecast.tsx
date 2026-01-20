import React, { useState } from 'react';
import { Cloud, Sun, CloudRain, CloudLightning, CloudSnow, ChevronRight } from 'lucide-react';
import { HourlyForecast as HourlyForecastType } from '../types/weather';
interface HourlyForecastProps {
  temperatureUnit: 'celsius' | 'fahrenheit';
  convertTemp: (temp: number) => number;
}
export function HourlyForecast({
  temperatureUnit,
  convertTemp
}: HourlyForecastProps) {
  const [showExtended, setShowExtended] = useState(false);
  const hours: HourlyForecastType[] = [{
    time: 'Now',
    temp: 14,
    condition: 'Partly Cloudy',
    precipChance: 24,
    icon: 'partly-cloudy',
    windSpeed: 7,
    humidity: 95
  }, {
    time: '6 pm',
    temp: 14,
    condition: 'Partly Cloudy',
    precipChance: 24,
    icon: 'partly-cloudy',
    windSpeed: 8,
    humidity: 92
  }, {
    time: '7 pm',
    temp: 14,
    condition: 'Scattered Thunderstorms',
    precipChance: 48,
    icon: 'storm',
    windSpeed: 12,
    humidity: 88
  }, {
    time: '8 pm',
    temp: 13,
    condition: 'Showers',
    precipChance: 56,
    icon: 'rain',
    windSpeed: 10,
    humidity: 90
  }, {
    time: '9 pm',
    temp: 12,
    condition: 'Partly Cloudy',
    precipChance: 14,
    icon: 'partly-cloudy',
    windSpeed: 6,
    humidity: 85
  }, {
    time: '10 pm',
    temp: 11,
    condition: 'Clear',
    precipChance: 8,
    icon: 'sun',
    windSpeed: 5,
    humidity: 82
  }, {
    time: '11 pm',
    temp: 10,
    condition: 'Clear',
    precipChance: 5,
    icon: 'sun',
    windSpeed: 4,
    humidity: 80
  }, {
    time: '12 am',
    temp: 9,
    condition: 'Clear',
    precipChance: 3,
    icon: 'sun',
    windSpeed: 3,
    humidity: 78
  }];
  const displayHours = showExtended ? hours : hours.slice(0, 5);
  const getIcon = (icon: string) => {
    switch (icon) {
      case 'sun':
        return <Sun className="h-5 w-5 text-yellow-500" />;
      case 'partly-cloudy':
        return <Cloud className="h-5 w-5 text-gray-400" />;
      case 'rain':
        return <CloudRain className="h-5 w-5 text-blue-400" />;
      case 'storm':
        return <CloudLightning className="h-5 w-5 text-purple-500" />;
      case 'snow':
        return <CloudSnow className="h-5 w-5 text-blue-200" />;
      default:
        return <Sun className="h-5 w-5 text-yellow-500" />;
    }
  };
  return <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800 dark:text-white">
          Hourly Forecast
        </h3>
        <button onClick={() => setShowExtended(!showExtended)} className="text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center gap-1">
          {showExtended ? 'Show Less' : 'Next 48 hours'}
          <ChevronRight className={`h-3 w-3 transition-transform ${showExtended ? 'rotate-90' : ''}`} />
        </button>
      </div>
      <div className="space-y-4">
        {displayHours.map((hour, index) => <div key={index} className="flex items-center justify-between py-2 border-b border-gray-50 dark:border-slate-700 last:border-0 hover:bg-gray-50 dark:hover:bg-slate-700/50 rounded px-2 transition-colors">
            <span className="w-16 text-sm font-medium text-gray-600 dark:text-gray-300">
              {hour.time}
            </span>
            <span className="w-12 text-lg font-bold text-gray-900 dark:text-white">
              {convertTemp(hour.temp)}°
            </span>
            <div className="flex-1 flex items-center gap-2 px-4">
              {getIcon(hour.icon)}
              <span className="text-sm text-gray-500 dark:text-gray-400 truncate hidden sm:block">
                {hour.condition}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 w-16">
                <CloudRain className="h-3 w-3 text-blue-400" />
                <span className="text-xs text-blue-500 font-medium">
                  {hour.precipChance}%
                </span>
              </div>
              {showExtended && <>
                  <div className="hidden md:flex items-center gap-1 w-20 text-xs text-gray-500 dark:text-gray-400">
                    <span>💨 {hour.windSpeed} mph</span>
                  </div>
                  <div className="hidden lg:flex items-center gap-1 w-16 text-xs text-gray-500 dark:text-gray-400">
                    <span>💧 {hour.humidity}%</span>
                  </div>
                </>}
            </div>
          </div>)}
      </div>
    </div>;
}