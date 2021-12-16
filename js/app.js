const firebaseConfig = {
    apiKey: "AIzaSyDIS8nlyOLjVHwK9C9Mqs-eF-4AxgBs29U",
    authDomain: "inmobiliariazunigahn.firebaseapp.com",
    projectId: "inmobiliariazunigahn",
    storageBucket: "inmobiliariazunigahn.appspot.com",
    messagingSenderId: "643368075781",
    appId: "1:643368075781:web:59492d93ae9c08f118126c",
    measurementId: "G-39R41BL039"
};

firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();
let storageRef = firebase.storage().ref();

function mostrarError(contenedor) {
    let mensajeError = document.createElement('p');
    mensajeError.innerHTML = `
        ¡Ups! parece que tuvimos problemas al cargar este apartado. Da click en este mensaje para recargar la página.
    `;
    mensajeError.style.cursor = 'pointer';
    mensajeError.style.fontFamily = 'CabinBold';
    mensajeError.style.fontSize = '1.4em';
    mensajeError.addEventListener('click', () => {
        location.reload();
    })

    contenedor.appendChild(mensajeError);
}

let icono;
let contenedorSlider;


function ampliarSlider(e) {
    icono = e.target.firstElementChild;
    contenedorSlider = e.target.parentElement;


    if (icono.classList.contains('fa-expand')) {
        abrirSlider(icono, contenedorSlider);

    } else {
        cerrarSliderAmpliado(icono, contenedorSlider);
    }

}


function cerrarSliderAmpliado(icono, contenedorSlider) {
    icono.classList.add('fa-expand');
    icono.classList.remove('fa-compress');
    contenedorSlider.classList.remove('expand__slider');

    contenedorAtajos.children[2].classList.add('d-none');

    for (let i = 0; i < contenedorSlider.firstElementChild.children.length; i++) {
        contenedorSlider.firstElementChild.children[i].firstElementChild.style.maxHeight = '38rem';
    }
}

function abrirSlider(icono, contenedorSlider) {

    icono.classList.remove('fa-expand');
    icono.classList.add('fa-compress');
    contenedorSlider.classList.add('expand__slider');

    for (let i = 0; i < contenedorSlider.firstElementChild.children.length; i++) {
        contenedorSlider.firstElementChild.children[i].firstElementChild.style.maxHeight = '90vh';
    }
}

/* Se obtiene el contenedor de mas informacion de la propiedad */
let contenedorMasInfoPropiedad = document.querySelector('#masinfopropiedad');

/* Se obtiene el boton para cerrar el banner de las cookies */
let btnCookies = document.querySelector('.cookies__btn');

/* Se obtiene el contenedor de las cookies */
let contenedorCookies = document.querySelector('.cookies');

/* Si aun no se ha creado la cookie */
if (obtenerCookies().mostrarPopupCookie === undefined) {
    /* Se crea */
    document.cookie = "mostrarPopupCookie = true";
}

/* En caso de que aun no se haya mostrado el popup de cookies */
if (obtenerCookies().mostrarPopupCookie === 'true') {
    contenedorCookies.classList.remove('d-none');
}

btnCookies.addEventListener('click', () => {
    /* Se oculta el contenedor de las cookies */
    contenedorCookies.classList.add('d-none');
    /* Se cambia el valor para no volver a mostrar el mensaje de cookies */
    document.cookie = "mostrarPopupCookie = false";
})



function obtenerCookies() {
    let cookies;
    /* Se obtienen las cookies */
    cookies = document.cookie.split(';').map(cookie => cookie.split('=')).reduce((accumulator, [key, value]) =>
        ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }),
        {});
    return cookies;
}


/* Codigo para cambiar el tamaño del header al hacer scroll */
const header = document.querySelector('.header');
const banner = document.querySelector('.banner');

const bannerOptions = {
    rootMargin: "-100px 0px 0px 0px"
}

const bannerObserver = new IntersectionObserver((
    entries
) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            header.classList.add('scrolled-header');
        } else {
            header.classList.remove('scrolled-header');
        }
    })
}, bannerOptions)

if (banner != null) {
    bannerObserver.observe(banner);
}


const equiv = {
    'á': 'a',
    'é': 'e',
    'í': 'i',
    'ó': 'o',
    'ú': 'u',
}

// Expresion regular para encontrar letras con acento en una palabra
let regexAccent = /[^A-Za-z]/g;

const removeAccents = (idProject) => {
    let findAccent = idProject.match(regexAccent);
    // Si el id tiene letras con acento
    if (findAccent !== null) {
        // Para cada letra con acento
        for (char of findAccent) {
            /* Se busca la equivalencia del caracter sin acento */
            Object.keys(equiv).find(key => {
                // Al encontrar la equivalencia
                if (key == char) {
                    //Se sustituye el caracter con acento por su equivalencia sin acento
                    idProject = idProject.replace(char, equiv[key]);
                }
            })
        }
    }

    return idProject;
}