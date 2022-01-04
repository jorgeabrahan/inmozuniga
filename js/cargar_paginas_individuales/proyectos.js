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
            return;
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
    console.log(getComputedStyle(stgDtls).display);
    if (getComputedStyle(stgDtls).display == 'none') {
        stgDtls.style.display = 'flex';
        return;
    }
    stgDtls.style.display = 'none';
}
const gnrteWaLink = (stgName, prjctName) => {
    return `https://wa.me/50497842424?text=Acabo%20de%20visitar%20su%20sitio%20web%20y%20me%20encuentro%20interesado%20en%20la%20etapa%20${stgName}%20del%20proyecto%20${prjctName},%20espero%20puedan%20brindarme%20información%20lo%20mas%20pronto%20posible.`
}
const setStgSliderImgs = (stgSlider, prjctName, stgName) => {
    storageRef.child(`img/proyectos/${prjctName}/Catalogo ${stgName}`).listAll().then(file => {
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
        <button class="project__btn" onclick="shwStg(${prjctId})">Saber mas</button>
        <button class="project__btn" onclick="shwImg(this.parentElement.parentElement.firstElementChild)">
            Ver imagen
        </button>
        <a href="${prjctData.url}" class="project__btn">Ver video</a>
    </div>
    `;
    return prjctCnt;
}

const createLoteHtml = (loteData, loteCnt) => {
    loteCnt.innerHTML = `
    <h2 class="prices__title">${loteData.TipoLote}</h2>
    <ul class="prices__description">
        <li class="prices__item">${loteData.PrecioVara}</li>
        <li class="prices__item">${loteData.CostoTotal}</li>
        <li class="prices__item">${loteData.Prima}</li>
        <li class="prices__item">${loteData.AFinanciar}</li>
        <li class="prices__item">${loteData.Cuota}</li>
    </ul>
    `;
    return loteCnt;
}

const createStgHtml = (stgData, stgCnt, prjctName) => {
    stgCnt.innerHTML = `
    <div class="stage__info" onclick="tggleIcn(this)">
        <h2 class="stage__name">${stgData.TituloEtapa}</h2>
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
                <a href="https://inmobiliariazunigahn.web.app/cotizador" class="stage__btn">Aplicar</a>
            </div>
        </div>
    </div>
    `;

    setStgSliderImgs(stgCnt.lastElementChild.firstElementChild.firstElementChild, prjctName, stgData.TituloEtapa);

    const lotesCnt = stgCnt.lastElementChild.lastElementChild.firstElementChild.firstElementChild;
    for (let lote of stgData.Lotes) {
        const loteCnt = document.createElement('div');
        loteCnt.className = 'stage__lot';

        lotesCnt.appendChild(createLoteHtml(lote, loteCnt));
    }

    const anclCntct = stgCnt.lastElementChild.lastElementChild.firstElementChild.children[1];
    anclCntct.href = gnrteWaLink(stgData.TituloEtapa, prjctName);

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
        storageRef.child(`img/proyectos/${prjct.data().nombre}/${prjct.id}`).getDownloadURL().then(src => {
            prjctImg.src = src;
        })

        prjctsFrgmnt.appendChild(prjctHtml);

        const prjctStgs = document.createElement('div');
        prjctStgs.className = 'stages d-none';
        prjctStgs.id = prjctId;

        for (let stg of prjct.data().etapas) {
            const stgCnt = document.createElement('div');
            stgCnt.className = 'stage';
            prjctStgs.appendChild(createStgHtml(stg, stgCnt, prjct.data().nombre));
        }

        stgsFrgmnt.appendChild(prjctStgs);
    })

    cntPrjcts.appendChild(prjctsFrgmnt);
    allStgs.appendChild(stgsFrgmnt);

    const stgLink = window.location.href.split('#')[1] || '';
    if (stgLink !== '') shwStg(stgLink);

}).catch(err => {
    showErr(cntPrjcts, err);
})
