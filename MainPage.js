document.addEventListener('DOMContentLoaded', function() {
    //to initialize page
    loadRandomImage();
    loadMovies();
    setupEventListeners();
});

//to load random image
function loadRandomImage() {
    const images = [
        './Images/CHUCK-1.jpeg',
        './Images/CHUCK-2.jpeg',
        './Images/CHUCK-3.jpg',
    ];
    const randomIndex = Math.floor(Math.random() * images.length);
    document.getElementById('random-chuck').src = images[randomIndex];
}

// to load and display the movies
function loadMovies() {
    const moviesData = JSON.parse(movies).movies;
    displayMovies(moviesData);
}

//to display movies in the table
function displayMovies(moviesArray) {
    const tbody = document.querySelector('#movies-table tbody');
    tbody.innerHTML = '';
    
    moviesArray.forEach(movie => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${movie.title}</td>
            <td>${movie.year}</td>
            <td>${movie.role}</td>
        `;
        tbody.appendChild(row);
    });
}

//filtering the movies by year
function filterMovies(year) {
    if (!/^\d{4}$/.test(year)) {
        alert('Please enter a valid 4-digit year');
        return;
    }

    const moviesData = JSON.parse(movies).movies;
    const filteredMovies = moviesData.filter(movie => movie.year >= parseInt(year));
    displayMovies(filteredMovies);
}

//fetching Chuck jokes
async function fetchJoke() {
    try {
        const response = await fetch('https://api.chucknorris.io/jokes/random');
        const data = await response.json();
        return data.value;
    } catch (error) {
        console.error('Error fetching joke:', error);
        return 'Failed to fetch joke. Please try again.';
    }
}

//updating joke display
function updateJokeDisplay(joke) {
    const jokeDisplay = document.getElementById('joke-display');
    jokeDisplay.textContent = joke;
    jokeDisplay.className = '';
    
    const likeBtn = document.getElementById('like-joke');
    const dislikeBtn = document.getElementById('dislike-joke');
    const clearBtn = document.getElementById('clear-joke');
    
    [likeBtn, dislikeBtn, clearBtn].forEach(btn => {
        btn.disabled = !joke;
    });
}

//Setup event listeners
function setupEventListeners() {
    //filter button
    document.getElementById('filter-btn').addEventListener('click', () => {
        const year = document.getElementById('year-filter').value;
        filterMovies(year);
    });

    //get button
    document.getElementById('get-joke').addEventListener('click', async () => {
        const joke = await fetchJoke();
        updateJokeDisplay(joke);
    });

    //like button
    document.getElementById('like-joke').addEventListener('click', () => {
        const jokeDisplay = document.getElementById('joke-display');
        jokeDisplay.className = 'liked';
    });

    //dislike button
    document.getElementById('dislike-joke').addEventListener('click', () => {
        const jokeDisplay = document.getElementById('joke-display');
        jokeDisplay.className = 'disliked';
    });

    //clear button
    document.getElementById('clear-joke').addEventListener('click', () => {
        updateJokeDisplay('');
    });
}