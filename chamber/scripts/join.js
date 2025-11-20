/* --- JOIN PAGE SCRIPT (join.js) --- */

// 1. Set the current date and time for the hidden timestamp field
document.addEventListener('DOMContentLoaded', () => {
    const timestampField = document.getElementById('timestamp');
    
    // Get the current date and time
    const now = new Date();
    
    // Format the date/time string (e.g., ISO 8601 format)
    const formattedDateTime = now.toISOString();

    if (timestampField) {
        timestampField.value = formattedDateTime;
    }


    // 2. Modal Functionality
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-btn');

    // Function to open the modal
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
        }
    }

    // Function to close the modal
    function closeModal(modalElement) {
        if (modalElement) {
            modalElement.style.display = 'none';
        }
    }

    // Event listeners for opening modals
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault(); // Stop the link from navigating
            const modalId = trigger.getAttribute('data-modal');
            openModal(modalId);
        });
    });

    // Event listeners for closing modals via the 'x' button
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Find the parent modal element
            const modalElement = button.closest('.modal');
            closeModal(modalElement);
        });
    });

    // Event listener for closing modals when clicking outside the modal content
    window.addEventListener('click', (e) => {
        modals.forEach(modal => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });
    
    // Event listener for closing modals with the ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.style.display === 'block') {
                    closeModal(modal);
                }
            });
        }
    });
});