const fs = require('fs');

const files = [
    'index.html',
    'ai-ingredients-to-video.html',
    'ai-video-marketing.html',
    'ai-video-tools.html',
    'corporate-shooting-days.html'
];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace og:image
    content = content.replace(/<meta property="og:image" content="[^"]+">/g, '<meta property="og:image" content="https://clipsrevolution.com/social-preview.png">');
    
    // Replace twitter:image if it exists, or add it if it doesn't
    if (content.includes('twitter:image')) {
        content = content.replace(/<meta name="twitter:image" content="[^"]+">/g, '<meta name="twitter:image" content="https://clipsrevolution.com/social-preview.png">');
    } else {
        // Add twitter:image right after og:image
        content = content.replace(
            /<meta property="og:image" content="https:\/\/clipsrevolution.com\/social-preview.png">/,
            '<meta property="og:image" content="https://clipsrevolution.com/social-preview.png">\n  <meta name="twitter:image" content="https://clipsrevolution.com/social-preview.png">'
        );
    }

    fs.writeFileSync(file, content, 'utf8');
});
console.log('OG images updated successfully.');
