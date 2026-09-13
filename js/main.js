const chivasData = [
    {
        image: "../assets/images/chivas/chiva-15.jpg",
        alt: "Chiva rumbera tradicional en Medellín",
    },
    {
        image: "../assets/images/chivas/chiva-3.jpg",
        alt: "Chiva para turismo y fiestas privadas",
    },
    {
        image: "../assets/images/chivas/chiva-8.jpg",
        alt: "Chiva familiar para paseos",
    },
    {
        image: "../assets/images/chivas/chiva-16.jpg",
        alt: "Chiva VIP fiesta nocturna",
    },
    {
        image: "../assets/images/chivas/chiva-5.jpg",
        alt: "Chiva para eventos y celebraciones",
    },
    {
        image: "../assets/images/chivas/chiva-10.jpg",
        alt: "Chiva con música en vivo",
    }
];

const gallery = document.querySelector('.chivas__gallery');

function renderGallery(data) {
    gallery.innerHTML = ''; 

    data.forEach(item => {
        const cardHTML = `
            <article class="chiva-card">
                <div class="chiva-card__header">
                    <img class="chiva-card__image" src="${item.image}" alt="${item.alt}">
                </div>
                <a href="#reserva" class="link link--secondary">Reservar ahora</a>
            </article>
        `;
        
        gallery.insertAdjacentHTML('beforeend', cardHTML);
    });
}
renderGallery(chivasData);

//Fondo oscuro y claro
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.documentElement;
const themeIcon = themeToggleBtn.querySelector('i');

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    updateIcon(savedTheme);
}

themeToggleBtn.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateIcon(newTheme);
});

function updateIcon(theme) {
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}


// bookin
const bookingSteps = [
    {
        title: "¿Qué vamos a celebrar?",
        type: "options",
        options: ["Cumpleaños", "Despedida", "Tour por Medellín", "Corporativo"]
    },
    {
        title: "¿Cuántas personas van a ir?",
        type: "options",
        options: ["10 - 20 personas", "20 - 30 personas", "30 - 40 personas", "Más de 40 personas"]
    },
    {
        title: "Escoge tu chiva",
        type: "options",
        options: ["Chiva La Perla", "Chiva La Coqueta"]
    },
    {
        title: "¿Cuándo es el recorrido?",
        type: "datetime"
    },
    {
        title: "¿A quién contactamos?",
        type: "options",
        options: ["Completar mis datos", "Usar mi perfil", "Llamarme mañana", "Escribirme por WhatsApp"]
    },
    {
        title: "Confirmar pago",
        type: "options",
        options: ["Pagar ahora", "Abonar 50%", "Pagar el día del evento", "Ver métodos de pago"]
    }
];

let currentStep = 1;

function renderBookingStep(step) {
    const stepContent = document.querySelector('.booking__step-content');
    if (!stepContent) return;
    
    const stepData = bookingSteps[step - 1];
    
    let contentHtml = '';
    
    if (stepData.type === 'datetime') {
        contentHtml = `
            <div class="booking__datetime-wrapper">
                <input type="datetime-local" class="booking__input-datetime" id="booking-date" required>
                <button type="button" class="btn btn--primary booking__btn-next" onclick="nextStep()">Continuar <i class="fa-solid fa-arrow-right"></i></button>
            </div>
        `;
    } else {
        contentHtml = `
            <div class="booking__options" role="group" aria-label="Opciones">
                ${stepData.options.map(opt => `
                    <button type="button" class="booking__option" onclick="nextStep()">
                        <span>${opt}</span>
                        <i class="fa-solid fa-arrow-up-right-from-square option-icon" aria-hidden="true"></i>
                    </button>
                `).join('')}
            </div>
        `;
    }
    
    stepContent.innerHTML = `
        <p class="booking__step-indicator">PASO 0${step} / 06</p>
        <h3 id="step-question" class="booking__question">${stepData.title}</h3>
        ${contentHtml}
    `;

    const steps = document.querySelectorAll('.booking__step');
    steps.forEach((el, index) => {
        if (index + 1 === step) {
            el.classList.add('booking__step--active');
            el.innerHTML = '<img src="assets/icons/logo-chiva-ia.svg" alt="Paso actual" class="booking__step-icon">';
        } else if (index + 1 < step) {
            el.classList.remove('booking__step--active');
            el.innerHTML = 'V';
            el.style.backgroundColor = 'var(--text-accent)';
            el.style.color = 'var(--bg-primary)';
            el.style.borderColor = 'var(--text-accent)';
        } else {
            el.classList.remove('booking__step--active');
            el.innerHTML = index + 1;
            el.style.backgroundColor = 'var(--bg-primary)';
            el.style.color = 'var(--text-secondary)';
            el.style.borderColor = 'var(--border-color)';
        }
    });

    const line = document.querySelector('.booking__line');
    if (line) {
        line.style.width = `${((step - 1) / 5) * 100}%`;
    }
}

window.nextStep = function() {
    if (currentStep === 4) {
        const dateInput = document.getElementById('booking-date');
        if (!dateInput.value) {
            alert('Por favor, selecciona una fecha y hora para continuar.');
            return;
        }
    }

    if (currentStep < 6) {
        currentStep++;
        renderBookingStep(currentStep);
    } else {
        alert("¡Formulario completado! (Simulación visual)");
        currentStep = 1;
        renderBookingStep(currentStep);
    }
};

if(document.querySelector('.booking__step-content')) {
    renderBookingStep(currentStep);
}
