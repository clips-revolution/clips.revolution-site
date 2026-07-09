const fs = require('fs');

const baseHtml = fs.readFileSync('index.html', 'utf8');

const startMarker = '<!-- ── VIDEO SHOWCASE (HERO) ── -->';
const endMarker = '<!-- ── FOOTER ── -->';
const startIndex = baseHtml.indexOf(startMarker);
const endIndex = baseHtml.indexOf(endMarker);

const toolsContent = `
    <!-- ── ARTICLE HEADER ── -->
    <section id="article-header" aria-labelledby="article-title" style="padding: 150px 20px 50px; text-align: center; max-width: 800px; margin: 0 auto;">
      <h1 class="section-title" id="article-title" style="font-size: 3rem; line-height: 1.2; margin-bottom: 20px;">
        3 כלי ה-AI הישראלים ש<span class="grad">משנים את חוקי המשחק</span>
      </h1>
      <p class="section-sub" style="font-size: 1.2rem; color: rgba(255,255,255,0.7); text-align: center; margin: 0 auto;">הצצה בלעדית לאקו-סיסטם הטכנולוגי מאחורי הקלעים של הפקות הוידאו המתקדמות ביותר בישראל</p>
    </section>

    <!-- ── ARTICLE BODY ── -->
    <section id="article-body" style="padding: 0 20px 80px; max-width: 800px; margin: 0 auto; color: rgba(255,255,255,0.85); font-size: 1.1rem; line-height: 1.8; text-align: center;">

      <p style="margin-bottom: 40px;">
        בשוק שבו כולם מדברים על "בינה מלאכותית" ומשתמשים בכלים גנריים מארה"ב, החברות הישראליות המובילות הבינו שכדי לנצח באמת – צריך לפתח טכנולוגיה פנימית. ב-clips.Revolution לקחנו את ההפקות המקצועיות צעד אחד קדימה ופיתחנו סוויטת כלים (Ecosystem) ייעודית שמאפשרת ללקוחות שלנו לקבל תוצרים הוליוודיים, במהירות שיא, ובלי שורת קוד אחת מצדם. בואו נכיר את הכלים שעושים את הקסם.
      </p>

      <!-- cR Studio -->
      <h2 style="font-size: 2.2rem; color: #fff; margin: 50px 0 20px;">1. cR Studio - אולפן ה-AI הדיגיטלי</h2>
      <div style="margin-bottom: 40px; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); max-width: 600px; margin: 0 auto 40px;">
        <img src="preview-cr-studio.webp" alt="cR Studio Interface" style="width: 100%; height: auto; display: block;">
      </div>
      <p style="margin-bottom: 20px;">
        <strong>מה זה?</strong> cR Studio הוא הלב הפועם של ההפקות שלנו – מערכת אינטרנטית מתקדמת שמבוססת על Replicate API. 
      </p>
      <p style="margin-bottom: 40px;">
        <strong>היתרון העסקי:</strong> במקום שבעלי העסקים יצטרכו ללמוד לכתוב Prompt באנגלית מסובכת בתוכנות חיצוניות, cR Studio שולף את המודלים החזקים בעולם (לרנדור וידאו ותמונות) הישר לתוך פלטפורמה נגישה שלנו. המערכת מפיקה עבורכם תוצרי פרימיום (מאוואטרים מדברים ועד שדרוג תמונות מוצר) במהירות מטורפת תוך שמירה מלאה על פרטיות המידע של החברה שלכם.
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
        <strong>היתרון העסקי:</strong> מחקרים מראים שמעל 80% מהגולשים צופים בוידאו ברשתות החברתיות על השתק (Mute). clips.Scribe מאפשר לנו לייצר כתוביות קופצות ובולטות (בסגנון אלכס הורמוזי) שמושכות את העין ומשאירות את הצופה מרותק. הכלי מותאם לשוק הישראלי ותומך בפונטים פרימיום (כמו Abraham-Regular) ליצירת נראות יוקרתית שהטיקטוק והאינסטגרם פשוט מחבקים.
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
        <strong>היתרון העסקי:</strong> ימי צילום הם יקרים. clips.board מאפשר לצוות הקריאייטיב שלנו ולכם לעבוד על קנבס משותף. אנחנו מסדרים שם את זוויות הצילום המתוכננות, לוחות השראה (Moodboards) וטקסטים לפני שיצאנו לשטח או רינדרנו סרטון AI אחד. הסנכרון המושלם הזה מוודא שלא עושים טעויות שעולות ללקוח זמן וכסף.
      </p>

      <!-- CTA -->
      <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 40px; text-align: center; margin-top: 50px;">
        <h3 style="font-size: 1.8rem; color: #fff; margin-bottom: 15px;">הגיע הזמן לשדרג את הפקות הוידאו שלכם?</h3>
        <p style="margin-bottom: 30px; color: rgba(255,255,255,0.6);">לקוחות clips.Revolution נהנים מגישה עקיפה לטכנולוגיות המתקדמות ביותר בשוק כדי לייצר תוכן שממיר בגדול.</p>
        <a href="https://wa.me/972549445274" target="_blank" rel="noopener noreferrer" class="btn-primary" style="display: inline-flex;">
          <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px;" aria-hidden="true"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          דברו איתנו על הפרויקט הבא
        </a>
      </div>

    </section>
`;

let newHtml = baseHtml.substring(0, startIndex) + toolsContent + '\n    ' + baseHtml.substring(endIndex);
newHtml = newHtml.replace('<title>clips.Revolution - תוכן שיווקי לעסקים</title>', '<title>3 כלי ה-AI הישראלים שמשנים את חוקי המשחק - clips.Revolution</title>');
// fix navigation links
newHtml = newHtml.replace(/href="#about"/g, 'href="index.html#about"');
newHtml = newHtml.replace(/href="#tools"/g, 'href="index.html#tools"');
newHtml = newHtml.replace(/href="#" class="brand"/g, 'href="index.html" class="brand"');
fs.writeFileSync('ai-video-tools.html', newHtml, 'utf8');

