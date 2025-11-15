// Simple cross-platform build script to assemble a `dist/` folder for Netlify
// Usage: node ./scripts/build.js

const fs = require('fs').promises;
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');

const copyFile = async (src, dest) => {
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.copyFile(src, dest);
};

const copyDir = async (srcDir, destDir) => {
  await fs.mkdir(destDir, { recursive: true });
  const entries = await fs.readdir(srcDir, { withFileTypes: true });
  for (const e of entries) {
    const srcPath = path.join(srcDir, e.name);
    const destPath = path.join(destDir, e.name);
    if (e.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else if (e.isFile()) {
      await copyFile(srcPath, destPath);
    }
  }
};

(async () => {
  try {
  console.log('Cleaning dist/');
    await fs.rm(DIST, { recursive: true, force: true });
    await fs.mkdir(DIST, { recursive: true });

    // Copy top-level files with these extensions
    const topFiles = await fs.readdir(ROOT, { withFileTypes: true });
    // Blacklist files that should never be included in the published site
    const BLACKLIST_FILES = ['firebase-server.js', 'firebase-monitor.html', 'firebase-monitor.js', 'firebase-server.html'];
    for (const entry of topFiles) {
      const name = entry.name;
      const full = path.join(ROOT, name);
      // Skip internal folders
      if (['node_modules', 'dist', '.git', 'private'].includes(name)) continue;
      if (entry.isFile()) {
        if (BLACKLIST_FILES.includes(name)) continue;
        const ext = path.extname(name).toLowerCase();
        // include common static assets and html/js/css/json files
        if (['.html', '.js', '.css', '.json', '.png', '.jpg', '.jpeg', '.svg', '.ico', '.txt'].includes(ext) || name.toLowerCase() === 'index.html') {
          console.log('Copy file:', name);
          await copyFile(full, path.join(DIST, name));
        }
      } else if (entry.isDirectory()) {
        // include these typical public/static folders if present
        if (['assets', 'public', 'static', 'images'].includes(name.toLowerCase())) {
          console.log('Copy directory:', name);
          await copyDir(full, path.join(DIST, name));
        }
      }
    }

    // Fallback: ensure index.html exists in dist
    const idxSrc = path.join(ROOT, 'index.html');
    const idxDest = path.join(DIST, 'index.html');
    try {
      await fs.access(idxDest);
    } catch (err) {
      // not present yet, try copy
      await copyFile(idxSrc, idxDest);
    }

    console.log('Build finished. dist/ is ready.');
  } catch (err) {
    console.error('Build failed:', err);
    process.exitCode = 1;
  }
})();
