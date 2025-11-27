// chamber/discover/scripts/main.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Set current year in the footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Set last modified date in the footer
    const lastModifiedSpan = document.getElementById('last-modified');
    if (lastModifiedSpan) {
        // Assuming this script is running in discover.html
        lastModifiedSpan.textContent = document.lastModified;
    }

    // 3. Visitor Tracking Logic
    const messageContainer = document.createElement('div');
    messageContainer.id = 'visit-message';
    
    // Choose placement: Inline into the content area, just above the grid
    const discoverMain = document.getElementById('discover-main');
    const pageTitle = document.querySelector('.page-title');

    if (discoverMain && pageTitle) {
        // Insert the message container right after the page title
        pageTitle.insertAdjacentElement('afterend', messageContainer); 
    }

    const LAST_VISIT_KEY = 'discoverLastVisit';
    const oneDay = 1000 * 60 * 60 * 24; // Milliseconds in a day

    // Get the last visit timestamp from localStorage
    const lastVisit = localStorage.getItem(LAST_VISIT_KEY);
    const now = Date.now();
    let message = '';

    if (!lastVisit) {
        // First Visit
        message = "Welcome! Let us know if you have any questions.";
    } else {
        const lastVisitTime = parseInt(lastVisit, 10);
        const timeDifference = now - lastVisitTime;
        
        if (timeDifference < oneDay) {
            // Less than a day
            message = "Back so soon! Awesome!";
        } else {
            // Calculate days ago
            const daysAgo = Math.floor(timeDifference / oneDay);
            
            if (daysAgo === 1) {
                message = "You last visited 1 day ago.";
            } else {
                message = `You last visited ${daysAgo} days ago.`;
            }
        }
    }

    // Display the message
    if (messageContainer) {
        messageContainer.textContent = message;
        messageContainer.classList.add('visit-info'); // Use this for styling
    }

    // Update localStorage with the current visit timestamp
    localStorage.setItem(LAST_VISIT_KEY, now.toString());
});