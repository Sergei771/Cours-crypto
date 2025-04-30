/**
 * Gestionnaire du thème (clair/sombre)
 * - Vérifie les préférences du système
 * - Initialise le thème selon la préférence ou le choix stocké
 * - Gère le basculement entre les modes
 */

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Fonction pour définir le thème
    const setTheme = (isDark) => {
        if (isDark) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    };
    
    // Initialiser le thème
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
        setTheme(true);
    } else {
        setTheme(false);
    }
    
    // Gérer le changement de thème au clic sur le bouton
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDarkMode = document.body.classList.contains('dark-mode');
            setTheme(!isDarkMode);
        });
    }
    
    // Gérer le changement de préférence système
    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches);
        }
    });
}); 