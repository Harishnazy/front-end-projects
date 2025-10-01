const card = document.createElement('div');
card.classList.add('profile-card');

const img = document.createElement('img');
img.src = 'path/to/profile-image.jpg'; // Replace with actual image path
img.alt = 'Profile Image';
img.classList.add('profile-image');

const name = document.createElement('h2');
name.textContent = 'John Doe'; // Replace with dynamic name if needed
name.classList.add('profile-name');

const description = document.createElement('p');
description.textContent = 'Web Developer and Designer'; // Replace with dynamic description if needed
description.classList.add('profile-description');

const button = document.createElement('button');
button.textContent = 'Follow';
button.classList.add('follow-button');

button.addEventListener('click', () => {
    alert('You are now following ' + name.textContent);
});

card.appendChild(img);
card.appendChild(name);
card.appendChild(description);
card.appendChild(button);

document.body.appendChild(card);