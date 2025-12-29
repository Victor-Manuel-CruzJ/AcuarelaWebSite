document.addEventListener("DOMContentLoaded", () => {
  // 1. FUNCIÓN PARA CARGAR LOTTIES (Sin bucle infinito)
  const loadAnim = (id, path) => {
    const container = document.getElementById(id);
    if (!container) return null;

    return lottie.loadAnimation({
      container: container,
      renderer: "svg",
      loop: false, // CAMBIO: Ahora solo se reproduce una vez
      autoplay: false, // CAMBIO: No empieza hasta que lo veamos
      path: path,
    });
  };

  // Guardamos las instancias de las animaciones
  const anims = {
    girlBook: loadAnim(
      "lottie-girl-book",
      "Resources/json/2438 [Convertido]_Nina Hola.json"
    ),
    upsideDown: loadAnim(
      "lottie-upside-down",
      "Resources/json/2438 [Convertido]_Nina Libro.json"
    ),
    boyBalloons: loadAnim(
      "lottie-boy-balloons",
      "Resources/json/2438 [Convertido]_Nino Globo.json"
    ),
    girlHandsUp: loadAnim(
      "lottie-girl-hands-up",
      "Resources/json/2438 [Convertido]_Nino Pirueta.json"
    ),
  };

  // 2. EFECTO REVEAL + DISPARADOR DE LOTTIE (Solo 1 vez)
  const observerOptions = {
    threshold: 0.2,
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Animamos el contenedor (texto/cards)
        entry.target.classList.add("active");

        // Buscamos si este contenedor tiene un Lottie adentro y lo disparamos
        const lottieId = entry.target.querySelector('[id^="lottie"]')?.id;
        if (lottieId) {
          // Buscamos la animación correspondiente en nuestro objeto anims y le damos Play
          Object.keys(anims).forEach((key) => {
            if (anims[key] && anims[key].wrapper.id === lottieId) {
              anims[key].play();
            }
          });
        }

        // Dejamos de observar para que no se repita
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observamos todos los elementos con .reveal
  const reveals = document.querySelectorAll(".reveal");
  reveals.forEach((el) => {
    revealObserver.observe(el);
  });

  // 3. RASTRO DE PINTURA DINÁMICO (Sin cambios)
  const colors = ["#ff595e", "#1982c4", "#ffca3a", "#8ac926"];
  document.addEventListener("mousemove", (e) => {
    if (Math.random() > 0.45) return;
    const drop = document.createElement("div");
    drop.style.cssText = `
            position: absolute; width: 20px; height: 20px; border-radius: 50%;
            pointer-events: none; z-index: 9999; opacity: 0.6;
            left: ${e.pageX}px; top: ${e.pageY}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            transition: 1s; transform: scale(1);
        `;
    document.body.appendChild(drop);
    setTimeout(() => {
      drop.style.transform = "scale(6.5)";
      drop.style.opacity = "0";
    }, 20);
    setTimeout(() => drop.remove(), 1000);
  });
});
