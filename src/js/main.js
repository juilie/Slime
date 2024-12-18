import { SlimeSimulation } from './simulation.js';

const simulation = new SlimeSimulation();

// Wait for simulation to initialize before loading image
(async () => {
    await new Promise(resolve => setTimeout(resolve, 100)); // Small delay to ensure simulation is ready
    // await simulation.initImageTexture('pic.jpg');
})();

// Example transition trigger
document.addEventListener('keypress', async (e) => {
    if (e.key === '1') {
        // Transition to red, more metallic state
        simulation.startTransition({
            baseColor: [0.8, 0.411, 0.1],
            noiseFactor: 0.0,
            roughness: 0.2,
            metalness: 1.0,
            duration: 800
        });
    } else if (e.key === '2') {
        // Transition to blue, more fluid state
        simulation.startTransition({
            baseColor: [0.1, 0.1, 0.8],
            noiseFactor: 0.05,
            roughness: 0.3,
            metalness: 0.0,
            duration: 800
        });
    }
    else if (e.key === '3') {
        // Transition to blue, more fluid state
        simulation.startTransition({
            // baseColor: [0.12, 0.1, 0.68],
            secondaryColor: [0.2, .0, 0.0, 1.],
            noiseFactor: 0.0,
            roughness: 0.2,
            metalness: .09, // Fixed: metalness should be between 0-1, 13.0 was causing issues
            duration: 800
        });
    }
    else if (e.key === '4') {
        simulation.startTransition({
            neighborThreshold: 0.09,
            speed: 0.15,
            duration: 800
        });
    }
    else if (e.key === '5') {
        simulation.startTransition({
            neighborThreshold: 0.99,
            speed: 0.5,
            duration: 800
        });
    }
    else if (e.key === '6') {
        await simulation.changeShader('glass');
    }
});