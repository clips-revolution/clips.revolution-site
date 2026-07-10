import re

files_to_process = [
    "ai-ingredients-to-video.html",
    "ai-video-marketing.html",
    "corporate-shooting-days.html"
]

for filename in files_to_process:
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the visual block at the start of article-body
    pattern = re.compile(
        r'(<section id="article-body"[^>]*>\s*)'
        r'(<div[^>]*border-radius:\s*20px[^>]*>.*?</div>\s*)'
        r'(<p[^>]*font-size:\s*0\.8rem[^>]*>.*?</p>\s*)?',
        re.DOTALL
    )
    
    match = pattern.search(content)
    if not match:
        print(f"Could not find video block in {filename}")
        continue
        
    article_body_start = match.group(1)
    video_block = match.group(2)
    caption = match.group(3) if match.group(3) else ""
    
    full_visual_block = video_block + caption
    
    # Remove from body
    content = content[:match.start()] + article_body_start + content[match.end():]
    
    # Insert before the author credit in header
    # Find: <div style="border-top: 1px solid rgba(192, 132, 252, 0.4);
    
    full_visual_block = full_visual_block.replace('margin: 0 auto;', 'margin: 40px auto 0;')
    full_visual_block = full_visual_block.replace('margin: 0 auto 40px;', 'margin: 40px auto 0;')
    full_visual_block = full_visual_block.replace('margin-bottom: 40px;', 'margin-bottom: 20px;')
    
    author_div = r'      <div style="border-top: 1px solid rgba(192, 132, 252, 0.4);'
    replacement = "      " + full_visual_block.strip() + "\n" + author_div
    
    content = content.replace(author_div, replacement)

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Moved visual hook in {filename}")

