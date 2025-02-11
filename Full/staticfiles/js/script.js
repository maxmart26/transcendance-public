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
            <button onclick="window.location.href='https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-740be05e283130d59321a2b45f94cc9f8d7c90cce47668da972834e6b5ce5492&redirect_uri=https://' + window.location.host + '/auth/complete/intra42/&response_type=code'" class="button2">
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
                    <div class="search-box">
                        <input type="text" id="search-player" placeholder="Rechercher un joueur..." />
                        <div id="search-results"></div>
                    </div>
                  <a id="settings" href="#settings" class="navbar-item">SETTINGS</a>
                  <div id="profile-container" class="profile-container"></div>
              </div>
        </div>
        <div class="game-types">
            <p class="choose-game">Which game do you want to launch ?</p>
            <div class="pongs">
                <button onclick="navigateTo('online-game-page')" id="online-game" class="game-rectangle">PONG (online)</button>
                <button onclick="start_3Dgame()" id="game" class="game-rectangle">PONG 3D (local)</button>
            </div>
            <button onclick="tournament()" id="tournament-game" class="tournament-rectangle">Tournament (1/4)</button>
        </div>      
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
                  <div id="profile-container" class="profile-container"></div>
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
                          <div id="settings-img" class="people-contour"></div>
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
              </div>
              <div class="change-password">
                  <p class="settings-password">CHANGE YOUR PASSWORD</p>
                  <form class="password-infos">
                      <label for="password" class="password-text">Enter new password</label>
                      <input type="password" id="password2">
                      <label for="confirm-password" class="password-text">Confirm new password</label>
                      <input type="password" id="confirm-password">
                  </form>
              </div>
              <button id="save-settings" class="save-settings">SAVE</button>
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
                  <div id="profile-container" class="profile-container"></div>
              </div>
        </div>
        <div class="rectangle">
            <p class="lead-title">LEADERBOARD</p>
            <div class="lead-players">
                <div id="second" class="rank"></div>
                <div id="first" class="rank"></div>
                <div id="third" class="rank"></div>
            </div>
            <div class="scoreboard">
                <div class="ranklist">
                    <p class="ranklist-title">Rank</p>
                    <div id="ranklist" class="rank-list"></div>
                </div>
                <div class="score">
                    <p class="ranklist-title">Score</p>
                    <div id="score-list" class="score-list"></div>
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
                  <div id="profile-container" class="profile-container"></div>
              </div>
        </div>
        <div class="lead-rectangle">
            <p class="profile-title">PROFILE</p>
            <div class="profile-infos">
                <div class="profile-recap">
                    <div id="user" class="user"></div>
                    <div class="recap-items">
                        <div id="nb-games" class="item-infos"></div>
                        <div id="nb-win" class="item-infos"></div>
                        <div id="nb-friends" class="item-infos"></div>
                    </div>
                </div>
                <div class="profile-stats">
                </div>
            </div>
            <div class="recap-games">
                <p class="recap-title">LATEST GAMES</p>
                <table id="match-history">
                    <thead>
                        <tr>
                            <th>Opponent</th>
                            <th>Date</th>
                            <th>Result</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Les lignes de matchs seront ajoutées dynamiquement ici -->
                    </tbody>
                </table>
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
                  <div id="profile-container" class="profile-container"></div>
              </div>
        </div>
        <div id='scoreboard'>
			<h1 id='scores'>0-0</h1>
		</div>
    </div>
  `,
  "online-game-page": `
    <div id="online-game-page">
        <div class="home-navbar">
              <div class="navbar-left">
                  <p class="text-wrapper">PONG</p>
                  <a id="home" href="#home" class="navbar-item">HOME</a>
                  <a id="leaderboard" href="#leaderboard" class="navbar-item">LEADERBOARD</a>
                  <a id="friends" href="#friends" class="navbar-item">FRIENDS</a>
              </div>
              <div class="navbar-right">
                  <a id="settings" href="#settings" class="navbar-item">SETTINGS</a>
                  <div id="profile-container" class="profile-container"></div>
              </div>
        </div>
        <div class="difficulty-buttons">
            <button id="easy" onclick="load_game('easy')" class="difficulty-btn">Easy</button>
            <button id="medium" onclick="load_game('medium')" class="difficulty-btn">Medium</button>
            <button id="hard" onclick="load_game('hard')" class="difficulty-btn">Hard</button>
        </div>
    </div>
  `,
  "tournament-page": `
    <div id="tournament-page">
        <div class="home-navbar">
              <div class="navbar-left">
                  <p class="text-wrapper">PONG</p>
                  <a id="home" href="#home" class="navbar-item">HOME</a>
                  <a id="leaderboard" href="#leaderboard" class="navbar-item">LEADERBOARD</a>
                  <a id="friends" href="#friends" class="navbar-item">FRIENDS</a>
              </div>
              <div class="navbar-right">
                  <a id="settings" href="#settings" class="navbar-item">SETTINGS</a>
                  <div id="profile-container" class="profile-container"></div>
              </div>
              <div class="playerlist">
                <div class="playerlist-container">
                    <div class="ranklist">
                        <p class="ranklist-player"><img alt="Profile" class="ranklist-img"><span class="player-name"></span></p>
                        <p class="ranklist-player"><img alt="Profile" class="ranklist-img"><span class="player-name"></span></p>
                        <p class="ranklist-player"><img alt="Profile" class="ranklist-img"><span class="player-name"></span></p>
                        <p class="ranklist-player"><img alt="Profile" class="ranklist-img"><span class="player-name"></span></p>
                    </div>
                </div>
              </div>
        </div>
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
                <div id="profile-container" class="profile-container"></div>
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
                    </div>
                    <div class="remove-buttons">
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    "pong-game-page":`
    <div id="pong-game">
        <div class="home-navbar">
            <div class="navbar-left">
                <p class="text-wrapper">PONG</p>
                <a id="home" href="#home" class="navbar-item">HOME</a>
                <a id="leaderboard" href="#leaderboard" class="navbar-item">LEADERBOARD</a>
                <a id="friends" href="#friends" class="navbar-item">FRIENDS</a>
            </div>
            <div class="navbar-right">
                <a id="settings" href="#settings" class="navbar-item">SETTINGS</a>
                <div id="profile-container" class="profile-container"></div>
            </div>
        </div>
    </div>
    `,
};

