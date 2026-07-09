const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// replace the dark background style with a more subtle text-shadow style
html = html.replace(/background: rgba\(0,0,0,0\.7\); color: rgba\(255,255,255,0\.7\);/g, 'background: transparent; color: rgba(255,255,255,0.5); text-shadow: 0 1px 4px rgba(0,0,0,0.8);');

fs.writeFileSync('index.html', html, 'utf8');
