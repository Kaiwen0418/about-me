# Kaiwen Liu Portfolio

Single-page portfolio built with Vite and React for GitHub Pages deployment.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## GitHub Pages

Push to the `main` branch and enable GitHub Pages with **GitHub Actions** as the source.

The site reserves locale switching through the `lang` query parameter:

- `?lang=en`
- `?lang=zh-CN`

If the repository name changes, update `base` in [vite.config.js](/Users/blueberryncherry/Proj/about-me/vite.config.js:1).
