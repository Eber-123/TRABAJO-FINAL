/* ════════════════════════════════════════════
   Eber Pauccara – Portafolio · script.js
   Funcionalidades:
   1. Navbar scroll effect
   2. Validación del formulario de contacto
   3. Contador de caracteres del textarea
════════════════════════════════════════════ */

/* ── 1. NAVBAR: clase "scrolled" al hacer scroll ── */
(function initNavbar() {
  var navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
})();


/* ── 2. CONTADOR DE CARACTERES DEL MENSAJE ── */
(function initCharCount() {
  var textarea  = document.getElementById('mensaje');
  var charCount = document.getElementById('charCount');
  if (!textarea || !charCount) return;

  textarea.addEventListener('input', function () {
    var len = textarea.value.length;
    charCount.textContent = len + ' / 500';
    if (len >= 480) {
      charCount.style.color = '#e74c3c';
    } else {
      charCount.style.color = '';
    }
  });
})();


/* ── 3. VALIDACIÓN Y ENVÍO DEL FORMULARIO ── */
(function initForm() {

  var form    = document.getElementById('contactForm');
  var success = document.getElementById('formSuccess');
  if (!form) return;

  /* ── Helpers ─────────────────────────────── */
  function getField(id)    { return document.getElementById(id); }
  function getError(field) { return document.getElementById('err-' + field); }

  function setError(fieldId, msg) {
    var input = getField(fieldId);
    var err   = getError(fieldId);
    if (!input || !err) return;
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
    err.textContent = msg;
  }

  function setValid(fieldId) {
    var input = getField(fieldId);
    var err   = getError(fieldId);
    if (!input || !err) return;
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    err.textContent = '';
  }

  function clearState(fieldId) {
    var input = getField(fieldId);
    var err   = getError(fieldId);
    if (!input || !err) return;
    input.classList.remove('is-invalid', 'is-valid');
    err.textContent = '';
  }

  /* ── Reglas de validación ────────────────── */
  function validateNombre(value) {
    var v = value.trim();
    if (!v)          return 'El nombre es obligatorio.';
    if (v.length < 2) return 'El nombre debe tener al menos 2 caracteres.';
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s'-]+$/.test(v))
                     return 'El nombre solo puede contener letras y espacios.';
    return '';
  }

  function validateCorreo(value) {
    var v = value.trim();
    if (!v) return 'El correo es obligatorio.';
    /* Expresión regular estándar para email */
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v))
      return 'Ingresa un correo electrónico válido (ej: tu@correo.com).';
    return '';
  }

  function validateTelefono(value) {
    var v = value.trim();
    if (!v) return 'El teléfono es obligatorio.';
    /* Acepta formatos: +51 999 999 999 / 999999999 / (01) 123-4567 */
    var digits = v.replace(/[\s\-().+]/g, '');
    if (!/^\d{7,15}$/.test(digits))
      return 'Ingresa un número de teléfono válido (7 a 15 dígitos).';
    return '';
  }

  function validateMensaje(value) {
    var v = value.trim();
    if (!v)          return 'El mensaje es obligatorio.';
    if (v.length < 10) return 'El mensaje debe tener al menos 10 caracteres.';
    if (v.length > 500) return 'El mensaje no puede superar las 500 letras.';
    return '';
  }

  /* ── Mapa de validadores ─────────────────── */
  var validators = {
    nombre:   validateNombre,
    correo:   validateCorreo,
    telefono: validateTelefono,
    mensaje:  validateMensaje
  };

  /* ── Validación en tiempo real (blur) ────── */
  ['nombre', 'correo', 'telefono', 'mensaje'].forEach(function (fieldId) {
    var input = getField(fieldId);
    if (!input) return;

    input.addEventListener('blur', function () {
      var err = validators[fieldId](input.value);
      if (err) {
        setError(fieldId, err);
      } else {
        setValid(fieldId);
      }
    });

    input.addEventListener('input', function () {
      /* Limpia el estado mientras el usuario corrige */
      if (input.classList.contains('is-invalid')) {
        var err = validators[fieldId](input.value);
        if (!err) setValid(fieldId);
        else getError(fieldId).textContent = err;
      }
    });
  });

  /* ── Envío del formulario ────────────────── */
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var valid = true;

    /* Validar todos los campos al enviar */
    ['nombre', 'correo', 'telefono', 'mensaje'].forEach(function (fieldId) {
      var input = getField(fieldId);
      if (!input) return;
      var err = validators[fieldId](input.value);
      if (err) {
        setError(fieldId, err);
        valid = false;
      } else {
        setValid(fieldId);
      }
    });

    if (!valid) {
      /* Hacer scroll al primer campo con error */
      var firstInvalid = form.querySelector('.is-invalid');
      if (firstInvalid) {
        firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstInvalid.focus();
      }
      return;
    }

    /* ── Todo válido: mostrar mensaje de éxito ── */
    form.reset();
    ['nombre', 'correo', 'telefono', 'mensaje'].forEach(clearState);
    document.getElementById('charCount').textContent = '0 / 500';

    if (success) {
      success.classList.add('visible');
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });

      /* Ocultar el mensaje de éxito después de 6 segundos */
      setTimeout(function () {
        success.classList.remove('visible');
      }, 6000);
    }
  });

})();