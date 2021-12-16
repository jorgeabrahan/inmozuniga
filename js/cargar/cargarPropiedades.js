/* Para dar formato de dolar */
const formatoDolar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
})


/* Se obtiene el contenedor de las propiedades en venta */
let contenedorCategoriasEnVenta = document.querySelector('#PropiedadesEnVenta').firstElementChild;
/* Se obtiene el contenedor de las propiedades en renta */
let contenedorCategoriasEnRenta = document.querySelector('#PropiedadesEnRenta').firstElementChild;

let categoriaFormatted;

db.collection('PROPIEDADES').get().then(propiedades => {
    propiedades.forEach(propiedad => {
        /* Se crea el contenedor de la propiedad */
        let contenedorPropiedad = document.createElement('div');
        
        contenedorPropiedad.addEventListener('click', () => {
            open(`propiedad#${propiedad.id}`, '_self');
        })

        contenedorPropiedad.className = 'category__property';

        /* Se obtiene la url de una imagen de la propiedad */
        let unaImagen = 0;
        storageRef.child(`img/propiedades/${propiedad.id}`).listAll().then(file => {
            file.items.forEach(item => {
                if (unaImagen < 1) {
                    item.getDownloadURL().then(url => {
                        /* Se crea el elemento de imagen */
                        let imagenPropiedad = document.createElement('img');
                        imagenPropiedad.src = url;
                        imagenPropiedad.className = 'property__image';
                        imagenPropiedad.loading = 'lazy';
                        let rutaImagen = item._delegate._location.path_;
                        let arrayRutaImagen = rutaImagen.split('/');
                        imagenPropiedad.alt = arrayRutaImagen[arrayRutaImagen.length - 1];

                        imagenPropiedad.style.minHeight = "15rem";
                        imagenPropiedad.style.objectFit = 'cover';
                        /* Se mete la imagen dentro del contenedor de la imagen */
                        contenedorPropiedad.prepend(imagenPropiedad);
                    });
                    unaImagen++;
                }
            })

        });

        /* Se crea el elemento para los detalles de la propiedad */
        let detallesPropiedad = document.createElement('div');
        detallesPropiedad.className = 'property__details';
        detallesPropiedad.innerHTML = `
            <h2 class="property__title">
                ${propiedad.data().NombrePropiedad}
            </h2>
        `;

        /* Se mete el contenedor de los detalles dentro del contenedor de la propiedad */
        contenedorPropiedad.appendChild(detallesPropiedad);

        /* Se crea el elemento para la descripcion de la propiedad */
        let descripcionPropiedad = document.createElement('p');
        descripcionPropiedad.className = 'property__description';
        let descripcion = propiedad.data().DescripcionPropiedad;
        if (descripcion.length > 60) {
            let descripcionResumida = descripcion.slice(0, 60);
            descripcionPropiedad.innerHTML = `${descripcionResumida}...`;
        } else {
            descripcionPropiedad.innerHTML = `${descripcion}`;
        }

        /* Se mete la descripcion de la propiedad dentro del contenedor de la propiedad */
        contenedorPropiedad.appendChild(descripcionPropiedad);

        /* Se crea el elemento contenedor del enlace */
        let contenedorEnlacePropiedad = document.createElement('div');
        contenedorEnlacePropiedad.className = 'property__btn-container';
        contenedorEnlacePropiedad.innerHTML = `
            <a href="https://inmobiliariazunigahn.web.app/propiedad#${propiedad.id}" class="property__btn">
                Me Interesa
            </a>
        `;

        /* Se mete el contenedor del enlace dentro del contenedor de la propiedad */
        contenedorPropiedad.appendChild(contenedorEnlacePropiedad);

        /* Se pasa la categoria de la propiedad a minuscula y se le quitan los espacios */
        categoriaFormatted = propiedad.data().CategoriaPropiedad.toLowerCase().replace(/\s/g, '');

        if (propiedad.data().EstadoPropiedad == "Venta") {
            /* Si la propiedad esta en venta */
            ordenarPorCategoria(contenedorCategoriasEnVenta, categoriaFormatted, contenedorPropiedad);
        } else {
            /* Si la propiedad esta en renta */
            ordenarPorCategoria(contenedorCategoriasEnRenta, categoriaFormatted, contenedorPropiedad);
        }

    })

    /* Se llama una funcion que revise que categorias estan vacias */
    revisarPorCategoriasVacias();
    
}).catch(() => {
    mostrarError();
})


function ordenarPorCategoria(contenedorCategorias, categoriaPropiedad, contenedorPropiedad) {
    for (let i = 0; i < contenedorCategorias.children.length; i++) {
        if (contenedorCategorias.children[i].classList.contains(categoriaPropiedad)) {
            contenedorCategorias.children[i].lastElementChild.appendChild(contenedorPropiedad);
        }
    }
}


function revisarPorCategoriasVacias() {
    encontrarCategoriasVacias(contenedorCategoriasEnVenta);
    encontrarCategoriasVacias(contenedorCategoriasEnRenta);
}

function encontrarCategoriasVacias(contenedorCategoria) {
    let msgCategoriaVacia;
    let contenedorPropiedades;
    let nombreCategoria;

    for (let i = 0; i < contenedorCategoria.children.length; i++) {
        /* Se obtiene el contenedor de las propiedades de cada categoria */
        contenedorPropiedades = contenedorCategoria.children[i].lastElementChild;

        nombreCategoria = contenedorCategoria.children[i].firstElementChild.firstElementChild.innerText;
        /* Si el contenedor de las propiedades de la categoria esta vacio */
        if (contenedorPropiedades.children.length == 0) {
            /* Se crea el elemento con el mensaje para las categorias vacias */
            msgCategoriaVacia = document.createElement('p');
            msgCategoriaVacia.className = 'category__message';
            msgCategoriaVacia.innerHTML = `De momento no contamos con ${nombreCategoria}, pero puedes <a href="https://inmobiliariazunigahn.web.app/contactanos#SeccionContacto">contactárnos</a> y te ayudaremos a encontrar lo que buscas.`;
            /* Se le agrega un mensaje */
            contenedorPropiedades.appendChild(msgCategoriaVacia);
        }
    }
}