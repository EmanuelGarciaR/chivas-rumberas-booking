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