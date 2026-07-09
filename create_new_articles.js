const fs = require('fs');

const baseHtml = fs.readFileSync('index.html', 'utf8');

const startMarker = '<!-- ── VIDEO SHOWCASE (HERO) ── -->';
const endMarker = '<!-- ── FOOTER ── -->';
const startIndex = baseHtml.indexOf(startMarker);
const endIndex = baseHtml.indexOf(endMarker);

// --- 1. ai-ingredients-to-video.html ---
const aiContent = `
    <!-- ── ARTICLE HEADER ── -->
    <section id="article-header" aria-labelledby="article-title" style="padding: 150px 20px 50px; text-align: center; max-width: 800px; margin: 0 auto;">
      <h1 class="section-title" id="article-title" style="font-size: 3rem; line-height: 1.2; margin-bottom: 20px;">
        <span class="grad">Ingredients-to-Video:</span><br>הסטנדרט החדש ב-AI
      </h1>
      <p class="section-sub" style="font-size: 1.2rem; color: rgba(255,255,255,0.7); text-align: center; margin: 0 auto;">איך חברות ענק מייצרות סרטוני AI מקצועיים, ולמה הגישה הישנה של Text-to-Video הורסת מותגים?</p>
    </section>

    <!-- ── ARTICLE BODY ── -->
    <section id="article-body" style="padding: 0 20px 80px; max-width: 800px; margin: 0 auto; color: rgba(255,255,255,0.85); font-size: 1.1rem; line-height: 1.8; text-align: center;">
      
      <div style="margin-bottom: 40px; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); max-width: 400px; margin: 0 auto 40px;">
        <video src="video-rabbit.mp4" poster="rabbit-poster.jpg" autoplay muted loop playsinline style="width: 100%; height: auto; display: block;"></video>
      </div>

      <p style="margin-bottom: 20px;">
        אם תשאלו בעל עסק ממוצע איך מפיקים וידאו עם בינה מלאכותית, הוא כנראה יגיד לכם: "נכנסים לאתר, כותבים שורה טקסט, ומקבלים סרטון". התפיסה הזו, שנקראת <strong>Text-to-Video</strong>, אולי עובדת בשביל שעשוע של יוצרי תוכן, אבל עבור חברות שמכבדות את עצמן, זו סכנה של ממש למוניטין ולשפת המותג.
      </p>

      <h2 style="font-size: 2.2rem; color: #fff; margin: 50px 0 20px;">המהפכה השקטה: Ingredients-to-Video</h2>
      <p style="margin-bottom: 20px;">
        סוכנויות הפקה בינלאומיות עברו לשיטת עבודה חכמה הרבה יותר. במקום לזרוק טקסט ולקוות לטוב, אנחנו מבקשים מהלקוח להביא "מצרכים" (Ingredients): צבעי מותג, ספרי מותג (Brand book), לוגואים, כיוון קריאייטיב וקול ייחודי. המטרה היא להשתמש בבינה המלאכותית לא כקוסם ששולף שפן מהכובע, אלא כזרוע ביצועית שמייצרת ויזואליה מדויקת שתואמת את החזון האנושי ב-100%. כך המותג נשאר מוגן ונראה יוקרתי, וגוגל מזהה אתכם כמותג אמין.
      </p>
      
      <h2 style="font-size: 2.2rem; color: #fff; margin: 50px 0 20px;">ה-Workflow המקצועי להפקת סרטון AI</h2>
      <ul style="margin-bottom: 40px; padding-right: 20px; text-align: right; display: inline-block; max-width: 600px;">
        <li style="margin-bottom: 15px;"><strong>תסריט (Scripting):</strong> עבודה של קופירייטרים אנושיים בשילוב מודלי שפה (LLMs) להשחזת המסר וניסוח שפונה לקהל היעד במדויק.</li>
        <li style="margin-bottom: 15px;"><strong>לוח חזון (Pre-vis):</strong> יצירת "סטוריבורד" של תמונות דוממות לפני שמייצרים תנועה. זה מאפשר ללקוח לאשר את שפת העיצוב (צבעוניות, זוויות) בטרם כניסה להפקת וידאו כבדה.</li>
        <li style="margin-bottom: 15px;"><strong>בקרת איכות (Human-in-the-loop):</strong> אולי השלב הכי קריטי. במאי מקצועי יושב על התוצרים של ה-AI. אם האווטר ממצמץ מהר מדי, או אם הדיבוב נשמע רובוטי – אנחנו מתקנים באופן ידני. הלקוח הסופי מקבל תוצר אנושי לגמרי.</li>
      </ul>

      <div style="margin-bottom: 40px; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); max-width: 400px; margin: 0 auto 40px;">
        <video src="preview-cr-studio.mp4" autoplay muted loop playsinline style="width: 100%; height: auto; display: block;" onerror="this.outerHTML='<img src=\\'preview-cr-studio.webp\\' style=\\'width: 100%; height: auto; display: block;\\'>'"></video>
      </div>

      <h2 style="font-size: 2.2rem; color: #fff; margin: 50px 0 20px;">כוחו של ה-A/B Testing בווידאו</h2>
      <p style="margin-bottom: 40px;">
        בעבר, היה עולה אלפי דולרים לצלם סרטון ליוטיוב. אם הסרטון לא היה עובד, ההשקעה ירדה לטמיון. בזכות יעילות ה-AI, אנחנו כבר לא מפיקים רק סרטון אחד. המטרה היא לייצר <strong>10 וריאציות שונות</strong> – עם פתיחים (Hooks) שונים, שחקנים שונים, ומוזיקה שונה – הכל בזמן שיא. אתם מעלים את כולם לקמפיין הממומן שלכם, בודקים מה ממיר הכי הרבה, ומשקיעים רק בסוס המנצח. זו הדרך החכמה ביותר לייצר החזר השקעה מדהים.
      </p>

      <!-- CTA -->
      <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 40px; text-align: center; margin-top: 50px;">
        <h3 style="font-size: 1.8rem; color: #fff; margin-bottom: 15px;">רוצים שהמותג שלכם יראה פרימיום?</h3>
        <p style="margin-bottom: 30px; color: rgba(255,255,255,0.6);">דברו איתנו ב-clips.Revolution. אנחנו לא מוכרים "טריק AI" זול, אלא אסטרטגיית וידאו שלמה מותאמת עבורכם.</p>
        <a href="https://wa.me/972549445274" target="_blank" rel="noopener noreferrer" class="btn-primary" style="display: inline-flex;">
          <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px;" aria-hidden="true"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          בואו נדבר בוואטסאפ
        </a>
      </div>

    </section>
`;

