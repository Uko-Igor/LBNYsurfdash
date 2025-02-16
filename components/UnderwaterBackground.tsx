'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const UnderwaterBackground = () => {
  const containerRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;

    // Create Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x001f33);

    // Create Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 15;

    // Create Renderer
    const renderer = new THREE.WebGLRenderer({ 
      canvas: containerRef.current,
      antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Add Fog
    scene.fog = new THREE.FogExp2(0x001f33, 0.02);

    // Add Lighting
    const ambientLight = new THREE.AmbientLight(0x666666, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 10, 10);
    scene.add(directionalLight);

    // Create objects
    const fishMeshes: THREE.Mesh[] = [];
    const seaweedMeshes: THREE.Mesh[] = [];
    const bubbleMeshes: THREE.Mesh[] = [];

    // Create fish
    const fishGeometry = new THREE.ConeGeometry(0.4, 1.2, 8);
    const fishMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x00aaff,
      shininess: 80
    });

    for (let i = 0; i < 10; i++) {
      const fishMesh = new THREE.Mesh(fishGeometry, fishMaterial);
      fishMesh.rotation.x = Math.PI / 2;
      fishMesh.position.set(
        Math.random() * 20 - 10,
        Math.random() * 10 - 5,
        Math.random() * -10 - 5
      );
      fishMesh.userData.offset = Math.random() * 1000;
      fishMeshes.push(fishMesh);
      scene.add(fishMesh);
    }

    // Create seaweed
    const seaweedGeometry = new THREE.PlaneGeometry(0.2, 2.4, 1, 4);
    const seaweedMaterial = new THREE.MeshPhongMaterial({
      color: 0x00ff66,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8
    });

    for (let i = 0; i < 30; i++) {
      const seaweed = new THREE.Mesh(seaweedGeometry, seaweedMaterial);
      seaweed.position.set(
        Math.random() * 20 - 10,
        -8,
        Math.random() * 10 - 15
      );
      seaweed.rotation.y = Math.random() * Math.PI * 2;
      seaweed.userData.offset = Math.random() * 1000;
      seaweedMeshes.push(seaweed);
      scene.add(seaweed);
    }

    // Create bubbles
    const bubbleGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    const bubbleMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.3,
      shininess: 100
    });

    for (let i = 0; i < 50; i++) {
      const bubble = new THREE.Mesh(bubbleGeometry, bubbleMaterial);
      bubble.position.set(
        Math.random() * 20 - 10,
        -10,
        Math.random() * 10 - 15
      );
      bubble.userData.speed = 0.03 + Math.random() * 0.05;
      bubbleMeshes.push(bubble);
      scene.add(bubble);
    }

    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Animation loop
    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const time = Date.now() * 0.001;

      // Animate fish
      fishMeshes.forEach((fish) => {
        const offset = fish.userData.offset;
        fish.position.x = Math.sin(time * 0.5 + offset) * 5;
        fish.position.y = Math.cos(time * 0.3 + offset) * 3;
        fish.rotation.z = Math.sin(time + offset) * 0.2;
      });

      // Animate seaweed
      seaweedMeshes.forEach((weed) => {
        const offset = weed.userData.offset;
        weed.rotation.z = Math.sin(time + offset) * 0.1;
      });

      // Animate bubbles
      bubbleMeshes.forEach((bubble) => {
        bubble.position.y += bubble.userData.speed;
        if (bubble.position.y > 10) {
          bubble.position.y = -10;
          bubble.position.x = Math.random() * 20 - 10;
          bubble.position.z = Math.random() * 10 - 15;
        }
      });

      renderer.render(scene, camera);
    };

    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      
      // Dispose geometries and materials
      fishGeometry.dispose();
      fishMaterial.dispose();
      seaweedGeometry.dispose();
      seaweedMaterial.dispose();
      bubbleGeometry.dispose();
      bubbleMaterial.dispose();
      
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        backgroundColor: '#001f33'
      }}
    />
  );
};

export default UnderwaterBackground; 