import os
import glob
import re

html_files = glob.glob('*.html')
pattern = re.compile(r'\s*<a href="(index\.html)?#articles"[^>]*>[\s\S]*?מאמרים ומדריכים\s*</a>', re.MULTILINE)

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = pattern.sub('', content)
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Processed {file}")
