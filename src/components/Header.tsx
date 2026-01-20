import React, { useState } from 'react';
import { Search, Bell, Menu, Sun, Moon, Thermometer, MapPin, ArrowRight } from 'lucide-react';
import { TemperatureUnit, LocationContext } from '../types/weather';
interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  toggleSettings: () => void;
  temperatureUnit: TemperatureUnit;
  toggleTemperatureUnit: () => void;
  themeColors?: {
    primary: string;
    text: string;
    cardBg: string;
  };
  locationContext?: LocationContext;
  contextAccentColor?: string;
}
export function Header({
  darkMode,
  toggleDarkMode,
  toggleSettings,
  temperatureUnit,
  toggleTemperatureUnit,
  themeColors,
  locationContext,
  contextAccentColor
}: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 2) {
      const mockResults = ['New York, NY, USA', 'Los Angeles, CA, USA', 'Chicago, IL, USA', 'Houston, TX, USA', 'Phoenix, AZ, USA'].filter(city => city.toLowerCase().includes(query.toLowerCase()));
      setSearchResults(mockResults);
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };
  // Ensure sufficient contrast for header text
  const getContrastColor = (bgColor: string) => {
    // For dark backgrounds, return white; for light backgrounds, return dark color
    const darkBgs = ['#283593', '#1A237E', '#3E2723', '#4E342E', '#01579B', '#4527A0', '#E65100', '#BF360C'];
    return darkBgs.some(dark => bgColor?.includes(dark.slice(1))) ? '#FFFFFF' : themeColors?.text || '#00008B';
  };
  const headerTextColor = getContrastColor(themeColors?.primary || '');
  return <header className="w-full px-4 py-3 flex items-center justify-between shadow-md transition-colors duration-300 backdrop-blur-sm" style={{
    backgroundColor: themeColors?.primary || '#ADD8E6'
  }} role="banner">
      <div className="flex items-center gap-2">
        <button className="md:hidden mr-2 p-2 rounded-lg hover:bg-white/20 focus:outline-none focus:ring-4 focus:ring-white/50 transition-colors" aria-label="Open navigation menu" aria-expanded="false" style={{
        color: headerTextColor
      }}>
          <Menu className="h-6 w-6 cursor-pointer" aria-hidden="true" />
        </button>
        <div className="flex items-center gap-2">
          <Sun className="h-6 w-6 text-[#FF4500]" aria-hidden="true" />
          <h1 className="text-xl font-bold" style={{
          color: headerTextColor
        }}>
            Sky Bulletin
          </h1>
        </div>
      </div>

      {/* Location Context Indicator */}
      {locationContext?.current && <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md border-2 transition-all shadow-sm" style={{
      backgroundColor: `${themeColors?.cardBg || 'white'}F2`,
      borderColor: `${contextAccentColor || themeColors?.text || '#00008B'}60`,
      color: themeColors?.text || '#00008B'
    }} role="status" aria-live="polite">
          <MapPin className="h-4 w-4" aria-hidden="true" />
          <span className="text-sm font-semibold">
            {locationContext.current.city}
          </span>

          {locationContext.next && <>
              <ArrowRight className="h-3 w-3 opacity-50" aria-hidden="true" />
              <span className="text-xs opacity-75" aria-label={`Next destination: ${locationContext.next.city}`}>
                Next: {locationContext.next.city}
              </span>
            </>}
        </div>}

      <div className="flex-1 max-w-md mx-4 hidden md:block relative">
        <div className="relative">
          <label htmlFor="location-search" className="sr-only">
            Search for locations
          </label>
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" aria-hidden="true" />
          <input id="location-search" type="search" placeholder="Search for locations" value={searchQuery} onChange={e => handleSearch(e.target.value)} onFocus={() => searchQuery.length > 2 && setShowResults(true)} onBlur={() => setTimeout(() => setShowResults(false), 200)} className="w-full pl-10 pr-4 py-2 rounded-full border-2 border-transparent focus:border-blue-500 focus:ring-4 focus:ring-blue-200 outline-none text-sm transition-all" style={{
          backgroundColor: themeColors?.cardBg || 'white',
          color: themeColors?.text || '#2C3E50'
        }} aria-autocomplete="list" aria-controls="search-results" aria-expanded={showResults} />
        </div>

        {showResults && searchResults.length > 0 && <ul id="search-results" className="absolute top-full mt-2 w-full rounded-lg shadow-xl overflow-hidden z-50 border-2" style={{
        backgroundColor: themeColors?.cardBg || 'white',
        borderColor: themeColors?.primary || '#E5E7EB'
      }} role="listbox" aria-label="Search results">
            {searchResults.map((result, index) => <li key={index} role="option">
                <button className="w-full px-4 py-3 text-left hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors text-sm focus:outline-none focus:bg-blue-100 focus:ring-4 focus:ring-inset focus:ring-blue-300" style={{
            color: themeColors?.text || '#2C3E50'
          }} onClick={() => {
            setSearchQuery(result);
            setShowResults(false);
          }} tabIndex={0}>
                  <Search className="inline h-3 w-3 mr-2 opacity-50" aria-hidden="true" />
                  {result}
                </button>
              </li>)}
          </ul>}
      </div>

      <div className="flex items-center gap-3">
        <button onClick={toggleTemperatureUnit} className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full transition-all hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-sm" style={{
        backgroundColor: `${themeColors?.cardBg || 'white'}E6`,
        color: themeColors?.text || '#00008B',
        border: `2px solid ${themeColors?.primary || '#00008B'}40`
      }} aria-label={`Switch to ${temperatureUnit === 'celsius' ? 'Fahrenheit' : 'Celsius'}`} title={`Currently showing ${temperatureUnit === 'celsius' ? 'Celsius' : 'Fahrenheit'}`}>
          <Thermometer className="h-4 w-4" aria-hidden="true" />
          <span className="text-sm font-semibold">
            °{temperatureUnit === 'celsius' ? 'C' : 'F'}
          </span>
        </button>

        <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-white/20 transition-colors focus:outline-none focus:ring-4 focus:ring-white/50" aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`} aria-pressed={darkMode} style={{
        color: headerTextColor
      }}>
          {darkMode ? <Sun className="h-5 w-5" aria-hidden="true" /> : <Moon className="h-5 w-5" aria-hidden="true" />}
        </button>

        <button className="relative p-2 rounded-full hover:bg-white/20 transition-colors focus:outline-none focus:ring-4 focus:ring-white/50" aria-label="Notifications - 1 unread" style={{
        color: headerTextColor
      }}>
          <Bell className="h-5 w-5" aria-hidden="true" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full border-2" style={{
          borderColor: themeColors?.primary || '#ADD8E6'
        }} role="status" aria-label="1 new notification"></span>
        </button>

        <button className="h-8 w-8 rounded-full flex items-center justify-center border-2 cursor-pointer hover:scale-110 transition-transform focus:outline-none focus:ring-4 focus:ring-blue-300" style={{
        backgroundColor: themeColors?.cardBg || '#FFFFFF',
        borderColor: themeColors?.cardBg || 'white'
      }} onClick={toggleSettings} aria-label="Open settings">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User profile" className="h-full w-full rounded-full" />
        </button>
      </div>
    </header>;
}