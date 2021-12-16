
window.addEventListener('DOMContentLoaded', () => {
    let popup = document.querySelector('.popup');
    popup.addEventListener('click', () => popup.classList.add('d-none'))
    
    //Si aun no existe la cookie para mostrar el popup
    if (obtenerCookies().mostrarPopupEmail === undefined) {
        document.cookie = "mostrarPopupEmail = true";
    }

    // Se verifica que aun no se haya mostrado el popup
    if (obtenerCookies().mostrarPopupEmail === 'true') {
        setTimeout(() => {
            //Se muestra el popup
            popup.classList.remove('d-none');

            //Se le agrega una animacion al popup
            popup.firstElementChild.style.animation = 'emailEntrance 1s ease 0s 1 normal forwards';

            //Se cambia el valor de la cookie para no mostrar el popup de nuevo
            document.cookie = "mostrarPopupEmail = false";
        }, 60000);
    }

})



