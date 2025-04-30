/**
 * Gestion de la navigation
 * - Menu hamburger sur mobile
 * - Basculement de la barre latérale
 * - Bouton retour en haut de page
 */

document.addEventListener('DOMContentLoaded', () => {
    // Éléments du DOM
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    const backToTopBtn = document.getElementById('back-to-top');
    
    // Gérer le menu hamburger sur mobile
    const hamburgerMenu = document.createElement('div');
    hamburgerMenu.className = 'hamburger-menu';
    hamburgerMenu.setAttribute('aria-label', 'Menu principal');
    hamburgerMenu.setAttribute('role', 'button');
    hamburgerMenu.setAttribute('tabindex', '0');
    
    // Ajouter les barres du hamburger
    for (let i = 0; i < 4; i++) {
        const span = document.createElement('span');
        hamburgerMenu.appendChild(span);
    }
    
    // Insérer le menu hamburger dans l'en-tête pour les mobiles
    if (window.innerWidth < 768) {
        header.insertBefore(hamburgerMenu, nav);
        
        // Gérer l'ouverture/fermeture du menu
        hamburgerMenu.addEventListener('click', () => {
            hamburgerMenu.classList.toggle('open');
            nav.classList.toggle('open');
        });
        
        // Fermer le menu au clic sur un lien
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburgerMenu.classList.remove('open');
                nav.classList.remove('open');
            });
        });
    }
    
    // Gérer le bouton retour en haut de page
    if (backToTopBtn) {
        // Afficher/masquer le bouton en fonction du défilement
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        // Action au clic sur le bouton
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Mettre à jour la navigation active en fonction de la page
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath || 
            currentPath.endsWith(link.getAttribute('href'))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}); 