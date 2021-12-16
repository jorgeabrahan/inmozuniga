/* Se obtiene el contenedor de las propiedades */
let contenedorPropiedadesInicio = document.querySelector('#contenedorPropiedadesInicio');

/* Para dar formato de dolar */
const formatoDolar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
})

db.collection('PROPIEDADES').get().then(propiedades => {
    propiedades.forEach(propiedad => {
        /* El maximo de propiedades que se pueden cargar son 3 */
        if (contenedorPropiedadesInicio.children.length < 3) {
            /* Se crea el elemento contenedor de la propiedad */
            let contenedorPropiedad = document.createElement('article');
            contenedorPropiedad.className = 'property';

            /* Funcion para que muestre la informacion de la propiedad independientemente de adonde le den click */
            contenedorPropiedad.onclick = (e) => {
                if (!e.target.classList.contains('property__link')) {
                    let enlacePropiedad = e.target.lastElementChild.lastElementChild.firstElementChild.href;
                    open(`${enlacePropiedad}`, '_self');
                }
            }


            /* Se crea el contenedor de la imagen */
            let contenedorImagenPropiedad = document.createElement('figure');
            contenedorImagenPropiedad.className = 'property__img-container';
            contenedorImagenPropiedad.style.pointerEvents = 'none';

            /* Se obtiene la url de una imagen de la propiedad */
            let unaImagen = 0;
            storageRef.child(`img/propiedades/${propiedad.id}`).listAll().then(file => {
                file.items.forEach(item => {
                    if (unaImagen < 1) {
                        item.getDownloadURL().then(url => {
                            /* Se crea el elemento de imagen */
                            let imagenPropiedad = document.createElement('img');
                            imagenPropiedad.src = url;
                            imagenPropiedad.className = 'property__img';
                            imagenPropiedad.loading = 'lazy';
                            let rutaImagen = item._delegate._location.path_;
                            let arrayRutaImagen = rutaImagen.split('/');
                            imagenPropiedad.alt = arrayRutaImagen[arrayRutaImagen.length - 1];
                            imagenPropiedad.style.pointerEvents = 'none';

                            /* Se mete la imagen dentro del contenedor de la imagen */
                            contenedorImagenPropiedad.appendChild(imagenPropiedad);
                        });
                        unaImagen++;
                    }

                })
            });

            /* Se mete el contenedor de la imagen dentro del contenedor de la propiedad */
            contenedorPropiedad.appendChild(contenedorImagenPropiedad);

            /* Se crea el contenedor de la informacion */
            let contenedorInformacionPropiedad = document.createElement('div');
            contenedorInformacionPropiedad.className = 'property__info';
            contenedorInformacionPropiedad.style.pointerEvents = 'none';

            /* Se crea el contenedor de los detalles de la propiedad */
            let contenedorDetallesPropiedad = document.createElement('div');
            contenedorDetallesPropiedad.className = 'property__details';

            contenedorDetallesPropiedad.innerHTML = `
                <h3 class="property__name">
                    ${propiedad.data().NombrePropiedad}
                </h3>
            `;

            /* Se mete el contenedor de los detalles dentro del cotnenedor de la informacion */
            contenedorInformacionPropiedad.appendChild(contenedorDetallesPropiedad);


            /* Se crea el contenedor de la categoria de la propiedad */
            let contenedorCategoriaPropiedad = document.createElement('p');
            contenedorCategoriaPropiedad.className = 'property__category';
            contenedorCategoriaPropiedad.innerHTML = `
                <i class="flaticon-tag icon"></i>
                ${propiedad.data().CategoriaPropiedad}
            `;

            /* Se mete el contenedor de la categoria de la propiedad dentro de la informacion de la propiedad */
            contenedorInformacionPropiedad.appendChild(contenedorCategoriaPropiedad);


            /* Se crea el contenedor de los links de la propiedad */
            let contenedorLinksPropiedad = document.createElement('div');
            contenedorLinksPropiedad.className = 'property__links';

            /* Se crea el enlace de me interesa de la propiedad */
            let enlaceMeInteresaPropiedad = document.createElement('a');
            enlaceMeInteresaPropiedad.className = 'property__link';
            enlaceMeInteresaPropiedad.innerText = 'Saber más';
            enlaceMeInteresaPropiedad.href = `https://inmobiliariazunigahn.web.app/propiedad#${propiedad.id}`;
            enlaceMeInteresaPropiedad.style.pointerEvents = 'all';

            /* Se mete el enlace de me interesa dentro del contenedor de los enlaces */
            contenedorLinksPropiedad.appendChild(enlaceMeInteresaPropiedad);

            /* Si la propiedad tiene video */
            if (propiedad.data().url != '') {
                /* Se crea el enlace para el video de la propiedad */
                let enlaceVideoPropiedad = document.createElement('a');
                enlaceVideoPropiedad.className = 'property__link';
                enlaceVideoPropiedad.innerText = 'Ver video';
                enlaceVideoPropiedad.style.pointerEvents = 'all';
                enlaceVideoPropiedad.href = propiedad.data().url;
                enlaceVideoPropiedad.target = '_blank';

                /* Se mete el enlace del video dentro del contenedor de los enlaces */
                contenedorLinksPropiedad.appendChild(enlaceVideoPropiedad);
            }


            /* Se mete el contenedor de los links dentro del contenedor de la informacion propiedad */
            contenedorInformacionPropiedad.appendChild(contenedorLinksPropiedad);


            /* Se mete el contenedor de la informacion de la propiedad dentro del contenedor de la propiedad */
            contenedorPropiedad.appendChild(contenedorInformacionPropiedad);

            /* Se mete el contenedor de la propiedad dentro del contenedor de las propiedades */
            contenedorPropiedadesInicio.appendChild(contenedorPropiedad);
        }

    })

}).catch(() => {
    mostrarError(contenedorPropiedadesInicio);
})