// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
    // Seleccionar botones y estados de autenticación
    const loginButton = document.querySelector(".btn-login");
    const logoutButton = document.querySelector(".btn-logout");
    const loggedOutState = document.querySelector(".auth-state.logged-out");
    const loggedInState = document.querySelector(".auth-state.logged-in");

    // Evento para iniciar sesión
    loginButton.addEventListener("click", () => {
        // Simular autenticación del usuario
        localStorage.setItem('userToken', 'dummyToken'); // Guardar token simulado
        updateAuthUI(true);
    });

    // Evento para cerrar sesión
    logoutButton.addEventListener("click", () => {
        // Eliminar token de autenticación
        localStorage.removeItem('userToken');
        updateAuthUI(false);
    });

    // Actualizar la interfaz de usuario según el estado de autenticación
    function updateAuthUI(isLoggedIn) {
        loggedOutState.style.display = isLoggedIn ? "none" : "flex";
        loggedInState.style.display = isLoggedIn ? "flex" : "none";
    }

    // Inicializar la interfaz de usuario
    updateAuthUI(isUserLoggedIn());
});

// Función para verificar si el usuario está autenticado
function isUserLoggedIn() {
    return !!localStorage.getItem('userToken');
}
