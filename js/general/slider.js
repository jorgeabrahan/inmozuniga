const aftrTransition = (whereToInsrt, elmntToInsert, slider) => {
    setTimeout(() => {
        slider.style.transition = 'none';
        slider.insertAdjacentElement(whereToInsrt, elmntToInsert);
        slider.style.marginLeft = '-100%';
    }, 250);
}

const nxtImg = slider => {
    const sliderFrst = slider.firstElementChild;
    slider.style.transition = 'margin-left 250ms ease-out';
    slider.style.marginLeft = '-200%';

    aftrTransition('beforeend', sliderFrst, slider);
}

const prevImg = slider => {
    const sliderLast = slider.lastElementChild;
    slider.style.transition = 'margin-left 250ms ease-out';
    slider.style.marginLeft = '0%';

    aftrTransition('afterbegin', sliderLast, slider);
}

// const toggleSliderView = (cntSlider, maxHeight) => {
//     for (let sliderChild of cntSlider.children) {
//         sliderChild.firstElementChild.style.maxHeight = maxHeight;
//     }
// }

const setSliderView = cntBtnAmplify => {
    const icnAmplify = cntBtnAmplify.firstElementChild;
    const cntSlider = cntBtnAmplify.parentElement.firstElementChild;
    // let maxHeight = '38rem';
    // if (icnAmplify.classList.contains('fa-expand')) {
        // maxHeight = '90vh';
    // }
    // toggleSliderView(cntSlider, maxHeight);

    icnAmplify.classList.toggle('fa-compress');
    icnAmplify.classList.toggle('fa-expand');
    cntBtnAmplify.parentElement.classList.toggle('expand__slider');
}