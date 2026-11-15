# Prompt: Manage workout-tracker

You are maintaining a single-file PWA called **workout-tracker**. It is a static site, no build step, no framework. All app logic lives in `index.html`. Data is local. Deploy by replacing files on GitHub Pages.

Live: https://karurosuma.github.io/workout-tracker/
Repo: https://github.com/karurosuma/workout-tracker
Author line: `@karurosuma/workout-tracker` → https://karurosuma.github.io/workout-tracker/

## Stack

- Custom CSS, no Bootstrap. Bootstrap Icons only (local in `vendor/`).
- ApexCharts (local).
- sql.js WASM (local) for SQLite, persisted in IndexedDB.
- Vanilla JS. `data-i18n` for Traditional Chinese and English.
- Service worker cache-first. Bump `CACHE` in `sw.js` on every change.
- `muscles.json` plus an embedded `MUSCLE_DATA` fallback in `index.html`.

## Look

- iOS dark mode only. No light theme.
- Black and yellow: black/dark-gold background, `#1c1c1e` cards, `#2c2c2e` fields, accent `#ffd60a`.
- Warm dark-gold body background (not pure black) so the area under the floating tab bar is not a black strip. Theme color and manifest `background_color` / `theme_color` match (`#2a2208`).
- System font stack: `-apple-system`, SF Pro, PingFang.
- Fixed top bar with the current page title centered, translucent + blurred (`backdrop-filter`).
- Floating iOS-style bottom tab bar (pill, rounded, translucent + blurred, icons above labels, active tab in yellow). Sits above the home indicator; the home-indicator area is covered by a matching background so no black strip shows.
- Segmented controls for language, units, and gender (active state uses accent).
- Buttons have press feedback (subtle scale). Form fields are full-width. Weight unit switch is an iOS-style segmented control.
- Body map uses photoreal photos clipped to silhouette with reasonable height (aspect-ratio, max-height).
- Set-row edit/delete buttons have borders; delete is red. Prefer a button group for edit/delete.
- Do not reintroduce Bootstrap or a light theme.

## Pages (bottom nav, fixed)

| Tab | Purpose |
| --- | --- |
| Log | Two in-page tabs: **Add** (session date, exercise with suggestions, weight, reps, last-weight hint, recent chips) and **From list** (pick a named schedule list and log sets for its exercises). Workout log below. |
| Performance | Date picker with prev/next to nearest record day. Body map (front/back), exercise summary with set/volume compare, that day's set list. |
| Charts | Date range (default last 90 days), body map, best weight and volume as two global sub-tabs. |
| Schedule | Named lists only (no days). Create a list and name it, then add exercises to it. Rename and delete lists. Exercise suggestions from logged sets. |
| Settings | Language, units (kg/lbs), gender, import SQLite, export SQLite, export JSON, migrate JSON, clear all. No appearance toggle. |

## Body map

- Photoreal hybrid: body photo clipped to silhouette, muscle regions on top.
- Male and female, front and back, in `bodies/`.
- Trained muscles shade light-to-dark red by volume share; untrained stay grey.
- Leader lines and percentage tags; click a percentage to toggle the last value.
- Performance map uses that day's sets only. Charts map uses the selected range.
- Front/back panes must show the correct view without an extra click. Force display when switching.
- Muscle mapping: exact name in `muscles.json` first, then keyword fallback.
- Keep legacy exercise entries if a name is duplicated.

## Storage

- SQLite via sql.js, table `sets (id, exercise, weight, reps, date, created_at)`.
- Weights stored in kg; convert for display.
- Schedule lists are JSON in localStorage: `[{ name, exercises: [] }]`.
- Import accepts `.sqlite`, `.db`, `.sqlite3`. Wait for SQL to be ready before import.
- Clear all wipes the database, resets the form, dates, and chart range, and closes the dialog first.
- Auto-reload after the app has been open 8 hours (only while visible).
- Workout log timestamps update on a timer, not only on insert.

## Conventions

- Single `index.html`. Do not split into multiple pages.
- Bump the service worker cache version on every change.
- Hard-refresh instructions after each delivery.
- Keep iOS Safari stable: no zoom, bottom nav fixed/floating, safe-area handling, translucent status bar.
- Page titles live in the top bar. Charts date selection full width.
- Edit a set to change its date, exercise, weight, and reps.
- Last weight hint: heaviest weight from the most recent day before the selected session date.
- Do not deliver `index.html`, `sw.js`, or a zip by default. Only push changes to GitHub unless the user explicitly requests the files.

## When changing the app

1. Edit `index.html` (and `muscles.json` / `sw.js` / `manifest.webmanifest` if needed).
2. Bump `CACHE` in `sw.js`.
3. If `muscles.json` changes, update the embedded `MUSCLE_DATA` fallback too.
4. Push the changes to the GitHub repo.
5. Tell the user to hard-refresh to load the new cache version.
