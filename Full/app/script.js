// JavaScript pour gérer le remplacement
document.getElementById('replaceButton').addEventListener('click', () => {
    // Cacher la section A
    const sectionA = document.getElementById('login-page');
    sectionA.classList.add('hidden');
    
    // Afficher la section B
    const sectionB = document.getElementById('create-account');
    sectionB.classList.remove('hidden');
});

document.getElementById('homeButton').addEventListener('click', () => {
  // Cacher la section A
  const sectionA = document.getElementById('login-page');
  sectionA.classList.add('hidden');
  
  // Afficher la section B
  const sectionB = document.getElementById('home-page');
  sectionB.classList.remove('hidden');
});

document.getElementById('settings').addEventListener('click', () => {
  // Cacher la section A
  const sectionA = document.getElementById('home-page');
  sectionA.classList.add('hidden');
  
  // Afficher la section B
  const sectionB = document.getElementById('settings-page');
  sectionB.classList.remove('hidden');
});

document.getElementById('logout').addEventListener('click', () => {
  // Cacher la section A
  const sectionA = document.getElementById('settings-page');
  sectionA.classList.add('hidden');
  
  // Afficher la section B
  const sectionB = document.getElementById('login-page');
  sectionB.classList.remove('hidden');
});

document.getElementById('save').addEventListener('click', () => {
  // Cacher la section A
  const sectionA = document.getElementById('create-account');
  sectionA.classList.add('hidden');
  
  // Afficher la section B
  const sectionB = document.getElementById('login-page');
  sectionB.classList.remove('hidden');
});

// Sélection des éléments
const imageUpload = document.getElementById('imageUpload');
const imagePreview = document.getElementById('imagePreview');

// Écouteur d'événement pour le changement de fichier
imageUpload.addEventListener('change', (event) => {
  const file = event.target.files[0]; // Récupère le premier fichier sélectionné
  
  if (file) {
    const reader = new FileReader(); // Crée un FileReader

    // Quand le fichier est lu
    reader.onload = (e) => {
      imagePreview.src = e.target.result; // Définit la source de l'image de prévisualisation
    };

    reader.readAsDataURL(file); // Lit le fichier comme une URL de données
  }
});

const image_upload = document.getElementById('imageUpload');
const image_preview = document.getElementById('imagePreview');

// Écoute l'événement "change" sur l'input file
image_upload.addEventListener('change', (event) => {
  const file = event.target.files[0]; // Récupère le fichier sélectionné

  if (file) {
    const reader = new FileReader(); // Crée un FileReader

    // Quand le fichier est chargé
    reader.onload = (e) => {
      image_preview.src = e.target.result; // Remplace l'image actuelle par la nouvelle
    };

    reader.readAsDataURL(file); // Lit le fichier comme URL de données
  }
});


document.getElementById('save').addEventListener('click', () => {
const _profileImage = document.getElementById('imageUpload');
const _username = document.getElementById('user');
const _password = document.getElementById('password2');
const _confirmPassword = document.getElementById('confirm-password');
const _email = document.getElementById('email');

if (_username.value.trim() === "" || _password.value.trim() === "" || _confirmPassword.value.trim() === "" || _email.value.trim() === "")
    console.log("Invalid field !");

if (_password.value != _confirmPassword.value)
    console.log("Passwords are not the same !");

const formData = new FormData();
    formData.append('username', _username.value.trim());
    formData.append('password', _password.value.trim());
    formData.append('confirm-password', _confirmPassword.value.trim());
    formData.append('email', _email.value.trim());
    formData.append('imageUpload', _profileImage.files[0]);

    console.table(Array.from(formData.entries()));

fetch('https://' + window.location.host + '/add-player/', {
    method: 'POST',
    body: formData,
})
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Erreur lors de l\'envoi des données');
        }
    })
    .then(result => {
        console.log('Succès:', result);
    })
    .catch(error => {
        console.error('Erreur:', error);
    });
});



