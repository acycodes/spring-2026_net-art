let isChaos = false;
let moveCount = 0;
let startTime = Date.now();
let lastMoveTime = Date.now();
let chaseCount = 0;

const body = document.getElementById("page");
const container = document.getElementById("container");
const title = document.getElementById("title");
const message = document.getElementById("message");
const reactText = document.getElementById("reactText");
const button = document.getElementById("actionBtn");

body.classList.add("calm");

function transformPage() {
  isChaos = !isChaos;

  if (isChaos) {
    body.classList.replace("calm", "chaos");
    title.textContent = "YOU CAN'T CLICK ME";
    message.textContent = "I know what you're doing.";
    reactText.textContent = "You've been here 0 seconds.";
    button.textContent = "CATCH ME";
    startTime = Date.now();
  } else {
    body.classList.replace("chaos", "calm");
    title.textContent = "Welcome Back";
    message.textContent = "Everything is calm again.";
    reactText.textContent = "That's better.";
    button.textContent = "Click Me";
  }
}

button.addEventListener("click", transformPage);

function updateBehaviorText(speed) {
  if (!isChaos) return;

  const timeSpent = Math.floor((Date.now() - startTime) / 1000);

  if (timeSpent < 5) {
    reactText.textContent = `You've been here ${timeSpent} seconds.`;
  } else if (timeSpent < 10) {
    reactText.textContent = "Still here?";
  } else if (timeSpent < 20) {
    reactText.textContent = "You could leave.";
  } else {
    reactText.textContent = "Why are you staying?";
  }

  if (moveCount > 50 && moveCount < 100) {
    reactText.textContent = "That's a lot of movement.";
  } else if (moveCount >= 100) {
    reactText.textContent = "You seem nervous.";
  }

  if (speed > 1200) {
    reactText.textContent = "Why are you rushing?";
  }

  if (chaseCount > 5 && chaseCount < 15) {
    reactText.textContent = "You're trying to catch it.";
  } else if (chaseCount >= 15) {
    reactText.textContent = "You're not going to win.";
  }
}

document.addEventListener("mousemove", (e) => {
  const now = Date.now();
  const delta = now - lastMoveTime;
  lastMoveTime = now;

  const speed = 1000 / (delta + 1);
  moveCount++;

  const x = e.clientX / window.innerWidth - 0.5;
  const y = e.clientY / window.innerHeight - 0.5;

  if (isChaos) {
    // DISTORT PAGE
    container.style.transform = `
      translate(${x * 50}px, ${y * 50}px)
      rotate(${x * 10}deg)
      scale(${1 + Math.abs(y)})
    `;

    title.style.transform = `
      translate(${x * 100}px, ${y * 100}px)
      skew(${x * 20}deg, ${y * 20}deg)
    `;

    // BUTTON RUNAWAY
    const btnRect = button.getBoundingClientRect();
    const dx = e.clientX - (btnRect.left + btnRect.width / 2);
    const dy = e.clientY - (btnRect.top + btnRect.height / 2);
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 150) {
      chaseCount++; // track chasing behavior

      const moveX = -dx * 0.6;
      const moveY = -dy * 0.6;

      let newLeft = button.offsetLeft + moveX;
      let newTop = button.offsetTop + moveY;

      newLeft = Math.max(0, Math.min(window.innerWidth - button.offsetWidth, newLeft));
      newTop = Math.max(0, Math.min(window.innerHeight - button.offsetHeight, newTop));

      button.style.left = newLeft + "px";
      button.style.top = newTop + "px";
    }

    updateBehaviorText(speed);

    // TEXT DRIFT
    reactText.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
  }
});