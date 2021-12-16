let categorias;
let agentes;
let proyectos;

setTimeout(() => {

    /* SELECTORES */
    categorias = document.querySelectorAll('.category');
    agentes = document.querySelectorAll('.agent');
    proyectos = document.querySelectorAll('.project');

    categorias.forEach(categoria => {
        categoria.style.opacity = '0';
        unvanishObserver.observe(categoria);
    });

    agentes.forEach(agente => {
        agente.style.opacity = '0';
        unvanishObserver.observe(agente);
    });

    proyectos.forEach(proyecto => {
        proyecto.style.opacity = '0';
        unvanishObserver.observe(proyecto);
    });

}, 4000)




const unvanishObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'unvanish 2s forwards';
            observer.unobserve(entry.target)
        }
    });
}, options);