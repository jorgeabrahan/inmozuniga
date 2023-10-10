'use strict';

window.onload = () => {    
    // document.querySelector('.exchange').innerText = `Aprox. 1 USD = ${equivUsd} HNL`;

    
    // const inptMancomunado = document.getElementById('inptMancomunado');
    // inptMancomunado.addEventListener('change', () => {
    //     document.querySelectorAll('.group--mancomunado').forEach(opt => {
    //         opt.classList.toggle('d-none');
    //         if (!opt.classList.contains('d-none')) {
    //             opt.lastElementChild.setAttribute('required', 'required');
    //             return;
    //         }
    //         opt.lastElementChild.removeAttribute('required', 'required');
    //     });
    // });

    // const salaryFrst = document.getElementById('salaryFrst');
    // const salaryScnd = document.getElementById('salaryScnd');
    // const calcularTotal = () => {
    //     document.getElementById('totSalary').value = Number(salaryFrst.value) + Number(salaryScnd.value);
    // }
    // salaryFrst.addEventListener('input', calcularTotal);
    // salaryScnd.addEventListener('input', calcularTotal);


    // const frmCotizador = document.getElementById('frmCotizador');
    // const btnFrmCotizador = document.getElementById('btnFrmCotizador');
    // const msgErrCotizador = document.getElementById('msgErrCotizador');

    // const evAntiquity = (wrkPlace, antiquity) => {
    //     antiquity = Number(antiquity);
    //     msgErrCotizador.innerText = "";
    //     btnFrmCotizador.removeAttribute('disabled', 'disabled');
    
    //     let minAntiquity = 1;
    //     if (wrkPlace === 'comerciante') minAntiquity = 2;

    //     if (antiquity < minAntiquity) {
    //         msgErrCotizador.innerText = `Como ${wrkPlace} el minimo de años requeridos son: ${minAntiquity}.`;
    //         btnFrmCotizador.setAttribute('disabled', 'disabled');
    //     }
    // }
    
    // frmCotizador.wrkPlaceFrst.addEventListener('change', e => {
    //     evAntiquity(e.target.value, frmCotizador.antiquityFrst.value);
    // });
    // frmCotizador.wrkPlaceScnd.addEventListener('change', e => {
    //     evAntiquity(e.target.value, frmCotizador.antiquityScnd.value);
    // });
    // frmCotizador.antiquityFrst.addEventListener('change', e => {
    //     evAntiquity(frmCotizador.wrkPlaceFrst.value, e.target.value);
    // });
    // frmCotizador.antiquityScnd.addEventListener('change', e => {
    //     evAntiquity(frmCotizador.wrkPlaceScnd.value, e.target.value); 
    // });

    // for (let inpt of frmCotizador.elements) {
    //     if (inpt.type == 'number') {
    //         inpt.addEventListener('input', e => {
    //             if (isNaN(Number(e.data))) inpt.value = inpt.value.replace(e.data, '');
    //         })
    //     }
    // }

    // const optsAcrdIncome = totIncome => {
    //     document.querySelector('.exchange').style.display = 'block';

    //     document.querySelectorAll('.project__option').forEach(prjOpt => {

    //         let incomeReq = Number(prjOpt.classList[2]);
    //         if (incomeReq < 5000) incomeReq *= equivUsd;

    //         let prefVal = document.getElementById('preferences').value;
            
    //         //Si no escogio todos se evaluan sus preferencias
    //         if (prefVal !== 'todos') if (prefVal !== prjOpt.classList[1]) return;
    //         //Si no cuenta con el minimo de ingresos requeridos
    //         if (totIncome < incomeReq) return;

    //         prjOpt.classList.remove('d-none');
    //         prjOpt.parentElement.firstElementChild.classList.remove('d-none');
    //     })
    // }

    // const chkAge = inptAge => {
    //     if (inptAge.required && Number(inptAge.value) < 21) {
    //         msgErrCotizador.innerText = "Edad insuficiente.";
    //         return true;
    //     }
    //     return false;
    // }

    // frmCotizador.addEventListener('submit', e => {
    //     e.preventDefault();
        
    //     if (chkAge(frmCotizador.ageFrst)) return;
    //     if (chkAge(frmCotizador.ageScnd)) return;
    
    //     let totIncome = salaryFrst.value;
    //     if (inptMancomunado.checked) totIncome = document.getElementById('totSalary').value;
    
    //     if (Number(totIncome) < 26000) {
    //         msgErrCotizador.innerText = "Salario insuficiente.";
    //         return;
    //     }
    
    //     optsAcrdIncome(totIncome);
    //     msgErrCotizador.innerText = '';
    //     frmCotizador.classList.add('d-none');
    // })

    const frmQuoter = document.getElementById('frmQuoter');

    const curncyFrmt = new Intl.NumberFormat(`en-US`, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    const equivUsd = Number(document.querySelector('table').rows[1].cells[1].innerText.replace(/\L/g, ''));

    const userSalary = frmQuoter.inptQuoterSalary;
    const salaryPrev = document.getElementById('salaryPrev');
    let usdSalary = 0;
    userSalary.addEventListener('input', () => {
        if (/[^0-9\.]/g.test(userSalary.value)) userSalary.value = userSalary.value.slice(0, -1);

        const hnlSalary = Number(userSalary.value);
        usdSalary = hnlSalary / equivUsd;
        salaryPrev.innerText = `$ ${curncyFrmt.format(usdSalary)}`;
    });

    const createAvlblPrjctHtml = (prjct) => {
        const prjctId = removeAccents(prjct.nombre.replace(/\s/g, '').toLowerCase())
        const prjctCnt = document.createElement('div');
        prjctCnt.className = 'project';
        prjctCnt.onclick = () => {
            open(`https://inmozuniga.com/proyectos#${prjctId}`, '_self');
        }
        prjctCnt.innerHTML = `
        <img src="" alt="${prjct.nombre}" class="project__image">
        <div class="project__data">
            <p class="project__name">${prjct.nombre}</p>
            <a href="https://inmozuniga.com/proyectos#${prjctId}" class="project__more">Saber más</a>
        </div>
        `; 
        return prjctCnt;
    }

    const createAvlblPrprtyHtml = (prprti) => {
        const prprtiCnt = document.createElement('div');
        prprtiCnt.className = 'property';
        prprtiCnt.id = prprti.id;
        prprtiCnt.innerHTML = `
        <img src="" alt="Imagen de ${prprti.nombre}" class="property__image">
        <div class="property__data">
            <p class="property__related"> 
                <a href="https://inmozuniga.com/propiedades#${prprti.categoria}-${prprti.estado}">
                    <i class="fas fa-tag"></i>
                    ${prprti.categoria}
                </a>
                <a href="https://inmozuniga.com/propiedades#${prprti.estado}">
                    <i class="fas fa-money-bill-wave"></i>
                    ${prprti.estado}
                </a>
            </p>
            <p class="property__costs"><span>${prprti.nombre}</span><span>$ ${curncyFrmt.format(prprti.cuota)}</span></p>
            <p class="property__description">${prprti.descripcion.slice(0, 60)}...</p>
            <a href="https://inmozuniga.com/propiedad#${prprti.id}" class="property__link">
                Me interesa
            </a>
        </div>
        `;
        return prprtiCnt;
    }

    const errInsfcntSalary = (noAvlblCnt, msg) => {
        const noAvlblMsg = document.createElement('p');
        noAvlblMsg.className = 'details__message';
        noAvlblMsg.innerText = msg;
        noAvlblCnt.appendChild(noAvlblMsg);
    }

    const prprtisAvlblFrgmnt = document.createDocumentFragment();
    const prjctsAvlblFrgmnt = document.createDocumentFragment();
    const prprtisAvlbl = document.getElementById('prprtisAvlbl');
    const prjctsAvlbl = document.getElementById('prjctsAvlbl');
    const showAvlblPrjcts = (prjctsThatApply) => {
        for (let prjct of prjctsThatApply) {
            const prjctCnt = createAvlblPrjctHtml(prjct);
            storageRef.child(`img/proyectos/${prjct.id}`).getDownloadURL().then(src => { prjctCnt.firstElementChild.src = src });
            prjctsAvlblFrgmnt.appendChild(prjctCnt);
        }
        prjctsAvlbl.innerHTML = '';
        prjctsAvlbl.appendChild(prjctsAvlblFrgmnt);
        if (prjctsAvlbl.children.length === 0) errInsfcntSalary(prjctsAvlbl, 'Lo sentimos. No aplicas para ninguno de nuestros proyectos.');
    }

    const showAvlblPrprtis = (prprtisThatApply) => {
        for (let prprti of prprtisThatApply) {
            const prprtiCnt = createAvlblPrprtyHtml(prprti);
            storageRef.child(`img/propiedades/${prprti.id}`).listAll().then(file => {
                file.items[0].getDownloadURL().then(src => {
                    prprtiCnt.firstElementChild.src = src;
                })
            });
            prprtisAvlblFrgmnt.appendChild(prprtiCnt);
        }
        prprtisAvlbl.innerHTML = '';
        prprtisAvlbl.appendChild(prprtisAvlblFrgmnt);
        if (prprtisAvlbl.children.length === 0) errInsfcntSalary(prprtisAvlbl, 'Lo sentimos. No aplicas para ninguna de nuestras propiedades.');
    }

    const btnQuoter = document.getElementById('btnQuoter');
    frmQuoter.addEventListener('submit', e => {
        e.preventDefault();
        btnQuoter.style.pointerEvents = 'none';
        const usdSalaryAvlbl = usdSalary * 0.7;
        const prprtisThatApply = [], prjctsThatApply = [];
        btnQuoter.value = 'Espera un momento';
        db.collection('PROYECTOS').orderBy("ingreso").get().then(prjcts => {
            prjcts.forEach(prjct => {
                if (Number(prjct.data().ingreso) < usdSalary) prjctsThatApply.push({ ...prjct.data(), id: prjct.id });
            });
            showAvlblPrjcts(prjctsThatApply);
        }).catch(err => {
            console.log(err);
        });
        db.collection('PROPIEDADES').orderBy("cuota").get().then(prprtis => {
            prprtis.forEach(prprty => {
                if (Number(prprty.data().cuota) < usdSalaryAvlbl) prprtisThatApply.push({ ...prprty.data(), id: prprty.id });
            });
            showAvlblPrprtis(prprtisThatApply);
        }).catch(err => {
            console.log(err);
        });
        setTimeout(() => {
            btnQuoter.value = 'Cotizar'
            btnQuoter.style.pointerEvents = 'initial';
        }, 3000);
    });
}


