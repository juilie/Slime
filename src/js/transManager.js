import * as THREE from 'three';

export class TransitionManager {
    constructor(simulationMaterial, renderMaterial) {
        this.simulationMaterial = simulationMaterial;
        this.renderMaterial = renderMaterial;
        
        this.state = {
            baseColor: new THREE.Vector3(0.1, 0.01, 0.8),
            targetBaseColor: new THREE.Vector3(0.1, 0.01, 0.8),
            secondaryColor: new THREE.Vector4(0.0, 0.0, 0.0, 0.0),
            targetSecondaryColor: new THREE.Vector4(0.0, 0.0, 0.0, 0.0),
            neighborThreshold: 0.99,
            targetNeighborThreshold: 0.99,
            noiseFactor: 0.0,
            targetNoiseFactor: 0.0,
            roughness: 0.2,
            targetRoughness: 0.2,
            metalness: 0.0,
            targetMetalness: 0.0,
            speed: 0.15,
            targetSpeed: 0.15,
            isTransitioning: false,
            duration: 100,
            startTime: 0
        };
    }

    startTransition(newState) {
        const currentTime = performance.now();

        // Store all current values as starting points
        this.state.baseColor.set(
            this.renderMaterial.uniforms.uBaseColor.value.x,
            this.renderMaterial.uniforms.uBaseColor.value.y,
            this.renderMaterial.uniforms.uBaseColor.value.z
        );

        this.state.secondaryColor.set(
            this.renderMaterial.uniforms.uSecondaryColor.value.x,
            this.renderMaterial.uniforms.uSecondaryColor.value.y,
            this.renderMaterial.uniforms.uSecondaryColor.value.z,
            this.renderMaterial.uniforms.uSecondaryColor.value.w
        );

        this.state.neighborThreshold = this.simulationMaterial.uniforms.uNeighborThreshold.value;
        this.state.noiseFactor = this.simulationMaterial.uniforms.uNoiseFactor.value;
        this.state.roughness = this.renderMaterial.uniforms.uRoughness.value;
        this.state.metalness = this.renderMaterial.uniforms.uMetalness.value;
        this.state.speed = this.simulationMaterial.uniforms.uSpeed.value;

        // Set target values
        if (newState.baseColor) {
            this.state.targetBaseColor.set(
                newState.baseColor[0],
                newState.baseColor[1],
                newState.baseColor[2]
            );
        } else {
            this.state.targetBaseColor.copy(this.state.baseColor);
        }

        if (newState.secondaryColor) {
            this.state.targetSecondaryColor.set(
                newState.secondaryColor[0],
                newState.secondaryColor[1],
                newState.secondaryColor[2],
                newState.secondaryColor[3]
            );
        } else {
            this.state.targetSecondaryColor.copy(this.state.secondaryColor);
        }

        this.state.targetNeighborThreshold = newState.neighborThreshold !== undefined ? 
            newState.neighborThreshold : this.state.neighborThreshold;
        this.state.targetNoiseFactor = newState.noiseFactor !== undefined ? 
            newState.noiseFactor : this.state.noiseFactor;
        this.state.targetRoughness = newState.roughness !== undefined ? 
            newState.roughness : this.state.roughness;
        this.state.targetMetalness = newState.metalness !== undefined ? 
            newState.metalness : this.state.metalness;
        this.state.targetSpeed = newState.speed !== undefined ? 
            newState.speed : this.state.speed;

        // Reset transition parameters
        this.state.isTransitioning = true;
        this.state.startTime = currentTime;
        this.state.duration = newState.duration || 1000;
    }

    update() {
        if (!this.state.isTransitioning) return;

        const currentTime = performance.now();
        const elapsed = currentTime - this.state.startTime;
        let progress = elapsed / this.state.duration;

        if (progress >= 1) {
            progress = 1;
            this.state.isTransitioning = false;
        }

        const easedProgress = this.easeInOutCubic(progress);

        // Update all values using interpolation
        this.renderMaterial.uniforms.uBaseColor.value.lerpVectors(
            this.state.baseColor,
            this.state.targetBaseColor,
            easedProgress
        );

        this.renderMaterial.uniforms.uSecondaryColor.value.lerpVectors(
            this.state.secondaryColor,
            this.state.targetSecondaryColor,
            easedProgress
        );

        this.simulationMaterial.uniforms.uNeighborThreshold.value = THREE.MathUtils.lerp(
            this.state.neighborThreshold,
            this.state.targetNeighborThreshold,
            easedProgress
        );

        this.simulationMaterial.uniforms.uNoiseFactor.value = THREE.MathUtils.lerp(
            this.state.noiseFactor,
            this.state.targetNoiseFactor,
            easedProgress
        );

        this.renderMaterial.uniforms.uRoughness.value = THREE.MathUtils.lerp(
            this.state.roughness,
            this.state.targetRoughness,
            easedProgress
        );

        this.renderMaterial.uniforms.uMetalness.value = THREE.MathUtils.lerp(
            this.state.metalness,
            this.state.targetMetalness,
            easedProgress
        );

        this.simulationMaterial.uniforms.uSpeed.value = THREE.MathUtils.lerp(
            this.state.speed,
            this.state.targetSpeed,
            easedProgress
        );
    }

    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
}
