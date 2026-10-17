# workout-tracker

A single-page workout tracker that logs sets, tracks progress, and maps trained muscles onto a body diagram. It runs entirely in the browser, works offline, and installs as a PWA on iOS and Android.

Live: [karurosuma.github.io/workout-tracker](https://karurosuma.github.io/workout-tracker/)

## Features

- **Log sets** — exercise, weight, reps, and session date, with recent-exercise chips for quick entry.
- **Performance** — pick any day, see sets, volume, and exercise count, compare against the last session, and view a body map of the muscles trained that day.
- **Charts** — best weight and volume per exercise, split into tabs, with a date range (default last 30 days) and a body map for the selected range.
- **Body map** — photoreal front and back views for male and female, with muscles shaded from light to dark red by volume share and leader lines to percentage tags.
- **Units** — switch between kg and lbs.
- **Languages** — English and Traditional Chinese.
- **Storage** — SQLite (via sql.js) persisted in IndexedDB, with automatic migration from older JSON data.
- **Import / export** — open a backup file to load records, export all data as JSON.
- **Offline** — service worker caches the app so it works without a network, and it can be added to the home screen.

## Pages

| Tab | What it shows |
| --- | --- |
| Log | Add a set: date, exercise, weight, reps |
| Performance | A day's stats, body map, exercise summary, and set list |
| Charts | Date range, body map, and per-exercise weight and volume charts |
| Settings | Language, units, gender, import, export, clear data |

## Body map

Muscle mapping lives in `muscles.json`. Exact exercise names are matched first; anything else falls back to keywords. Trained muscles shade from pale red to deep red by their share of the day's (or range's) volume. Untrained muscles stay grey.

## Run locally

No build step. Serve the folder with any static server:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`. A server is required for the service worker and SQLite wasm; opening `index.html` directly will not persist data.

## Deploy

Push the contents to the `gh-pages` branch (or set GitHub Pages to serve the repo root). The app is fully static.

## Tech

- Bootstrap 5 and Bootstrap Icons
- ApexCharts
- sql.js (SQLite compiled to WebAssembly)
- Vanilla JavaScript, no framework
- Service worker for offline caching

## License

MIT
