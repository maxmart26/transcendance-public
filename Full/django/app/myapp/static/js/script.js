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
              <img class="line" src="{% static 'img/line1.png' %}" /> 
              <p class="text-wrapper-8">OR</p>
              <img class="img" src="{% static 'img/line1.png' %}" />
          </div>
          <div class="login">
              <button class="button2">
                  <p class="text">Login with</p>
                  <img class="element-icon" src="{% static 'img/42.png' %}" />
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
                      <img id="imagePreview" class="preview" src="{% static 'img/person.png' %}">
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
                      <button id="profile-img"><img src="img/fox.png" alt="Profile" class="profile-image"></button>
                  </div>
              </div>
          </div>
          <button id="game" class="game-rectangle">START A GAME</button>
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
                      <button id="profile-img"><img src="img/fox.png" alt="Profile" class="profile-image"></button>
                  </div>
              </div>
          </div>
          <div class="rectangle">
            <div class="title">
                <p class="settings-title">SETTINGS</p>
                <button class="lang"><img id="french" class="french-icon" src="img/french.png"></button>
            </div>
              
              <div class="profile">
                  <div class="recap-infos">
                      <div class="icon">
                          <div class="people-contour">
                              <img id="newImagePreview" class="preview" src="{% static 'img/person.png' %}">
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
                  <button id="save-settings1" class="save-button">SAVE</button>
              </div>
              <div class="change-password">
                  <p class="settings-password">CHANGE YOUR PASSWORD</p>
                  <form class="password-infos">
                      <label for="password" class="password-text">Enter new password</label>
                      <input type="password" id="password2">
                      <label for="confirm-password" class="password-text">Confirm new password</label>
                      <input type="password" id="confirm-password">
                  </form>
                  <button id="save-settings2" class="save-button">SAVE</button>
              </div>
              <div class="a2f">
                  <p class="a2f-title">TWO-FACTOR AUTHENTICATION</p>
                  <button id="a2f-button"><i class="bi bi-toggle-off switch-button"></i>Enable Two-Factor Authentication (A2F)</button>
                  <p class="a2f-explain">This method enhances security by requiring users to provide two distincts types of verification to confirm their identity.</p>
              </div>
              <button id="logout" class="logout"><i class="bi bi-box-arrow-right logout-icon"></i>LOG OUT</button>
          </div>
      </div>
  `,
  "leaderboard-page": `
    <div id="leaderboard-page">
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
                      <button id="profile-img"><img src="img/fox.png" alt="Profile" class="profile-image"></button>
                  </div>
              </div>
        </div>
        <div class="rectangle">
            <p class="lead-title">LEADERBOARD</p>
            <div class="lead-players">
                <div id="second" class="rank">
                    <p class="rank-title">2nd</p>
                    <img src="{% static 'img/42.png' %}" alt="Profile" class="lead-img">
                    <p class="rank-username">Username</p>
                </div>
                <div id="first" class="rank">
                    <p class="rank-title">1st</p>
                    <img src="{% static 'img/fox.png' %}" alt="Profile" class="first-img">
                    <p class="rank-username">Username</p>
                </div>
                <div id="third" class="rank">
                    <p class="rank-title">3rd</p>
                    <img src="{% static 'img/fox.png' %}" alt="Profile" class="lead-img">
                    <p class="rank-username">Username</p>
                </div>
            </div>
            <div class="scoreboard">
                <div class="ranklist">
                    <p class="ranklist-title">Rank</p>
                    <p class="ranklist-player">1.<img src="img/fox.png" alt="Profile" class="ranklist-img">Username</p>
                    <p class="ranklist-player">2.<img src="img/fox.png" alt="Profile" class="ranklist-img">Username</p>
                    <p class="ranklist-player">3.<img src="img/fox.png" alt="Profile" class="ranklist-img">Username</p>
                    <p class="ranklist-player">4.<img src="img/fox.png" alt="Profile" class="ranklist-img">Username</p>
                    <p class="ranklist-player">5.<img src="img/fox.png" alt="Profile" class="ranklist-img">Username</p>
                    <p class="ranklist-player">6.<img src="img/fox.png" alt="Profile" class="ranklist-img">Username</p>
                </div>
                <div class="score">
                    <p class="ranklist-title">Score</p>
                    <p class="score-nb">20</p>
                    <p class="score-nb">18</p>
                    <p class="score-nb">14</p>
                    <p class="score-nb">6</p>
                    <p class="score-nb">2</p>
                    <p class="score-nb">1</p>
                </div>
            </div>
        </div>
    </div>
  `,
  "profile-page": `
    <div id="profile-page">
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
                      <button id="profile-img"><img src="img/fox.png" alt="Profile" class="profile-image"></button>
                  </div>
              </div>
        </div>
        <div class="lead-rectangle">
            <p class="profile-title">PROFILE</p>
            <div class="profile-infos">
                <div class="profile-recap">
                    <div class="user">
                        <img src="{% static 'img/fox.png' %}" alt="Profile" class="first-img">
                        <div class="user-online">
                            <p class="profile-username">Username</p>
                            <div class="online">ONLINE</div>
                        </div>
                    </div>
                    <div class="recap-items">
                        <div class="item-infos">
                            <img src="{% static 'img/dice.png' %}" alt="Profile" class="profile-icon">
                            <p class="item-nb">3</p>
                            <p class="item-title">Games</p>
                        </div>
                        <div class="item-infos">
                            <img src="{% static 'img/trophy.png' %}" alt="Profile" class="profile-icon">
                            <p class="item-nb">1</p>
                            <p class="item-title">Victories</p>
                        </div>
                        <div class="item-infos">
                            <img src="{% static 'img/heart.png' %}" alt="Profile" class="profile-icon">
                            <p class="item-nb">5</p>
                            <p class="item-title">Friends</p>
                        </div>
                    </div>
                </div>
                <div class="profile-stats">
                </div>
            </div>
            <div class="achievements">
                <p class="achiev-title">ACHIEVEMENTS (0/7)</p>
            </div>
        </div>
    </div>
  `,
  "game-page": `
    <div id="game-page">
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
                      <button id="profile-img"><img src="img/fox.png" alt="Profile" class="profile-image"></button>
                  </div>
              </div>
        </div>
        <div id="game-container"></div>
        <script type="module" src="{% static 'js/pong.js' %}"></script> 
    </div>
  `
};

// Sélectionnez le conteneur où le contenu sera injecté
const contentContainer = document.getElementById("pong");

function setupImageUpload(inputId, previewId) {
    const imageUpload = document.getElementById(inputId);
    const imagePreview = document.getElementById(previewId);
  
    if (imageUpload && imagePreview) {
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
    }
  }

// Fonction pour afficher une page
function showPage(pageKey) {
  if (pagesContent[pageKey]) {
      contentContainer.innerHTML = pagesContent[pageKey]; // Injecte le contenu
      if (pageKey === 'create-account') {
        setupImageUpload('imageUpload', 'imagePreview'); // Configure l'upload d'image uniquement pour la page "create-account"
      } else if (pageKey === 'settings-page') {
        setupImageUpload('newImageUpload', 'newImagePreview');
      }
  } else {
      console.error("Page not found!");
  }
}

// Exemple d'utilisation
window.onload = function() {
document.addEventListener("DOMContentLoaded", () => {
    showPage("login-page");
    console.log("DOM chargé !");
});
};


contentContainer.addEventListener('click', (event) => {
    const targetId = event.target.id;
  
    if (targetId === 'replaceButton') {
      showPage("create-account");
    } else if (targetId === 'homeButton') {
      showPage("home-page");
    } else if (targetId === 'settings') {
      showPage("settings-page");
    } else if (targetId === 'logout') {
      showPage("login-page");
    } else if (targetId === 'save') {
      showPage("login-page");
    } else if (targetId === 'home') {
        showPage("home-page");
    } else if (targetId === 'leaderboard') {
        showPage("leaderboard-page");
    } else if (targetId === 'profile-img') {
        showPage("profile-page");
    } else if (targetId === 'game') {
        showPage("game-page");
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

