/* Selecciona el contenedor principal */
const contenedor = document.querySelector(".contenedor");

/* Obtiene los botones de inicio de sesión y registro por su ID */
const btnSingIn = document.getElementById("btn-sing-in");
const btnSingUp = document.getElementById("btn-sing-up");

/* Evento para cambiar al formulario de inicio de sesión */
btnSingIn.addEventListener("click", () => {
    contenedor.classList.remove("toggle"); // Remueve la clase 'toggle' para mostrar el formulario de inicio de sesión
});

/* Evento para cambiar al formulario de registro */
btnSingUp.addEventListener("click", () => {
    contenedor.classList.add("toggle"); // Agrega la clase 'toggle' para mostrar el formulario de registro
});

/* Función para mostrar mensajes de Django */
function mostrarMensaje(mensaje) {
    window.alert(mensaje);
}

/* Función para validar el formulario de registro */
function validarFormularioRegistro(event) {
    const nombreCompleto = document.querySelector('input[name="registro_username"]').value;
    const palabras = nombreCompleto.trim().split(/\s+/);
    
    if (palabras.length < 3) {
        event.preventDefault();
        window.alert("Por favor ingrese su nombre completo (mínimo 1 nombre y 2 apellido)");
        return false;
    }
    return true;
}

/* Agregar validación al formulario de registro */
document.querySelector('form[name="register_formulario"]').addEventListener('submit', validarFormularioRegistro);

/* Mostrar mensajes de Django cuando la página se carga */
document.addEventListener('DOMContentLoaded', () => {
    if (typeof djangoMessages !== 'undefined' && djangoMessages.length > 0) {
        djangoMessages.forEach(mensaje => {
            if (mensaje) {  // Verificar que el mensaje no esté vacío
                mostrarMensaje(mensaje);
            }
        });
    }
});