let lastScrollPosition = window.scrollY;

document.addEventListener('scroll', () => {
    const circle2 = document.getElementById('circle2');
    const fadeText = document.getElementById('fade-in-text');
    
    if (!circle2 || !fadeText) return; // Exit if elements are missing
    
    const circle2Rect = circle2.getBoundingClientRect();
    const currentScrollPosition = window.scrollY;

    if (circle2Rect.bottom < 0) {
        fadeText.style.transition = 'opacity 1s ease-in-out, transform 1s ease-in-out'; // Normal fade-in
        fadeText.classList.add('show');
    } else if (currentScrollPosition < lastScrollPosition) {
        // If scrolling up, make fade-out faster
        fadeText.style.transition = 'opacity 0.3s ease-in-out, transform 0.5s ease-in-out';
        fadeText.classList.remove('show');
    } else {
        // Restore normal fade-out for downward scrolling
        fadeText.style.transition = 'opacity 1s ease-in-out, transform 1s ease-in-out';
        fadeText.classList.remove('show');
    }

    lastScrollPosition = currentScrollPosition; // Update last scroll position
});

function randomVibrate(element) {
    setInterval(() => {
        const x = Math.random() * 4 - 2; // Random value between -2 and 2
        const y = Math.random() * 4 - 2; // Random value between -2 and 2
        element.style.transform = `translate(${x}px, ${y}px)`;
    }, Math.random() * 200 + 100); // Random interval between 100ms and 300ms
}

// Apply random vibration to all circles
document.querySelectorAll('.circle').forEach(circle => randomVibrate(circle));

const fadeText = document.getElementById('fade-in-text');
const fixedCircle = document.getElementById('circle1');

function alignTextWithCircle() {
    const circleRect = fixedCircle.getBoundingClientRect(); // Get the circle's position
    fadeText.style.top = `${circleRect.top}px`; // Align the top of the text with the circle
    fadeText.style.left = `${circleRect.right + 20}px`; // Position the text 20px to the right of the circle
}

// Call alignment function initially and on resize/scroll
alignTextWithCircle();
window.addEventListener('resize', alignTextWithCircle);
window.addEventListener('scroll', alignTextWithCircle);

// Function to check if an element is out of the viewport
function isElementOutOfViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.bottom < 0; // Checks if the element is completely above the viewport
}

// Function to control vibration effect
function controlVibration() {
    const circle1 = document.getElementById('circle1');
    const circles = [
        document.getElementById('circle2'),
        document.getElementById('circle3'),
        document.getElementById('circle4'),
        document.getElementById('circle5')
    ];

    // Check if all other circles are out of the viewport
    const allCirclesOut = circles.every(circle => isElementOutOfViewport(circle));

    if (allCirclesOut) {
        // If all other circles are out of the viewport, apply vibration effect to #circle1
        circle1.classList.add('vibrate');
    } else {
        // Remove vibration effect when any circle reappears
        circle1.classList.remove('vibrate');
    }
}

// Add event listeners for scroll and resize
window.addEventListener('scroll', controlVibration);
window.addEventListener('resize', controlVibration);

// Initial check to see if vibration should be applied
controlVibration();
