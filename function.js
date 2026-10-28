
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