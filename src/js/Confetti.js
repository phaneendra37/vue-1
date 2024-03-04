import confetti from 'canvas-confetti';
// Function to create a pride-themed confetti effect
export function prideConfetti() {
    // Define default options for confetti particles
    const defaultOptions = { particleCount: 10, spread: 55 };

    // Start confetti on the left side at an angle of 60 degrees and origin at x = 0,
    // repeating every 150ms (0.15 seconds)
    const leftConfetti = setInterval(() => {
        startConfetti({ ...defaultOptions, angle: 60, origin: { x: 0 } });
    }, 150);

    // Start confetti on the right side at an angle of 120 degrees and origin at x = 1,
    // repeating every 150ms (0.15 seconds)
    const rightConfetti = setInterval(() => {
        startConfetti({ ...defaultOptions, angle: 120, origin: { x: 1 } });
    }, 150);

    // Stop the confetti after 3000ms (3 seconds)
    setTimeout(() => {
        clearInterval(leftConfetti);
        clearInterval(rightConfetti);
    }, 3000);
}
// Function to create a fire-themed confetti effect
export function fireConfetti() {
    // Define default options for confetti particles
    const defaultOptions = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0, particleCount: 40 };

    // Start confetti on the left side with a random x-coordinate between 0.1 and 0.3,
    // repeating every 150ms (0.15 seconds)
    const fireConfetti1 = setInterval(() => {
        startConfetti({ ...defaultOptions, origin: { x: Math.random() * (0.3 - 0.1) + 0.1, y: Math.random() - 0.2 } });
    }, 150);

    // Start confetti on the right side with a random x-coordinate between 0.7 and 0.9,
    // repeating every 150ms (0.15 seconds)
    const fireConfetti2 = setInterval(() => {
        startConfetti({ ...defaultOptions, origin: { x: Math.random() * (0.9 - 0.7) + 0.7, y: Math.random() - 0.2 } });
    }, 150);

    // Stop the confetti after 3000ms (3 seconds)
    setTimeout(() => {
        clearInterval(fireConfetti1);
        clearInterval(fireConfetti2);
    }, 3000);
}

// Function to create a blast-themed confetti effect
export function blastConfetti() {
    // Define default options for confetti particles
    const defaultOptions = { origin: { y: 0.7 }, particleCount: 100 };

    // Start confetti with a spread of 26 and start velocity of 55
    startConfetti({ ...defaultOptions, spread: 26, startVelocity: 55 });

    // Start confetti with a spread of 60
    startConfetti({ ...defaultOptions, spread: 60 });

    // Start confetti with a spread of 100, decay of 0.91, and scalar of 0.8
    startConfetti({ ...defaultOptions, spread: 100, decay: 0.91, scalar: 0.8 });

    // Start confetti with a spread of 120, start velocity of 25, decay of 0.92, and scalar of 1.2
    startConfetti({ ...defaultOptions, spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });

    // Start confetti with a spread of 120 and start velocity of 45
    startConfetti({ ...defaultOptions, spread: 120, startVelocity: 45 });
}
// Function to create an emoji-themed confetti effect
export function emojiConfetti(emoji) {
    // Check if emoji is provided
    if (!emoji) return;

    // Define default options for emoji confetti particles
    const defaultOptions = {
        spread: 360,
        ticks: 60,
        gravity: 0,
        decay: 0.96,
        startVelocity: 20,
        scalar: 2,
        particleCount: 10,
        shapes: [confetti.shapeFromText({ text: emoji, scalar: 2 })]
    };

    // Start confetti with emoji shape and flat layout
    startConfetti({ ...defaultOptions, flat: true });

    // Start confetti with circle shape
    setTimeout(() => {
        startConfetti({ ...defaultOptions, shapes: ['circle'], scalar: 2 / 2 });
    }, 100);

    // Start confetti with default options
    setTimeout(() => {
        startConfetti({ ...defaultOptions });
    }, 200);
}

// Function to start confetti with provided options
export function startConfetti(options) {
    // Start confetti with specified options
    confetti({ ...options });
}
