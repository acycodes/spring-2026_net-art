const tiles = document.querySelectorAll(".tile");

document.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    tiles.forEach(tile => {
        const rect = tile.getBoundingClientRect();
        const tileX = rect.left + rect.width / 2;
        const tileY = rect.top + rect.height / 2;

        const dx = mouseX - tileX;
        const dy = mouseY - tileY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const move = Math.max(0, 100 - distance) / 10;

        tile.style.transform = `translate(${dx * 0.02}px, ${dy * 0.02}px) scale(${1 + move * 0.02})`;
    });
});

tiles.forEach(tile => {
    tile.addEventListener("click", () => {
        const randomHue = Math.floor(Math.random() * 360);
        tile.style.backgroundColor = `hsl(${randomHue}, 70%, 60%)`;

        tile.style.transform += " scale(1.2)";
        setTimeout(() => {
            tile.style.transform = tile.style.transform.replace(" scale(1.2)", "");
        }, 150);
    });
});