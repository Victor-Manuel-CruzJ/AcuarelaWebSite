document.addEventListener("DOMContentLoaded", () => {
  // 1. CARGA DE LOTTIES
  const loadAnim = (id, path) => {
    const container = document.getElementById(id);
    if (!container) return;
    const anim = lottie.loadAnimation({
      container: container,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: path,
    });
  };

  // Ajusta las rutas a tus archivos JSON reales
  loadAnim(
    "lottie-girl-book",
    "Resources/json/2438 [Convertido]_Nina Hola.json"
  );
  loadAnim(
    "lottie-upside-down",
    "Resources/json/2438 [Convertido]_Nina Libro.json"
  );
  loadAnim(
    "lottie-boy-balloons",
    "Resources/json/2438 [Convertido]_Nino Globo.json"
  );
  loadAnim(
    "lottie-girl-hands-up",
    "Resources/json/2438 [Convertido]_Nino Pirueta.json"
  );

  // 2. EFECTO REVEAL (Aparición al bajar)
  const reveal = () => {
    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach((el) => {
      const windowHeight = window.innerHeight;
      const elementTop = el.getBoundingClientRect().top;
      const elementVisible = 150;
      if (elementTop < windowHeight - elementVisible) {
        el.classList.add("active");
      }
    });
  };
  window.addEventListener("scroll", reveal);
  reveal();

  // 3. RASTRO DE PINTURA DINÁMICO
  const colors = ["#ff595e", "#1982c4", "#ffca3a", "#8ac926"];
  document.addEventListener("mousemove", (e) => {
    if (Math.random() > 0.35) return;
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
      drop.style.transform = "scale(3.5)";
      drop.style.opacity = "0";
    }, 20);
    setTimeout(() => drop.remove(), 1000);
  });
});
