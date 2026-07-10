import glob

# 1. Add caption to video-shadow.mp4 in index.html
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

shadow_video_tag = '<video data-src="video-shadow.mp4" poster="shadow-poster.jpg" muted loop playsinline preload="none" aria-label="אווירה"></video>'
caption = '<div style="position: absolute; bottom: 10px; right: 10px; background: transparent; color: rgba(255,255,255,0.5); text-shadow: 0 1px 4px rgba(0,0,0,0.8); padding: 4px 8px; border-radius: 4px; font-size: 0.55rem; white-space: nowrap; pointer-events: none; z-index: 10; text-align: right;" dir="rtl">* הופק עבור חברת Golmat ושייך להם.</div>'
replacement = shadow_video_tag + '\n                ' + caption

content = content.replace(shadow_video_tag, replacement)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

# 2. Reduce padding from 150px to 100px in all articles
articles = [
    'ai-ingredients-to-video.html',
    'ai-video-marketing.html',
    'corporate-shooting-days.html',
    'ai-video-tools.html',
    'hollywood-movies-from-home.html'
]

for article in articles:
    with open(article, 'r', encoding='utf-8') as f:
        article_content = f.read()
    
    # The exact string is: style="padding: 150px 20px 50px; text-align: center; max-width: 800px; margin: 0 auto;"
    # Let's just replace padding: 150px 20px 50px;
    article_content = article_content.replace('padding: 150px 20px 50px;', 'padding: 100px 20px 50px;')
    
    with open(article, 'w', encoding='utf-8') as f:
        f.write(article_content)

