// src/components/ThreeDBackground.jsx
import { useEffect, useRef } from "react";
import * as THREE from "three"; // Ensure you import Three.js correctly

const ThreeDBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Set up the scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    // Use the correct renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Load the texture
    const loader = new THREE.TextureLoader();
    const geometry = new THREE.PlaneGeometry(16, 8, 10, 9);
    const material = new THREE.MeshBasicMaterial({
      map: loader.load("/img1.jpg"), // Update with your image path
      transparent: true,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    camera.position.z = 5;

    const count = geometry.attributes.position.count;
    const clock = new THREE.Clock();

    function animate() {
      const time = clock.getElapsedTime();
      for (let i = 0; i < count; i++) {
        const x = geometry.attributes.position.getX(i);
        const anim1 = 0.25 * Math.sin(x + time * 2 + 15);
        geometry.attributes.position.setZ(i, anim1);
        geometry.computeVertexNormals();
        geometry.attributes.position.needsUpdate = true;
      }

      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }

    animate();

    // Cleanup on unmount
    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1, // Keep it behind other elements
      }}
    />
  );
};

export default ThreeDBackground;
