import glob
import re

# Read the new footer from index.html
with open('index.html', 'r', encoding='utf-8') as f:
    index_content = f.read()

# Extract the footer block
footer_match = re.search(r'    <!-- ── FOOTER ── -->\n    <footer.*?>.*?</footer>', index_content, re.DOTALL)
if not footer_match:
    print("Could not find footer in index.html")
    exit(1)

new_footer = footer_match.group(0)

# Replace the footer in all other html files
html_files = glob.glob('*.html')
html_files.remove('index.html')

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace existing footer
    new_content = re.sub(r'    <!-- ── FOOTER ── -->\n    <footer.*?>.*?</footer>', new_footer, content, flags=re.DOTALL)
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Synced footer in {file}")
