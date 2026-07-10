import re

# Fix index.html
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('font-size: 0.7rem; pointer-events: none;', 'font-size: 0.55rem; white-space: nowrap; pointer-events: none;')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

# Fix articles
files = ['ai-ingredients-to-video.html', 'ai-video-marketing.html', 'corporate-shooting-days.html']
for filename in files:
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace font-size: 0.8rem with font-size: 0.7rem; white-space: nowrap; for the captions
    content = content.replace('font-size: 0.8rem; color: rgba(255,255,255,0.5);', 'font-size: 0.7rem; color: rgba(255,255,255,0.5); white-space: nowrap;')
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

