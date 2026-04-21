import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

const SwarmBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // CONFIG
    const COUNT = 15000; // Slightly reduced for performance in React
    const SPEED_MULT = 1;
    const AUTO_SPIN = true;

    // SETUP
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.01);
    
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.set(0, 0, 150);
    
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      powerPreference: "high-performance",
      alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5; // Slower auto-rotate
    controls.enableZoom = false; 
    controls.enablePan = false;
    controls.enableRotate = true; // Allow manual rotation if they click, but mainly we will auto-react

    // POST PROCESSING
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight), 
      1.5, 0.4, 0.85
    );
    bloomPass.strength = 1.5;
    bloomPass.radius = 0.6;
    bloomPass.threshold = 0.1;
    composer.addPass(bloomPass);

    // Mouse Tracking for Interactive Rotation
    const mouse = new THREE.Vector2();
    const handleGlobalMouseMove = (e: MouseEvent) => {
      // Normalize mouse coords (-1 to 1)
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleGlobalMouseMove);

    // SWARM OBJECTS
    const dummy = new THREE.Object3D();
    const color = new THREE.Color();
    const target = new THREE.Vector3();
    
    // INSTANCED MESH
    const geometry = new THREE.TetrahedronGeometry(0.35);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    
    const instancedMesh = new THREE.InstancedMesh(geometry, material, COUNT);
    instancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(instancedMesh);

    // DATA ARRAYS
    const positions: THREE.Vector3[] = [];
    for(let i=0; i<COUNT; i++) {
      positions.push(new THREE.Vector3(
        (Math.random()-0.5)*100, 
        (Math.random()-0.5)*100, 
        (Math.random()-0.5)*100
      ));
      instancedMesh.setColorAt(i, color.setHex(0x00ffff)); 
    }

    // ANIMATION LOOP
    const clock = new THREE.Clock();
    let requestRef: number;

    const animate = () => {
      requestRef = requestAnimationFrame(animate);
      const time = clock.getElapsedTime() * SPEED_MULT;
      
      // Interactive rotation effect: Tilt camera based on mouse
      camera.position.x += (mouse.x * 50 - camera.position.x) * 0.02;
      camera.position.y += (mouse.y * 50 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      controls.update();

      const flowSpeed = 0.5;
      const fieldStrength = 1.2;
      const morph = 0.4;
      const jitter = 1.0;

      for(let i=0; i<COUNT; i++) {
        const n = i / COUNT;
        const t = time * 0.2 * flowSpeed;
        
        const angle = n * Math.PI * 100 + t;
        const radius = 30 + Math.sin(angle * 0.1) * 15;
        
        let x = Math.cos(angle) * radius;
        let z = Math.sin(angle) * radius;
        let y = (n - 0.5) * 200;
        
        const noiseX = Math.sin(n * 50 + t) * Math.cos(n * 20) * fieldStrength * 10;
        const noiseY = Math.cos(n * 40 + t) * fieldStrength * 10;
        const noiseZ = Math.tan(Math.sin(n * 10 + t)) * fieldStrength * 2;
        
        const vibX = Math.sin(time * 3.0 + i) * jitter;
        const vibY = Math.cos(time * 2.5 + i * 0.5) * jitter;
        const vibZ = Math.sin(time * 4.0 - i) * jitter;
        
        const finalX = x + (noiseX * (1.0 - morph)) + vibX;
        const finalY = y + noiseY + vibY;
        const finalZ = z + (noiseZ * (1.0 - morph)) + vibZ;
        
        const finalZoom = 1.5;
        target.set(finalX * finalZoom, finalY * finalZoom, finalZ * finalZoom);
        
        const pulse = Math.sin(time * 2.0 + n * 10.0) * 0.2 + 0.6;
        const lightness = 0.3 + (Math.pow(Math.sin(n * Math.PI + t * 2.0), 4) * 0.4);
        
        if (i % 10 === 0) {
          color.setHSL(0.55, 0.8, lightness + 0.2);
        } else {
          color.setHSL(0.58, 0.9, lightness * pulse);
        }
        
        positions[i].lerp(target, 0.1);
        dummy.position.copy(positions[i]);
        dummy.updateMatrix();
        instancedMesh.setMatrixAt(i, dummy.matrix);
        instancedMesh.setColorAt(i, color);
      }
      
      instancedMesh.instanceMatrix.needsUpdate = true;
      if (instancedMesh.instanceColor) instancedMesh.instanceColor.needsUpdate = true;

      composer.render();
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(requestRef);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      // Dispose resources
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 -z-10 pointer-events-none opacity-50 bg-black"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default SwarmBackground;
