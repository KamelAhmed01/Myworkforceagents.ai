import type { AudioGlobeConfig } from '../types';

// Voice interface configuration
const VOICE_CONFIG = {
    vapiConfig: {
        shareKey: 'e84ab93f-6b83-4994-9e1a-1ab3cda12a23',
        assistantId: '518c4706-c417-4d19-9e2d-9b2171b0cf9f',
        demo: true,
        embed: true,
        theme: 'dark' as const
    },
    globeConfig: {
        size: 200,
        segments: 32,
        rings: 16,
        color: '#00ff88',
        opacity: 0.8
    }
};

let audioGlobe: AudioGlobe3D | null = null;

export function initVoiceInterface(): void {
    console.log('🎤 Initializing Voice Interface...');
    
    // Initialize 3D audio globe
    const canvas = document.getElementById('threejs-canvas') as HTMLCanvasElement;
    if (canvas) {
        console.log('🌍 Setting up 3D Audio Globe...');
        audioGlobe = new AudioGlobe3D({
            canvas,
            size: VOICE_CONFIG.globeConfig.size,
            segments: VOICE_CONFIG.globeConfig.segments,
            rings: VOICE_CONFIG.globeConfig.rings,
            color: VOICE_CONFIG.globeConfig.color,
            opacity: VOICE_CONFIG.globeConfig.opacity
        });
        
        audioGlobe.init();
        audioGlobe.startAnimation();
        
        console.log('✅ 3D Audio Globe initialized');
    } else {
        console.error('❌ Canvas element not found for audio globe');
    }
    
    // Make toggle function globally available
    (window as any).toggleAudioGlobe = toggleAudioGlobe;
    
    console.log('✅ Voice interface initialization complete');
}

export function toggleAudioGlobe(): void {
    if (!audioGlobe) {
        console.warn('⚠️ Audio globe not initialized');
        return;
    }
    
    const toggleBtn = document.getElementById('toggleGlobeBtn');
    const icon = toggleBtn?.querySelector('i');
    const text = toggleBtn?.querySelector('span');
    
    if (audioGlobe.isAnimating) {
        audioGlobe.stopAnimation();
        toggleBtn?.classList.remove('active');
        if (icon) icon.className = 'fas fa-play';
        if (text) text.textContent = 'Start Globe';
        console.log('🛑 Audio globe stopped');
    } else {
        audioGlobe.startAnimation();
        toggleBtn?.classList.add('active');
        if (icon) icon.className = 'fas fa-stop';
        if (text) text.textContent = 'Stop Globe';
        console.log('▶️ Audio globe started');
    }
}

// 3D Audio Globe Class
export class AudioGlobe3D {
    private canvas: HTMLCanvasElement;
    private scene: any; // THREE.Scene
    private camera: any; // THREE.Camera
    private renderer: any; // THREE.Renderer
    private globe: any; // THREE.Mesh
    private particles: any[] = []; // THREE.Points[]
    private config: AudioGlobeConfig;
    private animationId: number | null = null;
    public isAnimating: boolean = false;
    private audioContext: AudioContext | null = null;
    private analyser: AnalyserNode | null = null;
    private dataArray: Uint8Array | null = null;
    
    constructor(config: AudioGlobeConfig) {
        this.canvas = config.canvas;
        this.config = config;
    }
    
