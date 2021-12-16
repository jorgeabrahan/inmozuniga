let load = document.querySelector(".load");
setTimeout(function () {
    /* Se le añade una clase con la animacion para que se desvanezca */
    load.classList.add('vanish');
}, 3500)

setTimeout(function () {
    /* Despues de que termina la animacion se le aplica un display none a la pantalla de carga */
    load.classList.add('d-none');
}, 4500)


