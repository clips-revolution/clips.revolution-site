/* ─────────────────────────────────────────────────────────────
   clips.Revolution — Unified Site Authentication & Download Gate
   Supabase Project: clips-revolution's Project
───────────────────────────────────────────────────────────── */
(function () {
  var SUPABASE_URL = 'https://qkektomkkoyhhiymfwaz.supabase.co';
  var SUPABASE_KEY = 'sb_publishable_lrdTNG07cLrN3sWwCXliBA_hORExTbw';
  var GALLERY_VERSION = '0.70.0';
  var PENDING_KEY = 'cr_pending_gallery_dl';

  var PLATFORM_MAP = {
    '/download/clips-gallery-windows': { platform: 'windows', label: 'Windows' },
    '/download/clips-gallery-mac-arm64': { platform: 'mac-arm64', label: 'Mac (Apple Silicon)' },
    '/download/clips-gallery-mac-intel': { platform: 'mac-intel', label: 'Mac (Intel)' }
  };

  var PLATFORM_TO_URL = {
    'windows': '/download/clips-gallery-windows',
    'mac-arm64': '/download/clips-gallery-mac-arm64',
    'mac-intel': '/download/clips-gallery-mac-intel'
  };

  var sb = null;
  var currentUser = null;
  var pendingDownload = null;
  var dialogEl = null;
  var navBtnEl = null;
  var navClusterEl = null;
  var mobileLogoEl = null;
  var originalMobileLogoHtml = '';
  var toastEl = null;
  var toastTimer = null;
  var handledResume = false;

  function initClient() {
    if (sb) return sb;
    if (window.supabase && typeof window.supabase.createClient === 'function') {
      sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true
        }
      });
    }
    return sb;
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function getDisplayName(user) {
    if (!user) return '';
    var meta = user.user_metadata || {};
    var full = meta.full_name || meta.name || '';
    if (full) return full.trim().split(/\s+/)[0];
    if (user.email) return user.email.split('@')[0];
    return 'משתמש';
  }

  function getAvatarUrl(user) {
    if (!user || !user.user_metadata) return '';
    return user.user_metadata.avatar_url || user.user_metadata.picture || '';
  }

  function renderRingedAvatar(user, sizeClass) {
    var name = getDisplayName(user);
    var initial = escapeHtml((name || 'U').charAt(0).toUpperCase());
    var avatar = getAvatarUrl(user);
    var inner = avatar
      ? '<img src="' + escapeHtml(avatar) + '" alt="" class="cr-avatar-ring-img" referrerpolicy="no-referrer" data-fallback-initial="' + initial + '">'
      : '<span class="cr-avatar-ring-initial">' + initial + '</span>';
    return (
      '<span class="cr-avatar-ring ' + sizeClass + '">' +
        '<span class="cr-avatar-ring-inner">' + inner + '</span>' +
      '</span>'
    );
  }

  function bindAvatarFallbacks(root) {
    if (!root) return;
    root.querySelectorAll('img.cr-avatar-ring-img').forEach(function (img) {
      img.addEventListener('error', function () {
        var init = img.getAttribute('data-fallback-initial') || 'U';
        var span = document.createElement('span');
        span.className = 'cr-avatar-ring-initial';
        span.textContent = init;
        if (img.parentNode) img.parentNode.replaceChild(span, img);
      });
    });
  }

  function showToast(msg, isError) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'cr-auth-toast';
      toastEl.setAttribute('role', 'status');
      toastEl.setAttribute('aria-live', 'polite');
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.toggle('is-error', !!isError);
    toastEl.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.classList.remove('is-visible');
    }, 4500);
  }

  function savePending(info) {
    pendingDownload = info;
    try {
      if (info) sessionStorage.setItem(PENDING_KEY, JSON.stringify(info));
      else sessionStorage.removeItem(PENDING_KEY);
    } catch (e) {}
  }

  function readPending() {
    var params = new URLSearchParams(window.location.search);
    var dlParam = params.get('cr_dl');
    if (dlParam && PLATFORM_TO_URL[dlParam]) {
      var url = PLATFORM_TO_URL[dlParam];
      return { url: url, platform: dlParam, label: PLATFORM_MAP[url].label };
    }
    try {
      var raw = sessionStorage.getItem(PENDING_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return null;
  }

  function cleanDlParam() {
    try {
      var u = new URL(window.location.href);
      if (u.searchParams.has('cr_dl')) {
        u.searchParams.delete('cr_dl');
        window.history.replaceState({}, document.title, u.pathname + u.search + u.hash);
      }
    } catch (e) {}
  }

  function buildRedirectUrl(info) {
    var u = new URL(window.location.href);
    u.hash = '';
    u.searchParams.delete('code');
    u.searchParams.delete('error');
    u.searchParams.delete('error_description');
    if (info && info.platform) u.searchParams.set('cr_dl', info.platform);
    return u.toString();
  }

  function logAndStartDownload(user, info) {
    if (!info || !info.url) return;
    savePending(null);
    cleanDlParam();

    var client = initClient();
    if (client && user) {
      var meta = user.user_metadata || {};
      client.from('gallery_downloads').insert({
        user_id: user.id,
        email: user.email || '',
        full_name: meta.full_name || meta.name || null,
        product: 'clips.Gallery',
        platform: info.platform,
        version: GALLERY_VERSION
      }).then(function () {}, function () {});
    }

    showToast('ההורדה של clips.Gallery (' + info.label + ') החלה!');
    window.location.assign(info.url);
  }

  function ensureDialog() {
    if (dialogEl) return dialogEl;
    dialogEl = document.createElement('dialog');
    dialogEl.id = 'cr-auth-dialog';
    dialogEl.className = 'cr-auth-dialog';
    dialogEl.setAttribute('closedby', 'any');
    dialogEl.setAttribute('aria-labelledby', 'cr-auth-title');
    document.body.appendChild(dialogEl);

    dialogEl.addEventListener('close', function () {
      dialogEl.returnValue = '';
    });

    // Safari fallback for closedby="any" (per modern-web-guidance dialog guide)
    if (!('closedBy' in HTMLDialogElement.prototype)) {
      var pressedOutside = false;
      var isOutside = function (e) {
        var r = dialogEl.getBoundingClientRect();
        return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
      };
      dialogEl.addEventListener('pointerdown', function (e) {
        pressedOutside = isOutside(e);
      });
      dialogEl.addEventListener('pointerup', function (e) {
        if (pressedOutside && isOutside(e)) dialogEl.close();
      });
    }

    return dialogEl;
  }

  function setDialogStatus(msg, type) {
    if (!dialogEl) return;
    var el = dialogEl.querySelector('.cr-auth-status');
    if (!el) return;
    el.textContent = msg || '';
    el.className = 'cr-auth-status' + (type ? ' is-' + type : '');
  }

  function renderDialog(mode, downloadInfo) {
    var dlg = ensureDialog();
    var closeBtn =
      '<form method="dialog" class="cr-auth-close-form">' +
      '<button type="submit" value="cancel" class="cr-auth-close" aria-label="סגור חלון">✕</button>' +
      '</form>';

    if (mode === 'account' && currentUser) {
      var name = getDisplayName(currentUser);
      var avatarHtml = renderRingedAvatar(currentUser, 'cr-avatar-ring--lg');

      dlg.innerHTML =
        closeBtn +
        '<div class="cr-auth-head">' +
          avatarHtml +
          '<h1 id="cr-auth-title" class="cr-auth-title">היי, ' + escapeHtml(name) + '</h1>' +
          '<p class="cr-auth-sub" dir="ltr">' + escapeHtml(currentUser.email || '') + '</p>' +
        '</div>' +
        '<div class="cr-auth-account-box">' +
          '<p class="cr-auth-account-label">הורדה מהירה של <bdi>clips.Gallery ' + GALLERY_VERSION + '</bdi></p>' +
          '<div class="cr-auth-dl-row">' +
            '<button type="button" class="btn-primary cr-auth-quick-dl" data-platform="windows" autofocus>הורדה ל־Windows</button>' +
            '<button type="button" class="btn-white cr-auth-quick-dl" data-platform="mac-arm64">הורדה ל־Mac</button>' +
          '</div>' +
        '</div>' +
        '<button type="button" class="cr-auth-logout-btn" id="cr-auth-logout">התנתקות מהחשבון</button>';
      bindAvatarFallbacks(dlg);

      dlg.querySelectorAll('.cr-auth-quick-dl').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var pf = btn.getAttribute('data-platform');
          var url = PLATFORM_TO_URL[pf];
          dlg.close();
          logAndStartDownload(currentUser, { url: url, platform: pf, label: PLATFORM_MAP[url].label });
        });
      });

      var logoutBtn = dlg.querySelector('#cr-auth-logout');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', function () {
          var client = initClient();
          if (client) {
            client.auth.signOut().then(function () {
              currentUser = null;
              updateNavButton();
              dlg.close();
              showToast('התנתקת בהצלחה');
            });
          }
        });
      }
      return;
    }

    var isDownloadGate = !!downloadInfo;
    var titleText = isDownloadGate
      ? 'התחברו בחינם להורדת <bdi>clips.Gallery</bdi>'
      : 'התחברות ל־<bdi>clips.Revolution</bdi>';
    var subText = isDownloadGate
      ? 'הורדה ל־<strong><bdi>' + escapeHtml(downloadInfo.label) + '</bdi></strong> · התחברות קצרה בחינם מאפשרת להוריד את הגרסה המלאה ולקבל עדכונים ופריסטים חדשים.'
      : 'התחברו בשנייה עם חשבון Google או אימייל כדי להוריד את הכלים החינמיים של הסטודיו.';

    dlg.innerHTML =
      closeBtn +
      '<div class="cr-auth-head">' +
        '<img src="clips-revolution-logo.webp" alt="clips.Revolution" class="cr-auth-brand-logo" width="46" height="46">' +
        '<h1 id="cr-auth-title" class="cr-auth-title">' + titleText + '</h1>' +
        '<p class="cr-auth-sub">' + subText + '</p>' +
      '</div>' +
      '<button type="button" class="cr-auth-google-btn" id="cr-google-signin" autofocus>' +
        '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">' +
          '<path fill="#4285F4" d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"/>' +
          '<path fill="#34A853" d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.09C3.515 21.3 7.565 24 12.255 24z"/>' +
          '<path fill="#FBBC05" d="M5.525 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62h-3.98a11.86 11.86 0 000 10.76l3.98-3.09z"/>' +
          '<path fill="#EA4335" d="M12.255 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C18.205 1.19 15.495 0 12.255 0c-4.69 0-8.74 2.7-10.71 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"/>' +
        '</svg>' +
        '<span>המשך עם Google</span>' +
      '</button>' +
      '<div class="cr-auth-divider"><span>או התחברות עם אימייל</span></div>' +
      '<form class="cr-auth-email-form" id="cr-email-signin-form">' +
        '<input type="email" name="email" required autocomplete="email" inputmode="email" placeholder="name@example.com" dir="ltr" class="cr-auth-input" aria-label="כתובת אימייל">' +
        '<button type="submit" class="btn-primary cr-auth-email-submit">שלחו לי קישור התחברות למייל</button>' +
      '</form>' +
      '<p class="cr-auth-status" role="status" aria-live="polite"></p>' +
      '<p class="cr-auth-note">100% חינם · ללא כרטיס אשראי · ללא ספאם</p>';

    var googleBtn = dlg.querySelector('#cr-google-signin');
    googleBtn.addEventListener('click', function () {
      var client = initClient();
      if (!client) {
        setDialogStatus('שירות ההתחברות עדיין נטען, נסו שוב בעוד רגע.', 'error');
        return;
      }
      if (downloadInfo) savePending(downloadInfo);
      googleBtn.disabled = true;
      setDialogStatus('מעביר להתחברות עם Google...', 'info');
      client.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: buildRedirectUrl(downloadInfo)
        }
      }).then(function (res) {
        if (res.error) {
          googleBtn.disabled = false;
          var msg = (res.error.message || '').toLowerCase();
          if (msg.indexOf('provider') !== -1 || msg.indexOf('not enabled') !== -1) {
            setDialogStatus('התחברות Google בהפעלה — אפשר להתחבר כבר עכשיו בשנייה עם אימייל למטה.', 'error');
          } else {
            setDialogStatus('לא הצלחנו להתחבר כרגע, נסו עם אימייל למטה.', 'error');
          }
        }
      });
    });

    var emailForm = dlg.querySelector('#cr-email-signin-form');
    emailForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var client = initClient();
      if (!client) {
        setDialogStatus('שירות ההתחברות עדיין נטען, נסו שוב בעוד רגע.', 'error');
        return;
      }
      var input = emailForm.querySelector('input[name="email"]');
      var submitBtn = emailForm.querySelector('button[type="submit"]');
      var email = (input.value || '').trim();
      if (!email) return;

      if (downloadInfo) savePending(downloadInfo);
      submitBtn.disabled = true;
      setDialogStatus('שולח קישור התחברות למייל...', 'info');

      client.auth.signInWithOtp({
        email: email,
        options: {
          emailRedirectTo: buildRedirectUrl(downloadInfo)
        }
      }).then(function (res) {
        submitBtn.disabled = false;
        if (res.error) {
          setDialogStatus('לא הצלחנו לשלוח מייל כרגע (' + res.error.message + ')', 'error');
        } else {
          setDialogStatus(
            downloadInfo
              ? 'שלחנו קישור ל־' + email + ' — לחצו עליו במייל וההורדה תתחיל מיד!'
              : 'שלחנו קישור התחברות ל־' + email + ' — בדקו את תיבת המייל.',
            'success'
          );
          input.value = '';
        }
      });
    });
  }

  function openAuthDialog(mode, downloadInfo) {
    renderDialog(mode, downloadInfo);
    if (!dialogEl.open) dialogEl.showModal();
  }

  function updateMobileProfile() {
    if (!mobileLogoEl) return;
    if (currentUser) {
      var name = getDisplayName(currentUser);
      var email = currentUser.email || '';
      mobileLogoEl.classList.add('is-user-profile');
      mobileLogoEl.innerHTML =
        '<button type="button" class="mobile-auth-profile" aria-label="החשבון שלי: ' + escapeHtml(name) + '">' +
          renderRingedAvatar(currentUser, 'cr-avatar-ring--menu') +
          '<span class="mobile-auth-name">' + escapeHtml(name) + '</span>' +
          (email ? '<span class="mobile-auth-email" dir="ltr">' + escapeHtml(email) + '</span>' : '') +
        '</button>';
      bindAvatarFallbacks(mobileLogoEl);
      var profileBtn = mobileLogoEl.querySelector('.mobile-auth-profile');
      if (profileBtn) {
        profileBtn.addEventListener('click', function () {
          if (typeof window.closeMobileMenu === 'function') window.closeMobileMenu();
          openAuthDialog('account');
        });
      }
    } else {
      mobileLogoEl.classList.remove('is-user-profile');
      mobileLogoEl.innerHTML =
        originalMobileLogoHtml +
        '<button type="button" class="mobile-auth-login-btn">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14" aria-hidden="true">' +
            '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>' +
            '<circle cx="12" cy="7" r="4"></circle>' +
          '</svg>' +
          '<span>התחברות</span>' +
        '</button>';
      var loginBtn = mobileLogoEl.querySelector('.mobile-auth-login-btn');
      if (loginBtn) {
        loginBtn.addEventListener('click', function () {
          if (typeof window.closeMobileMenu === 'function') window.closeMobileMenu();
          openAuthDialog('login', null);
        });
      }
    }
  }

  function updateNavButton() {
    if (navClusterEl) {
      navClusterEl.classList.toggle('is-signed-in', !!currentUser);
    }
    if (navBtnEl) {
      if (currentUser) {
        var name = getDisplayName(currentUser);
        navBtnEl.classList.add('is-signed-in');
        navBtnEl.setAttribute('aria-label', 'החשבון שלי: ' + name);
        navBtnEl.setAttribute('title', name);
        navBtnEl.innerHTML = renderRingedAvatar(currentUser, 'cr-avatar-ring--nav');
        bindAvatarFallbacks(navBtnEl);
      } else {
        navBtnEl.classList.remove('is-signed-in');
        navBtnEl.setAttribute('aria-label', 'התחברות לאתר');
        navBtnEl.removeAttribute('title');
        navBtnEl.innerHTML =
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="15" height="15" aria-hidden="true">' +
            '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>' +
            '<circle cx="12" cy="7" r="4"></circle>' +
          '</svg>' +
          '<span class="nav-auth-label">התחברות</span>';
      }
    }
    updateMobileProfile();
  }

  function mountNavButton() {
    var header = document.querySelector('#site-header');
    if (header && !navBtnEl) {
      var brandLink = header.querySelector('.brand');
      navBtnEl = document.createElement('button');
      navBtnEl.type = 'button';
      navBtnEl.className = 'nav-auth-btn';
      navBtnEl.addEventListener('click', function () {
        if (currentUser) openAuthDialog('account');
        else openAuthDialog('login', null);
      });

      if (brandLink && brandLink.parentNode) {
        navClusterEl = document.createElement('div');
        navClusterEl.className = 'nav-brand-cluster';
        brandLink.parentNode.insertBefore(navClusterEl, brandLink);
        navClusterEl.appendChild(navBtnEl);
        navClusterEl.appendChild(brandLink);
      } else {
        var navActions = header.querySelector('.nav-actions');
        if (navActions) navActions.appendChild(navBtnEl);
      }
    }

    if (!mobileLogoEl) {
      mobileLogoEl = document.querySelector('#mobile-menu .mobile-menu-logo');
      if (mobileLogoEl) {
        originalMobileLogoHtml = mobileLogoEl.innerHTML;
      }
    }

    updateNavButton();
  }

  function bindDownloadLinks() {
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href^="/download/clips-gallery-"]');
      if (!link) return;
      var href = link.getAttribute('href');
      var meta = PLATFORM_MAP[href];
      if (!meta) return;

      e.preventDefault();
      var info = { url: href, platform: meta.platform, label: meta.label };
      if (currentUser) {
        logAndStartDownload(currentUser, info);
      } else {
        openAuthDialog('login', info);
      }
    });
  }

  function handleSignedIn(user) {
    currentUser = user;
    updateNavButton();
    if (user && !handledResume) {
      var pending = readPending();
      if (pending) {
        handledResume = true;
        if (dialogEl && dialogEl.open) dialogEl.close();
        setTimeout(function () {
          logAndStartDownload(user, pending);
        }, 250);
      }
    }
  }

  function bootstrap() {
    mountNavButton();
    bindDownloadLinks();
    var client = initClient();
    if (!client) return;

    client.auth.getSession().then(function (res) {
      var user = res && res.data && res.data.session ? res.data.session.user : null;
      handleSignedIn(user);
    });

    client.auth.onAuthStateChange(function (event, session) {
      var user = session ? session.user : null;
      handleSignedIn(user);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
  } else {
    bootstrap();
  }
})();
