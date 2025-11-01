// date.js

// Function to set the current year in the footer
function setCurrentYear() {
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
}

// Function to set the last modified date
function setLastModifiedDate() {
    const lastModifiedParagraph = document.getElementById('lastModified');
    if (lastModifiedParagraph) {
        // Use document.lastModified to get the date the document was last modified
        const modifiedDate = new Date(document.lastModified);
        
        // Format the date (Example: Last Modified: 11/01/2025 14:17:58)
        const options = { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit', 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit',
            hour12: false // Use 24-hour format
        };
        const formattedDate = modifiedDate.toLocaleDateString('en-US', options);

        lastModifiedParagraph.textContent = `Last Modified: ${formattedDate}`;
    }
}

// Call the functions when the script loads
setCurrentYear();
setLastModifiedDate();