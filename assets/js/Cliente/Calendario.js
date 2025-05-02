class ModernCalendar {
  constructor() {
    // Se inicializa la fecha actual usando moment.js
    this.currentDate = moment();
    // Se guarda la fecha de hoy para resaltar el día actual
    this.today = moment();
    // Objeto que almacenará los eventos obtenidos desde la base de datos
    this.events = {};
    // Referencias a los elementos del DOM para el calendario
    this.calendarGrid = document.getElementById('calendarGrid');
    this.monthHeader = document.getElementById('monthHeader');
    // Se inicializa el calendario, primero obteniendo los eventos y luego renderizando
    this.init();
  }

  // Método de inicialización asíncrono para poder esperar la respuesta del fetch
  async init() {
    // Obtiene los eventos desde la base de datos
    await this.fetchEvents();
    // Renderiza el calendario
    this.renderCalendar();
    // Configura los listeners para la navegación (mes anterior, siguiente, hoy)
    this.attachNavigationListeners();
  }

  // Método asíncrono para obtener los eventos desde la API / base de datos
  async fetchEvents() {
    try {
      // Realiza una petición a la API (debes tener configurado el endpoint correspondiente)
      const response = await fetch('/api/events');
      if (!response.ok) {
        throw new Error('Error en la respuesta de la red');
      }
      // Se espera un objeto JSON que contenga los eventos, indexados por fecha (YYYY-MM-DD)
      this.events = await response.json();
    } catch (error) {
      console.error('Error obteniendo los eventos:', error);
    }
  }

  // Método para renderizar el calendario
  renderCalendar() {
    // Se limpia el contenedor del calendario
    this.calendarGrid.innerHTML = '';
    // Se actualiza el encabezado con el mes y año actuales
    this.monthHeader.textContent = this.currentDate.format('MMMM YYYY');

    // Se determina el inicio y fin del calendario para incluir días de semanas parciales
    const startCalendar = this.currentDate.clone().startOf('month').startOf('week');
    const endCalendar = this.currentDate.clone().endOf('month').endOf('week');
    // Se crea un iterador de fecha sin modificar el valor original
    let dayIterator = startCalendar.clone();

    // Se itera mientras la fecha actual del iterador sea anterior al final del calendario
    while (dayIterator.isBefore(endCalendar, 'day')) {
      // Crea una fila para la semana
      const weekRow = document.createElement('div');
      weekRow.classList.add('calendar-week');

      // Se recorre 7 días para formar la semana
      for (let i = 0; i < 7; i++) {
        const dayElement = this.createDayElement(dayIterator);
        weekRow.appendChild(dayElement);
        // Avanza un día
        dayIterator.add(1, 'day');
      }

      // Se añade la fila de la semana al contenedor del calendario
      this.calendarGrid.appendChild(weekRow);
    }
  }

  // Crea el elemento HTML para un día específico
  createDayElement(day) {
    const dayElement = document.createElement('div');
    dayElement.classList.add('calendar-day');
    
    // Se marca el día si no pertenece al mes actual
    if (!day.isSame(this.currentDate, 'month')) {
      dayElement.classList.add('other-month');
    }
    // Se marca el día si es el día actual
    if (day.isSame(this.today, 'day')) {
      dayElement.classList.add('current-day');
    }

    // Creación del encabezado del día
    const dayHeader = document.createElement('div');
    dayHeader.classList.add('day-header');

    const dayNumber = document.createElement('span');
    dayNumber.classList.add('day-number');
    dayNumber.textContent = day.format('D');

    const dayWeekName = document.createElement('span');
    dayWeekName.classList.add('day-weekname');
    dayWeekName.textContent = day.format('ddd');

    dayHeader.appendChild(dayNumber);
    dayHeader.appendChild(dayWeekName);

    // Contenedor para mostrar los eventos del día
    const eventsContainer = document.createElement('div');
    eventsContainer.classList.add('day-events');
    
    // Se forma la clave de fecha (por ejemplo, "2025-04-05")
    const dateKey = day.format('YYYY-MM-DD');
    // Si existen eventos para esta fecha, se renderizan en el contenedor
    if (this.events[dateKey]) {
      this.events[dateKey].forEach((eventText) => {
        const eventItem = document.createElement('div');
        eventItem.classList.add('event-item');
        eventItem.textContent = eventText;
        eventsContainer.appendChild(eventItem);
      });
    }
    dayElement.appendChild(dayHeader);
    dayElement.appendChild(eventsContainer);

    return dayElement;
  }

  // Agrega los listeners para los botones de navegación
  attachNavigationListeners() {
    // Botón para ir al mes anterior
    document.getElementById('prevMonth').addEventListener('click', async () => {
      this.currentDate.subtract(1, 'month');
      await this.fetchEvents(); // Se vuelve a obtener los eventos para el nuevo mes
      this.renderCalendar();
    });

    // Botón para ir al mes siguiente
    document.getElementById('nextMonth').addEventListener('click', async () => {
      this.currentDate.add(1, 'month');
      await this.fetchEvents();
      this.renderCalendar();
    });

    // Botón para regresar al mes actual (hoy)
    document.getElementById('todayBtn').addEventListener('click', async () => {
      this.currentDate = moment();
      await this.fetchEvents();
      this.renderCalendar();
    });
  }
}

