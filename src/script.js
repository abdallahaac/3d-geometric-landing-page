import "./style.css";
import * as THREE from "three";
import * as dat from "lil-gui";
import gsap from "gsap";
/**
 * Debug
 */

const gui = new dat.GUI();
gui.close();

const parameters = {
  materialColor: "#ffeded",
};

gui.addColor(parameters, "materialColor");

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */

const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () => {
  console.log("loadingManager: loading started");
};
loadingManager.onLoad = () => {
  console.log("loadingManager: loading finished");
};
loadingManager.onProgress = () => {
  console.log("loadingManager: loading progressing");
};
loadingManager.onError = () => {
  console.log("loadingManager: loading error");
};

const textureLoader = new THREE.TextureLoader(loadingManager);

// const colorTexture = textureLoader.load('/textures/checkerboard-1024x1024.png')
// const colorTexture = textureLoader.load('/textures/checkerboard-2x2.png')
const normalTexture = textureLoader.load(
  "/textures/pebbleNormalMap.jpeg",
  () => {
    console.log("textureLoader: loading finished");
  },
  () => {
    console.log("textureLoader: loading progressing");
  },
  () => {
    console.log("textureLoader: loading error");
  }
);
const coneNormalTexture = textureLoader.load("/textures/coneNormalMap.jpeg");
/**
 * Objects
 */

// Sphere
const sphereGeometry = new THREE.SphereBufferGeometry(0.5, 64, 64);
console.log(sphereGeometry.attributes);
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: 0x292929,
  metalness: 2,
  roughness: 0.8,
  normalMap: normalTexture,
});

// Torus
const torusGeometry = new THREE.TorusGeometry(1, 0.4, 16, 60);
console.log(torusGeometry.attributes);
const torusMaterial = new THREE.MeshStandardMaterial({
  color: 0x292929,
  metalness: 2,
  roughness: 0.8,
  normalMap: normalTexture,
});

// Torus Knot
const torusKnotGeometry = new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16);
console.log(torusKnotGeometry.attributes);
const torusKnotMaterial = new THREE.MeshStandardMaterial({
  color: 0x292929,
  metalness: 2,
  roughness: 0.8,
  normalMap: normalTexture,
});

const octahedronGeometry = new THREE.OctahedronGeometry(0.3, 0);
console.log(octahedronGeometry.attributes);
const octahedronMaterial = new THREE.MeshStandardMaterial({
  color: 0x292929,
  metalness: 2,
  roughness: 0.8,
  normalMap: normalTexture,
});

const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
const torusKnot = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial);
const octahedron = new THREE.Mesh(octahedronGeometry, octahedronMaterial);

/**
 * Object Position/ Scales
 */

// Object Distance
const objectsDistance = 2;
// Sphere
sphere.scale.set(0.5, 0.5, 0.5);
sphere.position.x = 1.8;
sphere.position.y = 0 * objectsDistance;

// Torus Position / Scale
torus.scale.set(0.7, 0.7, 0.7);
torus.position.x = 1.8;
torus.position.y = 0 * objectsDistance;

// Torus Knot Position / Scale
torusKnot.scale.set(0.4, 0.4, 0.4);
torusKnot.position.x = -2;
torusKnot.position.y = -3 * objectsDistance;

//Octahedron  Position / Scale
octahedron.scale.set(0.2, 0.7, 0.7);
octahedron.position.x = 2;
octahedron.position.y = objectsDistance * -10;

// Adding Objects to Scene
scene.add(sphere, torus, torusKnot, octahedron);
// Array of Meshes
const sectionMeshes = [torus, torusKnot, octahedron];
// Sphere Material GUI
const sphereMaterialGUI = gui.addFolder("Sphere Material");
sphereMaterialGUI.add(sphereMaterial, "metalness").min(0).max(1).step(0.01);
sphereMaterialGUI.add(sphereMaterial, "roughness").min(0).max(1).step(0.01);

/**
 * Particles
 */
