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
          <p id="error-message" class="error-message"></p>
          <div class="enter">
            <button id="enter-button" class="rectangle-4">ENTER</button>
        </div>
          <div class="or">
              <img class="line" src="static/img/line1.png" /> 
              <p class="text-wrapper-8">OR</p>
              <img class="img" src="static/img/line1.png" />
          </div>
          <div class="login">
              <button class="button2">
                  <p class="text">Login with</p>
                  <img class="element-icon" src="static/img/42.png" />
              </button>
          </div>
          <div class="account">
              <p class="p">You don't have an account ?</p>
              <button onclick="navigateTo('create-account')" id="replaceButton" class="text-wrapper-6">Create an account</button>
          </div>
          </div>
      </div>`,
  "create-account-page": `
      <div id="create-account-page">
          <div class="navbar"></div>
          <p class="text-wrapper">PONG</p>
          <div class="rectangle">
              <p class="text-wrapper-5">CREATE YOUR PROFILE</p>
              <div class="icon">
                  <div class="people-contour">
                      <img id="imagePreview" class="preview" src="static/img/person.png">
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
              <p id="account-error" class="error-message"></p>
              <div class="enter">
                  <button id="save-button" class="rectangle-4">Save</button>
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
                  <div class="profile-container>
                    <button id="profile-img" onclick="window.location.href='#profile-page'"><img src="static/img/fox.png" alt="Profile" class="profile-image"></button>
                  </div>
              </div>
        </div>
          <button onclick="navigateTo('game-page')" id="game" class="game-rectangle">START A GAME</button>
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
                      <button id="profile-img" onclick="window.location.href='#profile-page'"><img src="static/img/fox.png" alt="Profile" class="profile-image"></button>
                  </div>
              </div>
          </div>
          <div class="rectangle">
            <div class="title">
                <p class="settings-title">SETTINGS</p>
                <button class="lang"><img id="french" class="french-icon" src="static/img/french.png"></button>
            </div>
              
              <div class="profile">
                  <div class="recap-infos">
                      <div class="icon">
                          <div class="people-contour">
                              <img id="newImagePreview" class="preview" src="static/img/person.png">
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
              <button onclick="navigateTo('login-page')" id="logout" class="logout"><i class="bi bi-box-arrow-right logout-icon"></i>LOG OUT</button>
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
                      <button id="profile-img" onclick="window.location.href='#profile-page'"><img src="static/img/fox.png" alt="Profile" class="profile-image"></button>
                  </div>
              </div>
        </div>
        <div class="rectangle">
            <p class="lead-title">LEADERBOARD</p>
            <div class="lead-players">
                <div id="second" class="rank">
                    <p class="rank-title">2nd</p>
                    <img src="static/img/42.png" alt="Profile" class="lead-img">
                    <p class="rank-username">Username</p>
                </div>
                <div id="first" class="rank">
                    <p class="rank-title">1st</p>
                    <img src="static/img/fox.png" alt="Profile" class="first-img">
                    <p class="rank-username">Username</p>
                </div>
                <div id="third" class="rank">
                    <p class="rank-title">3rd</p>
                    <img src="static/img/fox.png" alt="Profile" class="lead-img">
                    <p class="rank-username">Username</p>
                </div>
            </div>
            <div class="scoreboard">
                <div class="ranklist">
                    <p class="ranklist-title">Rank</p>
                    <p class="ranklist-player">1.<img src="static/img/fox.png" alt="Profile" class="ranklist-img">Username</p>
                    <p class="ranklist-player">2.<img src="static/img/fox.png" alt="Profile" class="ranklist-img">Username</p>
                    <p class="ranklist-player">3.<img src="static/img/fox.png" alt="Profile" class="ranklist-img">Username</p>
                    <p class="ranklist-player">4.<img src="static/img/fox.png" alt="Profile" class="ranklist-img">Username</p>
                    <p class="ranklist-player">5.<img src="static/img/fox.png" alt="Profile" class="ranklist-img">Username</p>
                    <p class="ranklist-player">6.<img src="static/img/fox.png" alt="Profile" class="ranklist-img">Username</p>
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
                      <button id="profile-img" onclick="window.location.href='#profile-page'"><img src="static/img/fox.png" alt="Profile" class="profile-image"></button>
                  </div>
              </div>
        </div>
        <div class="lead-rectangle">
            <p class="profile-title">PROFILE</p>
            <div class="profile-infos">
                <div class="profile-recap">
                    <div class="user">
                        <img src="static/img/fox.png" alt="Profile" class="first-img">
                        <div class="user-online">
                            <p class="profile-username">Username</p>
                            <div class="online">ONLINE</div>
                        </div>
                    </div>
                    <div class="recap-items">
                        <div class="item-infos">
                            <img src="static/img/dice.png" alt="Profile" class="profile-icon">
                            <p class="item-nb">3</p>
                            <p class="item-title">Games</p>
                        </div>
                        <div class="item-infos">
                            <img src="static/img/trophy.png" alt="Profile" class="profile-icon">
                            <p class="item-nb">1</p>
                            <p class="item-title">Victories</p>
                        </div>
                        <div class="item-infos">
                            <img src="static/img/heart.png" alt="Profile" class="profile-icon">
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
                      <button id="profile-img" onclick="window.location.href='#profile-page'"><img src="static/img/fox.png" alt="Profile" class="profile-image"></button>
                  </div>
              </div>
        </div>
        <div id="game-container"></div>
        <div id="score">Joueur 1: 0 | Joueur 2: 0</div>
        
    </div>
  `,
  "friends-page": `
    <div id="friends-page">
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
                    <button id="profile-img" onclick="window.location.href='#profile-page'"><img src="static/img/fox.png" alt="Profile" class="profile-image"></button>
                </div>
            </div>
        </div>
        <div class="friends-rectangle">
            <p class="friends-title">FRIENDS</p>
            <label for="username" class="friend-user">Add a new friend</label>
            <input class="friend-searchbox" type="text" id="user">
            <button class="add-friend">ADD</button>
            <p class="your-friends">YOUR FRIENDS</p>
            <div class="scoreboard">
                <div class="ranklist-container">
                    <div class="ranklist">
                        <p class="ranklist-player"><img src="static/img/fox.png" alt="Profile" class="ranklist-img">Username</p>
                        <p class="ranklist-player"><img src="static/img/fox.png" alt="Profile" class="ranklist-img">Username</p>
                        <p class="ranklist-player"><img src="static/img/fox.png" alt="Profile" class="ranklist-img">Username</p>
                        <p class="ranklist-player"><img src="static/img/fox.png" alt="Profile" class="ranklist-img">Username</p>
                        <p class="ranklist-player"><img src="static/img/fox.png" alt="Profile" class="ranklist-img">Username</p>
                        <p class="ranklist-player"><img src="static/img/fox.png" alt="Profile" class="ranklist-img">Username</p>
                    </div>
                    <div class="remove-buttons">
                        <button class="remove">Remove</button>
                        <button class="remove">Remove</button>
                        <button class="remove">Remove</button>
                        <button class="remove">Remove</button>
                        <button class="remove">Remove</button>
                        <button class="remove">Remove</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
};

