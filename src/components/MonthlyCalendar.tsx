import React, { useState } from 'react';
import { Cloud, Sun, CloudRain, CloudLightning, CloudSnow, ChevronLeft, ChevronRight } from 'lucide-react';
interface MonthlyCalendarProps {
  temperatureUnit: 'celsius' | 'fahrenheit';
  convertTemp: (temp: number) => number;
}
export function MonthlyCalendar({
  temperatureUnit,
  convertTemp
}: MonthlyCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 4, 1)); // May 2025
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    // Add actual days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        date: day,
        temp: Math.floor(Math.random() * (28 - 15) + 15),
        high: Math.floor(Math.random() * (30 - 20) + 20),
        low: Math.floor(Math.random() * (15 - 5) + 5),
        icon: ['sun', 'cloud', 'rain', 'storm'][Math.floor(Math.random() * 4)],
        precip: Math.floor(Math.random() * 80)
      });
    }
    return days;
  };
  const days = getDaysInMonth(currentDate);
  const getIcon = (icon: string) => {
    switch (icon) {
      case 'sun':
        return <Sun className="h-5 w-5 text-yellow-500" />;
      case 'cloud':
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
  const changeMonth = (delta: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + delta, 1));
  };
  const changeYear = (delta: number) => {
    setCurrentDate(new Date(currentDate.getFullYear() + delta, currentDate.getMonth(), 1));
  };
  return <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
      {/* Month/Year Selector */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <button onClick={() => changeYear(-1)} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors" title="Previous year">
            <ChevronLeft className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          </button>
          <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors" title="Previous month">
            <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <select value={currentDate.getMonth()} onChange={e => setCurrentDate(new Date(currentDate.getFullYear(), parseInt(e.target.value), 1))} className="px-4 py-2 bg-blue-50 dark:bg-slate-700 rounded-lg text-blue-900 dark:text-white font-semibold border-none focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer">
            {monthNames.map((month, index) => <option key={month} value={index}>
                {month}
              </option>)}
          </select>

          <select value={currentDate.getFullYear()} onChange={e => setCurrentDate(new Date(parseInt(e.target.value), currentDate.getMonth(), 1))} className="px-4 py-2 bg-blue-50 dark:bg-slate-700 rounded-lg text-blue-900 dark:text-white font-semibold border-none focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer">
            {Array.from({
            length: 10
          }, (_, i) => currentDate.getFullYear() - 5 + i).map(year => <option key={year} value={year}>
                {year}
              </option>)}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => changeMonth(1)} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors" title="Next month">
            <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
          <button onClick={() => changeYear(1)} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors" title="Next year">
            <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-slate-700 rounded-lg overflow-hidden border border-gray-200 dark:border-slate-700">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <div key={day} className="bg-blue-50 dark:bg-slate-800 p-2 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
            {day}
          </div>)}

        {days.map((day, i) => <div key={i} className={`bg-white dark:bg-slate-800 p-2 min-h-[100px] transition-colors relative group ${day ? 'hover:bg-blue-50 dark:hover:bg-slate-700 cursor-pointer' : ''}`}>
            {day && <>
                <span className="absolute top-2 left-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  {day.date}
                </span>
                <div className="flex flex-col items-center justify-center h-full pt-4 gap-1">
                  {getIcon(day.icon)}
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    {convertTemp(day.temp)}°
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    {convertTemp(day.high)}° / {convertTemp(day.low)}°
                  </span>
                  {day.precip > 30 && <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <CloudRain className="h-3 w-3 text-blue-400" />
                      <span className="text-xs text-blue-500">
                        {day.precip}%
                      </span>
                    </div>}
                </div>
              </>}
          </div>)}
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center justify-center gap-6 text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-1">
          <Sun className="h-4 w-4 text-yellow-500" />
          <span>Sunny</span>
        </div>
        <div className="flex items-center gap-1">
          <Cloud className="h-4 w-4 text-gray-400" />
          <span>Cloudy</span>
        </div>
        <div className="flex items-center gap-1">
          <CloudRain className="h-4 w-4 text-blue-400" />
          <span>Rainy</span>
        </div>
        <div className="flex items-center gap-1">
          <CloudLightning className="h-4 w-4 text-purple-500" />
          <span>Stormy</span>
        </div>
      </div>
    </div>;
}