// Geometry
const particlesCount = 4500;
const positions = new Float32Array(particlesCount * 3);
for (let i = 0; i < particlesCount; i++) {
  positions[i * 3 + 0] = (Math.random() - 0.5) * 20;
  positions[i * 3 + 1] = objectsDistance - Math.random() * 24;
  positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
}
const particlesGeometry = new THREE.BufferGeometry();
particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);

//Particle Material
const particleMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
  sizeAttenuation: true,
  size: 0.01,
});

//Points
const particles = new THREE.Points(particlesGeometry, particleMaterial);
scene.add(particles);

// Main Point Light 1
const pointLight = new THREE.PointLight(0xffffff, 10);
pointLight.position.x = 2;
pointLight.position.y = 6.31;
pointLight.position.z = 4;
pointLight.intensity = 10;
scene.add(pointLight);

// Main Point Light 1 GUI
const mainLight = gui.addFolder("Main Light");
mainLight.add(pointLight.position, "y").min(-10).max(10).step(0.01);
mainLight.add(pointLight.position, "x").min(-6).max(6).step(0.01);
mainLight.add(pointLight.position, "z").min(-20).max(20).step(0.01);
mainLight.add(pointLight, "intensity").min(0).max(10).step(0.01);

// Main Point Light 1 Color GUI
const mainLightColor = {
  color: 0xff00000,
};
mainLight
  .addColor(mainLightColor, "color")
  .onChange(() => pointLight.color.set(mainLightColor.color));

// Point Light 2
const pointLight2 = new THREE.PointLight(0x782097, 9.75);
pointLight2.position.set(1.81, -10, 0.83);
pointLight2.intensity = 10;
scene.add(pointLight2);

// Point Light 2 GUI
const pointLight2GUI = gui.addFolder("Point Light 1");
pointLight2GUI.add(pointLight2.position, "y").min(-10).max(10).step(0.01);
pointLight2GUI.add(pointLight2.position, "x").min(-20).max(20).step(0.01);
pointLight2GUI.add(pointLight2.position, "z").min(-20).max(20).step(0.01);
pointLight2GUI.add(pointLight2, "intensity").min(0).max(10).step(0.01);

// const pointLightHelper = new THREE.PointLightHelper(pointLight2, 1);
// scene.add(pointLightHelper);

// Main Point Light 1 Color GUI
const pointLight2Color = {
  color: 0xff00000,
};
pointLight2GUI.addColor(pointLight2Color, "color").onChange(() => {
  pointLight2.color.set(pointLight2Color.color);
});

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */

// Camera Group

const cameraGroup = new THREE.Group();
scene.add(cameraGroup);

// Base camera
const camera = new THREE.PerspectiveCamera(
  35,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 5;
cameraGroup.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 *  Scroll
 */
let scrollY = window.scrollY;
let currentSection = 0;

window.addEventListener("scroll", () => {
  scrollY = window.scrollY;

  const newSection = Math.round(scrollY / sizes.height);
  if (newSection != currentSection) {
    currentSection = newSection;

    gsap.to(sectionMeshes[currentSection].rotation, {
      duration: 3,
      ease: "power2.inOut",
      x: "+=3",
      y: "+=3",
    });
  }
  console.log(newSection);
});
/**
 * Cursor
 */

const cursor = {};
cursor.x = 0;
cursor.y = 0;

window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = event.clientY / sizes.height - 0.5;

  console.log(cursor);
});
/**
 * Animate
 */
const clock = new THREE.Clock();
let previousTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;

  // Animate camera
  camera.position.y = scrollY * -0.01;

  const parallaxX = cursor.x * 0.3;
  const parallaxY = -cursor.y * 0.3;

  cameraGroup.position.x +=
    (parallaxX - cameraGroup.position.x) * 5 * deltaTime;
  cameraGroup.position.y +=
    (parallaxY - cameraGroup.position.y) * 5 * deltaTime;

  // Render
  renderer.render(scene, camera);
  sphere.rotation.y += 0.5 * deltaTime;
  torus.rotation.z += -0.3 * deltaTime;
  torusKnot.rotation.z += -0.3 * deltaTime;
  octahedron.rotation.z += -0.2 * deltaTime;

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
