import { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { feature } from "topojson-client";

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

    // --- Add country borders overlay ---
    function addCountryBorders(scene) {
      fetch("/Topojson/world-110m.json") // put this file in public/ folder
        .then((res) => res.json())
        .then((worldData) => {
          const countries = feature(
            worldData,
            worldData.objects.countries,
          ).features;

          countries.forEach((country) => {
            country.geometry.coordinates.forEach((polygon) => {
              // Handle MultiPolygon: polygon can be array of arrays
              polygon.forEach((ring) => {
                const points = ring.map(([lon, lat]) => {
                  const phi = (90 - lat) * (Math.PI / 180);
                  const theta = (lon + 180) * (Math.PI / 180);
                  const radius = 2.05; // slightly above Earth sphere
                  return new THREE.Vector3(
                    radius * Math.sin(phi) * Math.cos(theta),
                    radius * Math.cos(phi),
                    radius * Math.sin(phi) * Math.sin(theta),
                  );
                });

                const geometry = new THREE.BufferGeometry().setFromPoints(
                  points,
                );
                const material = new THREE.LineBasicMaterial({
                  color: 0xffffff,
                }); // brighter
                const line = new THREE.Line(geometry, material);
                line.userData = { name: country.properties.name };
                scene.add(line);
              });
            });
          });
        });
    }

    // Call once after globe is created
    addCountryBorders(scene);

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
