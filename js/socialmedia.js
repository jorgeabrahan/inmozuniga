let allsocialmedia = document.querySelectorAll('.social-media');

allsocialmedia.forEach(socialmedia => {
    socialmedia.addEventListener('click', abrirRedSocial);
})

function abrirRedSocial(e) {
    let link;
    if (e.target.classList.contains("social-media")) {
        link = e.target.lastElementChild.href;
    } else if(e.target.classList.contains("social-media__icon")) {
        link = e.target.nextElementSibling.href;
    }
    open(link);
}