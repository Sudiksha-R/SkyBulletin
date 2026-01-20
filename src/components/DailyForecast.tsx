import React from 'react';
import { Cloud, Sun, CloudRain, CloudLightning, ChevronDown, ChevronUp, Wind, Droplets, Eye, Sunrise, Sunset } from 'lucide-react';
interface DailyForecastProps {
  temperatureUnit: 'celsius' | 'fahrenheit';
  convertTemp: (temp: number) => number;
  expandedDays: Set<string>;
  toggleDayExpansion: (day: string) => void;
}
export function DailyForecast({
  temperatureUnit,
  convertTemp,
  expandedDays,
  toggleDayExpansion
}: DailyForecastProps) {
  const days = [{
    day: 'Monday 26',
    temp: {
      high: 16,
      low: 8
    },
    condition: 'Mostly Cloudy',
    precip: '72%',
    wind: 'NNW 7 mph',
    icon: 'cloud',
    hourly: [{
      time: '6am',
      temp: 8,
      precip: '10%'
    }, {
      time: '9am',
      temp: 11,
      precip: '20%'
    }, {
      time: '12pm',
      temp: 14,
      precip: '30%'
    }, {
      time: '3pm',
      temp: 16,
      precip: '40%'
    }, {
      time: '6pm',
      temp: 14,
      precip: '50%'
    }, {
      time: '9pm',
      temp: 10,
      precip: '60%'
    }],
    details: {
      humidity: '95%',
      uvIndex: '3 of 11',
      sunrise: '4:11 am',
      sunset: '7:04 pm',
      visibility: '10 km',
      pressure: '1013 mb'
    }
  }, {
    day: 'Tue 27',
    temp: {
      high: 16,
      low: 7
    },
    condition: 'PM Thunderstorms',
    precip: '68%',
    wind: 'NE 15 kmph',
    icon: 'storm',
    hourly: [{
      time: '6am',
      temp: 7,
      precip: '15%'
    }, {
      time: '9am',
      temp: 10,
      precip: '25%'
    }, {
      time: '12pm',
      temp: 13,
      precip: '35%'
    }, {
      time: '3pm',
      temp: 16,
      precip: '68%'
    }, {
      time: '6pm',
      temp: 13,
      precip: '70%'
    }, {
      time: '9pm',
      temp: 9,
      precip: '50%'
    }],
    details: {
      humidity: '88%',
      uvIndex: '4 of 11',
      sunrise: '4:12 am',
      sunset: '7:05 pm',
      visibility: '8 km',
      pressure: '1010 mb'
    }
  }, {
    day: 'Wed 28',
    temp: {
      high: 23,
      low: 9
    },
    condition: 'Mostly Sunny',
    precip: '17%',
    wind: 'N 16 kmph',
    icon: 'sun',
    hourly: [{
      time: '6am',
      temp: 9,
      precip: '5%'
    }, {
      time: '9am',
      temp: 14,
      precip: '8%'
    }, {
      time: '12pm',
      temp: 19,
      precip: '10%'
    }, {
      time: '3pm',
      temp: 23,
      precip: '12%'
    }, {
      time: '6pm',
      temp: 20,
      precip: '15%'
    }, {
      time: '9pm',
      temp: 14,
      precip: '17%'
    }],
    details: {
      humidity: '65%',
      uvIndex: '7 of 11',
      sunrise: '4:13 am',
      sunset: '7:06 pm',
      visibility: '15 km',
      pressure: '1015 mb'
    }
  }, {
    day: 'Thu 29',
    temp: {
      high: 19,
      low: 10
    },
    condition: 'Mostly Cloudy',
    precip: '24%',
    wind: 'NE 12 kmph',
    icon: 'cloud',
    hourly: [{
      time: '6am',
      temp: 10,
      precip: '12%'
    }, {
      time: '9am',
      temp: 13,
      precip: '18%'
    }, {
      time: '12pm',
      temp: 16,
      precip: '22%'
    }, {
      time: '3pm',
      temp: 19,
      precip: '24%'
    }, {
      time: '6pm',
      temp: 17,
      precip: '20%'
    }, {
      time: '9pm',
      temp: 13,
      precip: '15%'
    }],
    details: {
      humidity: '75%',
      uvIndex: '5 of 11',
      sunrise: '4:14 am',
      sunset: '7:07 pm',
      visibility: '12 km',
      pressure: '1012 mb'
    }
  }, {
    day: 'Fri 30',
    temp: {
      high: 20,
      low: 11
    },
    condition: 'PM Thunderstorms',
    precip: '24%',
    wind: 'NE 7 kmph',
    icon: 'storm',
    hourly: [{
      time: '6am',
      temp: 11,
      precip: '10%'
    }, {
      time: '9am',
      temp: 14,
      precip: '15%'
    }, {
      time: '12pm',
      temp: 17,
      precip: '20%'
    }, {
      time: '3pm',
      temp: 20,
      precip: '45%'
    }, {
      time: '6pm',
      temp: 18,
      precip: '60%'
    }, {
      time: '9pm',
      temp: 14,
      precip: '40%'
    }],
    details: {
      humidity: '82%',
      uvIndex: '6 of 11',
      sunrise: '4:15 am',
      sunset: '7:08 pm',
      visibility: '9 km',
      pressure: '1008 mb'
    }
  }];
  const getIcon = (icon: string) => {
    switch (icon) {
      case 'sun':
        return <Sun className="h-5 w-5 text-yellow-500" />;
      case 'cloud':
        return <Cloud className="h-5 w-5 text-gray-400" />;
      case 'storm':
        return <CloudLightning className="h-5 w-5 text-purple-500" />;
      default:
        return <Sun className="h-5 w-5 text-yellow-500" />;
    }
  };
  return <div className="space-y-4">
      {days.map(day => {
      const isExpanded = expandedDays.has(day.day);
      return <div key={day.day} className={`bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden transition-all ${isExpanded ? 'border-l-4 border-blue-500' : ''}`}>
            <div className={`p-4 flex items-center justify-between cursor-pointer ${isExpanded ? 'bg-blue-50/50 dark:bg-slate-700/30' : 'hover:bg-gray-50 dark:hover:bg-slate-700'}`} onClick={() => toggleDayExpansion(day.day)}>
              <div className="flex items-center gap-4">
                <span className="font-bold text-gray-900 dark:text-white w-24">
                  {day.day}
                </span>
                <div className="flex items-center gap-2">
                  {getIcon(day.icon)}
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {day.condition}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <span className="font-bold text-gray-900 dark:text-white">
                  {convertTemp(day.temp.high)}°{' '}
                  <span className="text-gray-400 font-normal">
                    / {convertTemp(day.temp.low)}°
                  </span>
                </span>
                {isExpanded ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
              </div>
            </div>

            {/* Expanded Content */}
            {isExpanded && <div className="p-6 border-t border-gray-100 dark:border-slate-700 animate-in slide-in-from-top duration-300">
                {/* Hourly Breakdown */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Hourly Forecast
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                    {day.hourly.map((hour, idx) => <div key={idx} className="bg-gray-50 dark:bg-slate-700 rounded-lg p-3 text-center">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                          {hour.time}
                        </p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                          {convertTemp(hour.temp)}°
                        </p>
                        <div className="flex items-center justify-center gap-1">
                          <CloudRain className="h-3 w-3 text-blue-400" />
                          <span className="text-xs text-blue-500">
                            {hour.precip}
                          </span>
                        </div>
                      </div>)}
                  </div>
                </div>

                {/* Detailed Stats */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-slate-700/50 rounded-lg">
                    <Droplets className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Humidity
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {day.details.humidity}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-slate-700/50 rounded-lg">
                    <Wind className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Wind
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {day.wind}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-slate-700/50 rounded-lg">
                    <Sun className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        UV Index
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {day.details.uvIndex}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-slate-700/50 rounded-lg">
                    <Sunrise className="h-5 w-5 text-orange-500" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Sunrise
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {day.details.sunrise}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-slate-700/50 rounded-lg">
                    <Sunset className="h-5 w-5 text-indigo-500" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Sunset
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {day.details.sunset}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-slate-700/50 rounded-lg">
                    <Eye className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Visibility
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {day.details.visibility}
                      </p>
                    </div>
                  </div>
                </div>
              </div>}
          </div>;
    })}
    </div>;
}