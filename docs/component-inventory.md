# SkyBulletin — Component Inventory

## Layout
- Header
- MainShell / AppLayout
- Tabs (Today, 5-Day, Monthly)
- SettingsPanel

## Data display
- CurrentWeatherCard
- ForecastCard
- ForecastList / Forecasts
- AQIIndicator (if present)

## States
- CurrentWeatherSkeleton
- EmptyState
- ErrorState
- OfflineBanner

## Utilities
- useLocationContext
- LocationContextManager
- useWeatherUIState (status, retry, last updated, offline)

