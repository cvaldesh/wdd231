// chamber/discover/scripts/discover.js

// Import path adjusted: Up one level (to discover/), then down to 'data/'
import { discoverData } from '../data/discover.mjs';

const gridContainer = document.getElementById('interest-grid');

function createInterestCard(item) {
    const card = document.createElement('div');
    card.classList.add('interest-card');
    card.setAttribute('data-id', item.id);

    // Title (h2)
    const title = document.createElement('h2');
    title.textContent = item.name;

    // Image (figure)
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    img.setAttribute('src', item.image);
    img.setAttribute('alt', `Photo of ${item.name}`);
    img.setAttribute('loading', 'lazy');
    img.setAttribute('width', '300');
    img.setAttribute('height', '200');
    figure.appendChild(img);

    // Address (address)
    const address = document.createElement('address');
    address.textContent = item.address;

    // Description (p)
    const description = document.createElement('p');
    description.classList.add('card-description');
    description.textContent = item.description;

    // Button
    const button = document.createElement('button');
    button.classList.add('learn-more-btn');
    button.textContent = 'Learn More';

    card.appendChild(title);
    card.appendChild(figure);
    card.appendChild(address);
    card.appendChild(description);
    card.appendChild(button);

    return card;
}

// Render all cards
discoverData.forEach(item => {
    gridContainer.appendChild(createInterestCard(item));
});