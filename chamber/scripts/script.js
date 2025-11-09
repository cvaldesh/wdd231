const directorySection = document.getElementById('member-directory');
const toggleViewBtn = document.getElementById('toggleViewBtn');
// Set the correct relative path for the JSON file
const memberDataUrl = 'chamber/data/members.json'; 

// --- Custom Alert Function (Non-blocking message box) ---
function showMessage(text) {
    document.getElementById('messageText').textContent = text;
    document.getElementById('messageBox').style.display = 'block';
}

// --- Main Data Fetching and Display Logic ---
async function getMemberData() {
    try {
        // Use the defined memberDataUrl variable for fetching
        const response = await fetch(memberDataUrl); 
        
        if (!response.ok) {
            // Detailed error handling for better debugging
            const errorStatus = response.status;
            const errorText = errorStatus === 404 
                ? 'Error: members.json not found. Check the file path.'
                : `HTTP error! status: ${errorStatus}`;
            throw new Error(errorText);
        }
        
        const data = await response.json();
        displayMembers(data); 
    } catch (error) {
        console.error('Error fetching member data:', error.message);
        // Show detailed error message to the user
        showMessage(`Error loading directory data. ${error.message}`);
    }
}

// --- Function to Create and Display Member Cards ---
function displayMembers(members) {
    directorySection.innerHTML = ''; // Clear previous content
    const isGridView = directorySection.classList.contains('grid');
    const viewClass = isGridView ? 'grid-view' : 'list-view';

    members.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('member-card', viewClass, `level-${member.membershipLevel}`);
        
        // Determine the membership level name
        let levelName;
        if (member.membershipLevel === 3) levelName = 'Gold';
        else if (member.membershipLevel === 2) levelName = 'Silver';
        else levelName = 'Bronze';

        if (isGridView) {
            // Grid View HTML Structure
            card.innerHTML = `
                <img src="${member.image}" alt="${member.name} Logo" loading="lazy" onerror="this.onerror=null;this.src='https://placehold.co/400x300/CCCCCC/333333?text=Logo+Not+Available';">
                <h2>${member.name}</h2>
                <p><strong>Level:</strong> ${levelName}</p>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
                <p style="margin-top: 0.5rem; font-style: italic;">"${member.otherInfo}"</p>
            `;
        } else {
            // List View HTML Structure
            card.innerHTML = `
                <img src="${member.image}" alt="${member.name} Logo" loading="lazy" onerror="this.onerror=null;this.src='https://placehold.co/80x80/CCCCCC/333333?text=Logo';">
                <div class="info">
                    <h2>${member.name} <span style="font-size: 0.8em; font-weight: normal; color: var(--color-accent);">(${levelName})</span></h2>
                    <p>${member.address}</p>
                </div>
                <div class="contact">
                    <p>${member.phone}</p>
                </div>
                <div class="url">
                    <a href="${member.website}" target="_blank">Website</a>
                </div>
            `;
        }
        directorySection.appendChild(card);
    });
}

// --- Toggle View Functionality ---
function toggleView() {
    const isGridView = directorySection.classList.toggle('grid');
    directorySection.classList.toggle('list', !isGridView);
    
    toggleViewBtn.textContent = isGridView ? 'View as List' : 'View as Grid';
    
    // Re-render the cards with the correct class for styling
    getMemberData(); 
}

toggleViewBtn.addEventListener('click', toggleView);

// --- Footer Dynamic Content ---
function updateFooter() {
    // Copyright Year
    document.getElementById('copyrightYear').textContent = new Date().getFullYear();
    
    // Last Modification Date (Generated automatically using JavaScript)
    const lastMod = new Date(document.lastModified);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    document.getElementById('lastModified').textContent = `Last Modified: ${lastMod.toLocaleDateString('en-US', options)}`;

    // Developer Name (Placeholder based on instruction)
    document.getElementById('developerName').textContent = "Carlos Valdes";
}

// Initialize App
window.onload = () => {
    getMemberData();
    updateFooter();
};