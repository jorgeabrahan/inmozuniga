/* Se obtiene el contenedor de los detalles de la propiedad */
let contenedorDetallesPropiedad = document.querySelector('#contenedorDetallesPropiedad');

/* Se obtiene el id de la propiedad a cargar */
let idPropiedadCargar = window.location.href.split('#')[1];

/* Para dar formato de dolar */
const formatoDolar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
})


/* Se obtiene el slogan del banner */
let sloganBanner = document.querySelector('.banner__slogan');

/* Se obtiene la propiedad a cargar */
db.collection('PROPIEDADES').doc(idPropiedadCargar).get().then(propiedad => {
    contenedorDetallesPropiedad.id = idPropiedadCargar;

    sloganBanner.innerText = propiedad.data().NombrePropiedad;

    /* Se crea el contenedor del slider */
    let contenedorSliderPropiedad = document.createElement('div');
    contenedorSliderPropiedad.className = 'slider-container';

    /* Se crea el slider */
    let sliderPropiedad = document.createElement('div');
    sliderPropiedad.className = 'slider';

    /* Se crea el contenedor de los botones del slider */
    let contenedorBotonesSlider = document.createElement('div');

    /* Se obtienen las imagenes de la propiedad */
    storageRef.child(`img/propiedades/${propiedad.id}`).listAll().then(file => {
        file.items.forEach(item => {
            item.getDownloadURL().then(url => {
                /* Se crea el elemento contenedor de la imagen */
                let contenedorImagenSlider = document.createElement('div');
                contenedorImagenSlider.className = 'slider__section';


                /* Se crea el elemento de imagen */
                let imagenSlider = document.createElement('img');
                imagenSlider.loading = 'lazy';
                imagenSlider.className = 'slider__img';

                let rutaImagen = item._delegate._location.path_;
                let arrayRutaImagen = rutaImagen.split('/');

                imagenSlider.alt = arrayRutaImagen[arrayRutaImagen.length - 1];

                imagenSlider.src = url;
                imagenSlider.style.minHeight = '15rem';
                imagenSlider.style.maxHeight = '38rem';
                imagenSlider.style.objectFit = 'cover';

                /* Se mete el elemento de imagen dentro del contenedor de la imagen */
                contenedorImagenSlider.appendChild(imagenSlider);

                /* Se mete el contenedor de la imagen dentro del slider */
                sliderPropiedad.appendChild(contenedorImagenSlider);
            })
        })
        if (file.items.length < 2) {
            sliderPropiedad.style.marginLeft = '0';
            contenedorBotonesSlider.style.display = 'none';
        }
        sliderPropiedad.style.width = `${file.items.length}00%`;
    })

    /* Se mete el slider dentro de su contenedor */
    contenedorSliderPropiedad.appendChild(sliderPropiedad);


    contenedorBotonesSlider.className = 'slider__buttons';
    contenedorBotonesSlider.innerHTML = `
        <button class="slider__btn slider__btn--left" onclick="lastImage(event)">
            <i class="fa fa-chevron-left slider__icon"></i>
        </button>
        <button class="slider__btn slider__btn--right" onclick="nextImage(event)">
            <i class="fa fa-chevron-right slider__icon"></i>
        </button>
    `;

    /* Se mete el contenedor de los botones dentro del contenedor del slider */
    contenedorSliderPropiedad.appendChild(contenedorBotonesSlider);

    /* Se crea el contenedor para el boton de ampliar */
    let contenedorBtnAmpliar = document.createElement('div');
    contenedorBtnAmpliar.className = 'expand';
    contenedorBtnAmpliar.innerHTML = `
        <i class="fa fa-expand expand__icon"></i>
    `;
    contenedorBtnAmpliar.addEventListener('click', ampliarSlider);

    contenedorSliderPropiedad.appendChild(contenedorBtnAmpliar);


    /* Se mete el contenedor del slider dentro del contenedor de los detalles de la propiedad */
    contenedorDetallesPropiedad.appendChild(contenedorSliderPropiedad);

    /* Se crea el contenedor de la descripcion de la propiedad */
    let contenedorDescripcionPropiedad = document.createElement('section');
    contenedorDescripcionPropiedad.className = 'property__description';

    /* Se crea el elemento contenedor de mas informacion de la propiedad */
    let contenedorMasInfo = document.createElement('div');
    contenedorMasInfo.className = 'property__more';
    contenedorMasInfo.innerHTML = `
        <div class="property__price-status">
            <h2 class="property__price">
                Cuota: <span>${formatoDolar.format(propiedad.data().CuotaPropiedad)}</span>
            </h2>
            <p class="property__status">
                ${propiedad.data().EstadoPropiedad}
            </p>
        </div>
        <p class="property__info">
            ${propiedad.data().DescripcionPropiedad}
        </p>
    `;

    /* Se mete el contenedor de mas informacion de la propiedad dentro de el cotnenedor de la descripcion de la propiedad */
    contenedorDescripcionPropiedad.appendChild(contenedorMasInfo);

    /* Se crea el elemento contenedor de las caracteristicas */
    let caracteristicasPropiedad = document.createElement('div');
    caracteristicasPropiedad.className = 'property__characteristics';

    /* Se crea el elemento de lista para las caracteristicas */
    let caracteristicasLista = document.createElement('ul');
    caracteristicasLista.className = 'more__list';

    /* Se crea un elemento contenedor de caracteristicas */
    let columnaCaracteristicas = document.createElement('container');
    columnaCaracteristicas.className = 'more__group';

    if (propiedad.data().VarasTotales != '' && propiedad.data().VarasTotales != '0') {
        /* Se crea el elemento con las varas totales */
        let caracteristicasVarasTotales = document.createElement('li');
        caracteristicasVarasTotales.className = 'more__item';
        caracteristicasVarasTotales.innerHTML = `<i class="item__icon fa fa-chart-area"></i><span><strong>${propiedad.data().VarasTotales}</strong> v<sup>2</sup> totales</span>`;
        columnaCaracteristicas.appendChild(caracteristicasVarasTotales);
    }

    if (propiedad.data().MetrosCubiertos != '0') {
        let caracteristicasMetrosCubiertos = document.createElement('li');
        caracteristicasMetrosCubiertos.className = 'more__item';
        caracteristicasMetrosCubiertos.innerHTML = `<i class="item__icon fa fa-ruler-horizontal"></i><span><strong>${propiedad.data().MetrosCubiertos}</strong> m<sup>2</sup> cubiertos</span>`;
        columnaCaracteristicas.appendChild(caracteristicasMetrosCubiertos);
    }

    if (propiedad.data().Niveles != '0') {
        let caracteristicasNiveles = document.createElement('li');
        caracteristicasNiveles.className = 'more__item';
        caracteristicasNiveles.innerHTML = `<i class="item__icon fa fa-home"></i><span><strong>${propiedad.data().Niveles}</strong> nivel(es)</span>`;
        columnaCaracteristicas.appendChild(caracteristicasNiveles);
    }

    /* Se mete el primer grupo de caracteristicas dentro del contenedor de caracteristicas */
    caracteristicasLista.appendChild(columnaCaracteristicas);

    /* Se crea otra columna de caracteristicas */
    let otraColumnaCaracteristicas = document.createElement('container');
    otraColumnaCaracteristicas.className = 'more__group';

    if (propiedad.data().Ducha != '0') {
        let caracteristicasDucha = document.createElement('li');
        caracteristicasDucha.className = 'more__item';
        caracteristicasDucha.innerHTML = `<i class="item__icon fa fa-bath"></i><span><strong>${propiedad.data().Ducha}</strong> baño(s)</span>`;

        if (columnaCaracteristicas.children.length < 3) {
            columnaCaracteristicas.appendChild(caracteristicasDucha);
        } else {
            otraColumnaCaracteristicas.appendChild(caracteristicasDucha);
        }

    }

    if (propiedad.data().Garajes != '0') {
        let caracteristicasGarajes = document.createElement('li');
        caracteristicasGarajes.className = 'more__item';
        caracteristicasGarajes.innerHTML = `<i class="item__icon fa fa-car-side"></i><span><strong>${propiedad.data().Garajes}</strong> estacionamiento(s)</span>`;
        otraColumnaCaracteristicas.appendChild(caracteristicasGarajes);
    }

    if (propiedad.data().Dormitorios != '0') {
        let caracteristicasDormitorios = document.createElement('li');
        caracteristicasDormitorios.className = 'more__item';
        caracteristicasDormitorios.innerHTML = `<i class="item__icon fa fa-bed"></i><span><strong>${propiedad.data().Dormitorios}</strong> habitacion(es) u oficina(s)</span>`;
        otraColumnaCaracteristicas.appendChild(caracteristicasDormitorios);
    }

    caracteristicasLista.appendChild(otraColumnaCaracteristicas);


    /* Se mete el elemento de lista dentro del contenedor de las caracteristicas */
    caracteristicasPropiedad.appendChild(caracteristicasLista);

    /* Se mete el contenedor de las caracteristicas dentro del contenedor de la descripcion de la propiedad */
    contenedorDescripcionPropiedad.appendChild(caracteristicasPropiedad);

    if (propiedad.data().CuotaPropiedad != propiedad.data().CostoTotal) {
        /* Se crea el elemento para el costo total */
        let costoTotal = document.createElement('h2');
        costoTotal.className = 'property__totalcost';
        costoTotal.innerHTML = `Costo total: <strong>${formatoDolar.format(propiedad.data().CostoTotal)}</strong>`;

        /* Se mete el elemento con el costo total dentro de el contenedor de la descripcion de la propiedad */
        contenedorDescripcionPropiedad.appendChild(costoTotal);
    }

    if (propiedad.data().url != '') {
        /* Se crea el elemento contenedor del enlace para ver el video si la propiedad tiene video */
        let contenedorEnlaceVideo = document.createElement('div');
        contenedorEnlaceVideo.className = 'property__video';

        contenedorEnlaceVideo.innerHTML = `
        <a href="${propiedad.data().url}" class="video__link" target="_blank">Ver video</a>
        `;

        /* Se mete el cotnenedor del enlace del video dentro del contenedor de la descripcion de la propiedad */
        contenedorDescripcionPropiedad.appendChild(contenedorEnlaceVideo);
    }

    /* Se mete el contenedor de la descripcion de la propiedad dentro del contenedor de los detalles de la propiedad */
    contenedorDetallesPropiedad.appendChild(contenedorDescripcionPropiedad);

    if (propiedad.data().ubicacion != "") {
        let map = document.createElement('iframe');
        map.loading = 'lazy';
        map.setAttribute('allowfullscreen', '');
        map.src = propiedad.data().ubicacion;
        map.className = 'property__map';
        contenedorDetallesPropiedad.appendChild(map);
    }

    personalizeAgentMessage(propiedad.data().NombrePropiedad, idPropiedadCargar, propiedad.data().EstadoPropiedad);

}).catch(() => {
    mostrarError(contenedorDetallesPropiedad);
})


