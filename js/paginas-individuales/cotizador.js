'use strict';

window.onload = () => {    
    document.querySelector('table').style.display = 'none';
    const equivUsd = Number(document.querySelector('table').rows[1].cells[1].innerText.replace(/\L/g, ''));
    document.querySelector('.exchange').innerText = `Aprox. 1 USD = ${equivUsd} HNL`;

    
    const inptMancomunado = document.getElementById('inptMancomunado');
    inptMancomunado.addEventListener('change', () => {
        document.querySelectorAll('.group--mancomunado').forEach(opt => {
            opt.classList.toggle('d-none');
            if (!opt.classList.contains('d-none')) {
                opt.lastElementChild.setAttribute('required', 'required');
                return;
            }
            opt.lastElementChild.removeAttribute('required', 'required');
        });
    });

    const salaryFrst = document.getElementById('salaryFrst');
    const salaryScnd = document.getElementById('salaryScnd');
    const calcularTotal = () => {
        document.getElementById('totSalary').value = Number(salaryFrst.value) + Number(salaryScnd.value);
    }
    salaryFrst.addEventListener('input', calcularTotal);
    salaryScnd.addEventListener('input', calcularTotal);


    const frmCotizador = document.getElementById('frmCotizador');
    const btnFrmCotizador = document.getElementById('btnFrmCotizador');
    const msgErrCotizador = document.getElementById('msgErrCotizador');

    const evAntiquity = (wrkPlace, antiquity) => {
        antiquity = Number(antiquity);
        msgErrCotizador.innerText = "";
        btnFrmCotizador.removeAttribute('disabled', 'disabled');
    
        let minAntiquity = 1;
        if (wrkPlace === 'comerciante') minAntiquity = 2;

        if (antiquity < minAntiquity) {
            msgErrCotizador.innerText = `Como ${wrkPlace} el minimo de años requeridos son: ${minAntiquity}.`;
            btnFrmCotizador.setAttribute('disabled', 'disabled');
        }
    }
    
    frmCotizador.wrkPlaceFrst.addEventListener('change', e => {
        evAntiquity(e.target.value, frmCotizador.antiquityFrst.value);
    });
    frmCotizador.wrkPlaceScnd.addEventListener('change', e => {
        evAntiquity(e.target.value, frmCotizador.antiquityScnd.value);
    });
    frmCotizador.antiquityFrst.addEventListener('change', e => {
        evAntiquity(frmCotizador.wrkPlaceFrst.value, e.target.value);
    });
    frmCotizador.antiquityScnd.addEventListener('change', e => {
        evAntiquity(frmCotizador.wrkPlaceScnd.value, e.target.value); 
    });

    for (let inpt of frmCotizador.elements) {
        if (inpt.type == 'number') {
            inpt.addEventListener('input', e => {
                if (isNaN(Number(e.data))) inpt.value = inpt.value.replace(e.data, '');
            })
        }
    }

    const optsAcrdIncome = totIncome => {
        document.querySelector('.exchange').style.display = 'block';

        document.querySelectorAll('.project__option').forEach(prjOpt => {

            let incomeReq = Number(prjOpt.classList[2]);
            if (incomeReq < 5000) incomeReq *= equivUsd;

            let prefVal = document.getElementById('preferences').value;
            
            //Si no escogio todos se evaluan sus preferencias
            if (prefVal !== 'todos') if (prefVal !== prjOpt.classList[1]) return;
            //Si no cuenta con el minimo de ingresos requeridos
            if (totIncome < incomeReq) return;

            prjOpt.classList.remove('d-none');
            prjOpt.parentElement.firstElementChild.classList.remove('d-none');
        })
    }

    const chkAge = inptAge => {
        if (inptAge.required && Number(inptAge.value) < 21) {
            msgErrCotizador.innerText = "Edad insuficiente.";
            return true;
        }
        return false;
    }

    frmCotizador.addEventListener('submit', e => {
        e.preventDefault();
        
        if (chkAge(frmCotizador.ageFrst)) return;
        if (chkAge(frmCotizador.ageScnd)) return;
    
        let totIncome = salaryFrst.value;
        if (inptMancomunado.checked) totIncome = document.getElementById('totSalary').value;
    
        if (Number(totIncome) < 26000) {
            msgErrCotizador.innerText = "Salario insuficiente.";
            return;
        }
    
        optsAcrdIncome(totIncome);
        msgErrCotizador.innerText = '';
        frmCotizador.classList.add('d-none');
    })
}


