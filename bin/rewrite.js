const fs = require('fs');
const root = process.cwd();

const manifest = JSON.parse(fs.readFileSync(root + '/public/manifest.json', 'utf-8'));
const asset = JSON.parse(fs.readFileSync(root + '/build/asset-manifest.json', 'utf-8'));

manifest.content_scripts = [
  {
    "matches": [
      "http://*/*",
      "https://*/*"
    ],
    "js": [
      asset.files["main.js"],
    ],
    "css": [
      asset.files["main.css"]
    ],
    "run_at": "document_start"
  }
];

fs.writeFileSync(root + '/build/manifest.json', JSON.stringify(manifest, null, 2), 'utf-8');