// -------------------------- GLOBAL ---------------------------------


// Affichage image de profil sur toutes les pages

//document.addEventListener('DOMContentLoaded', async () => {
async function initializeProfilePic () {
    try {
        let session = getCookie("user_username");
        console.log("User ID:", session);
        let url = "https://" + window.location.host + "/user/" + session + '/';
        console.log(url);
        // Remplace l'URL par l'endpoint de ton API qui retourne l'image de l'utilisateur
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch profile image');

        const data = await response.json();
        
        const profilePic = document.getElementById("profile-container");
        
        if (data.user.image_avatar && profilePic) {
            const li = document.createElement("li");
            if (data.user.image_avatar !== null)
                li.innerHTML = `<button id="profile-img" onclick="window.location.href='#profile-page'"><img src=${data.user.image_avatar} alt="Profile" class="profile-image"></button>`;
            else
                li.innerHTML = `<button id="profile-img" onclick="window.location.href='#profile-page'"><img src="static/img/fox.png" alt="Profile" class="profile-image"></button>`;

            profilePic.appendChild(li);
        }
    } catch (error) {
        console.error('Error loading profile image:', error);
    }
//});
}

function getPageName(page) {
    return page.endsWith('-page') ? page : `${page}-page`;
}

function getCurrentTab() {
    const hash = window.location.hash;
    if (hash)
        return hash.substring(1); // Supprimer le '#'
    return null;
}

// Gestion de la navigation vers les pages avec historique

