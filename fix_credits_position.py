import re
import glob

david_credit = """
      <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px; margin-top: 50px; text-align: left; font-size: 0.9rem; color: rgba(255,255,255,0.5);">
        עודכן לאחרונה: יולי 2026 · מאת: דייויד בן דוד, עורך וידאו וסאונד ב-<a href="index.html" style="color: #c084fc; text-decoration: none;">clips.Revolution</a>
      </div>
    </section>"""

avishai_credit = """
      <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px; margin-top: 50px; text-align: left; font-size: 0.9rem; color: rgba(255,255,255,0.5);">
        עודכן לאחרונה: יולי 2026 · מאת: אבישי סלאמה, במאי ו-Prompt Engineer ב-<a href="index.html" style="color: #c084fc; text-decoration: none;">clips.Revolution</a>
      </div>
    </section>"""

files_to_fix = [
    ("ai-ingredients-to-video.html", david_credit),
    ("ai-video-marketing.html", david_credit),
    ("ai-video-tools.html", david_credit),
    ("corporate-shooting-days.html", avishai_credit)
]

for filename, credit in files_to_fix:
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Remove the credit block from the bottom
    content = re.sub(
        r'\s*<div style="border-top: 1px solid rgba\(255,255,255,0\.1\); padding-top: 20px; margin-top: 50px; text-align: left; font-size: 0\.9rem; color: rgba\(255,255,255,0\.5\);">\s*עודכן לאחרונה.*?</div>',
        '',
        content,
        flags=re.DOTALL
    )

    # Insert into the header section
    content = re.sub(
        r'(<section id="article-header".*?>.*?)(\s*</section>)',
        r'\1' + credit,
        content,
        flags=re.DOTALL
    )

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Fixed {filename}")