function getPageName(page) {
    return page.endsWith('-page') ? page : `${page}-page`;
}

// Fonction pour gérer la navigation avec l'historique
function navigateTo(page, addToHistory = true) {
    const normalizedPage = getPageName(page);
    if (addToHistory) {
        window.history.pushState({ normalizedPage }, normalizedPage, `#${normalizedPage}`);
    }
    const app = document.getElementById('pong');
    app.innerHTML = pagesContent[normalizedPage] || `<h1>Page not found</h1>`;
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    const initialPage = window.location.hash.replace('#', '') || 'login-page';
    navigateTo(initialPage, false); // Pas besoin d'ajouter dans l'historique au chargement
});

// Rechargement de la page en arrière/avant dans l'historique
window.onpopstate = (event) => {
    const page = window.location.hash.replace('#', '') || 'login-page';
    navigateTo(page, false); // Pas d'ajout à l'historique ici non plus
};

document.querySelectorAll('a.nav-link').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); // Empêche le comportement par défaut
        const page = link.getAttribute('href').replace('#', '');
        navigateTo(page); // Navigue vers la page
    });
});

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById("login-page")) {
    document.getElementById("enter-button").addEventListener("click", async function (e) {
    e.preventDefault(); // Empêche le comportement par défaut du bouton

    // Récupère les valeurs du formulaire
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMessage = document.getElementById("error-message");

    // Vérifie que les champs ne sont pas vides
    if (username === "" || password === "") {
        errorMessage.textContent = "Both username and password are required.";
        return;
    }

    try {
        // Envoie une requête POST à l'API
        const response = await fetch("http://localhost:8080/login/", {
            method: "POST",
            body: formData,
        });

        // Analyse la réponse
        if (response.ok) {
            const data = await response.json();
            alert(data.message); // Affiche "Login successful"
            navigateTo("home-page"); // Redirige l'utilisateur
        } else {
            const errorData = await response.json();
            errorMessage.textContent = errorData.error; // Affiche l'erreur retournée
        }
    } catch (err) {
        errorMessage.textContent = "Server error. Please try again later.";
    }

    // try {
    //     // Envoie une requête POST à l'API
    //     const response = await fetch("/api/login", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({ username, password }),
    //     });

    //     // Analyse la réponse
    //     if (response.ok) {
    //         const data = await response.json();
    //         alert(data.message); // Affiche "Login successful"
    //         navigateTo("home-page"); // Redirige l'utilisateur
    //     } else {
    //         const errorData = await response.json();
    //         errorMessage.textContent = errorData.error; // Affiche l'erreur retournée
    //     }
    // } catch (err) {
    //     errorMessage.textContent = "Server error. Please try again later.";
    // }
});
    }
}); 

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById("create-account-page")) {
    
    
    const imageUpload = document.getElementById('imageUpload');
    const imagePreview = document.getElementById('imagePreview');
    const errorMessage = document.getElementById('account-error');
    const saveButton = document.getElementById('save-button');
    
    // Ajoute un gestionnaire pour l'input file
    imageUpload.addEventListener('change', function () {
        const file = this.files[0]; // Récupère le fichier sélectionné

        if (file) {
            const reader = new FileReader();

            // Une fois le fichier chargé
            reader.onload = function (e) {
                // Met à jour la source de l'image de prévisualisation
                imagePreview.src = e.target.result;
            };

            reader.readAsDataURL(file);
        } else {
            imagePreview.src = "static/img/person.png"; // Réinitialise l'image si aucun fichier n'est sélectionné
            errorMessage.textContent = "Please choose a valid file.";
        }
    });

    

    
    saveButton.addEventListener("click", async function (e) {
   
    e.stopPropagation(); // Empêche le comportement par défaut du bouton
    
    
    const _profileImage = document.getElementById('imageUpload');
    const _username = document.getElementById('user').value.trim();
    const _password = document.getElementById('password2').value.trim();
    const _confirmPassword = document.getElementById('confirm-password').value.trim();
    const _email = document.getElementById('email').value.trim();
    

    if (_username === "") {
        errorMessage.textContent = "Username is required.";
    }

    if (_password === "") {
        errorMessage.textContent = "Password is required.";
    }

    if (_confirmPassword === "") {
        errorMessage.textContent = "Please confirm password.";
    } else if (_password !== _confirmPassword) {
        errorMessage.textContent = "Passwords are not the same.";
    }

    if (_email === "") {
        errorMessage.textContent = "Email is required.";
    }

    if (!_profileImage.files[0]) {
        errorMessage.textContent = "Please choose a profile image.";
    }


    const formData = new FormData();
    formData.append('username', _username);
    formData.append('password', _password);
    formData.append('email', _email);
    formData.append('image_avatar', _profileImage.files[0]);

    console.table(Array.from(formData.entries()));

    try {
        const response = await fetch('http://localhost:8080/add-player/', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Error while submitting the form');
        }

        const result = await response.json();
        console.log('Success:', result);
        navigateTo("login-page"); // Redirige l'utilisateur
    } catch (error) {
        console.error('Error:', error);
        errorMessage.textContent = "An error occurred. Please try again.";
    }
            

});
    }
});
