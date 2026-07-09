const fs = require('fs');

let html = fs.readFileSync('ai-video-marketing.html', 'utf8');

// Replace top video to be smaller and centered
html = html.replace(
  '<div style="margin-bottom: 40px; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">\n        <video src="video-restaurant.mp4"',
  '<div style="margin-bottom: 40px; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); max-width: 400px; margin: 0 auto 40px;">\n        <video src="video-restaurant.mp4"'
);

// Replace bottom video to goamat and make it smaller and centered
html = html.replace(
  '<div style="margin-bottom: 40px; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">\n        <video src="video-asaf.mp4" poster="asaf-poster.jpg"',
  '<div style="margin-bottom: 40px; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); max-width: 400px; margin: 0 auto 40px;">\n        <video src="video-goamat.mp4" poster="goamat-poster.jpg"'
);

// Add the objectivity section
const sectionToInsertBefore = '<h2 style="font-size: 2rem; color: #fff; margin: 40px 0 20px;">השורה התחתונה</h2>';
const newSection = `
      <h2 style="font-size: 2rem; color: #fff; margin: 60px 0 20px;">האמת על השולחן: מתי שווה לעשות סרטון AI ומתי ממש לא?</h2>
      <p style="margin-bottom: 20px;">
        כמו כל טכנולוגיה, AI הוא כלי. וכלי צריך להתאים למטרה. הנה המדריך המהיר שלנו מתי זה עובד מושלם, ומתי כדאי לחזור למצלמה המסורתית:
      </p>

      <div style="background: rgba(255,255,255,0.03); border-radius: 20px; padding: 30px; text-align: right; max-width: 650px; margin: 0 auto 40px; direction: rtl;">
        <h3 style="font-size: 1.5rem; color: #10b981; margin-bottom: 15px;">מתי וידאו AI הוא הפתרון המושלם? ✅</h3>
        <ul style="margin-bottom: 30px; padding-right: 20px; list-style-type: disc;">
          <li style="margin-bottom: 10px;"><strong>הדרכות ומדריכים (Tutorials & Onboarding):</strong> כשצריך להסביר על תוכנה, נהלי חברה, או קורסים דיגיטליים – קריין AI יספק תוצאה עקבית, ברורה, וניתנת לעדכון מהיר בלי לצלם מחדש.</li>
          <li style="margin-bottom: 10px;"><strong>פנייה לשווקים בינלאומיים:</strong> אם אתם רוצים לפנות לקהל ב-10 שפות שונות, AI מאפשר לקחת את הוידאו הקיים ולדבב אותו עם סנכרון שפתיים מלא לשפת היעד.</li>
          <li style="margin-bottom: 10px;"><strong>חדשות ועדכונים שוטפים:</strong> חברות שצריכות להוציא סרטוני חדשות או עדכונים יומיים/שבועיים יכולות להשתמש באווטר שמוכן מראש, ופשוט להזין טקסט.</li>
        </ul>

        <h3 style="font-size: 1.5rem; color: #ef4444; margin-bottom: 15px;">מתי כדאי להישאר עם צילום מסורתי? ❌</h3>
        <ul style="margin-bottom: 10px; padding-right: 20px; list-style-type: disc;">
          <li style="margin-bottom: 10px;"><strong>קמפיינים רגשיים וסיפוריים (Storytelling):</strong> אם המטרה היא להעביר רגש עמוק, לבכות, או לייצר קשר אנושי אינטימי – השחקן האנושי עדיין מנצח את המכונה.</li>
          <li style="margin-bottom: 10px;"><strong>הדגמת מוצר פיזי בפעולה:</strong> אם אתם צריכים להראות איך הבד של החולצה מרגיש, או איך הרכב מאיץ בכביש רטוב – אי אפשר (עדיין) להחליף צילומי אקשן אותנטיים ב-AI שייראה מספיק אמין לרוכשים.</li>
        </ul>
      </div>

`;

html = html.replace(sectionToInsertBefore, newSection + sectionToInsertBefore);

fs.writeFileSync('ai-video-marketing.html', html, 'utf8');
