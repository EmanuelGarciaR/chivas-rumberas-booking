document.addEventListener("DOMContentLoaded", () => {
    if (typeof gsap === "undefined") return;

    if (typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
    }

    /* ===================================================
       1. NAVBAR ANIMATION (Entrada y Salida al hacer Scroll)
       =================================================== */
    const header = document.querySelector(".header");
    if (header) {
        let lastScrollY = window.scrollY;

        window.addEventListener("scroll", () => {
            const currentScrollY = window.scrollY;
            
            // Ocultar al bajar después de 100px, mostrar al subir
            if (currentScrollY > 100 && currentScrollY > lastScrollY) {
                gsap.to(header, {
                    y: "-100%",
                    duration: 0.4,
                    ease: "power2.out"
                });
            } else {
                gsap.to(header, {
                    y: "0%",
                    duration: 0.4,
                    ease: "power2.out"
                });
            }
            lastScrollY = currentScrollY;
        });
    }

    /* ===================================================
       2. TÍTULO DE LA EMPRESA (Caída desde arriba)
       =================================================== */
    const navTitle = document.querySelector(".nav__title");
    if (navTitle) {
        gsap.from(navTitle, {
            y: -50,
            opacity: 0,
            duration: 1,
            ease: "bounce.out",
            delay: 0.2
        });
    }

    /* ===================================================
       3. PALABRAS CON ÉNFASIS (Letra por letra cayendo una a una)
       =================================================== */
    const enfasisElements = document.querySelectorAll('[class*="--enfasis"], .stats__emphasis, .history-intro__enfasis');
    
    enfasisElements.forEach((el) => {
        // Dividir el texto en letras separadas preservando espacios
        const rawText = el.textContent;
        el.innerHTML = "";
        
        const charSpans = [];
        for (let char of rawText) {
            const span = document.createElement("span");
            span.style.display = "inline-block";
            span.style.opacity = "0"; // Ocultas por completo hasta que inicie la animación
            span.style.fontFamily = "inherit";
            span.style.fontStyle = "inherit";
            span.textContent = char === " " ? "\u00A0" : char;
            el.appendChild(span);
            charSpans.push(span);
        }

        if (typeof ScrollTrigger !== "undefined") {
            gsap.fromTo(charSpans,
                {
                    y: -40,
                    opacity: 0,
                    scale: 0.8
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.4,
                    stagger: 0.04, // Una por una
                    ease: "back.out(2)",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%", // Inicia cuando entra en la pantalla
                        toggleActions: "play none none none" // Corre una vez y se quedan fijas ahí
                    }
                }
            );
        } else {
            gsap.fromTo(charSpans,
                {
                    y: -40,
                    opacity: 0,
                    scale: 0.8
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.4,
                    stagger: 0.04,
                    ease: "back.out(2)"
                }
            );
        }
    });

    /* ===================================================
       4. CONTEO RÁPIDO (+1.000 Parches realizados)
       =================================================== */
    const statsNumber = document.querySelector(".stats__number");
    if (statsNumber) {
        const counter = { val: 0 };
        
        const startCounter = () => {
            gsap.to(counter, {
                val: 1000,
                duration: 1.6,
                ease: "power2.out",
                onUpdate: () => {
                    const formatted = Math.floor(counter.val)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                    statsNumber.textContent = `+${formatted}`;
                }
            });
        };

        if (typeof ScrollTrigger !== "undefined") {
            ScrollTrigger.create({
                trigger: statsNumber,
                start: "top 85%",
                once: true,
                onEnter: startCounter
            });
        } else {
            startCounter();
        }
    }
});
