/* =========================================================
   MAMAMICHE | JavaScript
   Hace una sola cosa: que las tarjetas y secciones aparezcan
   poco a poco cuando entran en pantalla al hacer scroll.
   ========================================================= */

// Todos los elementos que tienen la clase "revelar" en el HTML
const elementos = document.querySelectorAll('.revelar');

// IntersectionObserver avisa cuando un elemento entra en la pantalla.
// Si el navegador es muy viejo y no lo tiene, mostramos todo de una vez.
if ('IntersectionObserver' in window) {
  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          // La clase "visible" activa la animación que está en style.css
          entrada.target.classList.add('visible');
          // Ya apareció: dejamos de vigilarlo para que no se repita
          observador.unobserve(entrada.target);
        }
      });
    },
    // 0.15 = se activa cuando se ve el 15% del elemento
    { threshold: 0.15 }
  );

  elementos.forEach((elemento) => {
    // Pequeño retraso escalonado: las tarjetas de una misma fila
    // aparecen una después de otra y no todas al mismo tiempo.
    const posicion = Array.from(elemento.parentElement.children).indexOf(elemento);
    elemento.style.transitionDelay = (posicion % 3) * 90 + 'ms';

    observador.observe(elemento);
  });
} else {
  elementos.forEach((elemento) => elemento.classList.add('visible'));
}
