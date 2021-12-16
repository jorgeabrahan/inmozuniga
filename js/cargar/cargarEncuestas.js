/* Se obtiene el contenedor de las encuestas */
let contenedorEncuestas = document.querySelector('#contenedorEncuestas');

db.collection('ENCUESTAS').get().then(encuestas => {
    encuestas.forEach(encuesta => {
        /* Se crea el contenedor de la encuesta */
        let contenedorEncuesta = document.createElement('article');
        contenedorEncuesta.className = 'poll';
        contenedorEncuesta.addEventListener('click', () => {
            open(`${encuesta.data().url}`, '_blank');
        })
        let shrtndDesc = encuesta.data().Descripcion.substring(0, 60);
        contenedorEncuesta.innerHTML = `
        <div class="poll__content">
            <h3 class="poll__title">${encuesta.data().Titulo}</h3>
            <p class="poll__description">
                ${shrtndDesc}...
            </p>
        </div>
        <div class="poll__more">
            <a href="${encuesta.data().url}" class="poll__link">Llenar encuesta</a>
        </div>
        `

        /* Se mete el contenedor de la encuesta dentro del contenedor de las encuestas */
        contenedorEncuestas.appendChild(contenedorEncuesta);
    })

}).catch(() => {
    mostrarError(contenedorEncuestas);
})