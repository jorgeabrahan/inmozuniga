/* SELECTORES */
openIcon = document.querySelector(".open-icon");
closeIcon = document.querySelector(".close-icon");
menu = document.querySelector(".menu");

/* Se obtiene la flecha para abrir el menu */
let flechaAbrirMenu = document.querySelector('#flechaAbrirMenu');
flechaAbrirMenu.addEventListener("click", openMenu);

if (document.body.clientWidth > 768) {
    flechaAbrirMenu.style.display = "none";
}

window.addEventListener("resize", () => {
    if (document.body.clientWidth > 768) {
        flechaAbrirMenu.style.display = "none";
    } else {
        flechaAbrirMenu.style.display = "block";
    }
})


/* EVENTOS */
openIcon.addEventListener("click", openMenu);
closeIcon.addEventListener("click", closeMenu);



/* FUNCIONES */
function openMenu() {
    menu.style.transform = "translateX(0)";
}

function closeMenu() {
    menu.style.transform = "translateX(-100%)";

}


/* Se obtiene la imagen del navbar */
let imagenNavbar = document.querySelector('.navbar__img');
imagenNavbar.style.cursor = 'pointer';

imagenNavbar.addEventListener('click', () => {
    open('/#inicio', '_self');
})