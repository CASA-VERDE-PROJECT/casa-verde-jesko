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

  fill();
  var lang = 'es';
  try { lang = localStorage.getItem('cv-lang') || 'es'; } catch (e) {}
  setLang(lang === 'en' ? 'en' : 'es');
  document.querySelectorAll('.lg-lang button').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.dataset.lc); });
  });
})();
