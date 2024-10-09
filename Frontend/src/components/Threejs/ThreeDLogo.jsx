import { useRef, useEffect } from "react";
import * as THREE from "three";
import "./ThreeDLogo.css";

const ThreeDLogo = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Set up the scene
    const scene = new THREE.Scene();
    scene.background = null; // Make sure the background is transparent

    // Set up the camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 3; // Adjust the position as necessary

    // Set up the renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(120, 120); // Adjust size as necessary
    mountRef.current.appendChild(renderer.domElement);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 5); // Increase intensity
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 7); // Increase intensity
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Load a texture for your 3D logo
    const textureLoader = new THREE.TextureLoader();
    const logoTexture = textureLoader.load("/logo.png", undefined, (error) => {
      console.error("Error loading texture:", error); // Log error if texture fails to load
    });

    // Create a 3D plane to render the logo texture
    const geometry = new THREE.PlaneGeometry(6, 6); // Adjust size for visibility
    const material = new THREE.MeshStandardMaterial({
      map: logoTexture,
      transparent: true,
    }); // Enable transparency
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      plane.rotation.x += 0.01;
      plane.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup when the component unmounts
    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="three-d-logo"
      style={{
        position: "absolute",
        top: "20px",
        left: "20px",
        margin: "40px",
        zIndex: 3,
      }}
    />
  );
};

export default ThreeDLogo;
