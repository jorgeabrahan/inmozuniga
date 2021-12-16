/* SELECTORES */
let ventabtn = document.querySelector('#venta');
let rentabtn = document.querySelector('#renta');

let venta = document.querySelector('.properties__buy');
let renta = document.querySelector('.properties__rent');


/* EVENTOS */
ventabtn.addEventListener('click', mostrarPropiedadesVenta);
rentabtn.addEventListener('click', mostrarPropiedadesRenta);


/* FUNCIONES */
function mostrarPropiedadesVenta() {
    rentabtn.classList.remove('properties__btn--active');
    ventabtn.classList.add('properties__btn--active');

    venta.classList.remove('d-none');
    renta.classList.add('d-none');
}

function mostrarPropiedadesRenta() {
    rentabtn.classList.add('properties__btn--active');
    ventabtn.classList.remove('properties__btn--active');

    venta.classList.add('d-none');
    renta.classList.remove('d-none');
}

let prprtieState = window.location.href.split('#')[1] ?? '';

if (prprtieState.match(/\-/g)) {
    prprtieState = prprtieState.split('-')[1];
}

if (prprtieState == 'renta') {
    mostrarPropiedadesRenta();
}