// Se inicializa el calendario una vez que el DOM se ha cargado
document.addEventListener('DOMContentLoaded', () => {
  new ModernCalendar();
});

document.addEventListener("DOMContentLoaded", () => {
    const monthHeader = document.getElementById("monthHeader");
    const calendarGrid = document.getElementById("calendarGrid");
    const todayBtn = document.getElementById("todayBtn");
    const prevMonthBtn = document.getElementById("prevMonth");
    const nextMonthBtn = document.getElementById("nextMonth");
    const viewButtons = document.querySelectorAll(".view-button");
    const monthDropdownBtn = document.getElementById("monthDropdownBtn");
    const monthList = document.getElementById("monthList");
    const currentMonthText = document.getElementById("currentMonthText");

    let currentDate = moment(); // Use moment.js to manage dates

    // Generate month list dynamically
    function generateMonthList() {
        const months = moment.months(); // Get all month names
        months.forEach((month, index) => {
            const monthItem = document.createElement("li");
            monthItem.textContent = month;
            monthItem.dataset.monthIndex = index; // Store the month index
            monthItem.addEventListener("click", () => {
                currentDate.month(index); // Set the selected month
                currentMonthText.textContent = month; // Update the dropdown button text
                renderCalendar(); // Re-render the calendar
            });
            monthList.appendChild(monthItem);
        });
    }

    // Render the calendar grid
    function renderCalendar() {
        calendarGrid.innerHTML = ""; // Clear the grid
        const startOfMonth = currentDate.clone().startOf("month");
        const endOfMonth = currentDate.clone().endOf("month");
        const startOfWeek = startOfMonth.clone().startOf("week");
        const endOfWeek = endOfMonth.clone().endOf("week");

        monthHeader.textContent = currentDate.format("MMMM YYYY");
        currentMonthText.textContent = currentDate.format("MMMM"); // Update dropdown button text

        let day = startOfWeek.clone();
        while (day.isBefore(endOfWeek, "day")) {
            const dayElement = document.createElement("div");
            dayElement.classList.add("calendar-day");
            if (day.isSame(moment(), "day")) {
                dayElement.classList.add("current-day");
            } else if (!day.isSame(currentDate, "month")) {
                dayElement.classList.add("other-month");
            }

            // Day header
            const dayHeader = document.createElement("div");
            dayHeader.classList.add("day-header");
            dayHeader.innerHTML = `
                <span class="day-number">${day.date()}</span>
                <span class="day-weekname">${day.format("ddd")}</span>
            `;
            dayElement.appendChild(dayHeader);

            // Placeholder for events
            const dayEvents = document.createElement("div");
            dayEvents.classList.add("day-events");
            dayEvents.textContent = "Sin eventos"; // Placeholder text
            dayElement.appendChild(dayEvents);

            calendarGrid.appendChild(dayElement);
            day.add(1, "day");
        }
    }

    // Event listeners for navigation buttons
    todayBtn.addEventListener("click", () => {
        currentDate = moment(); // Reset to today
        renderCalendar();
    });

    prevMonthBtn.addEventListener("click", () => {
        currentDate.subtract(1, "month"); // Go to the previous month
        renderCalendar();
    });

    nextMonthBtn.addEventListener("click", () => {
        currentDate.add(1, "month"); // Go to the next month
        renderCalendar();
    });

    // Event listeners for view options
    viewButtons.forEach(button => {
        button.addEventListener("click", () => {
            viewButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const view = button.textContent.toLowerCase();
            if (view === "día") {
                renderDayView();
            } else if (view === "semana") {
                renderWeekView();
            } else if (view === "mes") {
                renderCalendar();
            }
        });
    });

    // Render day view
    function renderDayView() {
        calendarGrid.innerHTML = ""; // Clear the grid
        const dayElement = document.createElement("div");
        dayElement.classList.add("calendar-day", "current-day");
        dayElement.innerHTML = `
            <div class="day-header">
                <span class="day-number">${currentDate.date()}</span>
                <span class="day-weekname">${currentDate.format("dddd")}</span>
            </div>
            <div class="day-events">
                <p>Sin eventos para hoy</p>
            </div>
        `;
        calendarGrid.appendChild(dayElement);
    }

    // Render week view
    function renderWeekView() {
        calendarGrid.innerHTML = ""; // Clear the grid
        const startOfWeek = currentDate.clone().startOf("week");
        const endOfWeek = currentDate.clone().endOf("week");

        let day = startOfWeek.clone();
        while (day.isBefore(endOfWeek, "day")) {
            const dayElement = document.createElement("div");
            dayElement.classList.add("calendar-day");
            if (day.isSame(moment(), "day")) {
                dayElement.classList.add("current-day");
            }

            dayElement.innerHTML = `
                <div class="day-header">
                    <span class="day-number">${day.date()}</span>
                    <span class="day-weekname">${day.format("ddd")}</span>
                </div>
                <div class="day-events">
                    <p>Sin eventos</p>
                </div>
            `;
            calendarGrid.appendChild(dayElement);
            day.add(1, "day");
        }
    }

    // Initial render
    generateMonthList(); // Populate the month dropdown
    renderCalendar();
});