    async init(): Promise<void> {
        console.log('🌍 Initializing 3D Audio Globe...');
        
        try {
            // Load Three.js dynamically
            const THREE = await this.loadThreeJS();
            
            // Initialize scene
            this.scene = new THREE.Scene();
            this.scene.background = new THREE.Color(0x0a0a0a);
            
            // Initialize camera
            this.camera = new THREE.PerspectiveCamera(
                75,
                this.canvas.offsetWidth / this.canvas.offsetHeight,
                0.1,
                1000
            );
            this.camera.position.z = 5;
            
            // Initialize renderer
            this.renderer = new THREE.WebGLRenderer({
                canvas: this.canvas,
                antialias: true,
                alpha: true
            });
            this.renderer.setSize(this.canvas.offsetWidth, this.canvas.offsetHeight);
            this.renderer.setClearColor(0x000000, 0);
            
            // Create globe
            this.createGlobe(THREE);
            
            // Create particles
            this.createParticles(THREE);
            
            // Add lighting
            this.addLighting(THREE);
            
            // Setup audio analysis
            await this.setupAudioAnalysis();
            
            // Handle resize
            window.addEventListener('resize', () => this.handleResize());
            
            console.log('✅ 3D Audio Globe initialized successfully');
            
        } catch (error) {
            console.error('❌ Failed to initialize 3D Audio Globe:', error);
            this.createFallbackVisualization();
        }
    }
    
    private async loadThreeJS(): Promise<any> {
        // Try to load Three.js from CDN
        return new Promise((resolve, reject) => {
            if ((window as any).THREE) {
                resolve((window as any).THREE);
                return;
            }
            
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
            script.onload = () => {
                if ((window as any).THREE) {
                    resolve((window as any).THREE);
                } else {
                    reject(new Error('Three.js failed to load'));
                }
            };
            script.onerror = () => reject(new Error('Failed to load Three.js'));
            document.head.appendChild(script);
        });
    }
    
    private createGlobe(THREE: any): void {
        // Create wireframe globe
        const geometry = new THREE.SphereGeometry(
            this.config.size / 100, 
            this.config.segments, 
            this.config.rings
        );
        
        const material = new THREE.MeshBasicMaterial({
            color: this.config.color,
            wireframe: true,
            transparent: true,
            opacity: this.config.opacity
        });
        
        this.globe = new THREE.Mesh(geometry, material);
        this.scene.add(this.globe);
    }
    
    private createParticles(THREE: any): void {
        // Create floating particles around the globe
        for (let i = 0; i < 5; i++) {
            const particleGeometry = new THREE.BufferGeometry();
            const particleCount = 100;
            const positions = new Float32Array(particleCount * 3);
            
            for (let j = 0; j < particleCount; j++) {
                const radius = 3 + Math.random() * 2;
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.random() * Math.PI;
                
                positions[j * 3] = radius * Math.sin(phi) * Math.cos(theta);
                positions[j * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
                positions[j * 3 + 2] = radius * Math.cos(phi);
            }
            
            particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            
            const particleMaterial = new THREE.PointsMaterial({
                color: this.config.color,
                size: 0.02,
                transparent: true,
                opacity: 0.6
            });
            
            const particles = new THREE.Points(particleGeometry, particleMaterial);
            this.particles.push(particles);
            this.scene.add(particles);
        }
    }
    
    private addLighting(THREE: any): void {
        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
        this.scene.add(ambientLight);
        
        // Add directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(1, 1, 1);
        this.scene.add(directionalLight);
    }
    
    private async setupAudioAnalysis(): Promise<void> {
        try {
            // Try to get user media for audio analysis
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                
                this.audioContext = new (AudioContext || (window as any).webkitAudioContext)();
                this.analyser = this.audioContext.createAnalyser();
                this.analyser.fftSize = 256;
                
                const source = this.audioContext.createMediaStreamSource(stream);
                source.connect(this.analyser);
                
                this.dataArray = new Uint8Array(new ArrayBuffer(this.analyser.frequencyBinCount));
                
                console.log('🎵 Audio analysis setup complete');
            }
        } catch (error) {
            console.log('🔇 Audio analysis not available, using visual-only mode');
            // Continue without audio analysis
        }
    }
    
    public startAnimation(): void {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        this.animate();
        console.log('▶️ Audio globe animation started');
    }
    
    public stopAnimation(): void {
        if (!this.isAnimating) return;
        
        this.isAnimating = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        console.log('🛑 Audio globe animation stopped');
    }
    
