import React, { useState } from 'react';
import { LocationWeather, LocationContext } from '../types/weather';
import { Cloud, Sun, CloudRain, MoreVertical, Star, Trash2, Edit2, Plus, X, MapPin, Home, Briefcase, Navigation } from 'lucide-react';
interface OtherLocationsProps {
  locations: LocationWeather[];
  onAddLocation: (location: LocationWeather) => void;
  onDeleteLocation: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onUpdateLabel: (id: string, label: string) => void;
  onUpdateContext: (id: string, role: 'current' | 'next' | 'home' | 'saved') => void;
  temperatureUnit: 'celsius' | 'fahrenheit';
  convertTemp: (temp: number) => number;
  themeColors?: any;
  locationContext?: LocationContext;
}
export function OtherLocations({
  locations,
  onAddLocation,
  onDeleteLocation,
  onToggleFavorite,
  onUpdateLabel,
  onUpdateContext,
  temperatureUnit,
  convertTemp,
  themeColors,
  locationContext
}: OtherLocationsProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editLabel, setEditLabel] = useState('');
  const [showContextMenu, setShowContextMenu] = useState<string | null>(null);
  const [newLocation, setNewLocation] = useState({
    city: '',
    country: '',
    label: 'Home'
  });
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return <Sun className="h-6 w-6 text-yellow-500" aria-hidden="true" />;
      case 'cloudy':
      case 'partly cloudy':
        return <Cloud className="h-6 w-6 text-gray-400" aria-hidden="true" />;
      case 'rainy':
        return <CloudRain className="h-6 w-6 text-blue-400" aria-hidden="true" />;
      default:
        return <Sun className="h-6 w-6 text-yellow-500" aria-hidden="true" />;
    }
  };
  const getContextIcon = (role?: string) => {
    switch (role) {
      case 'current':
        return <Navigation className="h-3 w-3" aria-hidden="true" />;
      case 'next':
        return <MapPin className="h-3 w-3" aria-hidden="true" />;
      case 'home':
        return <Home className="h-3 w-3" aria-hidden="true" />;
      default:
        return null;
    }
  };
  const getContextLabel = (role?: string) => {
    switch (role) {
      case 'current':
        return 'CURRENT';
      case 'next':
        return 'NEXT';
      case 'home':
        return 'HOME';
      default:
        return null;
    }
  };
  const getContextColors = (role?: string) => {
    switch (role) {
      case 'current':
        return {
          bg: '#DBEAFE',
          text: '#1E40AF',
          border: '#3B82F6'
        };
      case 'next':
        return {
          bg: '#FEF3C7',
          text: '#92400E',
          border: '#F59E0B'
        };
      case 'home':
        return {
          bg: '#D1FAE5',
          text: '#065F46',
          border: '#10B981'
        };
      default:
        return {
          bg: 'transparent',
          text: themeColors?.textSecondary || '#6B7280',
          border: 'transparent'
        };
    }
  };
  const handleAddLocation = () => {
    if (newLocation.city) {
      onAddLocation({
        id: Date.now().toString(),
        city: newLocation.city,
        country: newLocation.country,
        temp: Math.floor(Math.random() * 30) + 10,
        condition: 'Sunny',
        high: Math.floor(Math.random() * 30) + 15,
        low: Math.floor(Math.random() * 15) + 5,
        label: newLocation.label,
        isFavorite: false,
        contextRole: 'saved'
      });
      setNewLocation({
        city: '',
        country: '',
        label: 'Home'
      });
      setShowAddForm(false);
    }
  };
  const startEditLabel = (id: string, currentLabel: string) => {
    setEditingId(id);
    setEditLabel(currentLabel || '');
  };
  const saveLabel = (id: string) => {
    onUpdateLabel(id, editLabel);
    setEditingId(null);
  };
  const sortedLocations = [...locations].sort((a, b) => {
    const roleOrder = {
      current: 0,
      next: 1,
      home: 2,
      saved: 3
    };
    const aOrder = roleOrder[a.contextRole || 'saved'];
    const bOrder = roleOrder[b.contextRole || 'saved'];
    if (aOrder !== bOrder) return aOrder - bOrder;
    if (a.isFavorite && !b.isFavorite) return -1;
    if (!a.isFavorite && b.isFavorite) return 1;
    return 0;
  });
  return <section className="rounded-xl shadow-lg p-4 backdrop-blur-md border-2" style={{
    backgroundColor: themeColors ? `${themeColors.cardBg}E6` : '#FFFFFF',
    borderColor: themeColors ? `${themeColors.primary}40` : '#E5E7EB'
  }} aria-label="Saved locations">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg" style={{
        color: themeColors?.text
      }}>
          Other Locations
        </h2>
        <button onClick={() => setShowAddForm(!showAddForm)} className="flex items-center gap-1 text-xs font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1 transition-colors" style={{
        color: themeColors?.accent || '#4299E1'
      }} aria-label={showAddForm ? 'Cancel adding location' : 'Add new location'} aria-expanded={showAddForm}>
          {showAddForm ? <X className="h-3 w-3" aria-hidden="true" /> : <Plus className="h-3 w-3" aria-hidden="true" />}
          {showAddForm ? 'CANCEL' : 'ADD LOCATION'}
        </button>
      </div>

      {showAddForm && <form onSubmit={e => {
      e.preventDefault();
      handleAddLocation();
    }} className="mb-4 p-3 rounded-lg space-y-2" style={{
      backgroundColor: themeColors ? `${themeColors.primary}20` : '#EBF8FF'
    }} aria-label="Add new location form">
          <div>
            <label htmlFor="city-input" className="sr-only">
              City name
            </label>
            <input id="city-input" type="text" placeholder="City name" value={newLocation.city} onChange={e => setNewLocation({
          ...newLocation,
          city: e.target.value
        })} className="w-full px-3 py-2 text-sm rounded border focus:ring-2 focus:ring-blue-500 outline-none" style={{
          borderColor: themeColors?.primary || '#CBD5E0',
          backgroundColor: themeColors?.cardBg || '#FFFFFF',
          color: themeColors?.text
        }} required aria-required="true" />
          </div>
          <div>
            <label htmlFor="country-input" className="sr-only">
              Country (optional)
            </label>
            <input id="country-input" type="text" placeholder="Country (optional)" value={newLocation.country} onChange={e => setNewLocation({
          ...newLocation,
          country: e.target.value
        })} className="w-full px-3 py-2 text-sm rounded border focus:ring-2 focus:ring-blue-500 outline-none" style={{
          borderColor: themeColors?.primary || '#CBD5E0',
          backgroundColor: themeColors?.cardBg || '#FFFFFF',
          color: themeColors?.text
        }} />
          </div>
          <div>
            <label htmlFor="label-select" className="sr-only">
              Location label
            </label>
            <select id="label-select" value={newLocation.label} onChange={e => setNewLocation({
          ...newLocation,
          label: e.target.value
        })} className="w-full px-3 py-2 text-sm rounded border focus:ring-2 focus:ring-blue-500 outline-none" style={{
          borderColor: themeColors?.primary || '#CBD5E0',
          backgroundColor: themeColors?.cardBg || '#FFFFFF',
          color: themeColors?.text
        }}>
              <option value="Home">Home</option>
              <option value="Work">Work</option>
              <option value="Work 2">Work 2</option>
              <option value="Vacation">Vacation</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <button type="submit" className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Add Location
          </button>
        </form>}

      <ul className="space-y-3" role="list">
        {sortedLocations.map(loc => {
        const contextColors = getContextColors(loc.contextRole);
        return <li key={loc.id} className="relative p-4 hover:bg-opacity-50 rounded-lg transition-all group border-2" style={{
          backgroundColor: themeColors ? `${themeColors.primary}10` : '#F7FAFC',
          borderColor: contextColors.border
        }}>
              {/* Context Badge */}
              {loc.contextRole && loc.contextRole !== 'saved' && <div className="flex items-center gap-1 mb-2 px-2 py-1 rounded-full w-fit text-xs font-bold uppercase tracking-wider" style={{
            backgroundColor: contextColors.bg,
            color: contextColors.text
          }} role="status" aria-label={`${getContextLabel(loc.contextRole)} location`}>
                  {getContextIcon(loc.contextRole)}
                  <span>{getContextLabel(loc.contextRole)}</span>
                </div>}

              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  {/* Label */}
                  <div className="flex items-center gap-2 mb-1">
                    {editingId === loc.id ? <input type="text" value={editLabel} onChange={e => setEditLabel(e.target.value)} onBlur={() => saveLabel(loc.id)} onKeyPress={e => e.key === 'Enter' && saveLabel(loc.id)} className="text-xs font-semibold uppercase tracking-wider bg-transparent border-b-2 border-blue-500 outline-none" style={{
                  color: themeColors?.textSecondary
                }} autoFocus aria-label="Edit location label" /> : <>
                        <span className="text-xs font-semibold uppercase tracking-wider" style={{
                    color: themeColors?.textSecondary
                  }}>
                          {loc.label || 'Location'}
                        </span>
                        <button onClick={() => startEditLabel(loc.id, loc.label || '')} className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500" aria-label={`Edit label for ${loc.city}`}>
                          <Edit2 className="h-3 w-3" style={{
                      color: themeColors?.textSecondary
                    }} aria-hidden="true" />
                        </button>
                      </>}
                  </div>

                  {/* City Name */}
                  <h3 className="font-bold text-base mb-1" style={{
                color: themeColors?.text
              }}>
                    {loc.city}
                  </h3>
                  <p className="text-xs mb-2" style={{
                color: themeColors?.textSecondary
              }}>
                    {loc.country}
                  </p>

                  {/* Time */}
                  <div className="flex items-center gap-2 text-xs" style={{
                color: themeColors?.textSecondary
              }}>
                    <time>12:23 pm</time>
                  </div>
                </div>

                {/* Temperature and Weather Icon */}
                <div className="flex flex-col items-end gap-2 ml-4">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold" style={{
                  color: themeColors?.text
                }}>
                      {convertTemp(loc.temp)}°
                    </span>
                    {getWeatherIcon(loc.condition)}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => onToggleFavorite(loc.id)} className="p-1 rounded hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500" aria-label={loc.isFavorite ? `Remove ${loc.city} from favorites` : `Add ${loc.city} to favorites`} aria-pressed={loc.isFavorite}>
                      <Star className={`h-4 w-4 ${loc.isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} aria-hidden="true" />
                    </button>

                    <div className="relative">
                      <button onClick={() => setShowContextMenu(showContextMenu === loc.id ? null : loc.id)} className="p-1 rounded hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500" aria-label={`Context menu for ${loc.city}`} aria-expanded={showContextMenu === loc.id} aria-haspopup="menu">
                        <MoreVertical className="h-4 w-4" style={{
                      color: themeColors?.textSecondary
                    }} aria-hidden="true" />
                      </button>

                      {showContextMenu === loc.id && <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-xl border-2 z-50 py-1" style={{
                    backgroundColor: themeColors?.cardBg || '#FFFFFF',
                    borderColor: themeColors?.primary || '#E5E7EB'
                  }} role="menu" aria-label="Location context options">
                          <button onClick={() => {
                      onUpdateContext(loc.id, 'current');
                      setShowContextMenu(null);
                    }} className="w-full px-4 py-2 text-left text-sm hover:bg-blue-50 dark:hover:bg-slate-700 flex items-center gap-2 focus:outline-none focus:bg-blue-100" style={{
                      color: themeColors?.text
                    }} role="menuitem">
                            <Navigation className="h-4 w-4 text-blue-500" aria-hidden="true" />
                            Set as Current
                          </button>
                          <button onClick={() => {
                      onUpdateContext(loc.id, 'next');
                      setShowContextMenu(null);
                    }} className="w-full px-4 py-2 text-left text-sm hover:bg-orange-50 dark:hover:bg-slate-700 flex items-center gap-2 focus:outline-none focus:bg-orange-100" style={{
                      color: themeColors?.text
                    }} role="menuitem">
                            <MapPin className="h-4 w-4 text-orange-500" aria-hidden="true" />
                            Set as Next
                          </button>
                          <button onClick={() => {
                      onUpdateContext(loc.id, 'home');
                      setShowContextMenu(null);
                    }} className="w-full px-4 py-2 text-left text-sm hover:bg-green-50 dark:hover:bg-slate-700 flex items-center gap-2 focus:outline-none focus:bg-green-100" style={{
                      color: themeColors?.text
                    }} role="menuitem">
                            <Home className="h-4 w-4 text-green-500" aria-hidden="true" />
                            Set as Home
                          </button>
                          <hr className="my-1" style={{
                      borderColor: themeColors?.primary || '#E5E7EB'
                    }} />
                          <button onClick={() => {
                      onDeleteLocation(loc.id);
                      setShowContextMenu(null);
                    }} className="w-full px-4 py-2 text-left text-sm hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 text-red-600 focus:outline-none focus:bg-red-100" role="menuitem">
                            <Trash2 className="h-4 w-4" aria-hidden="true" />
                            Delete Location
                          </button>
                        </div>}
                    </div>
                  </div>
                </div>
              </div>
            </li>;
      })}
      </ul>
    </section>;
}