function navigateTo(page, addToHistory = true) {
    const normalizedPage = getPageName(page);
    // Vérifie si on veut afficher un profil spécifique
    let userId = null;
    if (normalizedPage.startsWith("profile/")) {
        userId = normalizedPage.split("/")[1]; // Récupère l'ID du joueur depuis l'URL
        normalizedPage = "profile-page";
    }
    if (normalizedPage == 'pong-game-page')
        document.body.id = 'pong-game-page';
    else
        document.body.id = '';
    if (addToHistory) {
        window.history.pushState({ normalizedPage }, normalizedPage, `#${normalizedPage}`);
    }
    const app = document.getElementById('pong');
    
    app.innerHTML = "";

    if (pagesContent[normalizedPage]) {
        app.innerHTML = pagesContent[normalizedPage];
    } else {
        app.innerHTML = `<h1>Page not found</h1>`;
        return;
    }

    initializePageScripts(normalizedPage, getCookie('user_id'));
}

// Mise a jour des pages quand on clique dessus

function initializePageScripts(page, userId = null) {
    initializeNavbar();
    initializeProfilePic();
    console.log(page);
    if (page === "home-page") {
        initializeSearchBar();
    }
    if (page === "profile-page" && userId) {
        console.log("this is profile page");
        loadProfilePage(userId);
    }
    if (page === "settings-page") {
        setupSettingsPage();
    }
    if (page === "leaderboard-page") {
        initializeLeaderboard();
    }
    if (page === "friends-page") {
        setFriendsPage();
    }
}

window.addEventListener("popstate", (event) => {
    if (event.state && event.state.normalizedPage) {
        navigateTo(event.state.normalizedPage, false);
    }
});

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    const initialPage = window.location.hash.replace('#', '') || 'login-page';
    console.log("hashtag remplace", initialPage);
    navigateTo(initialPage, false); // Pas besoin d'ajouter dans l'historique au chargement
});

function initializeNavbar() {
    document.querySelectorAll('.navbar-item').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Empêche le rechargement de la page
            const page = link.getAttribute('href').replace('#', ''); // Extrait la page
            console.log("navbar: ", page);
            navigateTo(page); // Charge la page correspondante
        });
    });
}

async function loadUserProfile(userId = null) {
    let sessionUserId = getCookie("user_username"); // ID du joueur connecté

    // Détermine quel profil charger
    let profileId = userId || sessionUserId;
    if (!profileId) return console.error("Aucun utilisateur trouvé.");

    try {
        const response = await fetch(`https://${window.location.host}/user/${profileId}/`);
        if (!response.ok) throw new Error("Profil introuvable");

        const data = await response.json();
        
        document.getElementById("profile-username").textContent = data.user.username;

        // Gérer l’image de profil (par défaut si supprimée)
        const profileImage = document.getElementById("profile-image");
        profileImage.src = data.user.image_avatar || "static/img/person.png";

    } catch (error) {
        console.error("Erreur lors du chargement du profil:", error);
    }
}

// Gestion cookies

function getCookie(name) {
    let cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
        let [key, value] = cookie.split("=");
        if (key === name) {
            return decodeURIComponent(value);  // Décoder les valeurs encodées
        }
    }
    return null; // Retourne `null` si le cookie n'existe pas
}

function deleteCookie(name) {
    document.cookie = name + "=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";
}

// ----------------- LOGIN PAGE ----------------------------------

document.addEventListener("click", async function (event) {
    if (event.target && event.target.id === "enter-button") {
        event.preventDefault();
    // Récupère les valeurs du formulaire
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMessage = document.getElementById("error-message");

    // Vérifie que les champs ne sont pas vides
    if (username === "" || password === "") {
        errorMessage.textContent = "Both username and password are required.";
        return;
    }
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    console.table(Array.from(formData.entries()));
    try {
        // Envoie une requête POST à l'API
        const response = await fetch("https://" + window.location.host + "/login/", {
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
}   
});

document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById("login-page")) {
        console.log("Cookies restants :", document.cookie);
        if (document.cookie.includes("user_id=")) {
            navigateTo("home-page");
        }
    }
});

// ------------------------- CREATE ACCOUNT ---------------------------------------

