import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import * as THREE from 'three';

interface ParticleConfig {
  count: number;
  speed: number;
  size: number;
  color: string;
  opacity: number;
  mouseInteraction: boolean;
}

interface UseParticlesOptions {
  config?: Partial<ParticleConfig>;
  containerRef: React.RefObject<HTMLElement>;
}

const defaultConfig: ParticleConfig = {
  count: 80,
  speed: 0.5,
  size: 2,
  color: '#36b0d9',
  opacity: 0.6,
  mouseInteraction: true,
};

export const useParticles = ({ config = {}, containerRef }: UseParticlesOptions) => {
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const finalConfig = useMemo(() => ({ ...defaultConfig, ...config }), [config]);

  // Handle mouse movement
  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!finalConfig.mouseInteraction || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  }, [finalConfig.mouseInteraction, containerRef]);

  // Initialize Three.js scene
  const initScene = useCallback(() => {
    if (!containerRef.current) return;

    try {
      // Scene setup
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      // Camera setup
      const camera = new THREE.PerspectiveCamera(
        75,
        containerRef.current.clientWidth / containerRef.current.clientHeight,
        0.1,
        1000
      );
      camera.position.z = 50;
      cameraRef.current = camera;

      // Renderer setup
      const renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: true 
      });
      renderer.setSize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight
      );
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      containerRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      // Create particles
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(finalConfig.count * 3);
      const velocities = new Float32Array(finalConfig.count * 3);

      for (let i = 0; i < finalConfig.count * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 100;
        positions[i + 1] = (Math.random() - 0.5) * 100;
        positions[i + 2] = (Math.random() - 0.5) * 50;
        
        velocities[i] = (Math.random() - 0.5) * finalConfig.speed;
        velocities[i + 1] = (Math.random() - 0.5) * finalConfig.speed;
        velocities[i + 2] = 0;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

      // Material
      const material = new THREE.PointsMaterial({
        color: new THREE.Color(finalConfig.color),
        size: finalConfig.size,
        transparent: true,
        opacity: finalConfig.opacity,
        blending: THREE.AdditiveBlending,
      });

      // Create points
      const particles = new THREE.Points(geometry, material);
      particlesRef.current = particles;
      scene.add(particles);

      setIsInitialized(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to initialize particles');
    }
  }, [containerRef, finalConfig]);

  // Animation loop
  const animate = useCallback(() => {
    if (!sceneRef.current || !cameraRef.current || !rendererRef.current || !particlesRef.current) {
      return;
    }

    // Update particle positions
    const positions = particlesRef.current.geometry.attributes.position;
    const velocities = particlesRef.current.geometry.attributes.velocity;

    for (let i = 0; i < positions.count; i++) {
      positions.array[i * 3] += velocities.array[i * 3];
      positions.array[i * 3 + 1] += velocities.array[i * 3 + 1];

      // Wrap particles around edges
      if (Math.abs(positions.array[i * 3]) > 50) {
        positions.array[i * 3] *= -1;
      }
      if (Math.abs(positions.array[i * 3 + 1]) > 50) {
        positions.array[i * 3 + 1] *= -1;
      }
    }

    // Mouse interaction
    if (finalConfig.mouseInteraction) {
      particlesRef.current.rotation.x = mouseRef.current.y * 0.1;
      particlesRef.current.rotation.y = mouseRef.current.x * 0.1;
    }

    positions.needsUpdate = true;

    // Render
    rendererRef.current.render(sceneRef.current, cameraRef.current);
    animationIdRef.current = requestAnimationFrame(animate);
  }, [finalConfig.mouseInteraction]);

  // Handle resize
  const handleResize = useCallback(() => {
    if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    cameraRef.current.aspect = width / height;
    cameraRef.current.updateProjectionMatrix();
    rendererRef.current.setSize(width, height);
  }, [containerRef]);

  // Cleanup
  const cleanup = useCallback(() => {
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
    }

    if (rendererRef.current && containerRef.current) {
      containerRef.current.removeChild(rendererRef.current.domElement);
      rendererRef.current.dispose();
    }

    if (particlesRef.current) {
      particlesRef.current.geometry.dispose();
      (particlesRef.current.material as THREE.Material).dispose();
    }

    sceneRef.current = null;
    rendererRef.current = null;
    cameraRef.current = null;
    particlesRef.current = null;
    setIsInitialized(false);
  }, [containerRef]);

  // Setup and teardown
  useEffect(() => {
    initScene();
    animate();

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      cleanup();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [initScene, animate, handleResize, handleMouseMove, cleanup]);

  return {
    isInitialized,
    error,
    cleanup,
  };
};