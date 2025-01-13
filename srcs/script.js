// Contenu HTML pour chaque "page"
const pagesContent = {
  "login-page": `
      <div id="login-page">
          <div class="navbar"></div>
          <p class="text-wrapper">PONG</p>
          <div class="rectangle">
          <p class="text-wrapper-5">LOGIN</p>
          <form class="login-infos">
              <label for="username" class="text-wrapper-2">Username</label>
              <input type="text" id="username">
              <label for="password" class="text-wrapper-2">Password</label>
              <input type="password" id="password">
          </form>
          <div class="enter">
              <button id="homeButton" class="rectangle-4">ENTER</button>
          </div>
          <div class="or">
              <img class="line" src="img/line1.png" />
              <p class="text-wrapper-8">OR</p>
              <img class="img" src="img/line1.png" />
          </div>
          <div class="login">
              <button class="button2">
                  <p class="text">Login with</p>
                  <img class="element-icon" src="img/42.png" />
              </button>
          </div>
          <div class="account">
              <p class="p">You don't have an account ?</p>
              <button id="replaceButton" class="text-wrapper-6">Create an account</button>
          </div>
          </div>
      </div>`,
  "create-account": `
      <div id="create-account">
          <div class="navbar"></div>
          <p class="text-wrapper">PONG</p>
          <div class="rectangle">
              <p class="text-wrapper-5">CREATE YOUR PROFILE</p>
              <div class="icon">
                  <div class="people-contour">
                      <img id="imagePreview" class="preview" src="img/person.png">
                  </div>
                  <div class="file">
                      <div class="upload">
                          <input type="file" id="imageUpload" accept="image/*" hidden>
                          <label for="imageUpload" class="custom-button">Choose File</label>
                      </div>
                  </div>
              </div>
              <form class="infos">
                  <label for="username" class="text-wrapper-2">Username</label>
                  <input type="text" id="user">
                  <label for="password" class="text-wrapper-2">Password</label>
                  <input type="password" id="password2">
                  <label for="confirm-password" class="text-wrapper-2">Confirm password</label>
                  <input type="password" id="confirm-password">
                  <label for="email" class="text-wrapper-2">Email</label>
                  <input type="text" id="email">
              </form>
              <div class="enter">
                  <button id="save" class="rectangle-4">Save</button>
              </div>
          </div>
      </div>
  `,
  "home-page": `
      <div id="home-page">
          <div class="home-navbar">
              <div class="navbar-left">
                  <p class="text-wrapper">PONG</p>
                  <a id="home" href="#home" class="navbar-item">HOME</a>
                  <a id="leaderboard" href="#leaderboard" class="navbar-item">LEADERBOARD</a>
                  <a id="friends" href="#friends" class="navbar-item">FRIENDS</a>
              </div>
              <div class="navbar-right">
                  <a id="settings" href="#settings" class="navbar-item">SETTINGS</a>
                  <div class="profile-container">
                      <img src="42.png" alt="Profile" class="profile-image">
                  </div>
              </div>
          </div>
          <button class="game-rectangle">START A GAME</button>
      </div>
  `,
  "settings-page": `
      <div id="settings-page">
          <div class="home-navbar">
              <div class="navbar-left">
                  <p class="text-wrapper">PONG</p>
                  <a id="home" href="#home" class="navbar-item">HOME</a>
                  <a id="leaderboard" href="#leaderboard" class="navbar-item">LEADERBOARD</a>
                  <a id="friends" href="#friends" class="navbar-item">FRIENDS</a>
              </div>
              <div class="navbar-right">
                  <a id="settings" href="#settings" class="navbar-item">SETTINGS</a>
                  <div class="profile-container">
                      <img src="42.png" alt="Profile" class="profile-image">
                  </div>
              </div>
          </div>
          <div class="rectangle">
              <p class="settings-title">SETTINGS</p>
              <div class="profile">
                  <div class="recap-infos">
                      <div class="icon">
                          <div class="people-contour">
                              <img id="newImagePreview" class="preview" src="img/person.png">
                          </div>
                          <div class="file">
                              <div class="upload">
                                  <input type="file" id="newImageUpload" accept="image/*" hidden>
                                  <label for="newImageUpload" class="settings-profileImage">Choose File</label>
                              </div>
                          </div>
                      </div>
                      <form class="settings-infos">
                          <label for="username" class="settings-text">Username</label>
                          <input type="text" id="username">
                          <label for="email" class="settings-text">Email</label>
                          <input type="text" id="email">
                      </form>
                  </div>
                  <button id="save" class="save-button">SAVE</button>
              </div>
              <div class="change-password">
                  <p class="settings-password">CHANGE YOUR PASSWORD</p>
                  <form class="password-infos">
                      <label for="password" class="password-text">Enter new password</label>
                      <input type="password" id="password2">
                      <label for="confirm-password" class="password-text">Confirm new password</label>
                      <input type="password" id="confirm-password">
                  </form>
                  <button id="save" class="save-button">SAVE</button>
              </div>
              <div class="a2f">
                  <p class="a2f-title">TWO-FACTOR AUTHENTICATION</p>
                  <button id="a2f-button"><i class="bi bi-toggle-off switch-button"></i>Enable Two-Factor Authentication (A2F)</button>
                  <p class="a2f-explain">This method enhances security by requiring users to provide two distincts types of verification to confirm their identity.</p>
              </div>
              <button id="logout" class="logout"><i class="bi bi-box-arrow-right logout-icon"></i>LOG OUT</button>
          </div>
      </div>
  `
};

// Sélectionnez le conteneur où le contenu sera injecté
const contentContainer = document.getElementById("pong");

// Fonction pour afficher une page
function showPage(pageKey) {
  if (pagesContent[pageKey]) {
      contentContainer.innerHTML = pagesContent[pageKey]; // Injecte le contenu
  } else {
      console.error("Page not found!");
  }
}

// Exemple d'utilisation
showPage("login-page"); // Charge la page "login page"

// JavaScript pour gérer le remplacement
document.getElementById('replaceButton').addEventListener('click', () => {
  showPage("create-account");
});

document.getElementById('homeButton').addEventListener('click', () => {
  showPage("home-page");
});

document.getElementById('settings').addEventListener('click', () => {
  showPage("settings-page");
});

document.getElementById('logout').addEventListener('click', () => {
  showPage("login-page");
});

document.getElementById('save').addEventListener('click', () => {
  showPage("login-page");
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

// Sélection des éléments
const newImageUpload = document.getElementById('newImageUpload');
const newImagePreview = document.getElementById('newImagePreview');

// Écouteur d'événement pour le changement de fichier
imageUpload.addEventListener('change', (event) => {
  const file = event.target.files[0]; // Récupère le premier fichier sélectionné
  
  if (file) {
    const reader = new FileReader(); // Crée un FileReader

    // Quand le fichier est lu
    reader.onload = (e) => {
      newImagePreview.src = e.target.result; // Définit la source de l'image de prévisualisation
    };

    reader.readAsDataURL(file); // Lit le fichier comme une URL de données
  }
});

const new_image_upload = document.getElementById('newImageUpload');
const new_image_preview = document.getElementById('newImagePreview');

// Écoute l'événement "change" sur l'input file
image_upload.addEventListener('change', (event) => {
  const file = event.target.files[0]; // Récupère le fichier sélectionné

  if (file) {
    const reader = new FileReader(); // Crée un FileReader

    // Quand le fichier est chargé
    reader.onload = (e) => {
      new_image_preview.src = e.target.result; // Remplace l'image actuelle par la nouvelle
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

fetch('https://localhost:8080/add-player/', {
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



