'use strict';

window.onload = () => {

    const btnVenta = document.getElementById('venta');
    const btnRenta = document.getElementById('renta');
    
    const showPrprtiesByState = (btn) => {
        if (btn.classList.contains('properties__btn--active')) return;

        btnRenta.classList.toggle('properties__btn--active');
        btnVenta.classList.toggle('properties__btn--active');
    
        document.querySelector('.properties__buy').classList.toggle('d-none');
        document.querySelector('.properties__rent').classList.toggle('d-none');
    }

    btnVenta.addEventListener('click', e => {showPrprtiesByState(e.target)});
    btnRenta.addEventListener('click', e => {showPrprtiesByState(e.target)});


    let anchor = window.location.href.split('#')[1] ?? '';

    let stateAnchor = anchor;
    if (stateAnchor.match(/\-/g)) stateAnchor = stateAnchor.split('-')[1];
    if (stateAnchor == 'renta') showPrprtiesByState(btnRenta);

    let lastCat = obtenerCookies().ultimacategoria;
    if (!anchor) { //Si anchor es un <empty string>
        if (!!lastCat) { //Si no es undefined o no esta vacia
            open(`https://inmobiliariazunigahn.web.app/propiedades#${lastCat}`, '_self');
        }
    }
    
    const shwOrHideCat = catToShow => {
        let catIcn = catToShow.firstElementChild.lastElementChild;
        catIcn.classList.toggle('fa-chevron-down');
        catIcn.classList.toggle('fa-chevron-up');

        let catPrprties = catToShow.lastElementChild;
        if (window.getComputedStyle(catPrprties).display === 'none') {
            for (let prprty of catPrprties.children) {
                prprty.style.animation = 'unvanish .8s forwards';
            }
            catPrprties.style.display = 'grid';
            document.cookie = `ultimacategoria = ${catToShow.id}`;
            return;
        }
        for (let prprty of catPrprties.children) {
            prprty.style.animation = 'vanish .8s forwards';
        }
        setTimeout(() => {catPrprties.style.display = 'none'}, 500);
    }

    //Evento a los contenedores de informacion de cada categoria
    document.querySelectorAll('.category__info').forEach(catInfo => {
        catInfo.addEventListener('click', e => {
            shwOrHideCat(e.target.parentElement);
        });
    });
    
    //Eventos a los enlaces de la columna principal del footer
    document.querySelectorAll('.main__link').forEach(mainlink => {
        mainlink.addEventListener('click', e => {
            anchor = e.target.href.split('#')[1];
            if (anchor == 'venta') {
                showPrprtiesByState(btnVenta);
                return;
            }
            showPrprtiesByState(btnRenta);
        });
    })
    
    const shwCatByName = footrAnchor => {
        if (footrAnchor.split('-')[1] === 'venta') showPrprtiesByState(btnVenta);
        else showPrprtiesByState(btnRenta);

        setTimeout(() => { shwOrHideCat(document.querySelector(`#${footrAnchor}`)) }, 2000);
        
        open(`#${footrAnchor}`, '_self');
    }

    //Eventos a los enlaces rapidos de las categorias en el footer
    document.querySelectorAll('.column__link').forEach(footrLnk => {
        footrLnk.addEventListener('click', () => {
            shwCatByName(footrLnk.href.split('#')[1]);
        });
    })
    
    if (anchor.match(/\-/g)) {
        shwCatByName(anchor);
    }
}