document.addEventListener("click", async function (event) {
    if (document.getElementById("create-account-page")) {

    const imageUpload = document.getElementById('imageUpload');
    const imagePreview = document.getElementById('imagePreview');
    const errorMessage = document.getElementById('account-error');
    
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

    if (event.target && event.target.id === "save-button") {
        event.preventDefault();
    
    
    const _profileImage = document.getElementById('imageUpload');
    const _username = document.getElementById('user').value.trim();
    const _password = document.getElementById('password2').value.trim();
    const _confirmPassword = document.getElementById('confirm-password').value.trim();
    const _email = document.getElementById('email').value.trim();

    if (_username === "") {
        errorMessage.textContent = "Username is required.";
        return;
    }

    if (_password === "") {
        errorMessage.textContent = "Password is required.";
        return;
    }

    if (_confirmPassword === "") {
        errorMessage.textContent = "Please confirm password.";
        return;
    } else if (_password !== _confirmPassword) {
        errorMessage.textContent = "Passwords are not the same.";
        return;
    }

    console.log(_password);
    console.log(_confirmPassword);

    if (_email === "") {
        errorMessage.textContent = "Email is required.";
        return;
    }

    if (!_profileImage.files[0]) {
        errorMessage.textContent = "Please choose a profile image.";
        return;
    }


    const formData = new FormData();
    formData.append('username', _username);
    formData.append('password', _password);
    formData.append('email', _email);
    formData.append('image_avatar', _profileImage.files[0]);

    console.table(Array.from(formData.entries()));

    console.table(window.location.host);

    try {
        const response = await fetch('https://' + window.location.host + '/add-player/', {
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
            
    }
}
});

// ---------------------- SETTINGS PAGE --------------------------

function setupSettingsPage() {
    // Vérifie si la page settings est affichée
    if (!document.getElementById("settings-page")) return;

    let session = getCookie("user_username");
    console.log("User ID:", session);

    let url = "https://" + window.location.host + "/user/" + session + "/";
    console.log(url);

    fetch(url)
        .then(response => response.json())
        .then(async data => {
            console.log("User ID from API:", data);
            let userID = data.user.id;

            // Sélection des éléments HTML
            const settingsImgContainer = document.getElementById("settings-img");
            const imageUploadInput = document.getElementById("newImageUpload");
            const saveButton = document.getElementById("save-settings");

            console.log("settingsImgContainer:", settingsImgContainer);
            
            // Vérifie s'il y a déjà une image, sinon met une image par défaut
            if (data.user.image_avatar) {
                settingsImgContainer.style.backgroundImage = `url('${data.user.image_avatar}')`;
            } else {
                settingsImgContainer.style.backgroundImage = "url('static/img/person.png')";
            }

            // Événement pour mettre à jour l'image sélectionnée
            imageUploadInput.addEventListener("change", function () {
                const file = imageUploadInput.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        settingsImgContainer.style.backgroundImage = `url('${e.target.result}')`;
                    };
                    reader.readAsDataURL(file);
                }
            });

            // Gestion du clic sur le bouton "Save Settings"
            saveButton.addEventListener("click", async function (event) {
                event.preventDefault();

                const username = document.getElementById('username').value.trim();
                const password = document.getElementById('password2').value.trim();
                const confirmPassword = document.getElementById('confirm-password').value.trim();
                const email = document.getElementById('email').value.trim();

                const formData = new FormData();
                formData.append('player_id', userID);

                if (username !== "") {
                    formData.append('username', username);
                }
                if (email !== "") {
                    formData.append('email', email);
                }
                if (imageUploadInput.files[0]) {
                    formData.append('image_avatar', imageUploadInput.files[0]);
                }
                if (password !== "") {
                    formData.append('password', password);
                }
                if (password !== "" && confirmPassword !== "" && password !== confirmPassword) {
                    alert("Les mots de passe ne correspondent pas.");
                    return;
                } else if (password === "" && confirmPassword !== "") {
                    alert("Veuillez entrer un nouveau mot de passe avant de confirmer.");
                    return;
                }

                console.table(Array.from(formData.entries()));

                try {
                    const response = await fetch("https://" + window.location.host + "/update-player/", {
                        method: "PUT",
                        body: formData,
                    });

                    if (!response.ok) {
                        throw new Error("Erreur lors de la mise à jour du profil");
                    }

                    const result = await response.json();
                    console.log("Succès :", result);
                    navigateTo("settings-page");

                } catch (error) {
                    console.error("Erreur :", error);
                    alert("Une erreur s'est produite. Veuillez réessayer.");
                }
            });
        })
        .catch(error => console.error("Erreur lors du chargement du user_id :", error));
}

document.addEventListener("click", async function (event) {
    if (document.getElementById("settings-page")) {
        if (event.target && event.target.id === "logout") {
            event.preventDefault();
            const response = await fetch("https://" + window.location.host + "/logout/", {
                method: "POST",
                credentials: "include", // ✅ Inclure les cookies de session
            });
            if (response.ok) {
                console.log("Déconnexion réussie !");
                document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                document.cookie = "user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                document.cookie = "user_username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                navigateTo("login-page");            
            } else {
                console.error("Erreur lors de la déconnexion.");
            }
            
    }
}
});

// --------------------------- LEADERBOARD PAGE -------------------

async function initializeLeaderboard() {
    try {
        let url = "https://" + window.location.host + "/leaderboard/";
        console.log(url);
        // Remplace l'URL par l'endpoint de ton API qui retourne l'image de l'utilisateur
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch leaderboard');

        const data = await response.json();
        
        if (document.getElementById("leaderboard-page")) {
            let i = 0;
            const first = document.getElementById("first");
            const second = document.getElementById("second");
            const third = document.getElementById("third");
            const ranklist = document.getElementById("ranklist");
            const score = document.getElementById("score-list");
            
            while (i < 5) {
                const li = document.createElement("li");
                const li2 = document.createElement("li");
                const li3 = document.createElement("li");
                if (data[i]) {
                
                li.innerHTML = `<p class="rank-title">Rank ${i+1}</p>
                <img src=${data[i].image_avatar} alt="Profile" class="first-img">
                <p class="rank-username">${data[i].username}</p>`;

                li2.innerHTML = `<p class="ranklist-player">${i+1}.<img src=${data[i].image_avatar} alt="Profile" class="ranklist-img">${data[i].username}</p>`;
                
                li3.innerHTML = `<p class="score-nb">${data[i].nb_game_win}</p>`;
                
                ranklist.appendChild(li2);
                score.appendChild(li3);
                
            }
            else {
                if (i < 3) {
                li.innerHTML = `<p class="rank-title">Rank ${i+1}</p>
                <img src="static/img/person.png" alt="Profile" class="first-img">
                <p class="rank-username">Username</p>`;
                }
            }
            if (i === 0)
                first.appendChild(li);
            else if (i === 1)
                second.appendChild(li);
            else if (i == 2)
                third.appendChild(li);

            i++;
        }
        }
    } catch (error) {
        console.error('Error loading profile image:', error);
    }
//});
}

// ------------------------ FRIENDS PAGE --------------------------

function setFriendsPage() {

    console.log("testfriend");
    let session = getCookie("user_username");
    if (!session) {
        console.error("No user session found.");
        return;
    }

    let url = "https://" + window.location.host + "/user/" + session + '/';

    // Récupération et affichage des amis
    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log("Friends list:", data.user.friends);

        const friendsContainer = document.querySelector(".ranklist");
        const removeButtonsContainer = document.querySelector(".remove-buttons");

        // Vider les conteneurs avant de les remplir
        friendsContainer.innerHTML = "";
        removeButtonsContainer.innerHTML = "";

        data.user.friends.forEach(friend => {
            // Création de l'élément pour chaque ami
            const friendElement = document.createElement("p");
            friendElement.classList.add("ranklist-player");
            friendElement.innerHTML = `
                <img src="${friend.image_avatar || 'static/img/fox.png'}" alt="Profile" class="ranklist-img">
                ${friend.username}
            `;
            friendsContainer.appendChild(friendElement);

            // Bouton Remove pour chaque ami
            const removeButton = document.createElement("button");
            removeButton.classList.add("remove");
            removeButton.textContent = "Remove";
            removeButton.addEventListener("click", () => removeFriend(friend.username, removeButton));

            removeButtonsContainer.appendChild(removeButton);
        });
    })
    .catch(error => console.error("Error loading friends list:", error));

    // Ajout d'un ami
    document.querySelector(".add-friend").addEventListener("click", () => {
        const username = document.getElementById("user").value.trim();
        
        if (username === "") {
            alert("Please enter a username.");
            return;
        }
    
        console.log(username);
    
        fetch("https://" + window.location.host + "/add-friend/", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": "Bearer " + getCookie("access_token"),
            },
            body: JSON.stringify({ friend_username: username }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error adding friend: " + response.status);
            }
            return response.json();  // Convertit la réponse en JSON si elle est OK
        })
        .then(data => {
            alert("Friend added successfully!");
            navigateTo("friends-page"); // Recharge la page pour voir la mise à jour
        })
        .catch(error => {
            console.error("Error adding friend:", error);
            alert("Error adding friend. Please try again.");
        });
    });
}

