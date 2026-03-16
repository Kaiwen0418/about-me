# Personal Site

This is a Create React App project configured for GitHub Pages deployment.

## Development

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

## GitHub Pages

A GitHub Actions workflow is included at [`.github/workflows/deploy-pages.yml`](/Users/blueberryncherry/Proj/personal_site_pixel/.github/workflows/deploy-pages.yml).

To enable deployment:

1. Push this repository to GitHub.
2. In GitHub, open `Settings` -> `Pages`.
3. Set `Source` to `GitHub Actions`.
4. Push to the `main` branch, or run the workflow manually from the `Actions` tab.

The site uses hash-based routing, so GitHub Pages can serve nested views without custom server rewrites.

## Notes

This project currently includes both `package-lock.json` and `pnpm-lock.yaml`. The workflow uses `npm ci`, so if you want to standardize on `pnpm`, the workflow should be updated to match.
