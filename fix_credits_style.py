import re
import glob

html_files = [
    "ai-ingredients-to-video.html",
    "ai-video-marketing.html",
    "ai-video-tools.html",
    "corporate-shooting-days.html",
    "hollywood-movies-from-home.html"
]

for filename in html_files:
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the existing div
    # <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px; margin-top: 50px; text-align: left; font-size: 0.9rem; color: rgba(255,255,255,0.5);">
    
    # We will use regex to find the div block containing "עודכן לאחרונה"
    
    def replace_func(match):
        inner_text = match.group(1).strip()
        # Make clips.Revolution bold
        inner_text = inner_text.replace('style="color: #c084fc; text-decoration: none;"', 'style="color: #c084fc; text-decoration: none; font-weight: 600;"')
        
        return f"""      <div style="border-top: 1px solid rgba(192, 132, 252, 0.4); border-bottom: 1px solid rgba(192, 132, 252, 0.4); padding: 15px 0; margin: 40px auto 0; text-align: center; font-size: 0.95rem; color: rgba(255,255,255,0.7); max-width: 650px;">
        {inner_text}
      </div>"""

    new_content = re.sub(
        r'\s*<div[^>]*border-top[^>]*>\s*(עודכן לאחרונה.*?)\s*</div>',
        replace_func,
        content,
        flags=re.DOTALL
    )

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Fixed {filename}")

