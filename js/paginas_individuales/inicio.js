"use strict";

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

    let load = document.querySelector(".load");
    let allPrjcts, allBlogs, allPolls;
    load.addEventListener('animationend', (e) => {
        if (e.animationName == 'unvanish') {
            load.classList.add('d-none');
            return;
        }

        load.classList.add('vanish');
        allPrjcts = document.querySelectorAll('.project');
        allBlogs = document.querySelectorAll('.blog');
        allPolls = document.querySelectorAll('.poll');

        setObserver(allPrjcts);
        setObserver(allBlogs);
        setObserver(allPolls);

        
        animateImgs(document.querySelectorAll('.property__img'), document.body.clientWidth);
    })


    allCats.forEach(cat => {
        cat.addEventListener('click', () => {
            open(`#${cat.getAttribute('data-category')}`, '_self');
        });
    })
}