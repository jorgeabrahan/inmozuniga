// let exchangeRate = "https://v6.exchangerate-api.com/v6/a79b974529e7d03cb27cde51/latest/USD";

let dollarToHNL;

let exchange = document.querySelector('.exchange');

window.addEventListener('DOMContentLoaded', () => {
    /* Se obtiene la tabla con los valores de conversion del dolar */
    let tablaConValores = document.querySelector('table');
    /* Se obtiene el valor en lempiras del dolar de la tabla */
    let valorLempiras = tablaConValores.firstElementChild.children[1].lastElementChild.innerText.replace(/\L/g, '');
    /* Se convierte a numeros la cantidad de lempiras que son un dolar */
    dollarToHNL = Number(valorLempiras);
    /* Se oculta la tabla */
    tablaConValores.style.display = 'none';
    /* Se muestra el valor equivalente en lempiras del dolar */
    exchange.innerText = `Aprox. 1 USD = ${dollarToHNL} HNL`;
})


let opcionesMancomunado = document.querySelectorAll('.form-projects__group--mancomunado');
//Se ocultan todas las opciones para pago mancomunado
opcionesMancomunado.forEach(opcionMancomunado => {
    opcionMancomunado.classList.add('d-none');
})


let pagoMancomunado = document.getElementById('pagoMancomunado');

pagoMancomunado.addEventListener('change', mostrarOpcionesMancomunado);

let edadPrimerCliente = document.getElementById('edadPrimerCliente');
let edadSegundoCliente = document.getElementById('edadSegundoCliente');


let salarioPrimerCliente = document.getElementById('salarioPrimerCliente');
let salarioSegundoCliente = document.getElementById('salarioSegundoCliente');

let btnFormularioCotizar = document.getElementById('btnFormularioCotizar');

//Se muestran y ocultan las opciones de pago mancomunado
function mostrarOpcionesMancomunado() {
    opcionesMancomunado.forEach(opcionMancomunado => {
        opcionMancomunado.classList.toggle('d-none');

        //Se cambia el tamaño de los inputs que quedan solos
        edadPrimerCliente.classList.toggle('form-projects__input--nosection');
        salarioPrimerCliente.classList.toggle('form-projects__input--nosection');
    })
}

edadPrimerCliente.addEventListener('keydown', soloNumeros);
edadSegundoCliente.addEventListener('keydown', soloNumeros);

salarioPrimerCliente.addEventListener('keydown', soloNumeros);
salarioSegundoCliente.addEventListener('keydown', soloNumeros);

let msgFormularioCotizar = document.getElementById('msgFormularioCotizar');

function soloNumeros(e) {
    if (
        e.keyCode != 37
        &&
        e.keyCode != 39
        &&
        e.keyCode != 8
        &&
        e.keyCode != 9
        &&
        e.keyCode < 46
        ||
        e.keyCode > 57
    ) {
        e.returnValue = false;
        msgFormularioCotizar.innerText = "Solo escriba numeros en la casilla de salario y edad.";
    }
}

salarioPrimerCliente.addEventListener('input', calcularTotal);
salarioSegundoCliente.addEventListener('input', calcularTotal);

let totalSalarios = document.getElementById('totalSalarios');

function calcularTotal() {
    totalSalarios.value = Number(salarioPrimerCliente.value) + Number(salarioSegundoCliente.value);
}

let lugarDeTrabajo = document.getElementById('lugarDeTrabajo');

let lugarDeTrabajoSegundo = document.getElementById('lugarDeTrabajoSegundo');

let aniosAntiguedad = document.getElementById('aniosAntiguedad');

let aniosAntiguedadSegundo = document.getElementById('aniosAntiguedadSegundo');

lugarDeTrabajo.addEventListener('change', () => {
    evaluarAntiguedad(lugarDeTrabajo.value, aniosAntiguedad.value)
});

lugarDeTrabajoSegundo.addEventListener('change', () => {
    evaluarAntiguedad(lugarDeTrabajoSegundo.value, aniosAntiguedadSegundo.value)
});

aniosAntiguedad.addEventListener('change', () => {
    evaluarAntiguedad(lugarDeTrabajo.value, aniosAntiguedad.value)
});

