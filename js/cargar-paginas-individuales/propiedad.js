'use strict';

window.onload = () => {
    
    const agents = document.querySelectorAll('.agent__info');
    const prsnlizeAgntMsg = (prprtyName, prprtyId, prprtyState) => {
        prprtyName = prprtyName.replace(/\s/g, '%20');
        const tmpltAncl = `Acabo%20de%20visitar%20su%20sitio%20web%20y%20me%20encuentro%20interesado%20en%20la%20propiedad%20${prprtyName}%20en%20${prprtyState},%20con%20el%20enlace%20https%3A%2F%2Finmozuniga.com%2Fpropiedad%23${prprtyId}%20Espero%20puedan%20brindarme%20información%20lo%20mas%20pronto%20posible.`;
        agents.forEach(agent => {
            const agentPhone = agent.children[3];
            const phoneNumber = agentPhone.getAttribute('data-number');
            const linkMsg = `https://wa.me/504${phoneNumber}?text=` + tmpltAncl;
            agentPhone.setAttribute('href', linkMsg);

            const agentMail = agent.lastElementChild;
            const mail = agentMail.getAttribute('data-mail');
            const tmpltMail = `mailto:${mail}?subject=` + tmpltAncl;
            agentMail.setAttribute('href', tmpltMail);
        })

        const generalWaLink = `https://wa.me/50497842424?text=` + tmpltAncl;
        document.querySelector('.walink').setAttribute('href', generalWaLink);
    }

    const dolFrmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
    const numberFrmt = new Intl.NumberFormat();

    const createMetaTags = prprtyData => {
        const desc = `Obten informacion detallada sobre nuestra propiedad: ${prprtyData.nombre}, en: ${prprtyData.estado}, con un costo total de: ${dolFrmt.format(prprtyData.costoTotal)}.`;

        const metaDesc = document.createElement('meta');
        metaDesc.name = 'description';
        metaDesc.content = desc;
        document.head.appendChild(metaDesc);

        const metaKeyWrds = document.createElement('meta');
        metaKeyWrds.name = 'keywords';
        metaKeyWrds.content = `lideres, bienes raices, propiedades, ${prprtyData.nombre}, propiedades en ${prprtyData.estado}`;
        document.head.appendChild(metaKeyWrds);

        const metaOgDesc = document.createElement('meta');
        metaOgDesc.name = 'og:description';
        metaOgDesc.content = desc;
        document.head.appendChild(metaOgDesc);

        const metaTwitDesc = document.createElement('meta');
        metaTwitDesc.name = 'twitter:description';
        metaTwitDesc.content = desc;
        document.head.appendChild(metaTwitDesc);
    }

    const createMapHtml = (prprtyLction, cntPrprtyDtls) => {
        if (prprtyLction === '') return;

        const map = document.createElement('iframe');
        map.className = 'property__map';
        map.setAttribute('loading', 'lazy');
        map.setAttribute('src', prprtyLction);
        map.setAttribute('allowfullscreen', '');
        cntPrprtyDtls.appendChild(map);
    }

    const createVidAnclHtml = (prprtyVidUrl, prprtyDesc, prprtyName) => {
        if (prprtyVidUrl === '') return;

        prprtyVidUrl = prprtyVidUrl.split('https://youtu.be/')[1];
        const cntVidAncl = document.createElement('div');
        cntVidAncl.className = 'property__video';
        cntVidAncl.innerHTML = `<iframe src="https://www.youtube.com/embed/${prprtyVidUrl}" title="Video de la propiedad ${prprtyName}" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        prprtyDesc.appendChild(cntVidAncl);
    }

    const createTotCostHtml = (prprtyFee, prprtyTotCos, prprtyDesc) => {
        if (prprtyFee === prprtyTotCos) return;

        const totCost = document.createElement('h2');
        totCost.className = 'property__totalcost';
        totCost.innerHTML = `Costo total: <strong>${dolFrmt.format(prprtyTotCos)}</strong>`;
        prprtyDesc.appendChild(totCost);
    }

    const createCharHtml = (charData, colToAppnd, charIcn, charCntnt) => {
        if (charData != 0) {
            const charLi = document.createElement('li');
            charLi.className = 'more__item';
            charLi.innerHTML = `
            <i class="item__icon fa ${charIcn}"></i>
            <span>
                <strong>${charData}</strong> ${charCntnt}
            </span>
            `;
            colToAppnd.appendChild(charLi);
        }
    }

    const forEachChar = (prprtyData, charList) => {
        createCharHtml(numberFrmt.format(prprtyData.varas), charList, 'fa-chart-area', 'v<sup>2</sup> totales');
        createCharHtml(numberFrmt.format(prprtyData.metros), charList, 'fa-ruler-horizontal', 'm<sup>2</sup> cubiertos');
        createCharHtml(prprtyData.niveles, charList, 'fa-home', 'nivel(es)');

        createCharHtml(prprtyData.banios.replace('.5', ' <sup>1</sup>&frasl;<sub>2</sub>'), charList, 'fa-bath', 'baño(s)');

        createCharHtml(prprtyData.estacionamientos, charList, 'fa-car-side', 'estacionamiento(s)');
        createCharHtml(prprtyData.dormitorios, charList, 'fa-bed', 'habitacion(es) u oficina(s)');
    }

    const setPrprtySliderImgs = (prprtySlider, prprtyId) => {
        storageRef.child(`img/propiedades/${prprtyId}`).listAll().then(file => {
            file.items.forEach(prprtyImg => {
                const cntImg = document.createElement('div');
                cntImg.className = 'slider__section';
                const img = document.createElement('img');
                
                prprtyImg.getDownloadURL().then(src => {
                    img.className = 'slider__img';
                    img.src = src;
                    img.alt = prprtyImg.name;
                })

                cntImg.appendChild(img);
                prprtySlider.appendChild(cntImg);
            })
            const fileLngth = file.items.length;

            prprtySlider.style.width = `${fileLngth}00%`;
            if (fileLngth < 2) {
                prprtySlider.style.marginLeft = '0';
                prprtySlider.nextElementSibling.style.display = 'none';
            }
        })
    }

    const createPrprtyHtml = (prprtyData, prprtyCnt) => {
        prprtyCnt.innerHTML = `
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
        <section class="property__description">
            <div class="property__more">
                <div class="property__price-status">
                    <h2 class="property__price">
                        Cuota: <span>${dolFrmt.format(prprtyData.cuota)}</span>
                    </h2>
                    <p class="property__status">
                        ${prprtyData.estado}
                    </p>
                </div>
                <p class="property__info">
                    ${prprtyData.descripcion}
                </p>
            </div>
            <div class="property__characteristics">
                <ul class="more__list">
                </ul>
            </div>
        </section>
        `;
        return prprtyCnt;
    }

    const createPrprtyRelatedHtml = (prprtyData, prprtyCnt) => {
        prprtyCnt.innerHTML = `
        <img src="" alt="${prprtyData.nombre}" class="property__image" loading="lazy">
        <h2 class="property__title">${prprtyData.nombre}</h2>
        <p class="property__description">${prprtyData.descripcion.slice(0, 60)}...</p>
        <div class="property__btn-container">
            <button class="property__btn">
                Me interesa
            </button>
        </div>
        `;
        return prprtyCnt;
    }

    const prprtisFrgmnt = document.createDocumentFragment();
    const prprtisRelatedCnt = document.querySelector('.category__properties');
    const loadRelatedPrprtis = (catRelated, stateRelated, prprtyId) => {
        db.collection('PROPIEDADES').get().then(prprtis => {
            prprtisFrgmnt.innerHTML = '';
            prprtisRelatedCnt.innerHTML = '';
            prprtis.forEach(prprty => {
                if (prprtisFrgmnt.children.length > 5) return;
                const prprtyCnt = document.createElement('div');
                prprtyCnt.style.opacity = '1';
                prprtyCnt.className = 'category__property';
                prprtyCnt.onclick = () => {
                    loadPrprtyData(prprty.id);
                    setTimeout(() => open(`#${prprty.id}`, '_self'), 1000);
                };
    
                const prprtyHtml = createPrprtyRelatedHtml(prprty.data(), prprtyCnt);
                const prprtyImg = prprtyHtml.firstElementChild;
    
                storageRef.child(`img/propiedades/${prprty.id}`).listAll().then(file => {
                    file.items[0].getDownloadURL().then(src => { prprtyImg.src = src });
                })

                if (prprtyId === (prprty.id)) return;
                if (catRelated === prprty.data().categoria) prprtisFrgmnt.appendChild(prprtyCnt);
                if (stateRelated === prprty.data().estado) prprtisFrgmnt.appendChild(prprtyCnt);
            })
            if (prprtisFrgmnt.children.length > 0) {
                prprtisRelatedCnt.appendChild(prprtisFrgmnt);
                prprtisRelatedCnt.style.display = 'grid';
                document.querySelector('.related__title').textContent = `Otras en "${stateRelated.toLowerCase()}" o categoría "${catRelated.toLowerCase()}"`;
            }
        })
    }

    const prprtyToLoad = window.location.href.split('#')[1];
    const cntPrprtyDtls = document.getElementById('cntPrprtyDtls');

    const loadPrprtyData = prprtyToLoad => {
        db.collection('PROPIEDADES').doc(prprtyToLoad).get().then(prprty => {
            cntPrprtyDtls.innerHTML = '';
            cntPrprtyDtls.id = prprtyToLoad;
            document.querySelector('.banner__slogan').innerText = prprty.data().nombre;
    
            const prprtyHtml = createPrprtyHtml(prprty.data(), cntPrprtyDtls);
            const prprtySlider = prprtyHtml.firstElementChild.firstElementChild;
            setPrprtySliderImgs(prprtySlider, prprtyToLoad);
    
            // Columnas para las caracteristicas de la propiedad
            const charList = prprtyHtml.lastElementChild.lastElementChild.firstElementChild;
            forEachChar(prprty.data(), charList);
    
            const prprtyDesc = prprtyHtml.lastElementChild;
            createTotCostHtml(prprty.data().cuota, prprty.data().costoTotal, prprtyDesc);
            createVidAnclHtml(prprty.data().video, prprtyDesc, prprty.data().nombre);
            createMapHtml(prprty.data().ubicacion, cntPrprtyDtls);
            prsnlizeAgntMsg(prprty.data().nombre, prprtyToLoad, prprty.data().estado);
            createMetaTags(prprty.data());
            loadRelatedPrprtis(prprty.data().categoria, prprty.data().estado, prprty.id);
        }).catch(err => {
            showErr(cntPrprtyDtls, err);
        })
    }

    if (!prprtyToLoad) {
        // Si no se paso un id
        db.collection('PROPIEDADES').limit(1).get().then(prprtis => {
            prprtis.forEach(prprti => {
                loadPrprtyData(prprti.id);
                open(`#${prprti.id}`, '_self');
            })
        })
    } else loadPrprtyData(prprtyToLoad);

}