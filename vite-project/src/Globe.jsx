import { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

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
    camera.position.z = 5;

    //Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Texture loader
    const textureLoader = new THREE.TextureLoader();
    const earthTexture4k = textureLoader.load("/earth4k.jpg");
    const earthTexture8k = textureLoader.load("/earth8k.jpg");

    // Sphere (Earth with texture)
    const geometry = new THREE.SphereGeometry(2, 128, 128);

    //Materials for each resolutionn
    const material4k = new THREE.MeshBasicMaterial({
      map: earthTexture4k,
    });
    const material8k = new THREE.MeshBasicMaterial({
      map: earthTexture8k,
    });

    //LOD System
    const lod = new THREE.LOD();
    lod.addLevel(new THREE.Mesh(geometry, material4k), 30); //For far away texture
    lod.addLevel(new THREE.Mesh(geometry, material8k), 0); //For Close Up detail

    scene.add(lod);

    //OribitalControls for zoom + rotation
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true; //allow Zoom
    controls.minDistance = 3; //how close can you zoom
    controls.maxDistance = 20; //how far you can zoom
    controls.enablePan = false; //disable dragging sideways if you want only rotate + zoom

    // Animation loop
    let frameId;
    function animate() {
      frameId = requestAnimationFrame(animate);
      lod.rotation.y += 0.001; // slower spin
      renderer.render(scene, camera);
    }
    animate();

    // Resize handler
    const onWindowResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight || 1;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    // Call once to ensure correct initial sizing
    onWindowResize();
    window.addEventListener("resize", onWindowResize, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener("resize", onWindowResize);
      if (frameId) cancelAnimationFrame(frameId);

      // Dispose geometries, materials, textures
      geometry.dispose();
      material4k.dispose();
      material8k.dispose();
      earthTexture4k.dispose();
      earthTexture8k.dispose();

      // Dispose controls
      controls.dispose();

      // Remove renderer DOM and dispose renderer
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);
  return null;
}

export default Globe;
