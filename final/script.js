const container = document.querySelector(".container");
const tiles = document.querySelectorAll(".tile");
const glitchText = document.getElementById("glitchText");

let activated = false;

const messages = [
    "YOU WOKE IT",
    "DON'T TOUCH",
    "TOO LATE",
    "IT SEES YOU",
    "WHY DID YOU CLICK",
    "ERROR: USER DETECTED"
];

function randomColor(tile) {
    const hue = Math.floor(Math.random() * 360);
    tile.style.backgroundColor = `hsl(${hue}, 85%, 58%)`;
}

function glitchTile(tile, duration = 400) {
    tile.classList.add("glitch-burst");
    randomColor(tile);

    setTimeout(() => {
        tile.classList.remove("glitch-burst");
    }, duration);
}

function showGlitchText() {
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    glitchText.textContent = randomMessage;
    glitchText.classList.add("active");

    document.body.classList.add("flash");

    setTimeout(() => {
        document.body.classList.remove("flash");
    }, 300);

    setTimeout(() => {
        glitchText.classList.remove("active");
    }, 1400);
}

function activateQuilt() {
    if (activated) return;

    activated = true;

    container.classList.remove("idle");
    container.classList.add("active");

    tiles.forEach((tile, index) => {
        setTimeout(() => {
            glitchTile(tile);
        }, index * 35);
    });

    setTimeout(() => {
        showGlitchText();
    }, 600);
}

document.addEventListener("mousemove", activateQuilt, { once: true });
document.addEventListener("click", activateQuilt, { once: true });

document.addEventListener("mousemove", (event) => {
    if (!activated) return;

    const mouseX = event.clientX;
    const mouseY = event.clientY;

    tiles.forEach(tile => {
        const rect = tile.getBoundingClientRect();

        const tileX = rect.left + rect.width / 2;
        const tileY = rect.top + rect.height / 2;

        const dx = mouseX - tileX;
        const dy = mouseY - tileY;

        const distance = Math.sqrt(dx * dx + dy * dy);
        const movement = Math.max(0, 140 - distance) / 10;

        tile.style.transform =
            `translate(${dx * 0.025}px, ${dy * 0.025}px) scale(${1 + movement * 0.025})`;

        if (distance < 90 && Math.random() < 0.03) {
            glitchTile(tile, 250);
        }
    });
});

document.addEventListener("click", (event) => {
    if (!activated) return;

    const clickX = event.clientX;
    const clickY = event.clientY;

    tiles.forEach(tile => {
        const rect = tile.getBoundingClientRect();

        const tileX = rect.left + rect.width / 2;
        const tileY = rect.top + rect.height / 2;

        const dx = tileX - clickX;
        const dy = tileY - clickY;

        const distance = Math.sqrt(dx * dx + dy * dy);
        const delay = distance * 0.3;

        setTimeout(() => {
            glitchTile(tile, 300);
        }, delay);
    });

    showGlitchText();
});

setInterval(() => {
    if (!activated) return;

    const randomTile = tiles[Math.floor(Math.random() * tiles.length)];
    glitchTile(randomTile, 300);
}, 1500);