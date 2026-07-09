import os

target = """    <div class="mobile-menu-logo">
      <img src="clips-revolution-logo.webp" alt="clips.Revolution">
    </div>"""

replacement = """    <div class="mobile-menu-logo">
      <img src="clips-revolution-logo.webp" alt="clips.Revolution">
    </div>
    <a href="index.html" onclick="closeMobileMenu()" class="mobile-menu-branded">
      <span class="mobile-menu-svg-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      </span>
      דף הבית
    </a>"""

count = 0
for filename in os.listdir('.'):
    if filename.endswith('.html'):
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
            
        if target in content and "דף הבית" not in content.split('mobile-menu-logo')[1][:500]:
            new_content = content.replace(target, replacement)
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f'Updated {filename}')
            count += 1

print(f'Finished updating {count} files.')
