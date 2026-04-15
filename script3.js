// Esperar a que el HTML cargue completamente
document.addEventListener('DOMContentLoaded', () => {
    
    let counter = 0;
    const cartBadge = document.getElementById('cart-count');
    const buttons = document.querySelectorAll('.add-to-cart');

    // Simulación de agregar al carrito
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            counter++;
            cartBadge.innerText = counter;
            
            // Animación simple de feedback
            button.innerText = "¡Añadido!";
            button.style.backgroundColor = "#28a745";
            
            setTimeout(() => {
                button.innerText = "Añadir al Carrito";
                button.style.backgroundColor = "#000";
            }, 1000);
        });
    });

    // Efecto de scroll en el header
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.padding = "10px 0";
            header.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
        } else {
            header.style.padding = "20px 0";
            header.style.boxShadow = "none";
        }
    });
});