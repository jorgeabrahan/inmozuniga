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
        open(`#${footrAnchor}`, '_self');
        
        setTimeout(() => { shwOrHideCat(document.querySelector(`#${footrAnchor}`)) }, 2000);
        
    }

    //Eventos a los enlaces rapidos de las categorias en el footer
    document.querySelectorAll('.column__link').forEach(footrLnk => {
        footrLnk.addEventListener('click', () => {
            shwCatByName(footrLnk.href.split('#')[1]);
        });
    })
    
    if (anchor.match(/\-/g)) shwCatByName(anchor); 
    
    const lastCat = obtenerCookies().ultimacategoria;
    if (!anchor) { //Si anchor es un <empty string>
        if (!!lastCat) { //Si no es undefined o no esta vacia
            shwCatByName(lastCat);
        }
    }
    

    const cntCatSale = document.querySelector('.buy__category');
    const cntCatRent = document.querySelector('.rent__category');

    const seekEmptyCats = cntCat => {
        for (let catChild of cntCat.children) {
            const prprtisCnt = catChild.lastElementChild;
            const catName = catChild.firstElementChild.firstElementChild.innerText;
            if (prprtisCnt.children.length === 0) {
                const msgEmptyCat = document.createElement('p');
                msgEmptyCat.className = 'category__message';
                msgEmptyCat.innerHTML = `De momento no contamos con ${catName}, pero puedes <a href="https://wa.me/50497842424?text=Acabo%20de%20visitar%20su%20sitio%20web%20y%20me%20encuentro%20interesado%20en%20la%20categoría%20${catName}%20de%20la%20página%20de%20propiedades,%20lastimosamente%20está%20vacía;%20por%20tanto,%20queria%20saber%20si%20tienen%20algo%20relacionado%20con%20la%20categoría%20que%20busco.%20Espero%20puedan%20brindarme%20información%20lo%20mas%20pronto%20posible." target="_blank">contactárnos</a> y te ayudaremos a encontrar lo que buscas.`;
                prprtisCnt.appendChild(msgEmptyCat);
            }
        }
    }

    const sortByCat = (cntCats, prprtyCat, cntPrprty) => {
        for (let catsChild of cntCats.children) {
            if (catsChild.classList.contains(prprtyCat)) {
                catsChild.lastElementChild.appendChild(cntPrprty);
            }
        }
    }

    const createPrprtyHtml = (prprtyData, prprtyId, prprtyCnt) => {
        prprtyCnt.innerHTML = `
        <img src="" alt="${prprtyData.NombrePropiedad}" class="property__image" loading="lazy">
        <h2 class="property__title">${prprtyData.NombrePropiedad}</h2>
        <p class="property__description">${prprtyData.DescripcionPropiedad.slice(0, 60)}...</p>
        <div class="property__btn-container">
            <a href="https://inmobiliariazunigahn.web.app/propiedad#${prprtyId}" class="property__btn">
                Me interesa
            </a>
        </div>
        `;
        return prprtyCnt;
    }

    db.collection('PROPIEDADES').get().then(prprtis => {
        prprtis.forEach(prprty => {
            const prprtyCnt = document.createElement('div');
            prprtyCnt.className = 'category__property';
            prprtyCnt.onclick = () => { open(`/propiedad#${prprty.id}`, '_self') };

            const prprtyHtml = createPrprtyHtml(prprty.data(), prprty.id, prprtyCnt);
            const prprtyImg = prprtyHtml.firstElementChild;

            storageRef.child(`img/propiedades/${prprty.id}`).listAll().then(file => {
                file.items[0].getDownloadURL().then(src => {
                    prprtyImg.src = src;
                })
            })

            const catFrmtd = prprty.data().CategoriaPropiedad.toLowerCase().replace(/\s/g, '');
            if (prprty.data().EstadoPropiedad == "Venta") sortByCat(cntCatSale, catFrmtd, prprtyCnt);
            else sortByCat(cntCatRent, catFrmtd, prprtyCnt);
            
        })
        seekEmptyCats(cntCatSale);
        seekEmptyCats(cntCatRent);
    })
}