aniosAntiguedadSegundo.addEventListener('change', () => {
    evaluarAntiguedad(lugarDeTrabajoSegundo.value, aniosAntiguedadSegundo.value) 
});

function evaluarAntiguedad(lugar, antiguedad) {
    btnFormularioCotizar.removeAttribute('disabled', 'disabled');

    msgFormularioCotizar.innerText = "";

    if (lugar == 'asalariado') {
        if (Number(antiguedad) < 1) {
            msgFormularioCotizar.innerText = "Siendo asalariado debe tener 1 año de antiguedad minimo.";
            btnFormularioCotizar.setAttribute('disabled', 'disabled');
        }
        return;
    }
    //Si la persona es comerciante individual
    if (Number(antiguedad < 2)) {
        msgFormularioCotizar.innerText = "Siendo comerciante individual debe tener 2 años de antiguedad minimo.";
        btnFormularioCotizar.setAttribute('disabled', 'disabled');
    }
}

btnFormularioCotizar.addEventListener('click', evaluarFormulario);

function evaluarFormulario() {

    //Si no ha llenado algun campo
    if (
        edadPrimerCliente.value == ''
        ||
        salarioPrimerCliente.value == ''
    ) {
        msgFormularioCotizar.innerText = "Debes llenar todos los campos antes de continuar.";
        return;
    }

    //Se evalua la edad del primer cliente
    if (edadSuficiente(edadPrimerCliente.value) == false) {
        msgFormularioCotizar.innerText = "No cuentas con la edad suficiente.";
        return;
    }

    //Se declara una variable que almacene el ingreso total independientemente de si es mancomunado o no
    let ingresosTotales;

    //Si va a pagar mancomunado
    if (pagoMancomunado.checked) {
        //Si no ha llenado los campos de mancomunado
        if (
            edadSegundoCliente.value == ''
            ||
            salarioSegundoCliente.value == ''
        ) {
            msgFormularioCotizar.innerText = "Debes llenar todos los campos antes de continuar.";
            return;
        }

        ingresosTotales = totalSalarios.value;


        //Si es mancomunado se evalua la edad del segundo cliente
        if (edadSuficiente(edadSegundoCliente.value) == false) {
            return;
        }
    } else {
        //Si el cliente no lo va a pagar mancomunado
        ingresosTotales = salarioPrimerCliente.value
    }

    //Si el total de salario mancomunado es menor a 28000
    if (salarioSuficiente(ingresosTotales) == false) {
        return;
    }

    msgFormularioCotizar.innerText = "";


    mostrarOpcionesSegunPresupuesto(ingresosTotales);

    document.forms[0].classList.add('d-none');
}


function salarioSuficiente(salario) {
    if (Number(salario) < 26000) {
        msgFormularioCotizar.innerText = "El salario no es suficiente para aplicar a uno de nuestros proyectos.";
        return false;
    }
}

function edadSuficiente(edad) {
    if (Number(edad) < 21) {
        msgFormularioCotizar.innerText = "No cuentas con la edad suficiente.";
        return false;
    }
}


/* Se obtienen todas las opciones de los proeyctos */
let opcionesProyectos = document.querySelectorAll('.project__option');

let preferenciaCliente = document.getElementById('preferenciaCliente');

function mostrarOpcionesSegunPresupuesto(ingresosTotales) {
    exchange.style.display = 'block';
    opcionesProyectos.forEach(opcionProyecto => {

        //Se evalua si la preferencia del cliente coincide con el proyecto
        if (preferenciaCliente.value == opcionProyecto.classList[1]) {
            //Se evalua si los ingresos del cliente son mayores al minimo del proyecto
            let ingresoMinimoRequerido = Number(opcionProyecto.classList[2]);
            //En caso de que el valor este en dolares
            if (ingresoMinimoRequerido < 5000) {
                //Se convierte a lempiras
                ingresoMinimoRequerido *= dollarToHNL;
            }

            //Si los ingresos son mayores que el minimo requerido
            if (ingresosTotales > ingresoMinimoRequerido) {

                //Se muestran los proyectos a los que aplica
                opcionProyecto.classList.remove('d-none');
                opcionProyecto.parentElement.firstElementChild.classList.remove('d-none');
            }
        }
    })
}

