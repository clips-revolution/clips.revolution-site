const fs = require('fs');

let html = fs.readFileSync('ai-video-marketing.html', 'utf8');

// I will insert some more paragraphs into the AI article to make it feel like a real comprehensive guide.
const newContent = `
      <h2 style="font-size: 2.2rem; color: #fff; margin: 50px 0 20px;">האם הלקוחות שמים לב שמדובר ב-AI?</h2>
      <p style="margin-bottom: 20px;">
        זו השאלה הנפוצה ביותר שאנחנו שומעים. התשובה הקצרה היא: תלוי באיכות המערכת. התשובה הארוכה היא שאם עובדים עם אולפני הפקה שמשתמשים בטכנולוגיות הקצה (כמו שאנחנו ב-clips.Revolution עושים), הלקוח הממוצע פשוט לא יבחין בהבדל. התנועות המיקרוסקופיות של הפנים, המצמוצים, ותנועות הידיים – הכל מבוסס על מודלים שלומדים עשרות אלפי שעות של בני אדם אמיתיים מדברים. במקרים רבים, קריין ה-AI נשמע רהוט ומשכנע יותר מאשר קריין אנושי שעומד בלחץ מול מצלמה.
      </p>

      <h2 style="font-size: 2.2rem; color: #fff; margin: 50px 0 20px;">איך זה עובד בפועל? תהליך היצירה</h2>
      <p style="margin-bottom: 20px;">
        הקסם הגדול של וידאו AI הוא הפשטות של תהליך ההפקה מצד הלקוח:
      </p>
      <ul style="margin-bottom: 40px; padding-right: 20px; text-align: right; display: inline-block; max-width: 600px;">
        <li style="margin-bottom: 15px;"><strong>בחירת האווטר או שיבוט:</strong> אתם יכולים לבחור דמות קיימת מהמאגר העצום שלנו (לפי גיל, מוצא וסגנון לבוש), או שאנחנו מצלמים אתכם פעם אחת באולפן למשך שעה, ומשבטים את הדמות שלכם (Digital Twin) לנצח.</li>
        <li style="margin-bottom: 15px;"><strong>הזנת התסריט:</strong> כותבים את הטקסט שאותו הדמות צריכה להקריא. אפשר להשתמש בכלי AI כמו ChatGPT כדי לדייק את המסר השיווקי.</li>
        <li style="margin-bottom: 15px;"><strong>בימוי דיגיטלי:</strong> אנחנו מגדירים למערכת איפה לשים דגש, איפה לעשות הפסקה דרמטית (Pause), ואיך לשלוט בטון הדיבור (שמח, רציני, או סמכותי).</li>
        <li style="margin-bottom: 15px;"><strong>רינדור ותוספות:</strong> המערכת מייצרת את הוידאו. אנחנו לוקחים אותו לתוכנות עריכה ומוסיפים מוזיקת רקע, כתוביות צבעוניות, ולוגו של העסק שלכם.</li>
      </ul>
`;

const insertMarker = '<h2 style="font-size: 2rem; color: #fff; margin: 40px 0 20px;">3 סיבות שחברות עוברות לוידאו AI</h2>';

if(html.includes(insertMarker)) {
    html = html.replace(insertMarker, newContent + '\n' + insertMarker);
    fs.writeFileSync('ai-video-marketing.html', html, 'utf8');
}
