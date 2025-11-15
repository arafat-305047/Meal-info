# Deploying this project to Netlify

This repository is a static single-page app (index.html + supporting files). The small build script collects the files into a `dist/` folder which Netlify will publish.

## Important: Firebase credentials and privacy

To avoid committing secrets to the repository we now recommend the following workflow:

- Keep your real Firebase credentials in `private/firebase-config.js` (this folder is ignored by `.gitignore`).
- Commit `config/firebase-config.example.js` as a safe template (already included).
- For CI/CD (Netlify) set an environment variable named `__firebase_config` that contains the stringified JSON of your firebase config object, e.g.:

```powershell
# Example: (PowerShell) set in Netlify UI or CI
$env:__firebase_config = '{"apiKey":"xxx","projectId":"myproj","authDomain":"..."}'
```

The app will attempt to load credentials in this order:
1. `./private/firebase-config.js` (local, ignored by git)
2. `localStorage` item named `firebaseConfig` (written by the in-app setup UI)
3. Global `__firebase_config` environment variable (CI/CD or Netlify)

If none are available the app will prompt you to run `firebase-config-setup.html` or set up credentials manually.

## How it works
- `scripts/build.js` copies top-level HTML/JS/CSS and common asset folders into `dist/`.
- `netlify.toml` tells Netlify to run `npm run build` and publish the `dist/` folder.

## Local build (Windows / macOS / Linux)
1. Install dependencies (only needed for Node script):

```powershell
npm install
```

2. Run the build:

```powershell
npm run build
```

After that, a `dist/` folder will be created at the project root containing the site ready for deployment.

## Deploy options
- Quick (drag & drop): open Netlify Sites -> New site from drag & drop -> drop the `dist/` folder.
- Recommended (continuous deploy): push this repo to GitHub (or GitLab/Bitbucket) and connect the repo in Netlify. Netlify will use `netlify.toml` and run `npm run build` automatically. Ensure the publish directory is `dist` (it is set in `netlify.toml`).

## Notes and recommendations
- The build script is intentionally conservative: it copies top-level `.html`, `.js`, `.css`, `.json` and image files, and any `assets`, `public`, `static`, or `images` directories if present.
- `private/` is ignored by `.gitignore` and will not be published. For CI/Netlify provide the `__firebase_config` environment variable.
- If you keep sensitive credentials in files (for example, any Firebase admin/server files), remove or exclude them before publishing.
# Deploying this project to Netlify

This repository is a static single-page app (index.html + supporting files). The small build script collects the files into a `dist/` folder which Netlify will publish.

## How it works
- `scripts/build.js` copies top-level HTML/JS/CSS and common asset folders into `dist/`.
- `netlify.toml` tells Netlify to run `npm run build` and publish the `dist/` folder.

## Local build (Windows / macOS / Linux)
1. Install dependencies (only needed for Node script):

```powershell
npm install
```

2. Run the build:

```powershell
npm run build
```

After that, a `dist/` folder will be created at the project root containing the site ready for deployment.

## Deploy options
- Quick (drag & drop): open Netlify Sites -> New site from drag & drop -> drop the `dist/` folder.
- Recommended (continuous deploy): push this repo to GitHub (or GitLab/Bitbucket) and connect the repo in Netlify. Netlify will use `netlify.toml` and run `npm run build` automatically. Ensure the publish directory is `dist` (it is set in `netlify.toml`).

## Notes and recommendations
- The build script is intentionally conservative: it copies top-level `.html`, `.js`, `.css`, `.json` and image files, and any `assets`, `public`, `static`, or `images` directories if present.
- If you keep sensitive credentials in files (for example, any Firebase admin/server files), remove or exclude them before publishing.
- For local preview you can open `dist/index.html` in your browser after building.

If you'd like, I can:
- Add a simple `.gitignore` entry for `dist/` (recommended if you don't want to commit build output).
- Tweak which files/folders the build script includes or add environment variable handling for Netlify.