// Supprimer un ami
function removeFriend(username, buttonElement) {
    let session = getCookie("user_id");

    fetch("https://" + window.location.host + "/remove-friend/", {
        method: "DELETE",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": "Bearer " + getCookie("access_token"),
        },
        body: JSON.stringify({ user_id: session, friend_username: username }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to remove friend");
        }
        return response.json();
    })
    .then(data => {
        console.log("Friend removed:", data);

        // Supprimer l'élément du DOM sans recharger la page
        const friendElement = buttonElement.parentElement.querySelector(".ranklist-player");
        if (friendElement) {
            friendElement.remove();
        }
        buttonElement.remove(); // Supprimer le bouton "Remove" correspondant

        alert("Friend removed successfully!");
        navigateTo("friends-page"); // Recharge la page pour voir la mise à jour
    })
    .catch(error => {
        console.error("Error removing friend:", error);
        alert("Error removing friend. Please try again.");
    });
}

// ------------------------ PROFILE PAGE ---------------------------


function loadProfilePage() {
    // Récupérer l'ID de l'utilisateur connecté (session) ou l'ID passé dans l'URL
    let session = getCookie("user_username");
    if (!session) {
        console.error("Utilisateur non connecté");
        return;
    }

    // Récupérer les informations utilisateur depuis l'API
    let url = `https://${window.location.host}/user/${session}/`;
    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error('Échec du chargement des informations utilisateur');
            return response.json();
        })
        .then(data => {
            const user = document.getElementById("user");
            const games = document.getElementById("nb-games");
            const win = document.getElementById("nb-win");
            const friends = document.getElementById("nb-friends");

            // Créer et insérer les informations de l'utilisateur dans le DOM
            const li = document.createElement("li");
            li.innerHTML = `
                <div id="profile-image">
                    <img src="${data.user.image_avatar}" alt="Profile" class="profile-image">
                </div>
                <div class="user-online">
                    <p id="profile-username" class="profile-username">${data.user.username}</p>
                    <div class="online">ONLINE</div>
                </div>`;

            const li2 = document.createElement("li");
            li2.innerHTML = `
                <img src="static/img/dice.png" alt="Games" class="profile-icon">
                <p class="item-nb">${data.user.nb_game_play}</p>
                <p class="item-title">Games</p>`;

            const li3 = document.createElement("li");
            li3.innerHTML = `
                <img src="static/img/trophy.png" alt="Wins" class="profile-icon">
                <p class="item-nb">${data.user.nb_game_win}</p>
                <p class="item-title">Victories</p>`;

            const li4 = document.createElement("li");
            li4.innerHTML = `
                <img src="static/img/heart.png" alt="Friends" class="profile-icon">
                <p class="item-nb">${data.user.nb_friends}</p>
                <p class="item-title">Friends</p>`;

            // Ajouter les éléments dans la page
            user.appendChild(li);
            games.appendChild(li2);
            win.appendChild(li3);
            friends.appendChild(li4);

        })
        .catch(error => {
            console.error("Erreur lors du chargement du profil utilisateur:", error);
        });
}

