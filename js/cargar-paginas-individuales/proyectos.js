'use strict';

const cntPrjcts = document.querySelector('#cntPrjcts');
const prjctsFrgmnt = document.createDocumentFragment();
const allStgs = document.querySelector('.allstages');
const stgsFrgmnt = document.createDocumentFragment();

const shwStg = prjctId => {
    for (let child of allStgs.children) {
        child.classList.add('d-none');
        if (child.id === prjctId) {
            child.classList.remove('d-none');
            open(`#${prjctId}`, '_self');
        } 
    }
}

const shwImg = prjctImg => {
    const srcToShw = prjctImg.src;
    open(`${srcToShw}`, '_blank');
}

const tggleIcn = (stgInfo) => {
    const stgDtls = stgInfo.nextElementSibling;
    const stgIcn = stgInfo.lastElementChild;
    stgIcn.classList.toggle('fa-chevron-down');
    stgIcn.classList.toggle('fa-chevron-up');
    if (getComputedStyle(stgDtls).display == 'none') {
        stgDtls.style.display = 'flex';
        return;
    }
    stgDtls.style.display = 'none';
}

const gnrteWaLink = (stgName, prjctName) => {
    return `https://wa.me/50497842424?text=Acabo%20de%20visitar%20su%20sitio%20web%20y%20me%20encuentro%20interesado%20en%20la%20etapa%20${stgName}%20del%20proyecto%20${prjctName},%20espero%20puedan%20brindarme%20información%20lo%20mas%20pronto%20posible.`
}
    
const setStgSliderImgs = (stgSlider, stgName) => {
    storageRef.child(`img/etapas/${stgName}`).listAll().then(file => {
        file.items.forEach(stgImg => {
            const cntImg = document.createElement('div');
            cntImg.className = 'slider__section';
            const img = document.createElement('img');
            
            stgImg.getDownloadURL().then(src => {
                img.className = 'slider__img';
                img.src = src;
                img.alt = stgImg.name;
            })

            cntImg.appendChild(img);
            stgSlider.appendChild(cntImg);
        })
        stgSlider.style.width = `${file.items.length}00%`;
    })
}

const createPrjctHtml = (prjctData, prjctId, prjctCnt) => {
    prjctCnt.innerHTML = `
    <img src="" alt="Proyecto ${prjctData.nombre}" class="project__img">
    <div class="project__content">
        <h2 class="project__name">${prjctData.nombre}</h2>
        <p class="project__description">${prjctData.descripcion}</p>
    </div>
    <div class="project__buttons">
        <button class="project__btn" onclick="shwStg(${prjctId})">Saber más</button>
        <button class="project__btn" onclick="shwImg(this.parentElement.parentElement.firstElementChild)">
            Ver imagen
        </button>
    </div>
    `;
    return prjctCnt;
}
const dolFrmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
const numFrmt = new Intl.NumberFormat();
const createLoteHtml = (loteData, loteCnt, stgType) => {
    // Por cada lote se crean los contenedores de cada uno de los apartados
    const loteInfo = document.createElement('div');
    loteInfo.innerHTML = `
    <p><strong><em>Sobre el lote</em></strong></p>
    <p><span>Tipo de lote:</span> <span>${loteData.tipo}</span></p>
    <p><span>Cant. de varas:</span> <span>${numFrmt.format(loteData.varas)}</span></p>
    <p><span>Precio por vara:</span> <span>${dolFrmt.format(loteData.precioVara)}</span></p>
    `;
    const cnstrctionInfo = document.createElement('div');
    cnstrctionInfo.innerHTML = `
    <p><strong><em>Sobre la construcción</em></strong></p>
    <p><span>Cant. de metros:</span> <span>${numFrmt.format(loteData.metros)}</span></p>
    <p><span>Precio por metro:</span> <span>${dolFrmt.format(loteData.precioMetro)}</span></p>
    <p><span>Modelo de vivienda:</span> <span>${loteData.modelo}</span></p>
    <p><span>Cant. de habitaciones:</span> <span>${loteData.habitaciones}</span></p>
    <p><span>Cant. de baños:</span> <span>${loteData.banios.replace('.5', ' <sup>1</sup>&frasl;<sub>2</sub>')}</span></p>
    `;
    const genInfo = document.createElement('div');
    genInfo.innerHTML = `
    <p><strong><em>Informacion general</em></strong></p>
    <p><span>Costo total:</span> <span>${dolFrmt.format(loteData.costoTotal)}</span></p>
    <p><span>Prima del 10%:</span> <span>${dolFrmt.format(loteData.prima)}</span></p>
    <p><span>Cant. a financiar:</span> <span>${dolFrmt.format(loteData.financiar)}</span></p>
    <p><span>Cuota aproximada:</span> <span>${dolFrmt.format(loteData.cuota)}</span></p>
    `;
    loteCnt.appendChild(loteInfo);
    loteCnt.appendChild(cnstrctionInfo);
    loteCnt.appendChild(genInfo);
    if (stgType === 'lote') loteCnt.removeChild(cnstrctionInfo);
    if (stgType === 'niveles') loteCnt.removeChild(loteInfo);
    return loteCnt;
}

