const fs = require('fs');

let html = fs.readFileSync('ai-video-marketing.html', 'utf8');

const newContent = `
      <h2 style="font-size: 2.2rem; color: #fff; margin: 50px 0 20px;">Ingredients-to-Video: לא סתם Text-to-Video</h2>
      <p style="margin-bottom: 20px;">
        הטעות הגדולה ביותר של עסקים היום היא המחשבה שסרטון AI שווה ללכת לתוכנה חינמית, לכתוב כמה מילים (Prompt) ולחכות לקסם. הגישה הזו מובילה לתוצאות גנריות שלא מתאימות לשפת המותג שלכם ומסכנות את המוניטין שלכם (Brand Safety). במקום "טקסט לוידאו", הגישה המקצועית שלנו היא <strong>Ingredients-to-Video</strong>: אתם מביאים את "חומרי הגלם" (שפת המותג, לוגו, צבעים, הנחיות קריאייטיב) - והצוות האנושי שלנו משתמש ב-AI ככלי עבודה טכני מתקדם ליישם את הכל בצורה מושלמת. השילוב של אסטרטגיה אנושית וביצוע של AI הוא המפתח להצלחה.
      </p>

      <h2 style="font-size: 2.2rem; color: #fff; margin: 50px 0 20px;">Workflow הפקה של סרטון AI מסחרי</h2>
      <p style="margin-bottom: 20px;">
        כך נראה תהליך הפקה מוסדר שחברות בינלאומיות עוברות איתנו:
      </p>
      <ul style="margin-bottom: 40px; padding-right: 20px; text-align: right; display: inline-block; max-width: 600px;">
        <li style="margin-bottom: 15px;"><strong>1. תסריט ואסטרטגיה:</strong> פיצוח המסר השיווקי בעזרת קופירייטרים ושימוש במודלי שפה מתקדמים ליצירת וריאציות.</li>
        <li style="margin-bottom: 15px;"><strong>2. פרה-ויזואליזציה (Pre-vis):</strong> יצירת סטוריבורד מדויק וסגנון ויזואלי לאישור הלקוח לפני שמתחילים לרנדר (Render) את הקבצים הכבדים.</li>
        <li style="margin-bottom: 15px;"><strong>3. הרכבה ועריכה:</strong> אווטר ה-AI או הדיבוב מוכנסים למערכות עריכה מקצועיות בהן מותאם הסאונד, מתווספים אפקטים וכתוביות ב-15 גדלים שונים לרשתות החברתיות.</li>
        <li style="margin-bottom: 15px;"><strong>4. Human in the Loop (בקרת איכות אנושית):</strong> השלב החשוב ביותר. במאי אנושי עובר על התוצאה, מוודא שאין טעויות דיגיטליות, שהבעות הפנים תואמות לרגש בטקסט, ושהתוצר מגן מבחינה משפטית ותדמיתית על המותג שלכם.</li>
      </ul>

      <h2 style="font-size: 2.2rem; color: #fff; margin: 50px 0 20px;">A/B Testing בסקייל (Scale): לבדוק 10 גרסאות במקום אחת</h2>
      <p style="margin-bottom: 20px;">
        עד היום, הלקוח היה מקבל סרטון אחד ומתפלל שהוא יעבוד. עם היתרון הכלכלי של הפקות AI, השאלה השתנתה. אנחנו כבר לא שואלים "האם כדאי להפיק סרטון?", אלא <strong>"כמה גרסאות אנחנו הולכים לבדוק השבוע?"</strong>. המערכות שלנו מאפשרות לייצר 10 גרסאות שונות לאותו קמפיין (עם שחקנים שונים, רקעים שונים ופתיחים שונים) בלחיצת כפתור. הלקוחות שלנו מעלים את כל הגרסאות לקמפיין, רואים איזו מהן מביאה הכי הרבה המרות, ומנתבים את התקציב אך ורק לסרטון המנצח. זו הדרך היחידה לעשות שיווק מבוסס-נתונים (Data-Driven Marketing) בווידאו ב-2026.
      </p>
`;

const insertMarker = '<h2 style="font-size: 2.2rem; color: #fff; margin: 50px 0 20px;">האם הלקוחות שמים לב שמדובר ב-AI?</h2>';

if(html.includes(insertMarker)) {
    html = html.replace(insertMarker, newContent + '\n' + insertMarker);
    fs.writeFileSync('ai-video-marketing.html', html, 'utf8');
}
