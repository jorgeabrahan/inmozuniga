const firebaseConfig = {
    apiKey: "AIzaSyDIS8nlyOLjVHwK9C9Mqs-eF-4AxgBs29U",
    authDomain: "inmobiliariazunigahn.firebaseapp.com",
    projectId: "inmobiliariazunigahn",
    storageBucket: "inmobiliariazunigahn.appspot.com",
    messagingSenderId: "643368075781",
    appId: "1:643368075781:web:59492d93ae9c08f118126c",
    measurementId: "G-39R41BL039"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storageRef = firebase.storage().ref();

function mostrarError(cnt, err) {
    const msgErr = document.createElement('p');
    msgErr.textContent = `${err}`;
    cnt.appendChild(msgErr);
}

const removeAccents = (idProject) => {
    const equiv = {'á': 'a','é': 'e','í': 'i','ó': 'o','ú': 'u'}
    const regexAccent = /[^A-Za-z]/g;
    const findAccent = idProject.match(regexAccent);
    if (findAccent !== null) {
        for (char of findAccent) {
            Object.keys(equiv).find(key => {
                if (key == char) {
                    idProject = idProject.replace(char, equiv[key]);
                }
            })
        }
    }
    return idProject;
}