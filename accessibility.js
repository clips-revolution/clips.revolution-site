(function() {
    // Accessibility Widget Configuration
    const STORAGE_KEY = 'a11y_preferences';
    const PREFIX = 'a11y-';
    
    // Default state
    let state = {
        fontSizeLevel: 0,
        highContrast: false,
        grayscale: false,
        highlightLinks: false,
        readableFont: false,
        largeCursor: false,
        stopAnimations: false
    };

    // Load saved preferences
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
        try {
            state = { ...state, ...JSON.parse(savedState) };
        } catch (e) {
            console.error('Error parsing accessibility preferences', e);
        }
    }

    // Save preferences
    function saveState() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }

    // --- CSS Injection ---
    function injectCSS() {
        const style = document.createElement('style');
        style.id = `${PREFIX}styles`;
        style.textContent = `
            /* Widget Base Styles */
            .${PREFIX}widget-container {
                position: fixed;
                bottom: 20px;
                left: 20px;
                z-index: 999999;
                font-family: 'Outfit', 'Abraham', 'Segoe UI', system-ui, sans-serif;
                direction: rtl;
            }

            /* Floating Button */
            .${PREFIX}trigger-btn {
                width: 48px;
                height: 48px;
                border-radius: 50%;
                background-color: #121212;
                color: #ffffff;
                border: 1px solid #222222;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                transition: transform 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;
                padding: 0;
            }
            
            .${PREFIX}trigger-btn:hover, .${PREFIX}trigger-btn:focus {
                background-color: #a855f7;
                border-color: #a855f7;
                transform: scale(1.05);
                outline: 2px solid #ffffff;
                outline-offset: 2px;
            }

            @keyframes ${PREFIX}pulse {
                0% { box-shadow: 0 0 0 0 rgba(168, 85, 247, 0.6); }
                70% { box-shadow: 0 0 0 15px rgba(168, 85, 247, 0); }
                100% { box-shadow: 0 0 0 0 rgba(168, 85, 247, 0); }
            }

            .${PREFIX}pulse-anim {
                animation: ${PREFIX}pulse 1.5s infinite;
            }

            /* Panel */
            .${PREFIX}panel {
                position: absolute;
                bottom: 60px;
                left: 0;
                width: 320px;
                max-width: calc(100vw - 40px);
                background-color: rgba(10, 10, 10, 0.95);
                backdrop-filter: blur(12px);
                border: 1px solid #222222;
                border-radius: 16px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.8);
                display: flex;
                flex-direction: column;
                opacity: 0;
                visibility: hidden;
                transform: translateY(20px);
                transition: opacity 0.3s ease, transform 0.3s ease, visibility 0.3s ease;
                color: #ffffff;
                overflow: hidden;
            }

            .${PREFIX}panel.is-open {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            }

            /* Header */
            .${PREFIX}header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 16px 20px;
                border-bottom: 1px solid #222222;
                background-color: #121212;
                border-radius: 16px 16px 0 0;
            }

            .${PREFIX}title {
                margin: 0;
                font-size: 18px;
                font-weight: 600;
            }

            .${PREFIX}close-btn {
                background: none;
                border: none;
                color: #ffffff;
                font-size: 20px;
                cursor: pointer;
                width: 32px;
                height: 32px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: background-color 0.2s;
            }

            .${PREFIX}close-btn:hover, .${PREFIX}close-btn:focus {
                background-color: #222222;
                outline: 2px solid #a855f7;
            }

            /* Content Grid */
            .${PREFIX}content {
                padding: 20px;
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 12px;
                max-height: 60vh;
                overflow-y: auto;
            }

            /* Feature Buttons */
            .${PREFIX}feature-btn {
                background-color: #121212;
                border: 1px solid #222222;
                border-radius: 12px;
                padding: 12px 8px;
                color: #ffffff;
                cursor: pointer;
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
                gap: 8px;
                transition: all 0.2s ease;
                font-size: 13px;
                font-weight: 500;
                font-family: inherit;
            }

            .${PREFIX}feature-btn:hover, .${PREFIX}feature-btn:focus {
                background-color: #222222;
                border-color: rgba(255, 255, 255, 0.1);
                outline: 2px solid #a855f7;
                outline-offset: -2px;
            }

            .${PREFIX}feature-btn.is-active {
                background-color: rgba(168, 85, 247, 0.1);
                border-color: #a855f7;
                box-shadow: inset 0 0 0 1px #a855f7;
                color: #c084fc;
            }

            .${PREFIX}icon {
                font-size: 20px;
            }

            /* Footer */
            .${PREFIX}footer {
                padding: 16px 20px;
                border-top: 1px solid #222222;
                background-color: #121212;
                border-radius: 0 0 16px 16px;
                display: flex;
                flex-direction: column;
                gap: 12px;
            }

            .${PREFIX}reset-btn {
                background-color: #222222;
                color: #ffffff;
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 8px;
                padding: 10px;
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s ease;
                width: 100%;
                font-family: inherit;
            }

            .${PREFIX}reset-btn:hover, .${PREFIX}reset-btn:focus {
                background-color: #a855f7;
                border-color: #a855f7;
                outline: 2px solid #ffffff;
                outline-offset: 2px;
            }

            .${PREFIX}link {
                color: rgba(255, 255, 255, 0.4);
                text-align: center;
                font-size: 13px;
                text-decoration: underline;
                transition: color 0.2s;
            }

            .${PREFIX}link:hover, .${PREFIX}link:focus {
                color: #c084fc;
                outline: 2px solid #c084fc;
                outline-offset: 2px;
                border-radius: 2px;
            }

            /* 
             * Accessibility Overrides 
             */
            
            /* High Contrast */
            html.${PREFIX}high-contrast body, 
            html.${PREFIX}high-contrast main,
            html.${PREFIX}high-contrast article,
            html.${PREFIX}high-contrast section,
            html.${PREFIX}high-contrast div:not(.${PREFIX}widget-container):not(.${PREFIX}widget-container *),
            html.${PREFIX}high-contrast p,
            html.${PREFIX}high-contrast span,
            html.${PREFIX}high-contrast h1,
            html.${PREFIX}high-contrast h2,
            html.${PREFIX}high-contrast h3,
            html.${PREFIX}high-contrast h4,
            html.${PREFIX}high-contrast h5,
            html.${PREFIX}high-contrast h6 {
                background-color: #000000 !important;
                color: #ffffff !important;
                border-color: #ffffff !important;
            }
            
            /* Grayscale */
            html.${PREFIX}grayscale {
                filter: grayscale(100%) !important;
            }

            /* Highlight Links */
            html.${PREFIX}highlight-links a {
                text-decoration: underline !important;
                text-decoration-color: #ffeb3b !important;
                text-decoration-thickness: 3px !important;
                color: #ffeb3b !important;
                background-color: #000000 !important;
            }

            /* Readable Font */
            html.${PREFIX}readable-font, 
            html.${PREFIX}readable-font * {
                font-family: Arial, Helvetica, sans-serif !important;
            }

            /* Large Cursor */
            html.${PREFIX}large-cursor,
            html.${PREFIX}large-cursor * {
                cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Cpath fill='%23ffffff' stroke='%23000000' stroke-width='2' d='M5 5l22 11-9 3 5 9-4 2-5-9-7 7z'/%3E%3C/svg%3E"), auto !important;
            }

            /* Stop Animations */
            html.${PREFIX}stop-animations,
            html.${PREFIX}stop-animations *,
            html.${PREFIX}stop-animations *:before,
            html.${PREFIX}stop-animations *:after {
                animation: none !important;
                transition: none !important;
                scroll-behavior: auto !important;
            }
            
            /* Scrollbar for panel */
            .${PREFIX}content::-webkit-scrollbar {
                width: 6px;
            }
            .${PREFIX}content::-webkit-scrollbar-track {
                background: rgba(0,0,0,0.1); 
            }
            .${PREFIX}content::-webkit-scrollbar-thumb {
                background: rgba(255,255,255,0.3); 
                border-radius: 3px;
            }
        `;
        document.head.appendChild(style);
    }

    // --- DOM Elements ---
    let container, triggerBtn, panel, closeBtn, contentArea, resetBtn;
    
    function createUI() {
        container = document.createElement('div');
        container.className = `${PREFIX}widget-container`;
        container.setAttribute('dir', 'rtl');

        // Panel
        panel = document.createElement('div');
        panel.className = `${PREFIX}panel`;
        panel.setAttribute('role', 'dialog');
        panel.setAttribute('aria-label', 'תפריט נגישות');
        panel.setAttribute('aria-modal', 'true');

        // Header
        const header = document.createElement('div');
        header.className = `${PREFIX}header`;
        
        const title = document.createElement('h2');
        title.className = `${PREFIX}title`;
        title.textContent = 'תפריט נגישות';
        
        closeBtn = document.createElement('button');
        closeBtn.className = `${PREFIX}close-btn`;
        closeBtn.setAttribute('aria-label', 'סגור תפריט נגישות');
        closeBtn.innerHTML = '✕';
        
        header.appendChild(title);
        header.appendChild(closeBtn);
        panel.appendChild(header);

        // Content
        contentArea = document.createElement('div');
        contentArea.className = `${PREFIX}content`;
        
        const features = [
            { id: 'font-increase', label: 'הגדלת גופן', icon: 'A+', action: () => adjustFontSize(1) },
            { id: 'font-decrease', label: 'הקטנת גופן', icon: 'A-', action: () => adjustFontSize(-1) },
            { id: 'highContrast', label: 'ניגודיות גבוהה', icon: '◐', action: () => toggleFeature('highContrast') },
            { id: 'grayscale', label: 'גווני אפור', icon: '◧', action: () => toggleFeature('grayscale') },
            { id: 'highlightLinks', label: 'הדגשת קישורים', icon: '🔗', action: () => toggleFeature('highlightLinks') },
            { id: 'readableFont', label: 'גופן קריא', icon: 'Aa', action: () => toggleFeature('readableFont') },
            { id: 'largeCursor', label: 'סמן גדול', icon: '↗', action: () => toggleFeature('largeCursor') },
            { id: 'stopAnimations', label: 'עצירת אנימציות', icon: '⏸', action: () => toggleFeature('stopAnimations') }
        ];

        features.forEach(feat => {
            const btn = document.createElement('button');
            btn.className = `${PREFIX}feature-btn`;
            btn.id = `${PREFIX}btn-${feat.id}`;
            btn.setAttribute('aria-pressed', 'false');
            
            const icon = document.createElement('span');
            icon.className = `${PREFIX}icon`;
            icon.textContent = feat.icon;
            icon.setAttribute('aria-hidden', 'true');
            
            const label = document.createElement('span');
            label.textContent = feat.label;
            
            btn.appendChild(icon);
            btn.appendChild(label);
            
            btn.addEventListener('click', feat.action);
            contentArea.appendChild(btn);
        });
        
        panel.appendChild(contentArea);

        // Footer
        const footer = document.createElement('div');
        footer.className = `${PREFIX}footer`;
        
        resetBtn = document.createElement('button');
        resetBtn.className = `${PREFIX}reset-btn`;
        resetBtn.textContent = 'איפוס'; // "איפוס" per requirements
        resetBtn.addEventListener('click', resetFeatures);
        
        const statementLink = document.createElement('a');
        statementLink.className = `${PREFIX}link`;
        statementLink.href = 'nagishut.html';
        statementLink.textContent = 'הצהרת נגישות';
        
        footer.appendChild(resetBtn);
        footer.appendChild(statementLink);
        panel.appendChild(footer);

        // Trigger Button
        triggerBtn = document.createElement('button');
        triggerBtn.className = `${PREFIX}trigger-btn ${PREFIX}pulse-anim`;
        triggerBtn.setAttribute('aria-label', 'פתח תפריט נגישות');
        triggerBtn.setAttribute('aria-expanded', 'false');
        triggerBtn.innerHTML = '♿';

        container.appendChild(panel);
        container.appendChild(triggerBtn);
        document.body.appendChild(container);

        // Remove pulse after 3 seconds
        setTimeout(() => {
            triggerBtn.classList.remove(`${PREFIX}pulse-anim`);
        }, 3000);

        // Event Listeners for UI
        triggerBtn.addEventListener('click', togglePanel);
        closeBtn.addEventListener('click', togglePanel);

        // Keyboard accessibility
        setupFocusTrap();
    }

    let isOpen = false;
    function togglePanel() {
        isOpen = !isOpen;
        if (isOpen) {
            panel.classList.add('is-open');
            triggerBtn.setAttribute('aria-expanded', 'true');
            closeBtn.focus();
            
            // Close on outside click
            document.addEventListener('click', closeOnOutsideClick);
        } else {
            panel.classList.remove('is-open');
            triggerBtn.setAttribute('aria-expanded', 'false');
            triggerBtn.focus();
            
            document.removeEventListener('click', closeOnOutsideClick);
        }
    }

    function closeOnOutsideClick(e) {
        if (!container.contains(e.target) && isOpen) {
            togglePanel();
        }
    }

    // --- Feature Logic ---

    // Font size logic
    function applyFontSizeLevel(level) {
        // level can be 0, 1, 2, 3
        const htmlElement = document.documentElement;
        if (level === 0) {
            htmlElement.style.fontSize = '';
            document.getElementById(`${PREFIX}btn-font-increase`).classList.remove('is-active');
            document.getElementById(`${PREFIX}btn-font-increase`).setAttribute('aria-pressed', 'false');
        } else {
            // Apply a percentage increase based on root font size. 20% per level.
            // 1 level = 120%, 2 levels = 144%, 3 levels = 172.8%
            const scale = Math.pow(1.2, level) * 100;
            htmlElement.style.fontSize = `${scale}%`;
            document.getElementById(`${PREFIX}btn-font-increase`).classList.add('is-active');
            document.getElementById(`${PREFIX}btn-font-increase`).setAttribute('aria-pressed', 'true');
        }
        
        document.getElementById(`${PREFIX}btn-font-decrease`).classList.toggle('is-active', level > 0);
    }

    function adjustFontSize(direction) {
        let newLevel = state.fontSizeLevel + direction;
        if (newLevel > 3) newLevel = 3;
        if (newLevel < 0) newLevel = 0;
        
        state.fontSizeLevel = newLevel;
        applyFontSizeLevel(newLevel);
        saveState();
    }

    // Toggle specific boolean features
    function toggleFeature(featureName) {
        state[featureName] = !state[featureName];
        applyFeature(featureName, state[featureName]);
        saveState();
    }

    function applyFeature(featureName, isActive) {
        const className = `${PREFIX}${featureName.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
        
        if (isActive) {
            document.documentElement.classList.add(className);
        } else {
            document.documentElement.classList.remove(className);
        }
        
        const btn = document.getElementById(`${PREFIX}btn-${featureName}`);
        if (btn) {
            if (isActive) {
                btn.classList.add('is-active');
                btn.setAttribute('aria-pressed', 'true');
            } else {
                btn.classList.remove('is-active');
                btn.setAttribute('aria-pressed', 'false');
            }
        }
    }

    function resetFeatures() {
        state = {
            fontSizeLevel: 0,
            highContrast: false,
            grayscale: false,
            highlightLinks: false,
            readableFont: false,
            largeCursor: false,
            stopAnimations: false
        };
        
        applyFontSizeLevel(0);
        Object.keys(state).forEach(key => {
            if (key !== 'fontSizeLevel') {
                applyFeature(key, false);
            }
        });
        
        saveState();
    }

    function applyAllStates() {
        applyFontSizeLevel(state.fontSizeLevel);
        Object.keys(state).forEach(key => {
            if (key !== 'fontSizeLevel') {
                applyFeature(key, state[key]);
            }
        });
    }

    // --- Keyboard Accessibility & Focus Trap ---
    function setupFocusTrap() {
        container.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isOpen) {
                togglePanel();
                return;
            }

            if (e.key === 'Tab' && isOpen) {
                const focusableElements = panel.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (e.shiftKey) { // Shift + Tab
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        e.preventDefault();
                    }
                } else { // Tab
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }

    // --- Initialization ---
    function init() {
        injectCSS();
        createUI();
        
        // Ensure DOM styling is available before applying size updates if needed,
        // but percentage scaling on root HTML element is usually reliable immediately.
        applyAllStates();
    }

    // Initialize immediately if DOM is ready, or wait for DOMContentLoaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Run early CSS injection/application for immediate preference application
    if (savedState) {
        // Attempt to apply CSS classes immediately to prevent flash of unstyled content
        // if script is placed in <head>.
        try {
            const parsed = JSON.parse(savedState);
            Object.keys(parsed).forEach(key => {
                if (key !== 'fontSizeLevel' && parsed[key]) {
                    const className = `${PREFIX}${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
                    document.documentElement.classList.add(className);
                }
            });
            if (parsed.fontSizeLevel && parsed.fontSizeLevel > 0) {
                 const scale = Math.pow(1.2, parsed.fontSizeLevel) * 100;
                 document.documentElement.style.fontSize = `${scale}%`;
            }
        } catch(e) {}
    }
})();