document.addEventListener("DOMContentLoaded", async () => {
    let session = getCookie("user_username"); // Récupère l'ID du joueur connecté
    let url = `https://${window.location.host}/user/${session}`; // API pour récupérer les matchs

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Erreur de chargement des matchs");

        const matches = await response.json();
        History(matches);
    } catch (error) {
        console.error("Erreur :", error);
    }
});

// Fonction pour afficher les matchs dans le tableau
function populateMatchHistory(matches) {
    console.log(matches);
    const tbody = document.querySelector("#match-history tbody");
    tbody.innerHTML = ""; // Vider le tableau avant d'ajouter les nouveaux résultats

    const currentUser = getCookie("user_username");

    // Tri des matchs par date (du plus récent au plus ancien)
    console.log(matches.user.games_history);
    const matchHistory = Object.values(matches.user.games_history);
    matchHistory.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));

    matchHistory.forEach(match => {
        const row = document.createElement("tr");

        // On regarde si l'opponent existe toujours dans la db
        let opponentName;
        if (match.player1 === currentUser) {
            opponentName = match.player2; // L'autre joueur est l'adversaire
        } else if (match.player2 === currentUser) {
            opponentName = match.player1; // L'autre joueur est l'adversaire
        } else {
            opponentName = "Deleted User"; // Cas improbable mais on le gère
        }
        
        // ✅ Ajoute une classe dynamique sur le texte "win" ou "lose"
        const resultClass = match.result.toLowerCase() === "win" ? "win-text" : "lose-text";

        row.innerHTML = `
            <td>${opponentName}</td>
            <td>${new Date(match.date).toLocaleDateString()}</td>
            <td><span class="${resultClass}">${match.result}</span></td>
            <td>${match.score[1]}-${match.score[2]}</td>
        `;

        tbody.appendChild(row);
    });
}

