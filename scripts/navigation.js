// navigation.js

const menuButton = document.getElementById('menu-toggle');
const primaryNav = document.getElementById('primary-nav');

// Toggle the navigation menu's visibility on small screens
function toggleMenu() {
    // Toggles a CSS class (e.g., 'open') on the navigation list
    primaryNav.classList.toggle('open');
    
    // Optional: Update ARIA attributes for accessibility
    const isExpanded = primaryNav.classList.contains('open');
    menuButton.setAttribute('aria-expanded', isExpanded);
}

// Event listener for the menu button click
if (menuButton) {
    menuButton.addEventListener('click', toggleMenu);
}