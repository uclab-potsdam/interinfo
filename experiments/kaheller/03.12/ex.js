// Select all h3 elements
const headers = document.querySelectorAll('h3');

// Define starting and ending positions for vertical spacing
const start = 100;  // Starting position for the first line (in vh)
const end = 250;    // Ending position for the last line (smaller range for closer spacing)

// Calculate vertical step size for evenly distributed h3 elements
const step = (end - start) / (headers.length - 1);

// Position each h3 element vertically
headers.forEach((header, index) => {
    const topPosition = start + (index * step);
    header.style.top = `${topPosition}vh`; // Set the vertical position
});

// Adjust text position based on scroll
document.addEventListener('scroll', () => {
    // Calculate scroll progress as a percentage (0 to 1)
    const scrollPercentage = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);

    // Update the horizontal position of each <h3> - Slower movement
    headers.forEach((header, index) => {
        const horizontalPosition = scrollPercentage * 50; // Slow movement: max 50%
        header.style.transform = `translateX(${horizontalPosition}%)`;
    });
});