// -------------------------------- HOME PAGE -------------------------------------------------

function initializeSearchBar() {
    const searchInput = document.getElementById("search-player");
    const searchResults = document.getElementById("search-results");

    searchInput.addEventListener("input", async function () {
        const query = searchInput.value.trim().toLowerCase();
        if (query.length < 1) {
            searchResults.style.display = "none";
            return;
        }

        try {
            const response = await fetch(`https://${window.location.host}/search-player/?q=${query}`);
            const players = await response.json();

            searchResults.innerHTML = ""; // Efface les anciens résultats
            if (players.length === 0) {
                searchResults.innerHTML = "<div>Aucun joueur trouvé</div>";
            } else {
                players.forEach(player => {
                    const div = document.createElement("div");
                    div.textContent = player.username || "Deleted User";
                    div.addEventListener("click", () => {
                        navigateTo(`profile-page/${player.id}`);
                    });
                    searchResults.appendChild(div);
                });
            }

            searchResults.style.display = "block";
        } catch (error) {
            console.error("Erreur lors de la recherche des joueurs:", error);
        }
    });

    // Cacher la liste de résultats si on clique ailleurs
    document.addEventListener("click", function (event) {
        if (!searchInput.contains(event.target) && !searchResults.contains(event.target)) {
            searchResults.style.display = "none";
        }
    });
}

document.addEventListener("click", function (event) {
        if (event.target.id === "profile-img") {
            navigateTo('profile-page');
        }
    });

// ---------------- GAME -----------------------------------------

