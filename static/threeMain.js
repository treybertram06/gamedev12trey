let camera, scene, renderer, controls;
const godModels = [];
const rotationX = Math.PI / 2;
const rotationY = Math.PI / 2;
const rotationZ = Math.PI / 1; // 90 degrees

let frameRate = 60;
let prevTime = performance.now();
const loader = new GLTFLoader();
const stats = new Stats();

document.body.appendChild(stats.dom);
const pathCarModel = '/models/car.gltf';
const pathGodModel = '/models/god.gltf'

function loadModel(x, y, z, scale, modelPath) {
  loader.load(
    modelPath,
    function (gltf) {
      gltf.scene.scale.set(scale, scale, scale); // Scale the model
      gltf.scene.position.set(x, y, z); // Set position of the model
      scene.add(gltf.scene);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );
}

function loadModelCustomColor(x, y, z, scale, modelPath) {
  loader.load(
    modelPath,
    function (gltf) {
      gltf.scene.traverse(function (node) {
        if (node.isMesh) {
          node.material = new THREE.MeshStandardMaterial({ color: 0xff0000 }); // Use MeshStandardMaterial
        }
      });
      gltf.scene.scale.set(scale, scale, scale); // Scale the model
      gltf.scene.position.set(x, y, z); // Set position of the model
      scene.add(gltf.scene);
      godModels.push(gltf.scene); // Add the model to the godModels array
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );
}

function loadGodModels(radius, count) {
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * 2 * Math.PI;
    const x = radius * Math.cos(angle);
    const z = radius * Math.sin(angle);
    loadModelCustomColor(x, 5, z, 5, pathGodModel);
  }
}

init();
animate();

function init() {
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000);
  camera.position.y = 1;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);
  scene.fog = new THREE.Fog(0xffffff, 0, 750);

  const groundGeometry = new THREE.PlaneGeometry(2000, 2000, 100, 100);
  groundGeometry.rotateX(- Math.PI / 2);
  const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x777777 });
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  scene.add(ground);

  loadModel(5, 0, 5, 1, pathCarModel);
  loadGodModels(10, 8); // Load 8 God models in a circle with radius 10

  const light = new THREE.HemisphereLight(0xeeeeff, 0x777788, 0.75);
  light.position.set(0.5, 1, 0.75);
  scene.add(light);

  controls = new PointerLockControls(camera, document.body);
  scene.add(controls.getObject());

  document.addEventListener('click', function () {
    controls.lock();
  });

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
}

function animate() {
  requestAnimationFrame(animate);

  const time = performance.now();

  if (controls.isLocked === true) {
    const delta = (time - prevTime) / 1000;
    frameRate = 1 / delta;
  }

   // Make each God model face the camera
  godModels.forEach((model) => {
    model.lookAt(camera.position);
    model.rotation.x += rotationX;
    model.rotation.y += rotationY;
    model.rotation.z += rotationZ;
  });

  prevTime = time;
  renderer.render(scene, camera);
  stats.update();

}