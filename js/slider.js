/* SELECTORES */
let allButtonsLeft = document.querySelectorAll('.slider__btn--left');
let allButtonsRight = document.querySelectorAll('.slider__btn--right');


window.addEventListener('DOMContentLoaded', setSliderSize);

function setSliderSize() {
    let allsliders = document.querySelectorAll('.slider');
    allsliders.forEach(slide => {
        slide.style.width = `${slide.children.length}00%`;
        if (slide.children.length < 3) {
            slide.nextElementSibling.style.display = 'none';
        }
    });
}





allButtonsRight.forEach(btnRight => {
    btnRight.addEventListener('click', nextImage);
})

allButtonsLeft.forEach(btnLeft => {
    btnLeft.addEventListener('click', lastImage);
})

let slider;

function nextImage(e) {
    /* Se obtiene el slider */
    slider = e.target.parentElement.previousElementSibling;
    /* Se obtiene el primer elemento del slider */
    let sliderFirst = slider.firstElementChild;
    slider.style.marginLeft = '-200%';
    slider.style.transition = 'all .5s linear';
    /* Despues de que termina la animacion se ejecuta una funcion */
    setTimeout(() => {
        /* Se le quita la transicion */
        slider.style.transition = 'none';
        /* Se pasa la primera imagen al final */
        slider.insertAdjacentElement('beforeend', sliderFirst);
        /* Se vuelve a establecer el margin left inicial */
        slider.style.marginLeft = '-100%';
    }, 500);

}

function lastImage(e) {
    slider = e.target.parentElement.previousElementSibling;
    /* Se obtiene el ultimo elemento del slider */
    let sliderLast = slider.lastElementChild;
    slider.style.marginLeft = '0';
    slider.style.transition = 'all .5s linear';
    /* Despues de que termina la animacion se ejecuta una funcion */
    setTimeout(() => {
        /* Se le quita la transicion */
        slider.style.transition = 'none';
        /* Se pasa la primera imagen al final */
        slider.insertAdjacentElement('afterbegin', sliderLast);
        /* Se vuelve a establecer el margin left inicial */
        slider.style.marginLeft = '-100%';
    }, 500);
}