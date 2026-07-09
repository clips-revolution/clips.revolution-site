const fs = require('fs');

const html = fs.readFileSync('corporate-shooting-days.html', 'utf8');

const startMarker = '<!-- ── VIDEO SHOWCASE (HERO) ── -->';
const endMarker = '<!-- ── FOOTER ── -->';

const startIndex = html.indexOf(startMarker);
const endIndex = html.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
  const articleContent = `
    <!-- ── ARTICLE HEADER ── -->
    <section id="article-header" aria-labelledby="article-title" style="padding: 150px 20px 50px; text-align: center; max-width: 800px; margin: 0 auto;">
      <h1 class="section-title" id="article-title" style="font-size: 3rem; line-height: 1.2; margin-bottom: 20px;">
        <span class="grad">המדריך המלא</span><br>ליום צילום לעסקים
      </h1>
      <p class="section-sub" style="font-size: 1.2rem; color: rgba(255,255,255,0.7);">מאיפה מתחילים, איך מתכוננים, ולמה סרטון מהסמארטפון פשוט לא מספיק למותג שלכם?</p>
    </section>

    <!-- ── ARTICLE BODY ── -->
    <section id="article-body" style="padding: 0 20px 80px; max-width: 800px; margin: 0 auto; color: rgba(255,255,255,0.85); font-size: 1.1rem; line-height: 1.8;">
      
      <div style="margin-bottom: 40px; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
        <img src="asaf-poster.jpg" alt="Corporate Shooting Day" style="width: 100%; height: auto; display: block;">
      </div>

      <p style="margin-bottom: 20px;">
        אנחנו חיים בעידן שבו לכולם יש מצלמת 4K בכיס. המחשבה הראשונה של הרבה בעלי עסקים היא "אני פשוט אעמיד חצובה במשרד ואצלם סרטון לטיקטוק או לאתר". אבל המציאות מראה שוב ושוב: איכות הוידאו שלכם משקפת ישירות את איכות המוצר שלכם בעיני הלקוח.
      </p>
      
      <p style="margin-bottom: 40px;">
        <strong>יום צילום מקצועי לעסק</strong> הוא לא רק להביא מצלמה גדולה. זו יצירת שפה ויזואלית שבונה אמון מול הלקוחות שלכם מהשנייה הראשונה.
      </p>

      <h2 style="font-size: 2rem; color: #fff; margin: 40px 0 20px;">למה אי אפשר פשוט לצלם באייפון?</h2>
      <p style="margin-bottom: 20px;">
        המצלמות של הסמארטפונים היום מצוינות, אבל יש שלושה דברים שסמארטפון לא יודע לעשות:
      </p>
      <ul style="margin-bottom: 40px; padding-right: 20px;">
        <li style="margin-bottom: 10px;"><strong>תאורה קולנועית:</strong> מה שהופך סרטון ל"וואו" זה לא המצלמה, אלא התאורה. יום צילום מקצועי כולל ציוד תאורה שעוטף את המצולם ומפריד אותו מהרקע (עומק שדה).</li>
        <li style="margin-bottom: 10px;"><strong>סאונד נקי:</strong> אין דבר גרוע יותר מסרטון עם הד של חדר ריק או רעשי רקע. מיקרופונים מקצועיים (Bum ונק מח) מבטיחים שיישמעו אתכם בבירור מוחלט.</li>
        <li style="margin-bottom: 10px;"><strong>בימוי והפקה:</strong> כשאתם מצלמים לבד, אתם בלחץ. כשיש מולכם במאי שמדריך אתכם מתי לחייך, איפה להסתכל ואיך לדבר – התוצאה היא פרזנטציה מלאת ביטחון.</li>
      </ul>

      <div style="margin-bottom: 40px; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
        <img src="restaurant-poster.jpg" alt="Professional Lighting and Sound" style="width: 100%; height: auto; display: block;">
      </div>

      <h2 style="font-size: 2rem; color: #fff; margin: 40px 0 20px;">איך נראה יום צילום איתנו ב-clips.Revolution?</h2>
      
      <h3 style="font-size: 1.5rem; color: #fff; margin-bottom: 10px;">שלב 1: פרה-פרודקשן (ההכנה)</h3>
      <p style="margin-bottom: 20px;">
        לא באים סתם ומדליקים מצלמה. אנחנו יושבים איתכם (בזום או פנים אל פנים), מבינים מה המסר המרכזי שרוצים להעביר, כותבים תסריט מהודק ובוחרים את הלוקיישן המושלם (אצלכם במשרד, בחוץ או באולפן).
      </p>

      <h3 style="font-size: 1.5rem; color: #fff; margin-bottom: 10px;">שלב 2: יום הצילום (אקשן!)</h3>
      <p style="margin-bottom: 20px;">
        הצוות שלנו מגיע אליכם עם כל הציוד - מצלמות קולנוע, עדשות פרימיום, תאורה והגברה. כל מה שאתם צריכים לעשות זה לבוא יפים ולקרוא מהטלפרומפטר שאנחנו מביאים איתנו. אנחנו דואגים לאווירה רגועה וכיפית על הסט.
      </p>

      <h3 style="font-size: 1.5rem; color: #fff; margin-bottom: 10px;">שלב 3: הפוסט-פרודקשן (עריכה וקסמים)</h3>
      <p style="margin-bottom: 20px;">
        כאן אנחנו לוקחים את חומרי הגלם ומוסיפים להם מוזיקה מורשית, אפקטים, כתוביות וכלי AI ייחודיים שלנו. אתם מקבלים תוצר סופי שמוכן לעלות לכל פלטפורמה (פייסבוק, יוטיוב, אתר, ואינסטגרם).
      </p>

      <!-- CTA -->
      <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 40px; text-align: center; margin-top: 50px;">
        <h3 style="font-size: 1.8rem; color: #fff; margin-bottom: 15px;">רוצים שהמותג שלכם יראה פרימיום?</h3>
        <p style="margin-bottom: 30px; color: rgba(255,255,255,0.6);">שריינו איתנו יום צילום ונדאג להפוך את החזון שלכם למציאות.</p>
        <a href="https://wa.me/972549445274" target="_blank" rel="noopener noreferrer" class="btn-primary" style="display: inline-flex;">
          <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px;" aria-hidden="true"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          תאמו פגישת היכרות ללא התחייבות
        </a>
      </div>

    </section>
  `;

  const newHtml = html.substring(0, startIndex) + articleContent + '\n    ' + html.substring(endIndex);
  const titleReplaced = newHtml.replace('<title>clips.Revolution - תוכן שיווקי לעסקים</title>', '<title>המדריך המלא ליום צילום לעסקים - clips.Revolution</title>');
  fs.writeFileSync('corporate-shooting-days.html', titleReplaced, 'utf8');
}
