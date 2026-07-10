import re

# 1. Remove caption from video-shadow in index.html
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Look for video-shadow and its caption right after it
shadow_pattern = re.compile(r'(<video data-src="video-shadow\.mp4".*?</video>)\s*<div[^>]*>\*\s*הופק עבור חברת Golmat ושייך להם\.</div>', re.DOTALL)
content = shadow_pattern.sub(r'\1', content)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

# 2, 3, 4. Fix articles
articles_with_video = [
    'ai-ingredients-to-video.html',
    'ai-video-marketing.html',
    'corporate-shooting-days.html'
]
all_articles = articles_with_video + ['ai-video-tools.html', 'hollywood-movies-from-home.html']

# Move caption into video div as overlay for the 3 articles
for article in articles_with_video:
    with open(article, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We want to match:
    # <div style="margin-bottom: 20px; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); max-width: 400px; margin: 40px auto 0;">
    #   <video ...></video>
    # </div>
    # <p style="...">* הסרטון נעשה בשביל (חברת X) ושייך להם.</p>
    
    # regex to capture the video div content, the end of the div, and the caption text
    pattern = re.compile(
        r'(<div[^>]*?max-width:\s*400px;[^>]*>.*?)(</div>)\s*<p[^>]*>\*\s*הסרטון נעשה בשביל (.*?) ושייך להם\.</p>',
        re.DOTALL
    )
    
    def replacer(match):
        div_start_and_video = match.group(1)
        company = match.group(3)
        overlay = f'<div style="position: absolute; bottom: 10px; right: 10px; background: transparent; color: rgba(255,255,255,0.5); text-shadow: 0 1px 4px rgba(0,0,0,0.8); padding: 4px 8px; border-radius: 4px; font-size: 0.55rem; white-space: nowrap; pointer-events: none; z-index: 10; text-align: right;" dir="rtl">* הופק עבור {company} ושייך להם.</div>'
        # ensure the parent div has position relative
        new_div = div_start_and_video.replace('margin-bottom: 20px;', 'position: relative; margin-bottom: 20px;')
        return new_div + "\n        " + overlay + "\n      </div>"
    
    content = pattern.sub(replacer, content)
    
    with open(article, 'w', encoding='utf-8') as f:
        f.write(content)

# Fix padding and font-size for all articles
for article in all_articles:
    with open(article, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # padding: 100px to 70px
    content = content.replace('padding: 100px 20px 50px;', 'padding: 70px 20px 50px;')
    
    # font-size: 3rem to clamp(2rem, 5vw, 3rem)
    content = content.replace('font-size: 3rem;', 'font-size: clamp(2.2rem, 5vw, 3rem);')
    
    with open(article, 'w', encoding='utf-8') as f:
        f.write(content)

