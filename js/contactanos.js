
/* SELECTORES */
let contactobtn = document.querySelector("#contacto");
let masinfobtn = document.querySelector("#masinfo");

let contacto = document.querySelector(".contact__info");
let masinfo = document.querySelector(".contact__more-info");

/* EVENTOS */
contactobtn.addEventListener("click", mostrarPestañaContacto);
masinfobtn.addEventListener("click", mostrarPestañaMasinfo);


/* FUNCIONES */

function mostrarPestañaContacto() {
    contacto.classList.remove("d-none");
    masinfo.classList.add("d-none");

    contactobtn.classList.add("contact__btn--active");
    masinfobtn.classList.remove("contact__btn--active");
}

function mostrarPestañaMasinfo() {
    contacto.classList.add("d-none");
    masinfo.classList.remove("d-none");

    contactobtn.classList.remove("contact__btn--active");
    masinfobtn.classList.add("contact__btn--active");
}