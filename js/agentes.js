/* Se obtiene el contenedor de los agentes */
let contenedorAgentes = document.querySelector('.agents');

/* Se recorre el contenedor de los agentes */
for (let i = 0; i < contenedorAgentes.children.length; i++) {
    /* Se le agrega un evento a cada agente para cambiar la imagen */
    contenedorAgentes.children[i].addEventListener('mouseenter', cambiarImagenAgente);

    contenedorAgentes.children[i].addEventListener('mouseleave', volverImagenInicial);
}

let nombreAgente;
let imagenAgente;

function cambiarImagenAgente(e) {
    nombreAgente = e.target.firstElementChild.lastElementChild.firstElementChild.innerText.replace(' ', '');
    imagenAgente = e.target.firstElementChild.firstElementChild;
    imagenAgente.src = `/img/Agentes/${nombreAgente}Volteada.jpg`;
}

function volverImagenInicial(e) {
    nombreAgente = e.target.firstElementChild.lastElementChild.firstElementChild.innerText.replace(' ', '');
    imagenAgente = e.target.firstElementChild.firstElementChild;
    imagenAgente.src = `/img/Agentes/${nombreAgente}.jpg`;
}