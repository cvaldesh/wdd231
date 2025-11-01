// course.js

const courses = [
    // ... (Your array of course objects copied here) ...
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: false
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: false
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
];

// 1. Modify the array to mark completed courses (based on your input)
const myCompletedCourses = [
    'CSE 110', // Introduction to Programming
    'WDD 130', // Web Fundamentals
    'CSE 111', // Programming with Functions
    'WDD 131'  // Dynamic Web Fundamentals
];

courses.forEach(course => {
    const courseIdentifier = `${course.subject} ${course.number}`;
    if (myCompletedCourses.includes(courseIdentifier)) {
        course.completed = true;
    }
});


const cardsContainer = document.getElementById('course-cards-container');

// Helper function to calculate total credits using reduce()
function calculateTotalCredits(courseList) {
    const totalCredits = courseList.reduce((sum, course) => sum + course.credits, 0);
    return `<p class="total-credits">Total Credits Displayed: ${totalCredits}</p>`;
}

// Function to generate and display the course cards
function displayCourses(courseList) {
    // Clear the container first
    cardsContainer.innerHTML = '';
    
    // Add filtering buttons (place them dynamically or ensure they exist in HTML)
    // For now, let's assume they exist, and we'll focus on the cards and credit total.
    
    // Generate HTML for each course card
    const courseCardsHTML = courseList.map(course => {
        // Use a class to style completed courses differently
        const completedClass = course.completed ? 'completed-course' : 'incomplete-course';
        
        return `
            <div class="course-card ${completedClass}">
                <h3>${course.subject} ${course.number}: ${course.title}</h3>
                <p><strong>Credits:</strong> ${course.credits}</p>
                <p><strong>Certificate:</strong> ${course.certificate}</p>
                <p>${course.description}</p>
                <p class="technology"><strong>Tech Stack:</strong> ${course.technology.join(', ')}</p>
            </div>
        `;
    }).join('');

    // Append the cards HTML and the total credits
    cardsContainer.innerHTML = courseCardsHTML + calculateTotalCredits(courseList);
}

// Function to filter and display courses based on subject
function filterCourses(subject) {
    let filteredList;
    if (subject === 'ALL') {
        filteredList = courses;
    } else {
        // Use array filter method
        filteredList = courses.filter(course => course.subject === subject);
    }
    displayCourses(filteredList);
}

// Initial display of all courses
displayCourses(courses);

// --- Event Listeners for Filtering (You'll need to add these buttons to your HTML) ---

// Assuming buttons with these IDs exist in your HTML, perhaps above the cardsContainer:
/*
<div class="course-filters">
    <button id="filterAll">All Courses</button>
    <button id="filterWDD">WDD Courses</button>
    <button id="filterCSE">CSE Courses</button>
</div>
*/

document.addEventListener('DOMContentLoaded', () => {
    // Add filter buttons dynamically for demonstration, or ensure they are in index.html
    const filterControls = document.createElement('div');
    filterControls.className = 'course-filters';
    filterControls.innerHTML = `
        <button id="filterAll" class="active-filter">All Courses</button>
        <button id="filterWDD">WDD Courses</button>
        <button id="filterCSE">CSE Courses</button>
    `;
    cardsContainer.insertAdjacentElement('beforebegin', filterControls); // Place above the cards

    document.getElementById('filterAll').addEventListener('click', () => filterCourses('ALL'));
    document.getElementById('filterWDD').addEventListener('click', () => filterCourses('WDD'));
    document.getElementById('filterCSE').addEventListener('click', () => filterCourses('CSE'));

    // Re-display all courses after setting up listeners
    filterCourses('ALL');
});