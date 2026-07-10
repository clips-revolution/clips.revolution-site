import os

target = """    <a href="index.html#tools" onclick="closeMobileMenu()" class="mobile-menu-branded">
      <span class="mobile-menu-svg-icon mobile-icon-tools">
        <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
        </svg>
      </span>
      הכלים שלנו
    </a>"""

replacement = """    <a href="index.html#tools" onclick="closeMobileMenu()" class="mobile-menu-branded">
      <span class="mobile-menu-svg-icon mobile-icon-tools">
        <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
        </svg>
      </span>
      הכלים שלנו
    </a>
    <a href="index.html#articles" onclick="closeMobileMenu()" class="mobile-menu-branded">
      <span class="mobile-menu-svg-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
        </svg>
      </span>
      מאמרים ומדריכים
    </a>"""

count = 0
for filename in os.listdir('.'):
    if filename.endswith('.html'):
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
            
        if target in content and "מאמרים ומדריכים" not in content.split('index.html#tools')[1][:500]:
            new_content = content.replace(target, replacement)
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f'Updated {filename}')
            count += 1

print(f'Finished updating {count} files.')
