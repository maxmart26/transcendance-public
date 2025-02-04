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
                  <a id="settings" href="#settings" class="navbar-item">SETTINGS</a>
                  <div class="profile-container>
                    <button id="profile-img" onclick="window.location.href='#profile-page'"><img src="static/img/fox.png" alt="Profile" class="profile-image"></button>
                  </div>
              </div>
        </div>
        <div class="game-types">
            <p class="choose-game">Which game do you want to launch ?</p>
            <div class="pongs">
                <button onclick="navigateTo('online-game-page')" id="online-game" class="game-rectangle">PONG (online)</button>
                <button onclick="navigateTo('game-page')" id="game" class="game-rectangle">PONG 3D (local)</button>
            </div>
            <button onclick="navigateTo('tournament-page')" id="tournament-game" class="tournament-rectangle">Tournament (1/4)</button>
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
                          <div id="settings-img" class="people-contour">
                              
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
                  <div class="profile-container">
                      <button id="profile-img" onclick="window.location.href='#profile-page'"><img src="static/img/fox.png" alt="Profile" class="profile-image"></button>
                  </div>
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
                  <div class="profile-container">
                      <button id="profile-img" onclick="window.location.href='#profile-page'"><img src="static/img/fox.png" alt="Profile" class="profile-image"></button>
                  </div>
              </div>
        </div>
        <div id="online-game-container"></div>
        <div class="difficulty-buttons">
            <button id="easy" class="difficulty-btn">Easy</button>
            <button id="medium" class="difficulty-btn">Medium</button>
            <button id="hard" class="difficulty-btn">Hard</button>
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
                <div class="profile-container">
                    <button id="profile-img" onclick=""><img src="static/img/fox.png" alt="Profile" class="profile-image"></button>
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
                <div class="profile-container">
                    <button id="profile-img" onclick=""><img src="static/img/fox.png" alt="Profile" class="profile-image"></button>
                </div>
            </div>
        </div>
    </div>
    `,
};

let game_running = false;

function getPageName(page) {
    return page.endsWith('-page') ? page : `${page}-page`;
}

function getCurrentTab() {
    const hash = window.location.hash;
    if (hash)
        return hash.substring(1); // Supprimer le '#'
    return null;
}

// Fonction pour gérer la navigation avec l'historique
function navigateTo(page, addToHistory = true) {
    const normalizedPage = getPageName(page);
    if (normalizedPage == 'pong-game-page')
        document.body.id = 'pong-game-page';
    else
        document.body.id = '';
    if (addToHistory) {
        window.history.pushState({ normalizedPage }, normalizedPage, `#${normalizedPage}`);
    }
    const app = document.getElementById('pong');
    app.innerHTML = pagesContent[normalizedPage] || `<h1>Page not found</h1>`;
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
    }

    if (_password === "") {
        errorMessage.textContent = "Password is required.";
    }

    if (_confirmPassword === "") {
        errorMessage.textContent = "Please confirm password.";
    } else if (_password !== _confirmPassword) {
        errorMessage.textContent = "Passwords are not the same.";
    }

    console.log(_password);
    console.log(_confirmPassword);

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


document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById("settings-page")) {
    let session = getCookie("user_id");
    console.log("User ID:", session);
    let url = "https://" + window.location.host + "/user/" + session +'/';
    console.log(url);
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log("User ID from API:", data);
            let userID = data.user.id;

            const settings_img = document.getElementById("settings-img");
                    
            const li = document.createElement("li");
            if (data.user.image_avatar !== null)
                li.innerHTML = `<img id="newImagePreview" class="preview" src=${data.user.image_avatar}>`;
            else
            li.innerHTML = `<img id="newImagePreview" class="preview" src=${data.user.image_avatar}>`;
            settings_img.appendChild(li);
            
            document.getElementById("save-settings").addEventListener("click", async function (e) {
                e.preventDefault(); // Empêche le comportement par défaut du bouton
            
                // Récupère les valeurs du formulaire
                const _profileImage = document.getElementById('newImageUpload');
                const _username = document.getElementById('username').value.trim();
                const _password = document.getElementById('password2').value.trim();
                const _confirmPassword = document.getElementById('confirm-password').value.trim();
                const _email = document.getElementById('email').value.trim();
        
                const formData = new FormData();
        
                formData.append('player_id', userID);
        
                if (_username !== "") {
                    formData.append('username', _username);
                }
        
                if (_email !== "") {
                    formData.append('email', _email);
                }
        
                if (_profileImage.files[0]) {
                    formData.append('image_avatar', _profileImage.files[0]);
                }
                if (_password !== "") {
                    formData.append('password', _password);
                }
                if (_password !== "" && _confirmPassword !== "" && _password !== _confirmPassword) {
                    errorMessage.textContent = "Passwords are not the same.";
                } else if (_password === "" && _confirmPassword !== "") {
                    errorMessage.textContent = "Please enter a new password before confirming.";
                }
        
                console.table(Array.from(formData.entries()));
                
                try {
                    // Envoie une requête POST à l'API
                    const response = await fetch("https://" + window.location.host + "/update-player/", {
                        method: "PUT",
                        body: formData,
                    });
        
                    if (!response.ok) {
                        throw new Error('Error while submitting the form');
                    }
            
                    const result = await response.json();
                    console.log('Success:', result);
                    
                } catch (error) {
                    console.error('Error:', error);
                    errorMessage.textContent = "An error occurred. Please try again.";
                }
            
            });
        })
        
        .catch(error => console.error("Erreur lors du chargement des param du user_id :", error));
    

    
}
    }); 


function deleteCookie(name) {
    document.cookie = name + "=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";
}


document.addEventListener("click", async function (event) {
    
// document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById("settings-page")) {
        if (event.target && event.target.id === "logout") {
            event.preventDefault();
        // document.getElementById("logout").addEventListener("click", async function (e) {
            console.log("Cookies restants avand delete :", document.cookie);
            deleteCookie("user_id");
            console.log("Cookies restants apres delete :", document.cookie);
            navigateTo("login-page");
        // });
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

function reloadScript(url) {
    let oldScript = document.querySelector("script[src^='" + url + "']");
    if (oldScript) oldScript.remove(); // Supprime l'ancien script

    let newScript = document.createElement("script");
    newScript.src = url + "?v=" + new Date().getTime(); // Ajoute un cache-buster
    document.body.appendChild(newScript);
}
    