let newHtml1 = baseHtml.substring(0, startIndex) + aiContent + '\n    ' + baseHtml.substring(endIndex);
newHtml1 = newHtml1.replace('<title>clips.Revolution - תוכן שיווקי לעסקים</title>', '<title>Ingredients-to-Video: הסטנדרט החדש בהפקת AI - clips.Revolution</title>');
// fix navigation links
newHtml1 = newHtml1.replace(/href="#about"/g, 'href="index.html#about"');
newHtml1 = newHtml1.replace(/href="#tools"/g, 'href="index.html#tools"');
newHtml1 = newHtml1.replace(/href="#" class="brand"/g, 'href="index.html" class="brand"');
fs.writeFileSync('ai-ingredients-to-video.html', newHtml1, 'utf8');


// --- 2. corporate-video-pre-production.html ---
const shootingContent = `
    <!-- ── ARTICLE HEADER ── -->
    <section id="article-header" aria-labelledby="article-title" style="padding: 150px 20px 50px; text-align: center; max-width: 800px; margin: 0 auto;">
      <h1 class="section-title" id="article-title" style="font-size: 3rem; line-height: 1.2; margin-bottom: 20px;">
        <span class="grad">הסודות של</span><br>Pre-Production בימי צילום
      </h1>
      <p class="section-sub" style="font-size: 1.2rem; color: rgba(255,255,255,0.7); text-align: center; margin: 0 auto;">למה המשפט "We'll fix it in post" עולה לכם אלפי דולרים, ואיך מתכוננים נכון ליום הפקה?</p>
    </section>

    <!-- ── ARTICLE BODY ── -->
    <section id="article-body" style="padding: 0 20px 80px; max-width: 800px; margin: 0 auto; color: rgba(255,255,255,0.85); font-size: 1.1rem; line-height: 1.8; text-align: center;">
      
      <div style="margin-bottom: 40px; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); max-width: 400px; margin: 0 auto 40px;">
        <video src="showreel.mp4" poster="showreel-poster.jpg" autoplay muted loop playsinline style="width: 100%; height: auto; display: block;"></video>
      </div>

      <p style="margin-bottom: 20px;">
        אתם מגיעים ליום צילום במשרד. המנכ"ל מוכן בגימור מושלם מול המצלמה, הכל נראה נהדר במסך הקטן, אבל כשאתם מקבלים את תוצר העריכה הסופי, משהו פשוט לא מסתדר. הסאונד רועש מהמזגן ברקע, התאורה נראית אפורה, ויש רגעים שממש חסר בהם איזה קלוז-אפ יפה של המוצר. איפה הטעות? <strong>בשלב ה-Pre-Production.</strong>
      </p>

      <h2 style="font-size: 2.2rem; color: #fff; margin: 50px 0 20px;">למה "נתקן את זה בעריכה" היא אשליה?</h2>
      <p style="margin-bottom: 20px;">
        אחת המלכודות הכי יקרות בתעשייה היא חשיבה שאפשר לפתור הכל בחדר העריכה ("We'll fix it in post"). האמת היא שלתקן חשיפת יתר בתאורה, לנקות הד (Reverb) או רעשי רחוב מסאונד פגום, ולנסות לכסות טעויות בבימוי – זה תהליך שגובה שעות ארוכות (המתורגמות לכסף רב) ולעולם לא ייראה טוב כמו "שוט" שצולם בצורה נכונה מראש. חברות ההפקה הטובות בעולם מתעקשות להגיע לשלמות על הסט, כי השלמות הזו משתקפת ישירות במותג שלכם.
      </p>
      
      <h2 style="font-size: 2.2rem; color: #fff; margin: 50px 0 20px;">3 חוקי ברזל לפני שמדליקים מצלמה</h2>
      <ul style="margin-bottom: 40px; padding-right: 20px; text-align: right; display: inline-block; max-width: 600px;">
        <li style="margin-bottom: 15px;"><strong>סיור לוקיישן (Scouting):</strong> אנחנו לא מגיעים ביום ההפקה ומחפשים איפה לצלם. ביקור מוקדם במשרדים שלכם מאפשר לנו לדעת מאיפה מגיעה שמש טבעית, איזה חדר מבודד אקוסטית בצורה טובה, ואיך לסדר את מחלקת התאורה וההגברה בהתאם.</li>
        <li style="margin-bottom: 15px;"><strong>לוח שוטים מדויק (Shot List):</strong> יום צילום הוא יקר, וזמן הוא המצרך החשוב ביותר בו. בניית תוכנית עבודה חצי-שעתית מוודאת שלא נפספס שום דבר חשוב ושצוות העובדים שלכם יוכל להמשיך לעבוד מבלי לבזבז יום שלם מול הסט.</li>
        <li style="margin-bottom: 15px;"><strong>קוד לבוש ואיפור (Wardrobe & Makeup):</strong> מצלמות קולנוע ועדשות פרימיום קולטות כל פרט. אנו מנחים מראש איזה צבעים כדאי ללבוש (להימנע מפסים דקים היוצרים ריצוד דיגיטלי הנקרא Moiré) ומדוע חשוב לפדר את הפנים כדי למנוע השתקפויות מהתאורה העוצמתית.</li>
      </ul>

      <h2 style="font-size: 2.2rem; color: #fff; margin: 50px 0 20px;">חשיבותו העצומה של ה-B-Roll (צילומי אווירה)</h2>
      <p style="margin-bottom: 40px;">
        יש גבול כמה זמן אפשר לראות אדם יושב ומדבר ("Talking Head") לפני שהמוח מאבד עניין. <strong>B-Roll</strong> הם אותם צילומים יפהפיים (לרוב בהילוך איטי) שנחתכים פנימה: אנשים לוחצים ידיים במשרד, תקריב של עבודה על המחשב, או המכונה החדשה במפעל. זה לא רק "קישוט" – אלו הצילומים שגורמים לסרטון להרגיש קולנועי, מרתק, ומאפשרים למותג שלכם לספר סיפור שלם בלי מילים, ולהשאיר את הלקוחות בעמוד עד הסוף.
      </p>

      <!-- CTA -->
      <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 40px; text-align: center; margin-top: 50px;">
        <h3 style="font-size: 1.8rem; color: #fff; margin-bottom: 15px;">רוצים יום צילום קולנועי שלא מתפשר על שום פרט?</h3>
        <p style="margin-bottom: 30px; color: rgba(255,255,255,0.6);">ב-clips.Revolution, אנחנו דואגים להכל משלב הקונספט, דרך ה-Pre-Production הקפדני, ועד לעריכה הסופית והמרהיבה.</p>
        <a href="https://wa.me/972549445274" target="_blank" rel="noopener noreferrer" class="btn-primary" style="display: inline-flex;">
          <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px;" aria-hidden="true"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          תאמו פגישת ייעוץ איתנו
        </a>
      </div>

    </section>
`;

let newHtml2 = baseHtml.substring(0, startIndex) + shootingContent + '\n    ' + baseHtml.substring(endIndex);
newHtml2 = newHtml2.replace('<title>clips.Revolution - תוכן שיווקי לעסקים</title>', '<title>הסודות של ימי צילום מקצועיים ופרה-פרודקשן - clips.Revolution</title>');
// fix navigation links
newHtml2 = newHtml2.replace(/href="#about"/g, 'href="index.html#about"');
newHtml2 = newHtml2.replace(/href="#tools"/g, 'href="index.html#tools"');
newHtml2 = newHtml2.replace(/href="#" class="brand"/g, 'href="index.html" class="brand"');
fs.writeFileSync('corporate-video-pre-production.html', newHtml2, 'utf8');

