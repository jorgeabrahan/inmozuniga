'use strict';

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