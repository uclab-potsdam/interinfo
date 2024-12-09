// Adjust text position based on scroll
document.addEventListener('scroll', () => {
    // Calculate scroll progress as a percentage
    const scrollPercentage = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);

    // Update the horizontal position of each <h3>
    headers.forEach((header, index) => {
        const horizontalPosition = 100 * scrollPercentage; // Percentage-based movement
        header.style.transform = `translateX(${horizontalPosition}%)`;
    });
});

