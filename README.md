# Personal Site Pixel

Portfolio site built with React, Tailwind CSS, and hash-based routing for GitHub Pages.

## Current Features

- Bilingual UI toggle: English / 中文
- Global theme toggle: dark / light
- Mobile-first landing page with horizontal project rail
- Project archive and per-project detail views
- GitHub Pages-friendly hash routing
- Pixel / terminal / archival visual system

## Project Highlights

The current project set includes:

- `Circuit Simulator`
- `Benchmark Echo`
- `Object Echo`
- `Math to Braille OCR`
- `Prediction Market Intelligence Dashboard`

Project metadata and links are defined in [`src/data/data.js`](/Users/blueberryncherry/Proj/personal_site_pixel/src/data/data.js), with localized copy in [`src/data/translations.js`](/Users/blueberryncherry/Proj/personal_site_pixel/src/data/translations.js).

## Tech Stack

- React 18
- React Router 6
- Tailwind CSS
- Create React App

App-wide providers are set up in [`src/App.js`](/Users/blueberryncherry/Proj/personal_site_pixel/src/App.js):

- [`LanguageProvider`](/Users/blueberryncherry/Proj/personal_site_pixel/src/utils/LanguageContext.js)
- [`ThemeProvider`](/Users/blueberryncherry/Proj/personal_site_pixel/src/utils/ThemeContext.js)

## Development

Install dependencies with:

```bash
npm install
```

Run the local dev server:

```bash
npm start
```

Create a production build:

```bash
npm run build
```

Run tests:

```bash
npm test
```

## Routing

The site uses `HashRouter`, so nested routes work on GitHub Pages without custom server rewrites.

Main routes:

- `#/`
- `#/project`
- `#/project/:id`
- `#/about`

## Deployment

A GitHub Actions workflow is included at [`.github/workflows/deploy-pages.yml`](/Users/blueberryncherry/Proj/personal_site_pixel/.github/workflows/deploy-pages.yml).

To deploy with GitHub Pages:

1. Push the repository to GitHub.
2. Open `Settings -> Pages`.
3. Set the source to `GitHub Actions`.
4. Push to `main`, or run the workflow manually from the `Actions` tab.

## Notes

- This repo is standardized on `npm`.
- `homepage` is set to `"."` in [`package.json`](/Users/blueberryncherry/Proj/personal_site_pixel/package.json) for relative asset paths.
- Theme and language preferences are persisted in `localStorage`.
