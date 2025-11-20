/* --- THANK YOU PAGE SCRIPT (thankyou.js) --- */

document.addEventListener('DOMContentLoaded', () => {
    // Get the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const tableBody = document.getElementById('submitted-data-table');
    const noDataMessage = document.getElementById('no-data-message');
    
    // Mapping of form field names (from join.html) to display labels
    const displayMap = {
        'fname': "First Name",
        'lname': "Last Name",
        'email': "Email Address",
        'phone': "Mobile Phone Number",
        'bizname': "Business/Organization Name",
        'timestamp': "Submission Date/Time"
    };

    let dataFound = false;
    
    // Iterate over the map to find and display required fields
    for (const [key, label] of Object.entries(displayMap)) {
        if (urlParams.has(key)) {
            const value = urlParams.get(key);
            
            // Format the timestamp to be more user-friendly
            let displayValue = value;
            if (key === 'timestamp') {
                try {
                    // Try to format it as a local date/time string
                    const date = new Date(value);
                    displayValue = date.toLocaleString();
                } catch (e) {
                    // Fallback to raw value if date parsing fails
                    displayValue = value;
                }
            }
            
            // Create the table row
            const newRow = tableBody.insertRow();
            
            // Header cell (Label)
            const labelCell = newRow.insertCell();
            labelCell.innerHTML = `<strong>${label}</strong>`;
            
            // Data cell (Value)
            const valueCell = newRow.insertCell();
            valueCell.textContent = displayValue;
            
            dataFound = true;
        }
    }

    // Display message if no required data was found
    if (!dataFound) {
        tableBody.style.display = 'none';
        noDataMessage.style.display = 'block';
    }
});