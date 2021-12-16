/* Se obtiene el contenedor de cada una de las categorias de la propiedad */
let propertiesofcategory = document.querySelectorAll(".category__properties");

/* Se recorre el contenedor de cada categorias y se oculta su contenido */
propertiesofcategory.forEach(category => {
    category.style.display = "none";
})

/* Se obtienen todos los contenedores de propiedades */
let allproperties = document.querySelectorAll(".category__property");

/* Se le pone una opacidad de 0 a cada una de las propiedades */
allproperties.forEach(property => {
    property.style.opacity = "0";
})

/* Se obtiene el contenedor de la informacion de las categorias */
let categories = document.querySelectorAll(".category__info");

/* Se recorre el contenedor de la info de todas las categorias */
categories.forEach(category => {
    /* Por cada categoria se agrega el evento de click */
    category.addEventListener("click", (e) => {
        /* Al dar click se llama la funcion para mostarar u ocultar la categoria en cuestion */
        showHideCategory(e.target.lastElementChild);
    });
});

const setCategoryCookie = (catId) => {
    document.cookie = `ultimacategoria = ${catId}`;
}

let lastVisitedCat = obtenerCookies().ultimacategoria; 
if (lastVisitedCat !== undefined && lastVisitedCat !== '') {
    open(`https://inmobiliariazunigahn.web.app/propiedades#${lastVisitedCat}`, '_self');
}

/* Se obtiene el id de la url */
let newSiteUrl = window.location.href.split("#")[1] ?? '';

/* Funcion para mostrar u ocultar una categoria; recibe de parametro el icono de la categoria para abrir */
function showHideCategory(icon) {
    if (icon.classList.contains("fa-chevron-down")) {
        /* En caso de que la seccion no este desplegada */
        icon.classList.remove("fa-chevron-down");
        icon.classList.add("fa-chevron-up");
        icon.parentElement.nextElementSibling.style.display = "grid";
        /* Se les aplica una animacion para aparecer a las propiedades de la categoria */
        for (let i = 0; i < icon.parentElement.nextElementSibling.children.length; i++) {
            icon.parentElement.nextElementSibling.children[i].style.animation = "unvanish .8s forwards"
        }

        // Codigo para cargar la ultima categoria de propiedades visitada

        setCategoryCookie(icon.parentElement.parentElement.id);
    } else {
        /* En caso de que la seccion si este desplegada */
        icon.classList.add("fa-chevron-down");
        icon.classList.remove("fa-chevron-up");
        /* Se le aplica una animacion de desvanecer a las propiedades de la categoria */
        for (let i = 0; i < icon.parentElement.nextElementSibling.children.length; i++) {
            icon.parentElement.nextElementSibling.children[i].style.animation = "vanish .8s forwards";
        }
        /* Despues de el segundo de la animacion se le aplica un display none al contenedor de las propiedades de la categoria */
        setTimeout(() => {
            icon.parentElement.nextElementSibling.style.display = "none";
        }, 500);
    }
}

window.onload = () => {
    if (
        newSiteUrl != "renta" &&
        newSiteUrl != "venta" &&
        newSiteUrl != ""
    ) {
        showSelectedCategory(newSiteUrl);
    }
}

let allmainlinks = document.querySelectorAll(".main__link");

allmainlinks.forEach(mainlink => {
    mainlink.addEventListener("click", (e) => {
        resetCategories();
        newSiteUrl = e.target.href.split("#")[1];
        if (newSiteUrl == 'venta') {
            mostrarPropiedadesVenta();
        } else {
            mostrarPropiedadesRenta();
        }
    });
})

/* Se obtienen todos los iconos de las categorias */
let allpropertiesicons = document.querySelectorAll(".category__arrow");

let categoriaEstado;

let allfooterlinks = document.querySelectorAll(".column__link");
allfooterlinks.forEach(footerLink => {
    footerLink.addEventListener("click", (e) => {
        categoriaEstado = e.target.href.split("#")[1];
        showSelectedCategory(categoriaEstado);
    });
})


function showSelectedCategory(categoriaEstado) {
    resetCategories();
    /* Se obtiene la categoria que se desea ver */
    let categoriaSeleccionada = categoriaEstado.split('-')[0];
    let estadoCategoria = categoriaEstado.split('-')[1];

    let iconoCategoriaSeleccionada = showState(estadoCategoria, categoriaSeleccionada);

    if (iconoCategoriaSeleccionada != undefined) {
        showHideCategory(iconoCategoriaSeleccionada);
    }
}

function getCategoryIcon(contenedor, categoriaSeleccionada) {
    for (let i = 0; i < contenedor.children.length; i++) {
        if (contenedor.children[i].classList.contains(categoriaSeleccionada)) {
            return contenedor.children[i].firstElementChild.lastElementChild;
        }
    }
}


function resetCategories() {
    /* Se oculta el contenido de todas las categorias */
    propertiesofcategory.forEach(category => {
        category.style.display = "none";
    });

    /* Se sustituye el icono de flecha hacia arriba por un icono hacia abajo */
    allpropertiesicons.forEach(propertieicon => {
        propertieicon.classList.remove("fa-chevron-up");
        propertieicon.classList.add("fa-chevron-down");
    });
}

function showState(state, categoriaSeleccionada) {
    if (state == 'venta') {
        mostrarPropiedadesVenta();
        return getCategoryIcon(contenedorCategoriasEnVenta, categoriaSeleccionada);
    }

    mostrarPropiedadesRenta();
    return getCategoryIcon(contenedorCategoriasEnRenta, categoriaSeleccionada);
}