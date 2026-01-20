# SkyBulletin — User Flows

## Flow 1: First-time use (no saved cities)
1. User lands on Today tab
2. App shows Current city (default / last used)
3. Saved section shows Empty State with CTA: “Save current city”
Success: user understands “save + compare” model quickly.

## Flow 2: Switch context (Current → Next → Home)
1. User opens location control
2. Selects Next city
3. UI updates across Today/5-Day/Monthly consistently
Success: context switch feels instant and predictable.

## Flow 3: Change units (C/F)
1. User toggles units in Settings
2. All temperature surfaces update (cards, forecasts)
Success: no mixed units; change is global and persistent.

## Flow 4: Data unavailable
### Offline
1. User loses connection
2. Offline banner appears: “Showing last saved weather • Updated: …”
Success: user trusts the data is cached and knows freshness.

### Error
1. Fetch fails
2. Error state shows message + Retry CTA
Success: user has a clear next action; no dead end.
