'use strict';

window.onload = () => {
    const unvanishObsrvr = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'unvanish 2s forwards';
                observer.unobserve(entry.target)
            }
        });
    });

    const setObserver = (cnt) => {
        if(document.body.clientWidth < 768) return
        cnt.forEach(element => {
            element.style.opacity = '0';
            unvanishObsrvr.observe(element)
        })
    }


    let allCats = document.querySelectorAll('.category');
    let allAgnts = document.querySelectorAll('.agent');
    setObserver(allCats);
    setObserver(allAgnts);


    const imgsObserver = new IntersectionObserver(
        function (entries, observer) {

            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'zoom-image 4s forwards';
                    observer.unobserve(entry.target)
                }
            });

        }, {
            threshold: 0,
            rootMargin: '0px'
        });

    const animateImgs = (imgPrprtis, screensize) => {
        if (screensize < 768) {
            imgPrprtis.forEach(img => {
                imgsObserver.observe(img);
            })
            return;
        }

        imgPrprtis.forEach(img => {
            let prprty = img.parentElement.parentElement;
            prprty.addEventListener('mouseenter', () => {
                img.style.animation = 'zoom-image 2s forwards';
                img.addEventListener('animationend', () => {
                    img.style.animation = 'quitar-zoom 2s forwards';
                })
            });
        })
    }

    const load = document.querySelector(".load");
    let allPrjcts, allBlogs, allPolls;
    setTimeout(() => {
        load.classList.add('vanish');
        allPrjcts = document.querySelectorAll('.project');
        allBlogs = document.querySelectorAll('.blog');
        allPolls = document.querySelectorAll('.poll');

        setObserver(allPrjcts);
        setObserver(allBlogs);
        setObserver(allPolls);

        
        animateImgs(document.querySelectorAll('.property__img'), document.body.clientWidth);
    }, 2000);
    
    setTimeout(() => load.classList.add('d-none'), 3000);

    allCats.forEach(cat => {
        cat.addEventListener('click', () => {open(`/propiedades#${cat.getAttribute('data-category')}`, '_self')});
    })



    // Cargar seccion propiedades
    const cntPrprtisSec = document.getElementById('cntPrprtisSec');
    const prprtisSecFrgmnt = document.createDocumentFragment();

    const createPrprtySecHtml = (prprtyData, prprtyId, prprtyCnt) => {
        prprtyCnt.innerHTML = `
        <figure class="property__img-container">
            <img src="" alt="${prprtyData.nombre}" class="property__img">
        </figure>
        <div class="property__info">
            <h3 class="property__name">${prprtyData.nombre}</h3>
            <p class="property__category">
                <i class="fa fa-tag icon"></i>
                <span>${prprtyData.categoria}</span>
            </p>
            <a href="https://inmozuniga.com/propiedad#${prprtyId}" class="property__link">
                Saber mas
            </a>
        </div>
        `;
        return prprtyCnt;
    }

    db.collection('PROPIEDADES').limit(6).get().then(prprtis => {
        prprtis.forEach(prprty => {
            const prprtyCnt = document.createElement('article');
            prprtyCnt.className = 'property';
            prprtyCnt.onclick = () => { open(`/propiedad#${prprty.id}`, '_self') };
            
            const prprtyHtml = createPrprtySecHtml(prprty.data(), prprty.id, prprtyCnt);
            const prprtyImg = prprtyHtml.firstElementChild.firstElementChild;
            storageRef.child(`img/propiedades/${prprty.id}`).listAll().then(file => {
                file.items[0].getDownloadURL().then(src => {
                    prprtyImg.src = src;
                })
            });

            prprtisSecFrgmnt.appendChild(prprtyHtml);
        })
        cntPrprtisSec.appendChild(prprtisSecFrgmnt);
    }).catch(err => {
        showErr(cntPrprtisSec, err);
    })





    // Cargar seccion proyectos
    const cntPjctsSec = document.getElementById('cntPjctsSec');
    const prjctsSecFrgmnt = document.createDocumentFragment();

    const createPrjctSecHTML = (prjctData, prjctId, prjctCnt) => {
        prjctCnt.innerHTML = `
            <img src="" alt="Proyecto ${prjctData.nombre}" class="project__img" loading="lazy">
            <h2 class="project__title">${prjctData.nombre}</h2>
            <a href="https://inmozuniga.com/proyectos#${prjctId}" class="project__link">Saber mas</a>
        `;
        return prjctCnt;
    }

    db.collection('PROYECTOS').limit(3).get().then(prjcts => {
        prjcts.forEach(prjct => {
            const prjctId = removeAccents(prjct.data().nombre.replace(/\s/g, '').toLowerCase());
            const prjctCnt = document.createElement('div');
            prjctCnt.className = 'project';
            prjctCnt.onclick = () => { open(`/proyectos#${prjctId}`, '_self') };
            
            const prjctHtml = createPrjctSecHTML(prjct.data(), prjctId, prjctCnt);
            const prjctImg = prjctHtml.firstElementChild;
            storageRef.child(`img/proyectos/${prjct.id}`)
                .getDownloadURL()
                .then(src => {
                prjctImg.src = src;
                })
            
            prjctsSecFrgmnt.appendChild(prjctHtml);
        })
        cntPjctsSec.appendChild(prjctsSecFrgmnt);
    }).catch(err => {
        showErr(cntPjctsSec, err);
    })




    // Cargar seccion blogs
    const cntSecBlgs = document.getElementById('cntSecBlgs');
    const blgsSecFrgmnt = document.createDocumentFragment();

    const createBlgSecHtml = (blgData, blgCnt) => {
        blgCnt.innerHTML = `
        <img src="" alt="${blgData.titulo}" class="blog__img">
        <h3 class="blog__title">${blgData.titulo}</h3>
        `;
        return blgCnt;
    }

    db.collection('BLOGS').limit(3).get().then(blgs => {
        blgs.forEach(blg => {
            const blgCnt = document.createElement('div');
            blgCnt.className = 'blog';
            blgCnt.id = blg.id;
            blgCnt.onclick = () => { open(`/blog#${blg.id}`, '_self') };

            const blgHtml = createBlgSecHtml(blg.data(), blgCnt);
            const blgImg = blgHtml.firstElementChild;
            storageRef.child(`img/blogs/${blg.id}`).getDownloadURL().then(src => {
                blgImg.src = src;
            })

            blgsSecFrgmnt.appendChild(blgHtml);
        })
        cntSecBlgs.appendChild(blgsSecFrgmnt);

    }).catch(err => {
        showErr(cntSecBlgs, err);
    })





    // Cargar seccion encuestas
    const cntPolls = document.getElementById('cntPolls');
    const pollsFrgmnt = document.createDocumentFragment();

    const createPollHtml = (pollData, pollShrtDesc, pollCnt) => {
        pollCnt.innerHTML = `
            <div class="poll__content">
                <h3 class="poll__title">${pollData.Titulo}</h3>
                <p class="poll__description">
                    ${pollShrtDesc}...
                </p>
            </div>
            <div class="poll__more">
                <a href="${pollData.url}" class="poll__link">Llenar encuesta</a>
            </div>
            `;
    }

    db.collection('ENCUESTAS').get().then(polls => {
        polls.forEach(poll => {
            const pollCnt = document.createElement('article');
            pollCnt.className = 'poll';
            pollCnt.onclick = () => { open(`${poll.data().url}`, '_blank') };
            const shrtndDesc = poll.data().Descripcion.substring(0, 60);

            createPollHtml(poll.data(), shrtndDesc, pollCnt);

            pollsFrgmnt.appendChild(pollCnt);
        })
        cntPolls.appendChild(pollsFrgmnt);

    }).catch(err => {
        showErr(cntPolls, err);
    })
}