// JavaScript pour gérer le remplacement
document.getElementById('replaceButton').addEventListener('click', () => {
    // Cacher la section A
    const sectionA = document.getElementById('login-page');
    sectionA.classList.add('hidden');
    
    // Afficher la section B
    const sectionB = document.getElementById('create-account');
    sectionB.classList.remove('hidden');
});