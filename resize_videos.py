files = [
    'ai-video-marketing.html',
    'corporate-shooting-days.html'
]
for f_name in files:
    with open(f_name, 'r', encoding='utf-8') as f:
        content = f.read()
    content = content.replace('max-width: 400px; margin: 40px auto 0;', 'max-width: 320px; width: 92%; margin: 40px auto 0;')
    with open(f_name, 'w', encoding='utf-8') as f:
        f.write(content)

# For ai-video-tools.html, max-width was 600px
with open('ai-video-tools.html', 'r', encoding='utf-8') as f:
    content = f.read()
content = content.replace('max-width: 600px; margin: 40px auto 0;', 'max-width: 480px; width: 92%; margin: 40px auto 0;')
with open('ai-video-tools.html', 'w', encoding='utf-8') as f:
    f.write(content)

