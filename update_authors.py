import re

david_credit = """      <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px; margin-top: 50px; text-align: left; font-size: 0.9rem; color: rgba(255,255,255,0.5);">
        עודכן לאחרונה: יולי 2026 · מאת: דייויד בן דוד, עורך וידאו וסאונד ב-<a href="index.html" style="color: #c084fc; text-decoration: none;">clips.Revolution</a>
      </div>
"""

avishai_credit = """      <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px; margin-top: 50px; text-align: left; font-size: 0.9rem; color: rgba(255,255,255,0.5);">
        עודכן לאחרונה: יולי 2026 · מאת: אבישי סלאמה, במאי ו-Prompt Engineer ב-<a href="index.html" style="color: #c084fc; text-decoration: none;">clips.Revolution</a>
      </div>
"""

def replace_or_add_credit(filename, credit_block):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Check if a credit block already exists
    if "עודכן לאחרונה" in content:
        # Replace existing credit line
        new_content = re.sub(
            r'<div[^>]*>\s*עודכן לאחרונה.*?</div>',
            credit_block.strip(),
            content,
            flags=re.DOTALL
        )
    else:
        # Append before </section>
        # Find the last occurrence of </section> in the body before the footer
        # Actually it's easier to replace `    </section>\n  \n    <!-- ── FOOTER ── -->`
        new_content = re.sub(
            r'    </section>\n\s*<!-- ── FOOTER ── -->',
            credit_block + '    </section>\n\n    <!-- ── FOOTER ── -->',
            content
        )
        
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Updated {filename}")

replace_or_add_credit("hollywood-movies-from-home.html", david_credit)
replace_or_add_credit("ai-ingredients-to-video.html", david_credit)
replace_or_add_credit("ai-video-marketing.html", david_credit)
replace_or_add_credit("ai-video-tools.html", david_credit)
replace_or_add_credit("corporate-shooting-days.html", avishai_credit)
