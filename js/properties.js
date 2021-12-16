/* SELECTORES */
setTimeout(obtenerPropiedades, 4000)

let propiedades;

function obtenerPropiedades() {
    propiedades = document.querySelectorAll('.property');

    if (document.body.clientWidth < 768) {
        /* Se observa cada propiedad */
        propiedades.forEach(propiedad => {
            propertiesObserver.observe(propiedad);
        })
    } else {
        propiedades.forEach(propiedad => {
            propiedad.addEventListener('mouseenter', animacionZoom);
        })
    }

}


/* Se establecen las opciones del observador */
const options = {
    threshold: 0,
    rootMargin: "0px"
}

/* Se declara el observador de las propiedades */
const propertiesObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
        /* Si la propiedad esta en pantalla */
        if (entry.isIntersecting) {
            /* A la imagen se le pone la animacion */
            entry.target.firstElementChild.firstElementChild.style.animation = 'zoom-image 7s forwards';
            observer.unobserve(entry.target)
        }
    })
}, options);


function animacionZoom(e) {
    e.target.firstElementChild.firstElementChild.style.animation = 'zoom-image 4s forwards';

    setTimeout(() => {
        e.target.firstElementChild.firstElementChild.style.animation = 'quitar-zoom 4s forwards';
    }, 4000);
}
