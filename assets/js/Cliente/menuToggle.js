// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Ocultar elementos del menú si el usuario no está autenticado
    if (!isUserLoggedIn()) {
        document.getElementById('menu-profile').style.display = 'none';
        document.getElementById('menu-calendar').style.display = 'none';
        document.getElementById('menu-payments').style.display = 'none';
        document.getElementById('menu-settings').style.display = 'none';
    }

    // Variables para la barra lateral y el menú
    const sidebar = document.querySelector('.sidebar');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const menuItems = document.querySelectorAll('.menu-item');
    
    let isCollapsed = false;
    let isMobile = window.innerWidth <= 768;
    let hoverTimeout;

    // Función para alternar el estado de la barra lateral
    const toggleSidebarState = (collapse) => {
        const finalWidth = collapse ? '60px' : '250px';
        sidebar.style.width = finalWidth;
        
        menuItems.forEach(item => {
            const text = item.querySelector('.menu-text');
            if (text) {
                text.style.opacity = collapse ? '0' : '1';
                text.style.pointerEvents = collapse ? 'none' : 'all';
            }
        });

        const icon = menuToggle.querySelector('i');
        if (icon) {
            icon.style.transform = collapse ? 'rotate(180deg)' : 'rotate(0deg)';
        }
    };

    // Manejar el hover en la barra lateral
    const handleHover = (hovering) => {
        if (!isMobile && isCollapsed) {
            clearTimeout(hoverTimeout);
            hoverTimeout = setTimeout(() => {
                sidebar.style.width = hovering ? '250px' : '60px';
                menuItems.forEach(item => {
                    const text = item.querySelector('.menu-text');
                    if (text) {
                        text.style.opacity = hovering ? '1' : '0';
                        text.style.transitionDelay = hovering ? '0.1s' : '0s';
                    }
                });
            }, hovering ? 0 : 200);
        }
    };

    // Evento para alternar el menú en dispositivos móviles
    menuToggle.addEventListener('click', () => {
        if (isMobile) {
            sidebar.classList.toggle('active');
            document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : 'auto';
        } else {
            isCollapsed = !isCollapsed;
            toggleSidebarState(isCollapsed);
        }
    });

    // Eventos para hover en la barra lateral
    sidebar.addEventListener('mouseenter', () => handleHover(true));
    sidebar.addEventListener('mouseleave', () => handleHover(false));

    // Evento para manejar el cambio de tamaño de la ventana
    window.addEventListener('resize', () => {
        isMobile = window.innerWidth <= 768;
        if (!isMobile) {
            sidebar.classList.remove('active');
            document.body.style.overflow = 'auto';
            toggleSidebarState(isCollapsed);
        } else {
            sidebar.style.width = '250px';
        }
    });
});