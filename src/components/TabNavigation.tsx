import React from 'react';
import { TabType } from '../types/weather';
interface TabNavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  themeColors?: {
    primary: string;
    text: string;
    accent: string;
  };
}
export function TabNavigation({
  activeTab,
  setActiveTab,
  themeColors
}: TabNavigationProps) {
  const tabs: {
    id: TabType;
    label: string;
  }[] = [{
    id: 'today',
    label: 'Today'
  }, {
    id: '5day',
    label: '5 Day'
  }, {
    id: 'monthly',
    label: 'Monthly'
  }];
  return <div className="w-full border-t px-4 transition-colors duration-300" style={{
    backgroundColor: themeColors?.primary || '#ADD8E6',
    borderColor: `${themeColors?.primary || '#ADD8E6'}40`
  }}>
      <div className="flex space-x-1 overflow-x-auto">
        {tabs.map(tab => <button key={tab.id} onClick={() => setActiveTab(tab.id)} className="px-6 py-3 text-sm font-medium transition-all relative whitespace-nowrap hover:scale-105" style={{
        color: activeTab === tab.id ? themeColors?.text || '#00008B' : `${themeColors?.text || '#00008B'}80`,
        fontWeight: activeTab === tab.id ? '600' : '500'
      }}>
            {tab.label}
            {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-1 rounded-t-md" style={{
          backgroundColor: themeColors?.accent || themeColors?.text || '#00008B'
        }} />}
          </button>)}
      </div>
    </div>;
}