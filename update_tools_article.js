const fs = require('fs');

let html = fs.readFileSync('ai-video-tools.html', 'utf8');

const startMarker = '<!-- ── ARTICLE BODY ── -->';
const endMarker = '<!-- CTA -->';
const startIndex = html.indexOf(startMarker);
const endIndex = html.indexOf(endMarker);

const newBody = `<!-- ── ARTICLE BODY ── -->
    <section id="article-body" style="padding: 0 20px 80px; max-width: 800px; margin: 0 auto; color: rgba(255,255,255,0.85); font-size: 1.1rem; line-height: 1.8; text-align: center;">

      <p style="margin-bottom: 40px;">
        בשוק שבו רוב סוכנויות הפרסום משתמשות בכלים גנריים מארה"ב, מספר חברות ישראליות מובילות הבינו שכדי לספק ערך אמיתי למותגים – צריך לפתח טכנולוגיה פנימית. דוגמה בולטת לכך היא האקו-סיסטם של חברת ההפקות clips.Revolution, שפיתחה סוויטת כלים ייעודית. המטרה: לאפשר ללקוחות קצה לקבל תוצרים הוליוודיים, במהירות שיא, ובלי שורת קוד אחת מצדם. לפניכם סקירה של שלושת הכלים המרכזיים שמניעים את המהפכה.
      </p>

      <!-- cR Studio -->
      <h2 style="font-size: 2.2rem; color: #fff; margin: 50px 0 20px;">1. cR Studio - אולפן ה-AI הדיגיטלי</h2>
      <div style="margin-bottom: 40px; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); max-width: 600px; margin: 0 auto 40px;">
        <img src="preview-cr-studio.webp" alt="cR Studio Interface" style="width: 100%; height: auto; display: block;">
      </div>
      <p style="margin-bottom: 20px;">
        <strong>מה זה?</strong> cR Studio הוא הלב הפועם של ההפקות המודרניות – מערכת אינטרנטית מתקדמת שמבוססת על Replicate API. 
      </p>
      <p style="margin-bottom: 40px;">
        <strong>היתרון העסקי:</strong> במקום שבעלי עסקים יצטרכו ללמוד לכתוב פרומפטים (Prompts) באנגלית מסובכת בתוכנות חיצוניות, המערכת שואבת את המודלים החזקים בעולם (לרנדור וידאו ותמונות) הישר לתוך פלטפורמה נגישה. הכלי מאפשר להפיק תוצרי פרימיום – החל מאוואטרים מדברים ועד שדרוג תמונות מוצר – במהירות מטורפת, תוך שמירה מלאה על פרטיות המידע של החברה.
      </p>

      <!-- clips.Scribe -->
      <h2 style="font-size: 2.2rem; color: #fff; margin: 50px 0 20px;">2. clips.Scribe - מכונת הכתוביות</h2>
      <div style="margin-bottom: 40px; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); max-width: 600px; margin: 0 auto 40px;">
        <img src="preview-scribe.webp" alt="clips.Scribe Interface" style="width: 100%; height: auto; display: block;">
      </div>
      <p style="margin-bottom: 20px;">
        <strong>מה זה?</strong> כלי אוטומציה מבוסס AI שמתמחה בפיצוח טקסט והדבקת כתוביות (Captions) חכמות ודינמיות על סרטונים.
      </p>
      <p style="margin-bottom: 40px;">
        <strong>היתרון העסקי:</strong> מחקרים מראים שמעל 80% מהגולשים צופים בוידאו ברשתות החברתיות על השתק (Mute). clips.Scribe מאפשר ליצור כתוביות קופצות ובולטות (בסגנון אלכס הורמוזי) שמושכות את העין ומשאירות את הצופה מרותק. היתרון הגדול הוא ההתאמה לשוק הישראלי, עם תמיכה בפונטים פרימיום (כמו Abraham-Regular) ליצירת נראות יוקרתית שהאלגוריתם של טיקטוק ואינסטגרם מקדם באופן טבעי.
      </p>

      <!-- clips.board -->
      <h2 style="font-size: 2.2rem; color: #fff; margin: 50px 0 20px;">3. clips.board - הסטוריבורד הדיגיטלי</h2>
      <div style="margin-bottom: 40px; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); max-width: 600px; margin: 0 auto 40px;">
        <img src="preview-board.webp" alt="clips.board Interface" style="width: 100%; height: auto; display: block;">
      </div>
      <p style="margin-bottom: 20px;">
        <strong>מה זה?</strong> לוח תכנון דיגיטלי מתקדם לשלב ה-Pre-Production.
      </p>
      <p style="margin-bottom: 40px;">
        <strong>היתרון העסקי:</strong> ימי צילום הם הוצאה כלכלית משמעותית. פלטפורמות כמו clips.board מאפשרות לצוותי קריאייטיב ולחברות לעבוד על קנבס משותף. מסדרים שם את זוויות הצילום המתוכננות, לוחות השראה (Moodboards) וטקסטים – עוד לפני שיוצאים לשטח או מרנדרים סרטון AI אחד. הסנכרון המושלם הזה מוודא שלא נעשות טעויות שעולות זמן וכסף יקר.
      </p>

      `;

html = html.substring(0, startIndex) + newBody + html.substring(endIndex);
fs.writeFileSync('ai-video-tools.html', html, 'utf8');

