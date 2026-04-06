// Variables
const text = document.getElementById("mainText");
const button = document.getElementById("colorBtn");

// Function to generate a random color
function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
}

// Function to change color
function changeColor() {
    const randomColor = getRandomColor();
    text.style.color = randomColor;
    text.textContent = `Color changed to ${randomColor}`;
}

button.addEventListener("click", changeColor);