function tournament(){
    window.location.href='tournament/';
    wait_cookie();
    function wait_cookie(){
        if (document.cookie.includes('tourn_id')){
            navigateTo('tournament-page', true);

            socket_tourn = new WebSocket('wss://' + window.location.host + '/ws/tournament/' + getCookie('tourn_id') + '/');
            user_id = getCookie('user_id');
            playing = false;

            socket_tourn.onopen = function(e) {
                console.log("WebSocket state open");
            };
            socket_tourn.onmessage = function(event) {
                const data = JSON.parse(event.data);
                console.log("Received new " + data.type + "\n");
                if (data.type === 'players_list')
                {
                    playersName = data.players_name;
                    console.log("Player: " + playersName + '(' + playersName.length + ')');
                    playersIMG = data.players_pic;
                    playerElements = document.querySelectorAll("#tournament-page .ranklist-player");

                    playerElements.forEach((element, index) => {
                        const imgElement = element.querySelector(".ranklist-img");
                        const nameElement = element.querySelector(".player-name");
        
                        if (playersName[index])
                            nameElement.textContent = playersName[index];
                        else
                            nameElement.textContent = "Waiting for player...";
                        if (playersIMG[index])
                            imgElement.setAttribute("src", "/media/" + playersIMG[index]);
                        else
                            imgElement.setAttribute("src", "static/img/fox.png");
                    })
                }
                else if (data.type == 'init_tournament')
                {
                    console.log("starting tourney");
	                deleteCookie('match_id');
                    load_tourn_game();
                }
                    
            };
            socket_tourn.onclose = function(e) {
                console.error('Socket WebSocket closed');
            };
            socket_tourn.onerror = function(err) {
                console.error('Error WebSocket :', err);
            };
            const interval = setInterval(() => {
                if (getCurrentTab() !== 'tournament-page' && getCurrentTab() !== 'pong-game-page'){
                    socket_tourn.send(JSON.stringify({
                        'type': 'player_disconnect',
                        'id': user_id
                    }));
	                deleteCookie('tourn_id');
                    socket_tourn.close();
                    console.log("Tournament left.");
                    clearInterval(interval);
                }
            }, 100);
        }
        else
            setTimeout(wait_cookie, 100);
    }
}

function load_tourn_game(){
    window.location.href='tournament/game/';
    wait_cookie();
    function wait_cookie(){
        if (document.cookie.includes('match_id')){
            navigateTo('pong-game-page', true);
            const pongGameTab = document.getElementById('pong-game');
            const canvas = document.createElement('canvas')
            pongGameTab.appendChild(canvas);
            const script = document.createElement('script');
            script.src = pongtourney_url;
            script.defer = true;
            pongGameTab.appendChild(script);
            script.onload = () => {
                init_game();
            }
            const interval = setInterval(() => {
                if (getCurrentTab() !== 'pong-game-page'){
                    kill();
                    script.remove();
                    canvas.remove();
	                deleteCookie('match_id');
	                console.log("game killed.");
                    clearInterval(interval);
                }
            }, 1000);
        }
        else
            setTimeout(wait_cookie, 100);
    }
}

function start_3Dgame(){
    navigateTo('game-page')
    const pongGameTab = document.getElementById('game-page');
    const div = document.createElement('div')
    div.id = 'gameCanvas'
    pongGameTab.appendChild(div);

    const script = document.createElement('script');
    script.src = pong3d_url;
    script.defer = true;
    pongGameTab.appendChild(script);
    script.onload = () => {
        setup();
    }
    const interval = setInterval(() => {
        if (getCurrentTab() !== 'game-page'){
            script.remove();
            div.remove();
            clearInterval(interval);
        }
    }, 1000);
}

function load_game(difficulty){
    window.location.href='create-game/' + difficulty + '/'
    wait_cookie();
    function wait_cookie(){
        if (document.cookie.includes('match_id')){
            navigateTo('pong-game-page', true);
            const pongGameTab = document.getElementById('pong-game');
            const canvas = document.createElement('canvas')
            pongGameTab.appendChild(canvas);
            const script = document.createElement('script');
            script.src = pong_url;
            script.defer = true;
            pongGameTab.appendChild(script);
            script.onload = () => {
                init_game();
            }

            const interval = setInterval(() => {
                if (getCurrentTab() !== 'pong-game-page'){
                    kill();
                    script.remove();
                    canvas.remove();
	                deleteCookie('match_id');
	                console.log("game killed.");
                    clearInterval(interval);
                }
            }, 1000);
        }
        else
            setTimeout(wait_cookie, 100);
    }
}

// ------------------------------------------------------------------
