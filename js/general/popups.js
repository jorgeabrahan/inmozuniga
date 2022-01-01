'use strict';
const obtenerCookies = () => {
    return document.cookie.split(';').map(cookie => cookie.split('=')).reduce((accumulator, [key, value]) =>
    ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }),
    {});
}
const parseBool = val => val === 'true' ? true : false;
const showPopup = (cnt, cookieNewVal) => {
    cnt.classList.remove('d-none');
    document.cookie = cookieNewVal;
}

//Se obtienen los valores de las cookies
const cookiePopup = obtenerCookies().mostrarcookies;
const mailPopup = obtenerCookies().mostrarmails;

//Se definen si no existen
if (cookiePopup === undefined) document.cookie = 'mostrarcookies = true';
if (mailPopup === undefined) document.cookie = 'mostrarmails = true';

//Se muestran si no se han mostrado
if (parseBool(cookiePopup)) showPopup(document.querySelector('.cookies'), 'mostrarcookies = false');
setTimeout(() => {
    if (parseBool(mailPopup)) showPopup(document.querySelector('.popup'), 'mostrarmails = false');
}, 30000)
