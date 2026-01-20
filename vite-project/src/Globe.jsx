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
    const earthTexture4k = textureLoader.load("/src/assets/earth4k.jpg");
    const earthTexture8k = textureLoader.load("/src/assets/earth8k.jpg");

    // Sphere (Earth with texture)
    const geometry = new THREE.SphereGeometry(2, 32, 32);

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
    controls.enabkeZoom = true; //allow Zoom
    controls.minDistance = 3; //how close can you zoom
    controls.maxDistance = 20; //how far you can zoom
    controls.enablePan = false; //disable dragging sideways if you want only rotate + zoom

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      lod.rotation.y += 0.001; // slower spin
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
