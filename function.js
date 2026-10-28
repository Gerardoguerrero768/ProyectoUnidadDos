
const formulario = document.querySelector('#formulario');
const mensajeForm = document.querySelector('#mensajeForm');
const errorTipo = document.querySelector('#errorTipo');

const nombre = document.querySelector('#nombre');
const correo = document.querySelector('#correo');
const nivel = document.querySelector('#nivel');
const mensaje = document.querySelector('#mensaje');
const acepto = document.querySelector('#acepto');
const radios = document.querySelectorAll('input[name="tipo"]');

function validarCampo(campo) {
    let esValido = campo.checkValidity();

    if (campo === nombre && campo.value.trim().length < 3) esValido = false;
    if (campo === mensaje && campo.value.trim().length < 10) esValido = false;

    campo.classList.toggle('is-invalid', !esValido);
    campo.classList.toggle('is-valid', esValido);
    return esValido;
}

function validarTipo() {
    const elegido = document.querySelector('input[name="tipo"]:checked');
    errorTipo.classList.toggle('d-none', elegido !== null);
    return elegido !== null;
}

[nombre, correo, nivel, mensaje].forEach(campo => {
    campo.addEventListener('blur', () => validarCampo(campo));
    campo.addEventListener('input', () => {
        if (campo.classList.contains('is-invalid')) validarCampo(campo);
    });
});
nivel.addEventListener('change', () => validarCampo(nivel));
acepto.addEventListener('change', () => validarCampo(acepto));
radios.forEach(r => r.addEventListener('change', validarTipo));

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const resultados = [
        validarCampo(nombre),
        validarCampo(correo),
        validarCampo(nivel),
        validarCampo(mensaje),
        validarCampo(acepto),
        validarTipo()
    ];

    if (resultados.includes(false)) {
        mensajeForm.className = 'alert alert-danger';
        mensajeForm.textContent = 'Revisa los campos marcados en rojo.';
        Swal.fire({
            icon: 'error',
            title: 'Faltan datos',
            text: 'Corrige los campos marcados e inténtalo de nuevo.',
            confirmButtonColor: '#5a820a'
        });
        return;
    }

    const tipo = document.querySelector('input[name="tipo"]:checked').value;


    try {
        localStorage.setItem('ultimoContacto', JSON.stringify({
            nombre: nombre.value.trim(),
            nivel: nivel.value,
            tipo: tipo
        }));
    } catch (error) {
    }

    mensajeForm.className = 'alert alert-success';
    mensajeForm.textContent = `¡Gracias, ${nombre.value.trim()}! Recibimos tu mensaje sobre ${tipo}.`;

    Swal.fire({
        icon: 'success',
        title: '¡Mensaje enviado!',
        text: `Gracias, ${nombre.value.trim()}. Te contactaremos pronto.`,
        confirmButtonColor: '#5a820a'
    });

    formulario.reset();
    document.querySelectorAll('.is-valid, .is-invalid').forEach(el => {
        el.classList.remove('is-valid', 'is-invalid');
    });
    errorTipo.classList.add('d-none');
});