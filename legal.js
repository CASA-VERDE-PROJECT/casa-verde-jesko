/* Datos del titular: se muestran en Términos y Privacidad. Completar aquí (un solo lugar);
   mientras un dato esté vacío no se muestra. Si cambia algo de fondo, actualizar CV_LEGAL.version en consent.js. */
window.CV_TITULAR = {
  razon:     '',                                   // Razón social, p. ej. «Inversiones Casa Verde, C.A.»
  rif:       '',                                   // RIF J-XXXXXXXX-X
  whatsapp:  '+58 412-303-0330'
};

(function () {
  var t = window.CV_TITULAR;

  /* Los datos vacíos no se muestran: queda el nombre «Casa Verde» y se ocultan RIF y correo */
  function fill() {
    document.querySelectorAll('[data-f]').forEach(function (el) {
      var v = t[el.dataset.f];
      if (v) el.textContent = v;
    });
    document.querySelectorAll('[data-opt]').forEach(function (el) {
      el.hidden = !t[el.dataset.opt];
    });
  }

  function setLang(l) {
    document.querySelectorAll('[data-lang]').forEach(function (a) { a.hidden = a.dataset.lang !== l; });
    document.querySelectorAll('.lg-lang button').forEach(function (b) { b.classList.toggle('active', b.dataset.lc === l); });
    document.querySelectorAll('[data-es]').forEach(function (el) { el.textContent = el.dataset[l]; });
    document.documentElement.lang = l;
    var h = document.querySelector('[data-lang="' + l + '"] h1');
    if (h) document.title = h.textContent + ' — Casa Verde';
    try { localStorage.setItem('cv-lang', l); } catch (e) {}
  }

  /* Solo presentación: portada oscura, índice lateral y tablas en tarjeta. No cambia ningún texto. */
  function structure() {
    document.querySelectorAll('article[data-lang]').forEach(function (art) {
      var en = art.dataset.lang === 'en';
      var hero = document.createElement('header'), heroIn = document.createElement('div');
      hero.className = 'lg-hero'; heroIn.className = 'lg-hero-in'; hero.appendChild(heroIn);
      ['.lg-label', 'h1', '.lg-meta'].forEach(function (sel) { var el = art.querySelector(sel); if (el) heroIn.appendChild(el); });

      var body = document.createElement('div'), toc = document.createElement('nav'), content = document.createElement('div');
      body.className = 'lg-body'; toc.className = 'lg-toc'; content.className = 'lg-content';
      toc.setAttribute('aria-label', en ? 'Contents' : 'Contenido');
      while (art.firstChild) content.appendChild(art.firstChild);

      var t = document.createElement('p'); t.className = 'lg-toc-t'; t.textContent = en ? 'Contents' : 'Contenido';
      var ol = document.createElement('ol');
      content.querySelectorAll('h2').forEach(function (h, i) {
        var m = h.textContent.match(/^(\d+)\.\s*(.*)$/), num = m ? m[1] : String(i + 1), name = m ? m[2] : h.textContent;
        h.id = art.dataset.lang + '-' + num;
        if (m) h.innerHTML = '<span class="n">' + (num.length < 2 ? '0' + num : num) + '</span><span>' + h.innerHTML.replace(/^\s*\d+\.\s*/, '') + '</span>';
        var li = document.createElement('li'), a = document.createElement('a');
        a.href = '#' + h.id; a.innerHTML = '<b>' + (num.length < 2 ? '0' + num : num) + '</b><span></span>';
        a.lastChild.textContent = name;
        li.appendChild(a); ol.appendChild(li);
      });
      toc.appendChild(t); toc.appendChild(ol);

      content.querySelectorAll('table').forEach(function (tb) {
        var w = document.createElement('div'); w.className = 'lg-tbl';
        tb.parentNode.insertBefore(w, tb); w.appendChild(tb);
      });

      body.appendChild(toc); body.appendChild(content);
      art.appendChild(hero); art.appendChild(body);
    });

    /* el índice marca la sección que se está leyendo */
    function mark() {
      var art = document.querySelector('article[data-lang]:not([hidden])');
      if (!art) return;
      var hs = art.querySelectorAll('.lg-content h2[id]'), cur = hs[0], lim = innerHeight * .35;
      hs.forEach(function (h) { if (h.getBoundingClientRect().top < lim) cur = h; });
      art.querySelectorAll('.lg-toc a').forEach(function (a) { a.classList.toggle('on', cur && a.getAttribute('href') === '#' + cur.id); });
    }
    addEventListener('scroll', mark, { passive: true });
    addEventListener('resize', mark);
    document.addEventListener('click', function (e) { if (e.target.closest('.lg-lang button')) setTimeout(mark, 0); });
    setTimeout(mark, 0);
  }

  structure();
  fill();
  var lang = 'es';
  try { lang = localStorage.getItem('cv-lang') || 'es'; } catch (e) {}
  setLang(lang === 'en' ? 'en' : 'es');
  document.querySelectorAll('.lg-lang button').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.dataset.lc); });
  });
})();
