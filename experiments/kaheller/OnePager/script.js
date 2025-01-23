const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

// Resize canvas to fit viewport
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Initialize canvas size
resizeCanvas();

// Handle resizing of the viewport
window.addEventListener('resize', resizeCanvas);

// Black dot setup
const blackDot = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 20,
    dx: 2, // Horizontal speed
    dy: 2, // Vertical speed
    color: 'black',
    strokeWidth: 2,
    strokeColor: 'white',
};

// Colored circles array
const circles = [];

// Counter to track colors
const colorCounts = {
    red: 0,
    green: 0,
    blue: 0,
    yellow: 0,
    purple: 0,
};

// Text for each color when counter hits 5
const colorTexts = {
    red: "The canvas element enables dynamic graphics rendering via JavaScript, making it ideal for custom visuals like animations and games.",
    green: "Canvas uses a raster-based system, meaning scaling can cause pixelation and loss of quality.",
    blue: "Canvas has no built-in drawing tools; all rendering is done programmatically using its API",
    yellow: "Graphics on the canvas can be updated in real-time, supporting animations and interactivity",
    purple: "Canvas is raster-based and faster for dynamic content, while SVG is vector-based, scalable, and better for static, detailed visuals.",
};

// Extra box element
const extraBox = document.getElementById('extra-box');

// Increment the counter and update the extra box if needed
function incrementCounter(color) {
    colorCounts[color] += 1; // Increment the color counter

    // Update the displayed counter
    updateCounterDisplay();

    // Check if the counter hits 5 and update the extra box
    if (colorCounts[color] === 5) {
        extraBox.textContent = colorTexts[color];
    }
}

// Update counter display with triangles and numbers
function updateCounterDisplay() {
    const counterDiv = document.getElementById('counter');
    counterDiv.innerHTML = ''; // Clear the current counter display

    // Loop through each color to display the triangle and count
    for (const color of colors) {
        const colorTriangle = document.createElement('div');
        colorTriangle.classList.add('color-triangle');
        colorTriangle.style.borderTopColor = color; // Set the triangle color

        const colorCount = document.createElement('span');
        colorCount.classList.add('color-count');
        colorCount.innerText = colorCounts[color]; // Set the count for that color

        const colorBlock = document.createElement('div');
        colorBlock.classList.add('color-block');
        colorBlock.appendChild(colorTriangle);
        colorBlock.appendChild(colorCount);

        counterDiv.appendChild(colorBlock);
    }
}

// Generate a random color
const colors = ['red', 'green', 'blue', 'yellow', 'purple'];
function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

// Create a circle at a specific position
function createCircle(x, y) {
    const circle = {
        x,
        y,
        radius: 15,
        color: getRandomColor(),
        dx: (Math.random() - 0.5) * 4, // Random horizontal speed
        dy: (Math.random() - 0.5) * 4, // Random vertical speed
    };
    circles.push(circle);
}

// Move black dot
function moveBlackDot() {
    blackDot.x += blackDot.dx;
    blackDot.y += blackDot.dy;

    // Bounce on canvas edges
    if (blackDot.x - blackDot.radius < 0 || blackDot.x + blackDot.radius > canvas.width) {
        blackDot.dx *= -1;
    }
    if (blackDot.y - blackDot.radius < 0 || blackDot.y + blackDot.radius > canvas.height) {
        blackDot.dy *= -1;
    }
}

// Move circles
function moveCircles() {
    circles.forEach(circle => {
        circle.x += circle.dx;
        circle.y += circle.dy;

        // Bounce on canvas edges
        if (circle.x - circle.radius < 0 || circle.x + circle.radius > canvas.width) {
            circle.dx *= -1;
        }
        if (circle.y - circle.radius < 0 || circle.y + circle.radius > canvas.height) {
            circle.dy *= -1;
        }
    });
}

// Check collisions with black dot
function checkBlackDotCollisions() {
    for (let i = circles.length - 1; i >= 0; i--) {
        const circle = circles[i];
        const dx = circle.x - blackDot.x;
        const dy = circle.y - blackDot.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Check for collision
        if (distance < circle.radius + blackDot.radius) {
            circles.splice(i, 1); // Remove the circle
            incrementCounter(circle.color); // Update the counter
        }
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const infoBox = document.getElementById('info-box');
    const extraBox = document.getElementById('extra-box');

    const infoBoxRect = infoBox.getBoundingClientRect();
    const offset = 20; // Spacing between the boxes

    // Position the extra box below the info box
    extraBox.style.top = `${infoBoxRect.bottom + offset}px`;
});

// Animation loop
function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Move and draw black dot
    moveBlackDot();
    context.beginPath();
    context.arc(blackDot.x, blackDot.y, blackDot.radius, 0, Math.PI * 2);
    context.fillStyle = blackDot.color;
    context.fill();
    context.lineWidth = blackDot.strokeWidth;
    context.strokeStyle = blackDot.strokeColor;
    context.stroke();

    // Move and draw colored circles
    moveCircles();
    circles.forEach(circle => {
        context.beginPath();
        context.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
        context.fillStyle = circle.color;
        context.fill();
    });

    // Check for collisions
    checkBlackDotCollisions();

    requestAnimationFrame(animate);
}

// Add circle on click
canvas.addEventListener('click', event => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    createCircle(x, y);
});

// Reload button functionality
const reloadButton = document.getElementById('reload-button');
reloadButton.addEventListener('click', () => {
    location.reload();
});

// Start the animation
animate();






