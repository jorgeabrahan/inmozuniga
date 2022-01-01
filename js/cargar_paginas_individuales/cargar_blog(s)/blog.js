'use strict';

window.onload = () => {
    db.collection('BLOGS').doc(window.location.href.split('#')[1]).get().then(blg => {
        storageRef.child(`img/blogs/${blg.id}`).getDownloadURL().then(src => {
            document.querySelector('.blog__image').src = src;
            document.querySelector('.blog__image').alt = `imagen del blog ${blg.data().titulo}`;
        })
        document.querySelector('.banner__slogan').textContent = blg.data().titulo;
        document.querySelector('.content').innerHTML = blg.data().contenido;
    }).catch(err => {
        mostrarError(blgCntnt, err);
    })
}