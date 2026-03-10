(function () {
  const burgerBtn = document.getElementById('burgerBtn');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  const content = document.getElementById('mainContent');
  const footer = document.getElementById('footer');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.page-section');
  const tocLinks = document.querySelectorAll('.toc-list a');

  function isDesktop() {
    return window.innerWidth > 900;
  }

  function openSidebar() {
    sidebar.classList.add('open');
    burgerBtn.classList.add('open');
    if (isDesktop()) {
      content.style.marginLeft = '250px';
      footer.style.marginLeft = '250px';
    } else {
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    burgerBtn.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    content.style.marginLeft = '';
    footer.style.marginLeft = '';
  }

  function toggleSidebar() {
    if (sidebar.classList.contains('open')) {
      closeSidebar();
    } else {
      openSidebar();
    }
  }

  burgerBtn.addEventListener('click', toggleSidebar);
  overlay.addEventListener('click', closeSidebar);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && sidebar.classList.contains('open')) {
      closeSidebar();
    }
  });

  window.addEventListener('resize', function () {
    if (sidebar.classList.contains('open')) {
      if (isDesktop()) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        content.style.marginLeft = '250px';
        footer.style.marginLeft = '250px';
      } else {
        overlay.classList.add('active');
        content.style.marginLeft = '';
        footer.style.marginLeft = '';
      }
    }
  });

  function showSection(sectionId) {
    sections.forEach(function (sec) {
      sec.classList.remove('active');
    });

    var target = document.getElementById(sectionId);
    if (target) {
      target.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.dataset.section === sectionId);
    });

    if (!isDesktop()) {
      closeSidebar();
    }
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      showSection(this.dataset.section);
    });
  });

  var sectionMap = {
    'section-1': 'home',
    'section-2': 'home',
    'section-3': 'home',
    'section-4': 'home',
    'section-5': 'services',
    'section-6': 'about'
  };

  tocLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var targetId = this.getAttribute('href').substring(1);
      var parentSection = sectionMap[targetId];

      if (!parentSection) return;

      showSection(parentSection);

      setTimeout(function () {
        var el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 120);
    });
  });

  function glitchMeta() {
    var glyphSet = '∅◈⬡◉◯∿⊘⌁∞≈≠⌂';
    var metaValues = document.querySelectorAll('.sidebar-meta .meta-item span');

    metaValues.forEach(function (el, i) {
      var original = el.textContent;
      setInterval(function () {
        if (Math.random() > 0.96) {
          el.textContent = glyphSet[Math.floor(Math.random() * glyphSet.length)];
          setTimeout(function () {
            el.textContent = original;
          }, 90);
        }
      }, 1800 + i * 600);
    });
  }

  glitchMeta();

  function initThemeToggle() {
    var toggleBtn = document.getElementById('themeToggle');
    var themeLabel = document.getElementById('themeLabel');
    if (!toggleBtn) return;

    var saved = localStorage.getItem('qaf-theme');
    if (saved === 'light') {
      document.body.classList.add('light-mode');
      themeLabel.textContent = 'LIGHT';
    }

    toggleBtn.addEventListener('click', function () {
      var isLight = document.body.classList.toggle('light-mode');
      themeLabel.textContent = isLight ? 'LIGHT' : 'DARK';
      localStorage.setItem('qaf-theme', isLight ? 'light' : 'dark');
    });
  }

  initThemeToggle();

  function initParallax() {
    var banners = document.querySelectorAll('.parallax-banner');
    if (!banners.length) return;

    var ticking = false;

    function applyParallax() {
      banners.forEach(function (banner) {
        var img = banner.querySelector('.parallax-banner__img');
        if (!img) return;

        var rect = banner.getBoundingClientRect();
        var inView = rect.bottom > 0 && rect.top < window.innerHeight;
        if (!inView) return;

        var speed = parseFloat(banner.getAttribute('data-parallax')) || 0.3;
        var progress = (rect.top / window.innerHeight);
        var offset = progress * speed * 250;

        img.style.transform = 'translateY(' + offset + 'px)';
      });

      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(applyParallax);
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    applyParallax();
  }

  initParallax();
})();
