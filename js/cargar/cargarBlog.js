/* Se obtiene el elemento para ingresar los elementos del blog */
let elementoImagenBlog = document.querySelector('.blog__image');
let elementoTituloBlog = document.querySelector('.banner__slogan');
let elementoContenidoBlog = document.querySelector('.content');

/* Se obtiene el id del blog al cargar */
let idBlogCargar = window.location.href.split('#')[1];
db.collection('BLOGS').doc(idBlogCargar).get().then(blogCargar => {
    elementoImagenBlog.alt = "Espera mientras se carga la imagen";
    /* Se obtiene con el id del blog la imagen del blog */
    storageRef.child(`img/blogs/${blogCargar.id}`).getDownloadURL().then(url => {
        elementoImagenBlog.src = url;
        elementoImagenBlog.alt = blogCargar.data().titulo;
    })
    elementoTituloBlog.innerText = blogCargar.data().titulo;
    elementoContenidoBlog.innerHTML = blogCargar.data().contenido;
}).catch(() => {
    elementoImagenBlog.src = "No se pudo obtener la imagen del blog";
    elementoTituloBlog.innerText = "No se pudo cargar el titulo del blog, lo sentimos";
    elementoContenidoBlog.innerText = "No se pudo cargar el contenido, lo sentimos.";
})
