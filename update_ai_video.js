const fs = require('fs');

const html = fs.readFileSync('ai-video-marketing.html', 'utf8');

// Replace everything between <!-- ── VIDEO SHOWCASE (HERO) ── --> and <!-- ── FOOTER ── -->
const startMarker = '<!-- ── VIDEO SHOWCASE (HERO) ── -->';
const endMarker = '<!-- ── FOOTER ── -->';

const startIndex = html.indexOf(startMarker);
const endIndex = html.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
  const articleContent = `
    <!-- ── ARTICLE HEADER ── -->
    <section id="article-header" aria-labelledby="article-title" style="padding: 150px 20px 50px; text-align: center; max-width: 800px; margin: 0 auto;">
      <h1 class="section-title" id="article-title" style="font-size: 3rem; line-height: 1.2; margin-bottom: 20px;">
        <span class="grad">איך הפקת סרטוני AI</span><br>תשנה את השיווק של העסק שלך?
      </h1>
      <p class="section-sub" style="font-size: 1.2rem; color: rgba(255,255,255,0.7);">המדריך המלא ל-2026: למה עסקים נוטשים את הצילומים המסורתיים ועוברים לאולפן הדיגיטלי?</p>
    </section>

    <!-- ── ARTICLE BODY ── -->
    <section id="article-body" style="padding: 0 20px 80px; max-width: 800px; margin: 0 auto; color: rgba(255,255,255,0.85); font-size: 1.1rem; line-height: 1.8;">
      
      <div style="margin-bottom: 40px; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
        <img src="rabbit-poster.jpg" alt="AI Video Illustration" style="width: 100%; height: auto; display: block;">
      </div>

      <p style="margin-bottom: 20px;">
        עד לפני כמה שנים, הפקת וידאו לעסק הייתה משימה שכרוכה בהרבה כאב ראש. מציאת לוקיישן, גיוס שחקנים, תיאום ימי צילום, איפור, תאורה, ובסוף – חשבונית של עשרות אלפי שקלים. אם התסריט השתנה או שרציתם לתקן מילה אחת אחרי שבועיים? הייתם צריכים לצלם הכל מהתחלה.
      </p>
      
      <p style="margin-bottom: 40px;">
        היום, הטכנולוגיה שינתה את חוקי המשחק. <strong>הפקת סרטוני AI</strong> (בינה מלאכותית) הפכה לסטנדרט החדש עבור עסקים שרוצים לייצר תוכן וידאו איכותי, מהיר, ובתקציב שפוי.
      </p>

      <h2 style="font-size: 2rem; color: #fff; margin: 40px 0 20px;">מה זה בעצם "סרטון AI"?</h2>
      <p style="margin-bottom: 20px;">
        סרטון AI מופק באולפן דיגיטלי לחלוטין. במקום שחקן בשר ודם, אנו משתמשים באווטרים וירטואליים ריאליסטיים ברמה הגבוהה ביותר, או משכפלים בצורה מדויקת (Cloning) את הפנים והקול של המנכ"ל או הפרזנטור שלכם. הטקסט מוזן למערכת, והדמות מדברת אותו בטבעיות מוחלטת, בכל שפה שתבחרו, עם שפת גוף אנושית.
      </p>

      <div style="margin-bottom: 40px; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
        <img src="preview-cr-studio.webp" alt="cR Studio AI tool" style="width: 100%; height: auto; display: block;">
      </div>

      <h2 style="font-size: 2rem; color: #fff; margin: 40px 0 20px;">3 סיבות שחברות עוברות לוידאו AI</h2>
      
      <h3 style="font-size: 1.5rem; color: #fff; margin-bottom: 10px;">1. חיסכון דרמטי בעלויות וזמן</h3>
      <p style="margin-bottom: 20px;">
        אין צורך לשלם לצלמים, תאורנים, מאפרים ושחקנים. אין ימי צילום שמתבטלים בגלל מזג אוויר. סרטון שלוקח חודש להפיק בשיטות מסורתיות, יכול להיות מוכן תוך מספר ימים בעזרת AI, ובעלות נמוכה בעשרות אחוזים.
      </p>

      <h3 style="font-size: 1.5rem; color: #fff; margin-bottom: 10px;">2. עדכון תוכן בלחיצת כפתור (Scale)</h3>
      <p style="margin-bottom: 20px;">
        השקתם פיצ'ר חדש? שיניתם מחיר? בסרטון רגיל הייתם צריכים לצלם מחדש. בסרטון AI, פשוט מעדכנים את הטקסט במסמך, והמערכת מייצרת גרסה חדשה של הסרטון תוך דקות. זה מאפשר לעסקים לייצר מאות סרטונים מותאמים אישית בקלות.
      </p>

      <h3 style="font-size: 1.5rem; color: #fff; margin-bottom: 10px;">3. גלובליזציה מיידית</h3>
      <p style="margin-bottom: 20px;">
        רוצים לפנות לשוק בספרד, גרמניה או יפן? עם AI אפשר לתרגם את הסרטון לעשרות שפות, כאשר השפתיים של הדמות מסתנכרנות באופן מושלם עם השפה החדשה.
      </p>

      <h2 style="font-size: 2rem; color: #fff; margin: 40px 0 20px;">השורה התחתונה</h2>
      <p style="margin-bottom: 40px;">
        הפקת סרטוני AI היא לא העתיד – היא ההווה. חברות שלא יאמצו את הטכנולוגיה יישארו מאחור עם הוצאות כבדות וקצב הפקה איטי. 
      </p>

      <!-- CTA -->
      <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 40px; text-align: center; margin-top: 50px;">
        <h3 style="font-size: 1.8rem; color: #fff; margin-bottom: 15px;">מוכנים להרים את השיווק שלכם?</h3>
        <p style="margin-bottom: 30px; color: rgba(255,255,255,0.6);">ב-clips.Revolution אנחנו מתמחים ביצירת סרטוני AI ברמה הגבוהה ביותר בעולם, מותאמים אישית לעסק שלך.</p>
        <a href="https://wa.me/972549445274" target="_blank" rel="noopener noreferrer" class="btn-primary" style="display: inline-flex;">
          <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px;" aria-hidden="true"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          בואו נדבר בוואטסאפ
        </a>
      </div>

    </section>
  `;

  const newHtml = html.substring(0, startIndex) + articleContent + '\n    ' + html.substring(endIndex);
  // Also change the title tag for SEO
  const titleReplaced = newHtml.replace('<title>clips.Revolution - תוכן שיווקי לעסקים</title>', '<title>איך הפקת סרטוני AI תשנה את השיווק של העסק שלך? - clips.Revolution</title>');
  fs.writeFileSync('ai-video-marketing.html', titleReplaced, 'utf8');
}
