document.addEventListener("DOMContentLoaded", function () {
    const gifs = document.querySelectorAll(".tenor-gif-embed .gif");

    gifs.forEach((gif) => {
        // Generate random positions for the GIFs
        const randomTop = Math.random() * 80; // Random position between 0% and 80% vertically
        const randomLeft = Math.random() * 80; // Random position between 0% and 80% horizontally

        // Apply the positions to the GIF
        gif.style.top = `${randomTop}vh`;
        gif.style.left = `${randomLeft}vw`;
    });
});






