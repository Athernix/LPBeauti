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