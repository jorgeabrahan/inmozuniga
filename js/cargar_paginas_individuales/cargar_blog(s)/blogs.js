'use strict';

window.onload = () => {
    const blgsFrgmnt = document.createDocumentFragment();
    db.collection('BLOGS').get().then(blgs => {
        blgs.forEach(blg => {
            const blgCnt = document.createElement('div');
            blgCnt.className = 'blog';
            blgCnt.id = blg.id;
            blgCnt.onclick = () => { open(`/blog#${blg.id}`, '_self') };
            storageRef.child(`img/blogs/${blg.id}`).getDownloadURL().then(src => {
                blgCnt.innerHTML = `               
                <img src="${src}" alt="imagen del blog ${blg.data().titulo}" class="blog__img">
                <h3 class="blog__title">${blg.data().titulo}</h3>
                `;
            })
            blgsFrgmnt.appendChild(blgCnt);
        })
        document.querySelector('.blogs-container').appendChild(blgsFrgmnt);
    })
}
