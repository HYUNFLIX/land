// =====================================================
// 동래 푸르지오 에듀포레 - OFFICIAL PREMIUM UX SCRIPT
// =====================================================

(function () {
  'use strict';

  // DOM Elements
  const header = document.getElementById('header');
  const navToggle = document.getElementById('navToggle');
  const mNav = document.getElementById('mNav');
  const mNavLinks = document.querySelectorAll('.m-nav-link');
  const quickCapsule = document.getElementById('quickCapsule');
  const btnTop = document.getElementById('btnTop');
  const urgencyBanner = document.getElementById('urgencyBanner');
  const ubClose = document.getElementById('ubClose');

  // =====================================================
  // 1. SCROLL EVENTS (Header & Quick Menu)
  // =====================================================
  let lastScrollY = window.scrollY;

  const handleScroll = () => {
    const y = window.scrollY;

    // Header Style change
    if (y > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Quick Capsule Visibility (Hide near top)
    if (quickCapsule) {
      if (y > 400) {
        quickCapsule.style.transform = 'translateY(0)';
        quickCapsule.style.opacity = '1';
        quickCapsule.style.pointerEvents = 'auto';
      } else {
        quickCapsule.style.transform = 'translateY(150px)';
        quickCapsule.style.opacity = '0';
        quickCapsule.style.pointerEvents = 'none';
      }
    }

    lastScrollY = y;
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Init

  // Top Button Event
  if (btnTop) {
    btnTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // =====================================================
  // 2. MOBILE MENU FULLSCREEN OVERLAY
  // =====================================================
  if (navToggle && mNav) {
    navToggle.addEventListener('click', () => {
      mNav.classList.toggle('open');
      const spans = navToggle.querySelectorAll('span');
      const isOpen = mNav.classList.contains('open');

      // X icon transform
      spans[0].style.transform = isOpen ? 'rotate(45deg) translateY(6px) translateX(6px)' : '';
      spans[1].style.opacity = isOpen ? '0' : '';
      spans[2].style.transform = isOpen ? 'rotate(-45deg) translateY(-6px) translateX(6px)' : '';

      // Header background lock when menu is open
      if (isOpen) header.style.background = 'transparent';
      else if (window.scrollY > 50) header.style.background = 'var(--prugio-dark)';
    });

    mNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mNav.classList.remove('open');
        const spans = navToggle.querySelectorAll('span');
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
        if (window.scrollY > 50) header.style.background = 'var(--prugio-dark)';
      });
    });
  }

  // =====================================================
  // 3. URGENCY BANNER (D-Day Countdown)
  // =====================================================
  if (ubClose && urgencyBanner) {
    ubClose.addEventListener('click', () => {
      urgencyBanner.classList.add('hidden');
    });
  }

  const ubDays = document.getElementById('ub-days');
  const ubHours = document.getElementById('ub-hours');
  const ubMins = document.getElementById('ub-mins');
  const ubSecs = document.getElementById('ub-secs');

  if (ubDays) {
    const updateCountdown = () => {
      const now = new Date();
      // 내일 자정 기준 (예시 타이머)
      const end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
      const diff = end - now;

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / 1000 / 60) % 60);
      const s = Math.floor((diff / 1000) % 60);

      ubDays.textContent = d < 10 ? '0' + d : d;
      ubHours.textContent = h < 10 ? '0' + h : h;
      ubMins.textContent = m < 10 ? '0' + m : m;
      ubSecs.textContent = s < 10 ? '0' + s : s;
    };
    setInterval(updateCountdown, 1000);
    updateCountdown();
  }

  // =====================================================
  // 4. UNIT PLAN TABS (Official Format)
  // =====================================================
  const tabs = document.querySelectorAll('.utab');
  const views = document.querySelectorAll('.uc-view');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const targetId = 'unit-' + tab.getAttribute('data-unit');
      views.forEach(v => {
        v.classList.remove('active');
        v.style.animation = 'none'; // reset animation
      });

      const targetView = document.getElementById(targetId);
      if (targetView) {
        targetView.classList.add('active');
        targetView.style.animation = 'fadeIn 0.5s ease';
      }
    });
  });

  // =====================================================
  // 5. OBSERVER REVEAL ANIMATIONS
  // =====================================================
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
  revealEls.forEach(el => revealObserver.observe(el));

  // =====================================================
  // 6. FORM SUBMISSION ALERTS & GOOGLE SHEETS API
  // =====================================================
  const officialForm = document.getElementById('officialForm');
  if (officialForm) {
    officialForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('regName').value.trim();
      const phone = document.getElementById('regPhone').value.trim();
      const agree = document.getElementById('regAgree').checked;

      if (!name || !phone) {
        alert('필수 입력 항목을 확인해 주세요.');
        return;
      }
      if (!agree) {
        alert('개인정보 수집 및 이용에 동의해야 합니다.');
        return;
      }

      // Simulate Form submission to Google Sheets API
      const formData = new FormData(officialForm);
      console.log('Google Sheets API로 전송할 데이터:', Object.fromEntries(formData));

      // Firebase Firestore 저장
      const btn = officialForm.querySelector('button[type="submit"]');
      const origText = btn.textContent;
      btn.disabled = true;
      btn.textContent = '등록 중...';

      const db = window._prugio_db;
      if (!db) {
        alert('서비스 초기화 중입니다. 잠시 후 다시 시도해주세요.');
        btn.disabled = false;
        btn.textContent = origText;
        return;
      }

      const leadData = {
        name: (officialForm.querySelector('[name="name"]') || officialForm.querySelector('#regName'))?.value || '',
        phone: (officialForm.querySelector('[name="phone"]') || officialForm.querySelector('#regPhone'))?.value || '',
        unitType: (officialForm.querySelector('[name="unitType"]') || officialForm.querySelector('#regUnit'))?.value || '',
        message: (officialForm.querySelector('[name="message"]') || officialForm.querySelector('#regMsg'))?.value || '',
        privacy: (officialForm.querySelector('[name="privacy"]') || officialForm.querySelector('#regPrivacy'))?.checked || false,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        source: document.referrer || 'direct'
      };

      db.collection('leads').add(leadData)
        .then(() => {
          alert('관심고객 등록이 완료되었습니다!\n담당자가 빠른 시일 내에 연락드리겠습니다.');
          officialForm.reset();
        })
        .catch(err => {
          console.error('Firestore 저장 오류:', err);
          alert('등록 중 오류가 발생했습니다. 잠시 후 다시 시도하거나 전화로 문의해주세요.');
        })
        .finally(() => {
          btn.disabled = false;
          btn.textContent = origText;
        });
    });
  }

  // =====================================================
  // 7. SPLASH SCREEN ANIMATION
  // =====================================================
  const splashScreen = document.getElementById('splashScreen');
  if (splashScreen) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        splashScreen.classList.add('hide');
      }, 1500); // 1.5초 후 스플래시 화면 숨김
    });
  }

  // =====================================================
  // 8. DYNAMIC NOTICE MODAL (Cookie-based)
  // =====================================================
  const noticeModal = document.getElementById('noticeModal');
  const closeNotice = document.getElementById('closeNotice');
  const closeToday = document.getElementById('closeToday');

  function setCookie(name, value, expiredays) {
    const today = new Date();
    today.setDate(today.getDate() + expiredays);
    document.cookie = name + '=' + escape(value) + '; path=/; expires=' + today.toUTCString() + ';';
  }

  function getCookie(name) {
    const obj = name + '=';
    let x = 0;
    while (x <= document.cookie.length) {
      let y = (x + obj.length);
      if (document.cookie.substring(x, y) === obj) {
        let end = document.cookie.indexOf(';', y);
        if (end === -1) end = document.cookie.length;
        return unescape(document.cookie.substring(y, end));
      }
      x = document.cookie.indexOf(' ', x) + 1;
      if (x === 0) break;
    }
    return '';
  }

  if (noticeModal) {
    if (getCookie('hideNotice') !== 'Y') {
      // 좀 더 부드러운 노출을 위해 1초 뒤 팝업 등장
      setTimeout(() => {
        noticeModal.classList.add('active');
      }, 1000);
    }
    closeNotice.addEventListener('click', () => {
      if (closeToday && closeToday.checked) {
        setCookie('hideNotice', 'Y', 1); // 1일 동안 열지 않음
      }
      noticeModal.classList.remove('active');
    });
  }

})();
