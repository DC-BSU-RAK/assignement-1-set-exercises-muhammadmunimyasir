// Initialize game variables
let score = 0; // Player's score
let lives = 3; // Player's lives
let correctColor; // The correct color to guess

// Function to generate a random RGB color
function generateRandomColor() {
    const r = Math.floor(Math.random() * 256); // Random red value
    const g = Math.floor(Math.random() * 256); // Random green value
    const b = Math.floor(Math.random() * 256); // Random blue value
    return `rgb(${r}, ${g}, ${b})`; // Return the RGB color string
}

// Function to generate color options
function generateColorOptions() {
    const colors = [];
    // Generate the correct color
    correctColor = generateRandomColor();
    colors.push(correctColor);

    // Generate two additional random colors
    while (colors.length < 3) {
        const randomColor = generateRandomColor();
        if (!colors.includes(randomColor)) {
            colors.push(randomColor);
        }
    }

    // Shuffle the colors
    return colors.sort(() => Math.random() - 0.5);
}

// Function to start the game
function startGame() {
    score = 0; // Reset score
    lives = 3; // Reset lives
    document.getElementById('restartButton').classList.add('hidden'); // Hide restart button
    nextRound(); // Start the first round
}

// Function to handle the next round
function nextRound() {
    if (lives > 0) {
        const colors = generateColorOptions(); // Generate color options
        document.getElementById('rgbValue').innerText = `Guess the color: ${correctColor}`; // Display the RGB value
        document.getElementById('colorOptions').innerHTML = ''; // Clear previous options

        // Create color option elements
        colors.forEach(color => {
            const colorDiv = document.createElement('div');
            colorDiv.classList.add('color-option');
            colorDiv.style.backgroundColor = color; // Set background color
            colorDiv.addEventListener('click', () => handleColorClick(color)); // Add click event
            document.getElementById('colorOptions').appendChild(colorDiv); // Append to options
        });

        // Update score display
        document.getElementById('score').innerText = `Score: ${score} | Lives: ${lives}`;
    } else {
        endGame(); // End the game if no lives left
    }
}

// Function to handle color option click
function handleColorClick(selectedColor) {
    if (selectedColor === correctColor) {
        score++; // Increase score for correct guess
        document.getElementById('result').innerText = 'Correct!'; // Display correct message
    } else {
        lives--; // Decrease lives for incorrect guess
        document.getElementById('result').innerText = 'Incorrect!'; // Display incorrect message
    }
    nextRound(); // Proceed to the next round
}

// Function to end the game
function endGame() {
    document.getElementById('rgbValue').innerText = ''; // Clear RGB value
    document.getElementById('colorOptions').innerHTML = ''; // Clear color options
    document.getElementById('result').innerText = `Game Over! Your final score is: ${score}`; // Display final score
    document.getElementById('restartButton').classList.remove('hidden'); // Show restart button
}

// Add event listener to the restart button
document.getElementById('restartButton').addEventListener('click', startGame);

// Start the game when the page loads
startGame();