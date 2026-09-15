// assets/js/home.js
// Solo para index.html: terminal animada, validación del formulario de contacto y Calendly.
// Requiere que site.js ya se haya cargado (menú móvil / cookies) y window.SITE_CONFIG.

(function () {
  var CONFIG = window.SITE_CONFIG || {};

  // ---------- Terminal animada ----------
  var lines = [
    { p: 'sistema $', t: 'crear_modulo_facturacion --cliente="ClinicaVitalis"', cls: '' },
    { p: '', t: 'compilando... listo', cls: 'ok' },
    { p: 'web $', t: 'deploy sitio_corporativo.build', cls: '' },
    { p: '', t: 'publicado en produccion', cls: 'ok' }
  ];
  var body = document.getElementById('termBody');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function renderStatic() {
    body.innerHTML = lines.map(function (l) {
      var promptSpan = l.p ? '<span class="prompt">' + l.p + '</span> ' : '';
      var cls = l.cls ? ' class="' + l.cls + '"' : '';
      return '<div class="line"><span' + cls + '>' + promptSpan + l.t + '</span></div>';
    }).join('');
  }

  function typeLines() {
    var i = 0, j = 0;
    body.innerHTML = '';
    function step() {
      if (i >= lines.length) {
        var last = body.querySelector('.line:last-child');
        if (last) last.innerHTML += '<span class="cursor"></span>';
        return;
      }
      var line = lines[i];
      if (j === 0) {
        var div = document.createElement('div');
        div.className = 'line';
        var promptSpan = line.p ? '<span class="prompt">' + line.p + '</span> ' : '';
        div.innerHTML = promptSpan + '<span class="typed' + (line.cls ? ' ' + line.cls : '') + '"></span>';
        body.appendChild(div);
      }
      var typedEl = body.querySelector('.line:last-child .typed');
      if (j <= line.t.length) {
        typedEl.textContent = line.t.slice(0, j);
        j++;
        setTimeout(step, 22);
      } else {
        i++; j = 0;
        setTimeout(step, 260);
      }
    }
    step();
  }

  if (body) {
    if (reduce) { renderStatic(); } else { typeLines(); }
  }

  // ---------- Contact form validation ----------
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var fields = ['nombre', 'correo', 'servicio', 'mensaje'];
      var valid = true;

      fields.forEach(function (name) {
        var wrap = form.querySelector('[data-field="' + name + '"]');
        var input = form.elements[name];
        var value = input.value.trim();
        var fieldValid = true;

        if (name === 'correo') {
          var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          fieldValid = re.test(value);
        } else {
          fieldValid = value.length > 0;
        }

        if (!fieldValid) {
          wrap.classList.add('invalid');
          valid = false;
        } else {
          wrap.classList.remove('invalid');
        }
      });

      if (!valid) {
        var firstInvalid = form.querySelector('.field.invalid input, .field.invalid select, .field.invalid textarea');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      var submitBtn = document.getElementById('submitBtn');
      var submitError = document.getElementById('submitError');
      submitError.style.display = 'none';
      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando...';

      fetch(CONFIG.FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      }).then(function (res) {
        if (res.ok) {
          document.getElementById('contactFormWrap').style.display = 'none';
          document.getElementById('formSuccess').classList.add('show');
        } else {
          submitError.style.display = 'block';
        }
      }).catch(function () {
        submitError.style.display = 'block';
      }).finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Enviar mensaje';
      });
    });

    ['nombre', 'correo', 'servicio', 'mensaje'].forEach(function (name) {
      var input = form.elements[name];
      var clearError = function () {
        form.querySelector('[data-field="' + name + '"]').classList.remove('invalid');
      };
      input.addEventListener('input', clearError);
      input.addEventListener('change', clearError);
    });
  }

  // ---------- Calendly popup ----------
  var calendlyBtn = document.getElementById('calendlyBtn');
  if (calendlyBtn) {
    calendlyBtn.addEventListener('click', function () {
      if (window.Calendly) {
        Calendly.initPopupWidget({ url: CONFIG.CALENDLY_URL });
      } else {
        window.open(CONFIG.CALENDLY_URL, '_blank', 'noopener');
      }
    });
  }
})();