    private animate(): void {
        if (!this.isAnimating) return;
        
        this.animationId = requestAnimationFrame(() => this.animate());
        
        // Analyze audio if available
        let audioLevel = 0;
        if (this.analyser && this.dataArray) {
            // Create a temporary buffer to avoid type issues
            const tempBuffer = new Uint8Array(this.analyser.frequencyBinCount);
            this.analyser.getByteFrequencyData(tempBuffer);
            audioLevel = Array.from(tempBuffer).reduce((sum, val) => sum + val, 0) / tempBuffer.length / 255;
        } else {
            // Simulate audio levels for visual effect
            audioLevel = (Math.sin(Date.now() * 0.001) + 1) * 0.5;
        }
        
        // Animate globe based on audio
        if (this.globe) {
            this.globe.rotation.x += 0.005 + audioLevel * 0.02;
            this.globe.rotation.y += 0.01 + audioLevel * 0.03;
            
            // Pulse effect based on audio
            const scale = 1 + audioLevel * 0.3;
            this.globe.scale.set(scale, scale, scale);
        }
        
        // Animate particles
        this.particles.forEach((particles, index) => {
            if (particles) {
                particles.rotation.x += 0.002 * (index + 1);
                particles.rotation.y += 0.003 * (index + 1);
                
                // Audio-reactive particle movement
                const positions = particles.geometry.attributes.position.array;
                for (let i = 0; i < positions.length; i += 3) {
                    positions[i + 2] += Math.sin(Date.now() * 0.001 + i) * 0.001 * (1 + audioLevel);
                }
                particles.geometry.attributes.position.needsUpdate = true;
            }
        });
        
        // Render scene
        if (this.renderer && this.scene && this.camera) {
            this.renderer.render(this.scene, this.camera);
        }
    }
    
    private handleResize(): void {
        if (!this.camera || !this.renderer) return;
        
        const width = this.canvas.offsetWidth;
        const height = this.canvas.offsetHeight;
        
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }
    
    private createFallbackVisualization(): void {
        // Create a CSS-based fallback visualization
        console.log('🎨 Creating fallback CSS visualization...');
        
        this.canvas.style.background = `
            radial-gradient(circle at center, 
                rgba(0, 255, 136, 0.2) 0%, 
                rgba(0, 153, 255, 0.1) 50%, 
                rgba(0, 0, 0, 0.8) 100%)
        `;
        
        // Create animated elements
        for (let i = 0; i < 20; i++) {
            const dot = document.createElement('div');
            dot.className = 'audio-fallback-dot';
            dot.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: ${this.config.color};
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: audioFallbackFloat ${2 + Math.random() * 3}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
                opacity: ${0.3 + Math.random() * 0.4};
            `;
            
            this.canvas.parentElement?.appendChild(dot);
        }
        
        // Add fallback animations to stylesheet
        this.addFallbackStyles();
        
        this.isAnimating = true;
        console.log('✅ Fallback visualization created');
    }
    
    private addFallbackStyles(): void {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes audioFallbackFloat {
                0%, 100% {
                    transform: translate(0, 0) scale(1);
                    opacity: 0.3;
                }
                50% {
                    transform: translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px) scale(1.5);
                    opacity: 0.8;
                }
            }
            
            .globe-canvas-container {
                position: relative;
                overflow: hidden;
            }
            
            .audio-fallback-dot {
                pointer-events: none;
                z-index: 1;
            }
        `;
        document.head.appendChild(style);
    }
    
    public destroy(): void {
        this.stopAnimation();
        
        if (this.audioContext) {
            this.audioContext.close();
        }
        
        // Clean up Three.js objects
        if (this.renderer) {
            this.renderer.dispose();
        }
        
        // Remove fallback elements
        const fallbackDots = document.querySelectorAll('.audio-fallback-dot');
        fallbackDots.forEach(dot => dot.remove());
        
        console.log('🧹 Audio globe cleaned up');
    }
}

// Export functions for global access
(window as any).initVoiceInterface = initVoiceInterface;
(window as any).toggleAudioGlobe = toggleAudioGlobe;
(window as any).AudioGlobe3D = AudioGlobe3D;
