import { useEffect } from "react";
import * as THREE from "three";

function Globe() {
  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Texture loader
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load("/src/assets/earth.jpg");

    // Sphere (Earth with texture)
    const geometry = new THREE.SphereGeometry(2, 32, 32);
    const material = new THREE.MeshBasicMaterial({
      map: earthTexture,
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    camera.position.z = 5;

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      sphere.rotation.y += 0.002; // slower spin
      renderer.render(scene, camera);
    }
    animate();

    // Cleanup
    return () => {
      document.body.removeChild(renderer.domElement);
    };
  }, []);

  return null;
}

export default Globe;
