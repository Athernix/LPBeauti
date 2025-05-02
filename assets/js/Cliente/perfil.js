// Micro-interacciones
document.querySelectorAll('.payment-method').forEach(item => {
    item.addEventListener('mouseover', () => {
        item.style.transform = 'translateY(-5px) scale(1.05)';
        item.style.boxShadow = '0 8px 24px rgba(122, 92, 255, 0.2)';
    });

    item.addEventListener('mouseout', () => {
        item.style.transform = 'translateY(0) scale(1)';
        item.style.boxShadow = '0 4px 12px rgba(122, 92, 255, 0.15)';
    });
});

// Animación de carga suave
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.querySelector('.profile-card').style.transform = 'translateY(0)';
    document.querySelector('.profile-card').style.opacity = '1';
});

// Transición inicial
document.body.style.opacity = '0';
document.querySelector('.profile-card').style.transform = 'translateY(20px)';
document.querySelector('.profile-card').style.opacity = '0';
document.querySelector('.profile-card').style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';

// Navegación al hacer clic en métodos de pago
document.querySelectorAll('.payment-method').forEach(method => {
    method.addEventListener('click', () => {
        alert(`Has seleccionado el método de pago: ${method.querySelector('span').textContent}`);
    });
});

// Botón de cerrar sesión
const logoutButton = document.getElementById('logout-button');
logoutButton.addEventListener('click', () => {
    alert('Has cerrado sesión.');
    window.location.href = './home.html';
});