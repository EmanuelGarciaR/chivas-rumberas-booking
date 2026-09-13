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


// booking
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
        title: "Tus datos de contacto",
        type: "contact_form"
    },
    {
        title: "Confirmar pago",
        type: "options",
        options: ["Pagar ahora", "Abonar 50%", "Pagar el día del evento", "Ver métodos de pago"]
    }
];

let currentStep = 1;
let bookingData = {};

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
    } else if (stepData.type === 'contact_form') {
        contentHtml = `
            <div class="booking__contact-wrapper">
                <input type="text" class="booking__input-text" id="booking-name" placeholder="Tu nombre completo" required>
                <input type="email" class="booking__input-text" id="booking-email" placeholder="Tu correo electrónico" required>
                <input type="tel" class="booking__input-text" id="booking-phone" placeholder="Tu número de teléfono" required>
                <button type="submit" class="btn btn--primary booking__btn-next">Continuar <i class="fa-solid fa-arrow-right"></i></button>
            </div>
        `;
    } else {
        contentHtml = `
            <div class="booking__options" role="group" aria-label="Opciones">
                ${stepData.options.map(opt => `
                    <button type="button" class="booking__option" onclick="nextStep('${opt}')">
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

window.nextStep = function(answer) {
    if (currentStep === 4) {
        const dateInput = document.getElementById('booking-date');
        if (!dateInput.value) {
            alert('Por favor, selecciona una fecha y hora para continuar.');
            return;
        }
        bookingData[bookingSteps[currentStep - 1].title] = dateInput.value;
    } else if (answer) {
        bookingData[bookingSteps[currentStep - 1].title] = answer;
    }

    if (currentStep === 6) {
        // Enviar el formulario
        const form = document.getElementById('booking-form');
        
        // Agregar campos ocultos con toda la data
        for (const key in bookingData) {
            const hiddenField = document.createElement('input');
            hiddenField.type = 'hidden';
            hiddenField.name = key;
            hiddenField.value = bookingData[key];
            form.appendChild(hiddenField);
        }
        
        // Submit real al endpoint
        form.submit();
        return;
    }

    if (currentStep < 6) {
        currentStep++;
        renderBookingStep(currentStep);
    }
};

window.submitBookingForm = function() {
    if (currentStep === 5) {
        const nameInput = document.getElementById('booking-name');
        const emailInput = document.getElementById('booking-email');
        const phoneInput = document.getElementById('booking-phone');
        
        bookingData["Nombre"] = nameInput.value;
        bookingData["Correo"] = emailInput.value;
        bookingData["Teléfono"] = phoneInput.value;
        
        currentStep++;
        renderBookingStep(currentStep);
    }
};

if(document.querySelector('.booking__step-content')) {
    renderBookingStep(currentStep);
}



// Hamburger Menu Logic
const hamburgerBtn = document.querySelector('.nav__hamburger');
const menuWrapper = document.querySelector('.nav__menu-wrapper');
const hamburgerIcon = hamburgerBtn ? hamburgerBtn.querySelector('i') : null;

if (hamburgerBtn && menuWrapper) {
    hamburgerBtn.addEventListener('click', () => {
        menuWrapper.classList.toggle('nav__menu-wrapper--open');
        const isOpen = menuWrapper.classList.contains('nav__menu-wrapper--open');
        hamburgerBtn.setAttribute('aria-expanded', isOpen);
        
        if (isOpen) {
            hamburgerIcon.classList.remove('fa-bars');
            hamburgerIcon.classList.add('fa-xmark');
            document.body.style.overflow = 'hidden'; // Evita scrollear cuando esta abierto
        } else {
            hamburgerIcon.classList.remove('fa-xmark');
            hamburgerIcon.classList.add('fa-bars');
            document.body.style.overflow = 'auto';
        }
    });

    // Close menu when clicking a link
    const navLinks = menuWrapper.querySelectorAll('.nav__link, .btn, .nav__theme-toggle');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Si es el toggle, que cambie el tema pero no cierre si quieres, o si quieres cerrarlo déjalo.
            // Para el toggle, quizas no queremos cerrar.
            if (!link.classList.contains('nav__theme-toggle')) {
                menuWrapper.classList.remove('nav__menu-wrapper--open');
                hamburgerBtn.setAttribute('aria-expanded', 'false');
                hamburgerIcon.classList.remove('fa-xmark');
                hamburgerIcon.classList.add('fa-bars');
                document.body.style.overflow = 'auto';
            }
        });
    });
}
