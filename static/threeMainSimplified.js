let camera, scene, renderer, controls;
const loader = new THREE.GLTFLoader();
const pathCarModel = 'https://treybertram06.github.io/gamedev12trey/static/models/car.gltf';

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

  const light = new THREE.HemisphereLight(0xeeeeff, 0x777788, 0.75);
  light.position.set(0.5, 1, 0.75);
  scene.add(light);

  controls = new THREE.PointerLockControls(camera, document.body);
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
  if (controls.isLocked === true) {
  }
  renderer.render(scene, camera);

}