const agents = document.querySelectorAll('.agent__info');

function personalizeAgentMessage (prprtyName, idPrprty, prprtyState) {
    prprtyName = prprtyName.replace(/\s/g, '%20');
    let tmpltWaLink = `Acabo%20de%20visitar%20su%20sitio%20web%20y%20me%20encuentro%20interesado%20en%20la%20propiedad%20${prprtyName}%20en%20${prprtyState},%20con%20el%20enlace%20https%3A%2F%2Finmobiliariazunigahn.web.app%2Fpropiedad%23${idPrprty}%20Espero%20puedan%20brindarme%20información%20lo%20mas%20pronto%20posible.`;
    agents.forEach(agent => {
        let agentPhone = agent.children[3];
        let phoneNumber = agentPhone.getAttribute('data-number');
        let tmpltPhone = `https://wa.me/504${phoneNumber}?text=`;
        let linkMsg = tmpltPhone + tmpltWaLink;
        agentPhone.setAttribute('href', linkMsg);

        let agentMail = agent.lastElementChild;
        let mail = agentMail.getAttribute('data-mail');
        let tmpltMail = `mailto:${mail}?subject=Me encuentro interesado en una propiedad&body=Al visitar su sitio web llamo mi atencion la propiedad ${prprtyName} en ${prprtyState}, con el enlace https://inmobiliariazunigahn.web.app/propiedad#${idPrprty} Espero puedan brindarme información lo mas pronto posible.`;
        agentMail.setAttribute('href', tmpltMail);
    })

    setGeneralWaLink(tmpltWaLink);
}

const walink = document.querySelector('.walink');

const setGeneralWaLink = (tmpltWaLink) => {
    let generalWaLink = `https://wa.me/50497842424?text=` + tmpltWaLink;
    walink.setAttribute('href', generalWaLink);
}