document.addEventListener('DOMContentLoaded', () => {
  const main       = document.querySelector('main');
  const modal      = document.getElementById('reserva-form');
  const form       = document.getElementById('formulario-reserva');
  const titulo     = document.getElementById('reserva-titulo');
  const desc       = document.getElementById('reserva-desc');
  const inputServ  = document.getElementById('input-servicio');
  const precioEl   = document.getElementById('reserva-precio');
  const btnCancel  = modal.querySelector('.btn-cancelar');

  // Mapa de precios
  const precios = {
    "Manicure": 25000,
    "Pedicure": 30000,
    "Uñas de gel": 45000,
    "Uñas esculpidas": 50000,
    "Tratamiento facial": 60000
  };

  if (![main, modal, form, titulo, desc, inputServ, precioEl, btnCancel].every(el => el)) {
    console.error('Faltan elementos en el DOM.');
    return;
  }

  main.addEventListener('click', e => {
    const item = e.target.closest('.catalog-item');
    if (!item) return;
    e.preventDefault();

    const nombre = item.querySelector('.catalog-title')?.textContent.trim() || 'Servicio';
    const descripcion = item.querySelector('.catalog-description')?.textContent.trim() || '';

    // Rellenar título y descripción
    titulo.textContent = `Reservar: ${nombre}`;
    desc.textContent   = descripcion;
    inputServ.value    = nombre;

    // Mostrar precio (o aviso si no existe)
    if (precios[nombre] != null) {
      precioEl.textContent = `Precio: $${precios[nombre].toLocaleString()}`;
    } else {
      precioEl.textContent = 'Precio: Consultar';
    }

    form.reset();
    modal.style.display = 'flex';
  });

  btnCancel.addEventListener('click', () => {
    modal.style.display = 'none';
    form.reset();
  });
  modal.addEventListener('click', e => {
    if (e.target === modal) {
      modal.style.display = 'none';
      form.reset();
    }
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const datos = {
      servicio: inputServ.value,
      fecha:    form.elements['fecha'].value,
      hora:     form.elements['hora'].value,
      duracion: form.elements['duracion'].value,
      precio:   precios[inputServ.value] || null
    };
    console.log('Reservando cita:', datos);
    alert(`Cita para "${datos.servicio}" el ${datos.fecha} a las ${datos.hora}.\nPrecio: ${datos.precio ? '$'+datos.precio.toLocaleString() : 'Consultar'}`);
    modal.style.display = 'none';
    form.reset();
  });
});
