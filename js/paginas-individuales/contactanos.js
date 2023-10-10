const frmSchdlAppntmnt = document.getElementById('frmSchdlAppntmnt');
frmSchdlAppntmnt.reset();
const frmSchdlAppntmntMsg = document.getElementById('frmSchdlAppntmntMsg');
frmSchdlAppntmnt.addEventListener('submit', e => {
    e.preventDefault();
    let emptyInpt = false;
    for (let inpt of frmSchdlAppntmnt) { if (inpt.value === '' && inpt.required) emptyInpt = true };
    if (emptyInpt) return;
    frmSchdlAppntmntMsg.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Espera un momento';

    const weekDays = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']; 
    const yearMonths = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const d = new Date();
    const actualTime = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
    const day = weekDays[d.getDay()];
    const month = yearMonths[d.getMonth()];
    const actualDate = `${day} ${d.getDate()} de ${month}`;

    const userAppntmnt = {
        nombre: frmSchdlAppntmnt.inptUserName.value,
        interes: frmSchdlAppntmnt.inptAppntmntReason.value,
        telefono: frmSchdlAppntmnt.inptUserPhone.value,
        tipo: frmSchdlAppntmnt.inptUserType.value,
        estado: 'pendiente',
        hora: actualTime,
        fecha: actualDate,
        fechaAtendido: 'pendiente'
    }
    db.collection('CITAS').add(userAppntmnt).then(() => {
        frmSchdlAppntmntMsg.innerText = `¡Listo ${frmSchdlAppntmnt.inptUserName.value}! Dentro de poco nos pondremos en contacto contigo.`;
        for (let inpt of frmSchdlAppntmnt) inpt.setAttribute('disabled', '');
        e.target.setAttribute('disabled', '');
    })
});