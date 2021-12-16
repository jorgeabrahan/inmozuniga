/* Se obtiene el contenedor de los proyectos */
let contenedorProyectos = document.querySelector('#contenedorProyectos');

/* Se obtiene el contenedor de las etapas de todos los proyectos */
let allStages = document.querySelector('.allstages');

let projecToShow;


db.collection('PROYECTOS').get().then(proyectos => {
    proyectos.forEach(proyecto => {

        /* Se crea el contenedor del proyecto */
        let contenedorProyecto = document.createElement('div');
        contenedorProyecto.className = 'project';

        /* Se le quitan los espacios y se pasa a minusculas el nombre del proyecto */
        let idProject = proyecto.data().nombre.replace(/\s/g, '').toLowerCase();

        // Se llama la funcion para remover los acentos del id
        idProject = removeAccents(idProject);

        contenedorProyecto.onclick = () => {
            mostrarEtapa(idProject);
            open(`#${idProject}`, '_self');
        }

        /* Se obtiene la imagen del proyecto */
        storageRef.child(`img/proyectos/${proyecto.data().nombre}/${proyecto.id}`).getDownloadURL().then(urlImagen => {
            contenedorProyecto.innerHTML = `
            <img src="${urlImagen}" alt="${proyecto.data().nombre}" class="project__img">
            <div class="project__content">
                <h2 class="project__name">
                    ${proyecto.data().nombre}
                </h2>
                <p class="project__description">
                    ${proyecto.data().descripcion}
                </p>
            </div>
            <div class="project__buttons">
                <button class="project__btn ${idProject}">Saber más</button>
                <a href="${proyecto.data().url}" class="project__btn">Ver video</a>
            </div>
            `;

            let btnShowStage = contenedorProyecto.lastElementChild.firstElementChild;
            
            btnShowStage.onclick = (e) => {
                mostrarEtapa(e.target.classList[1]);
            }

            /* Se mete el contenedor del proyecto dentro del contenedor de los proyectos */
            contenedorProyectos.appendChild(contenedorProyecto);
        });


        /* Se crea el contenedor de las etapas del proyecto */
        let contenedorEtapas = document.createElement('div');
        contenedorEtapas.className = 'stages d-none';
        contenedorEtapas.id = idProject;

        for (let i = 0; i < proyecto.data().etapas.length; i++) {

            /* Se crea el contenedor de la etapa */
            let contenedorEtapa = document.createElement('div');
            contenedorEtapa.className = 'stage';

            /* Se crea el contenedor de la informacion de la etapa */
            let contenedorInfoEtapa = document.createElement('div');
            contenedorInfoEtapa.className = 'stage__info';

            contenedorInfoEtapa.onclick = (event) => {
                let detailsOfStage = event.target.nextElementSibling;
                let stageIcon = event.target.lastElementChild;
                if (stageIcon.classList.contains('fa-chevron-down')) {
                    stageIcon.classList.remove('fa-chevron-down');
                    stageIcon.classList.add('fa-chevron-up');
                    detailsOfStage.style.display = 'flex';
                } else {
                    stageIcon.classList.add('fa-chevron-down');
                    stageIcon.classList.remove('fa-chevron-up');
                    detailsOfStage.style.display = 'none';
                }
            }

            contenedorInfoEtapa.innerHTML = `
                <h2 class="stage__name">
                    ${proyecto.data().etapas[i].TituloEtapa}
                </h2>
                <i class="fa fa-chevron-up stage__icon"></i>
            `;


            /* Se mete el contenedor de la informacion de la etapa dentro del contenedor de la etapa */
            contenedorEtapa.appendChild(contenedorInfoEtapa);



            /* Se crea el contenedor de los detalles de la etapa */
            let contenedorDetallesEtapa = document.createElement('div');
            contenedorDetallesEtapa.className = 'stage__details';

            /* Se crea el elemento contenedor del slider */
            let contenedorSlider = document.createElement('div');
            contenedorSlider.className = 'slider-container';

            /* Se crea el elemento slider */
            let slider = document.createElement('div');
            slider.className = 'slider';

            /* Se obtienen las imagenes de la etapa */
            storageRef.child(`img/proyectos/${proyecto.data().nombre}/Catalogo ${proyecto.data().etapas[i].TituloEtapa}`).listAll().then(res => {
                res.items.forEach(item => {
                    item.getDownloadURL().then(url => {

                        /* Se crea el elemento contenedor de la imagen del slider */
                        let contenedorImagenSlider = document.createElement('div');
                        contenedorImagenSlider.className = 'slider__section';

                        /* Se crea cada elemento de imagen del slider */
                        let imagenSlider = document.createElement('img');
                        imagenSlider.className = 'slider__img';
                        imagenSlider.src = url;
                        let rutaImagen = item._delegate._location.path_;
                        let arrayRutaImagen = rutaImagen.split('/');
                        imagenSlider.alt = arrayRutaImagen[arrayRutaImagen.length - 1];
                        imagenSlider.style.minHeight = '25rem';
                        imagenSlider.style.maxHeight = '40rem';
                        imagenSlider.style.objectFit = 'cover';

                        /* Se mete la imagen dentro de su contenedor */
                        contenedorImagenSlider.appendChild(imagenSlider);

                        /* Se mete el contenedor de la imagen dentro del slider */
                        slider.appendChild(contenedorImagenSlider);

                    })
                })
                slider.style.width = `${res.items.length}00%`;
            })

            /* Se mete el slider dentro de su contenedor */
            contenedorSlider.appendChild(slider);

            /* Se crea el elemento contenedor de los botones del slider */
            let contenedorBotonesSlider = document.createElement('div');
            contenedorBotonesSlider.className = 'slider__buttons';
            contenedorBotonesSlider.innerHTML = `
                <button class="slider__btn slider__btn--left" onclick="lastImage(event)">
                    <i class="fa fa-chevron-left slider__icon"></i>
                </button>
                <button class="slider__btn slider__btn--right" onclick="nextImage(event)">
                    <i class="fa fa-chevron-right slider__icon"></i>
                </button>
            `;

            /* Se mete el contenedor de los botones del slider dentro del contenedor del slider */
            contenedorSlider.appendChild(contenedorBotonesSlider);

            /* Se crea el contenedor para el boton de ampliar */
            let contenedorBtnAmpliar = document.createElement('div');
            contenedorBtnAmpliar.className = 'expand';
            contenedorBtnAmpliar.innerHTML = `
                <i class="fa fa-expand expand__icon"></i>
            `;
            contenedorBtnAmpliar.addEventListener('click', ampliarSlider);

            contenedorSlider.appendChild(contenedorBtnAmpliar);


            /* Se mete el contenedor del slider dentro del contenedor de los detalles de la etapa */
            contenedorDetallesEtapa.appendChild(contenedorSlider);

            /* Se crea el elemento contenedor de los precios de la etapa y del boton de contacto */
            let contenedorPreciosEtapa = document.createElement('div');
            contenedorPreciosEtapa.className = 'stage__prices-contact';

            /* Se crea el contenedor de los precios */
            let preciosEtapa = document.createElement('div');
            preciosEtapa.className = 'stage__prices';

            let infoEtapa = document.createElement('div');
            infoEtapa.className = 'stage__details';

            for (let j = 0; j < proyecto.data().etapas[i].Lotes.length; j++) {
                let detallesEtapa = document.createElement('div');
                detallesEtapa.className = 'stage__detail';
                /* Se crea el elemento para el tipo de lote */
                let tipoLote = document.createElement('h2');
                tipoLote.className = 'prices__title';
                tipoLote.innerText = proyecto.data().etapas[i].Lotes[j].TipoLote;

                /* Se mete el elemento con el tipo de lote dentro del contenedor de los precios de la etapa */
                detallesEtapa.appendChild(tipoLote);

                /* Se crea el elemento contenedor de la descripcion del lote */
                let descripcionLote = document.createElement('ul');
                descripcionLote.className = 'prices__description';
                descripcionLote.innerHTML = `
                    <li class="prices__item">
                        ${proyecto.data().etapas[i].Lotes[j].PrecioVara}
                    </li>
                    <li class="prices__item">
                        ${proyecto.data().etapas[i].Lotes[j].CostoTotal}
                    </li>
                    <li class="prices__item">
                        ${proyecto.data().etapas[i].Lotes[j].Prima}
                    </li>
                    <li class="prices__item">
                        ${proyecto.data().etapas[i].Lotes[j].AFinanciar}
                    </li>
                    <li class="prices__item">
                        ${proyecto.data().etapas[i].Lotes[j].Cuota}
                    </li>
                `;

                /* Se mete el elemento con la descripcion del lote dentro de los precios de la etapa */
                detallesEtapa.appendChild(descripcionLote);
                infoEtapa.appendChild(detallesEtapa);
            }
            preciosEtapa.appendChild(infoEtapa);
            /* Se crea el enlace de contacto */
            let enlaceContacto = document.createElement('a');
            enlaceContacto.className = 'stage__btn';
            enlaceContacto.innerText = 'Contáctanos';
            enlaceContacto.href = `https://wa.me/50497842424?text=Acabo%20de%20visitar%20su%20sitio%20web%20y%20me%20encuentro%20interesado%20en%20la%20etapa%20${proyecto.data().etapas[i].TituloEtapa}%20del%20proyecto%20${proyecto.data().nombre},%20espero%20puedan%20brindarme%20información%20lo%20mas%20pronto%20posible.`;
            enlaceContacto.target = '_blank';

            /* Se mete el contenedor del enlace de contacto dentro del contendor de los precios de la etapa */
            preciosEtapa.appendChild(enlaceContacto);

            let enlaceCotizar = document.createElement('a');
            enlaceCotizar.className = 'stage__btn';
            enlaceCotizar.innerText = 'Aplicar';
            enlaceCotizar.href = 'https://inmobiliariazunigahn.web.app/cotizador';
            preciosEtapa.appendChild(enlaceCotizar);


            /* Se meten los precios de la etapa dentro de su contenedor */
            contenedorPreciosEtapa.appendChild(preciosEtapa);


            /* Se mete el contenedor de los precios de las etapas dentro del contenedor de los detalles de la etapa */
            contenedorDetallesEtapa.appendChild(contenedorPreciosEtapa);


            /* Se mete el contenedor de los detalles de la etapa dentro del contenedor de la etapa */
            contenedorEtapa.appendChild(contenedorDetallesEtapa);

            /* Se mete el contenedor de la etapa dentro del contenedor de las etapas */
            contenedorEtapas.appendChild(contenedorEtapa);

            /* Se mete el contenedor de la etapa dentro del contenedor de las etapas */
            allStages.appendChild(contenedorEtapas);
        }

    })

    /* Se obtiene el id desde la url */
    projecToShow = window.location.href.split('#')[1];

    if (projecToShow != '') {
        mostrarEtapa(projecToShow);
    }

}).catch(() => {
    mostrarError(contenedorProyectos);
})

function mostrarEtapa(idToShow) {
    let stagesChild = allStages.children;
    for (let i = 0; i < stagesChild.length; i++) {
        if (stagesChild[i].id == idToShow) {
            stagesChild[i].style.display = 'block';
            open(`#${idToShow}`, '_self');
        } else {
            stagesChild[i].style.display = 'none';
        }
    }
}