const createStgHtml = (stgData, stgCnt, prjctName) => {
    stgCnt.innerHTML = `
    <div class="stage__info" onclick="tggleIcn(this)">
        <h2 class="stage__name">${stgData.nombre}</h2>
        <i class="fa fa-chevron-up stage__icon"></i>
    </div>
    <div class="stage__details">
        <div class="slider-container">
            <div class="slider">
            </div>
            <div class="slider__buttons">
                <button class="slider__btn slider__btn--left" onclick="prevImg(this.parentElement.previousElementSibling)">
                    <i class="fa fa-chevron-left slider__icon"></i>
                </button>
                <button class="slider__btn slider__btn--right" onclick="nxtImg(this.parentElement.previousElementSibling)">
                    <i class="fa fa-chevron-right slider__icon"></i>
                </button>
            </div>
            <div class="expand" onclick="setSliderView(this)">
                <i class="fa fa-expand expand__icon"></i>
            </div>
        </div>
        <div class="stage__prices-contact">
            <div class="stage__prices">
                <div class="stage__lots"></div>
                <a href="" class="stage__btn" target="_blank">Contactanos</a>
                <a href="https://inmozuniga.com/cotizador" class="stage__btn">Aplicar</a>
            </div>
        </div>
    </div>
    `;

    setStgSliderImgs(stgCnt.lastElementChild.firstElementChild.firstElementChild, stgData.nombre);

    const lotesCnt = stgCnt.lastElementChild.lastElementChild.firstElementChild.firstElementChild;
    for (let lote of stgData.lotes) {
        const loteCnt = document.createElement('div');
        loteCnt.className = 'stage__lot';

        lotesCnt.appendChild(createLoteHtml(lote, loteCnt, stgData.tipo));
    }

    const anclCntct = stgCnt.lastElementChild.lastElementChild.firstElementChild.children[1];
    anclCntct.href = gnrteWaLink(stgData.nombre, prjctName);

    return stgCnt;
}

db.collection('PROYECTOS').get().then(prjcts => {
    prjcts.forEach(prjct => {
        const prjctId = removeAccents(prjct.data().nombre.replace(/\s/g, '').toLowerCase());

        const prjctCnt = document.createElement('div');
        prjctCnt.className = 'project';
        prjctCnt.onclick = () => {shwStg(prjctId)};
        const prjctHtml = createPrjctHtml(prjct.data(), prjctId, prjctCnt);
        const prjctImg = prjctHtml.firstElementChild;
        storageRef.child(`img/proyectos/${prjct.id}`).getDownloadURL().then(src => { prjctImg.src = src });
        prjctsFrgmnt.appendChild(prjctHtml);
        const prjctStgs = document.createElement('div');
        prjctStgs.className = 'stages d-none';
        prjctStgs.id = prjctId;

        const iframes = document.createElement('div');
        iframes.className = 'iframes';
        iframes.innerHTML = `
        <div class="iframe-container"><iframe src="https://www.youtube.com/embed/${prjct.data().video.split('https://youtu.be/')[1]}" class="iframe" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" loading="lazy" allowfullscreen frameborder="0"></iframe></div>
        <div class="iframe-container"><iframe src="${prjct.data().ubicacion}" class="iframe" loading="lazy" allowfullscreen frameborder="0"></iframe></div>
        `;
        for (let stg of prjct.data().etapas) {
            const stgCnt = document.createElement('div');
            stgCnt.className = 'stage';
            
            prjctStgs.appendChild(createStgHtml(stg, stgCnt, prjct.data().nombre));
        }
        prjctStgs.prepend(iframes);

        stgsFrgmnt.appendChild(prjctStgs);
    })

    cntPrjcts.appendChild(prjctsFrgmnt);
    allStgs.appendChild(stgsFrgmnt);

    const stgLink = window.location.href.split('#')[1] || '';
    if (stgLink !== '') shwStg(stgLink);

}).catch(err => {
    showErr(cntPrjcts, err);
})
