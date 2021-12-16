/* Se obtiene el contenedor de los proyectos */
let contenedorProyectosInicio = document.getElementById('contenedorProyectosInicio');

db.collection('PROYECTOS').get().then(proyectos => {
    proyectos.forEach(proyecto => {
        if (contenedorProyectosInicio.children.length < 3) {
            /* Se crea el elemento contenedor del proyecto */
            let contenedorProyecto = document.createElement('div');
            contenedorProyecto.className = 'project';
            /* Se le quitan los espacios y se pasa a minusculas el nombre del proyecto */
            let idProject = proyecto.data().nombre.replace(/\s/g, '').toLowerCase();

            // Se llama la funcion para remover los acentos del id
            idProject = removeAccents(idProject);

            contenedorProyecto.onclick = () => {
                open(`/proyectos#${idProject}`, '_self');
            }

            /* Se crea el elemento de imagen del proyecto */
            let imagenProyecto = document.createElement('img');
            imagenProyecto.className = 'project__img';
            imagenProyecto.loading = 'lazy';
            imagenProyecto.alt = `Proyecto ${proyecto.data().nombre}`;

            /* Se obtiene la imagen del proyecto */
            storageRef.child(`img/proyectos/${proyecto.data().nombre}/${proyecto.id}`).getDownloadURL().then(url => {
                imagenProyecto.src = url;
            })

            /* Se mete la imagen dentro del contenedor del proyecto */
            contenedorProyecto.appendChild(imagenProyecto);

            /* Se crea el elemento de titulo del proyecto */
            let tituloProyecto = document.createElement('h2');
            tituloProyecto.className = 'project__title';
            tituloProyecto.innerText = `${proyecto.data().nombre}`;

            /* Se mete el titulo de la imagen dentro del contenedor del proyecto */
            contenedorProyecto.appendChild(tituloProyecto);

            /* Se crea el elemento contenedor de los enlaces */
            let contenedorEnlaces = document.createElement('div');
            contenedorEnlaces.className = 'project__links';
            contenedorEnlaces.innerHTML = `
                <a href="https://inmobiliariazunigahn.web.app/proyectos#${idProject}" class="project__link">Saber más</a>
                <a href="${proyecto.data().url}" target="_blank" class="project__link">Ver video</a>
            `;

            /* Se mete el contenedor de los enlaces dentro de el contenedor del proyecto */
            contenedorProyecto.appendChild(contenedorEnlaces);

            /* Se mete el contenedor del proyecto dentro del contenedor de los proyectos */
            contenedorProyectosInicio.appendChild(contenedorProyecto);
        }
    })
}).catch(() => {
    mostrarError(contenedorProyectosInicio);
})
