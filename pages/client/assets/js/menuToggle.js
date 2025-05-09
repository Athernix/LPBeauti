document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.querySelector(".mobile-menu-toggle");
    const sidebar = document.querySelector(".sidebar");

    toggleButton.addEventListener("click", () => {
        sidebar.classList.toggle("active"); // Mostrar u ocultar el menú
    });

    // Cerrar el menú al hacer clic fuera de él
    document.addEventListener("click", (event) => {
        if (!sidebar.contains(event.target) && !toggleButton.contains(event.target)) {
            sidebar.classList.remove("active");
        }
    });
});
