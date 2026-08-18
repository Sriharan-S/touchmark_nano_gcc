/* Touchmark Nano GCC Hub — shared header, footer and page behaviour.
   Pages are flat files in the site root, so links are plain relative paths. */
(function () {
  var NAV = [
    { href: 'index.html', label: 'Home' },
    { href: 'about.html', label: 'About' },
    { href: 'nano-gcc-model.html', label: 'Nano GCC Model' },
    { href: 'for-companies.html', label: 'For Companies' },
    { href: 'for-institutions.html', label: 'For Institutions' },
    {
      href: 'ecosystem.html', label: 'Ecosystem', sub: [
        { href: 'ecosystem-partners.html', label: 'Partners' },
        { href: 'ecosystem-team.html', label: 'Team & Advisory' }
      ]
    },
    { href: 'insights.html', label: 'Insights' },
    { href: 'contact.html', label: 'Contact' }
  ];

  var here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();

  function isActive(item) {
    if (item.href === here) return true;
    return (item.sub || []).some(function (s) { return s.href === here; });
  }

  function link(item) {
    return '<a href="' + item.href + '"' + (item.href === here ? ' aria-current="page"' : '') +
      (isActive(item) ? ' class="active"' : '') + '>' + item.label + '</a>';
  }

  var brand =
    '<a class="brand" href="index.html">' +
      '<span class="mark">TM</span>' +
      '<span><b>Touchmark</b><span>Nano GCC Hub</span></span>' +
    '</a>';

  var navHtml = NAV.map(function (item) {
    if (!item.sub) return link(item);
    return '<span class="has-sub">' + link(item) +
      '<span class="sub">' + item.sub.map(link).join('') + '</span></span>';
  }).join('');

  var head = document.querySelector('[data-site-header]');
  if (head) {
    head.className = 'site-head';
    head.innerHTML =
      '<div class="head-in">' + brand +
        '<button class="burger" type="button" aria-label="Toggle navigation" aria-expanded="false">Menu</button>' +
        '<nav class="nav">' + navHtml + '</nav>' +
        '<a class="btn btn-primary btn-sm head-cta" href="contact.html">Talk to Touchmark</a>' +
      '</div>';

    var burger = head.querySelector('.burger');
    var nav = head.querySelector('.nav');
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', String(open));
    });
  }

  var foot = document.querySelector('[data-site-footer]');
  if (foot) {
    foot.className = 'site-foot';
    foot.innerHTML =
      '<div class="wrap">' +
        '<div class="foot-grid">' +
          '<div>' + brand +
            '<p style="max-width:34ch">Start small. Innovate fast. Build from Tamil Nadu. Scale globally.</p>' +
          '</div>' +
          '<div><h4>Explore</h4>' +
            '<a href="nano-gcc-model.html">Nano GCC Model</a>' +
            '<a href="about.html">About &amp; Vision</a>' +
            '<a href="insights.html">Insights &amp; Stories</a>' +
            '<a href="faq.html">FAQ</a>' +
          '</div>' +
          '<div><h4>Engage</h4>' +
            '<a href="for-companies.html">For Companies</a>' +
            '<a href="for-institutions.html">For Institutions</a>' +
            '<a href="careers.html">Careers &amp; Talent</a>' +
            '<a href="contact.html">Contact</a>' +
          '</div>' +
          '<div><h4>Ecosystem</h4>' +
            '<a href="ecosystem.html">Overview</a>' +
            '<a href="ecosystem-partners.html">Partners</a>' +
            '<a href="ecosystem-team.html">Team &amp; Advisory</a>' +
          '</div>' +
        '</div>' +
        '<div class="foot-bot">' +
          '<span>&copy; ' + new Date().getFullYear() + ' Touchmark Nano GCC Hub. Built from Tamil Nadu.</span>' +
          '<span>Tamil Nadu, India</span>' +
        '</div>' +
      '</div>';
  }

  // Scroll reveal
  var targets = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && targets.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -60px 0px' });
    targets.forEach(function (t) { io.observe(t); });
  } else {
    targets.forEach(function (t) { t.classList.add('in'); });
  }

  // Qualification / interest forms: no backend wired up yet, so acknowledge locally.
  document.querySelectorAll('form[data-local-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = form.querySelector('.ok');
      if (ok) { ok.style.display = 'block'; ok.scrollIntoView({ block: 'center' }); }
      form.reset();
    });
  });
})();
