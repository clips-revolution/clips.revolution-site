const fs = require('fs');
let html = fs.readFileSync('corporate-shooting-days.html', 'utf8');

// Change first image to video-asaf and make it small/centered
html = html.replace(
  '<div style="margin-bottom: 40px; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">\n        <img src="asaf-poster.jpg" alt="Corporate Shooting Day" style="width: 100%; height: auto; display: block;">\n      </div>',
  '<div style="margin-bottom: 40px; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); max-width: 400px; margin: 0 auto 40px;">\n        <video src="video-asaf.mp4" poster="asaf-poster.jpg" autoplay muted loop playsinline style="width: 100%; height: auto; display: block;"></video>\n      </div>'
);

// Change second image to video-shadow and make it small/centered
html = html.replace(
  '<div style="margin-bottom: 40px; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">\n        <img src="restaurant-poster.jpg" alt="Professional Lighting and Sound" style="width: 100%; height: auto; display: block;">\n      </div>',
  '<div style="margin-bottom: 40px; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); max-width: 400px; margin: 0 auto 40px;">\n        <video src="video-shadow.mp4" poster="shadow-poster.jpg" autoplay muted loop playsinline style="width: 100%; height: auto; display: block;"></video>\n      </div>'
);

// also add text-align center to the article body for consistency
html = html.replace(
  '<section id="article-body" style="padding: 0 20px 80px; max-width: 800px; margin: 0 auto; color: rgba(255,255,255,0.85); font-size: 1.1rem; line-height: 1.8;">',
  '<section id="article-body" style="padding: 0 20px 80px; max-width: 800px; margin: 0 auto; color: rgba(255,255,255,0.85); font-size: 1.1rem; line-height: 1.8; text-align: center;">'
);

// fix ul text alignment since body is centered
html = html.replace(
  '<ul style="margin-bottom: 40px; padding-right: 20px;">',
  '<ul style="margin-bottom: 40px; padding-right: 20px; text-align: right; display: inline-block; max-width: 600px;">'
);

fs.writeFileSync('corporate-shooting-days.html', html, 'utf8');
