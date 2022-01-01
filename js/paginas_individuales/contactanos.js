'use strict';

window.onload = () => {
    const btnContact = document.getElementById('btnContact');
    const btnMoreInfo = document.getElementById('btnMoreInfo');
    
    const shwSlctdTab = btn => {
        if (btn.classList.contains('contact__btn--active')) return;
    
        btnContact.classList.toggle('contact__btn--active');
        btnMoreInfo.classList.toggle('contact__btn--active');
    
        document.querySelector('.contact__info').classList.toggle('d-none');
        document.querySelector('.contact__more-info').classList.toggle('d-none');
    }
    
    btnContact.addEventListener('click', e => {
        shwSlctdTab(e.target)
    });
    btnMoreInfo.addEventListener('click', e => {
        shwSlctdTab(e.target)
    });
    
    
    document.querySelectorAll('.social-media').forEach(sclMedia => {
        sclMedia.addEventListener('click', () => {
            open(`${sclMedia.getAttribute('data-target')}`, '_blank');
        });
    })

}
