import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

const scene = new THREE.Scene();
const stats = new Stats();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);

const gui = new GUI();

const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.position.set(0, 0, 0);
plane.rotation.x = - 0.5 * Math.PI;
// 接收阴影
plane.receiveShadow = true;
scene.add(plane)


const sphereGeometry = new THREE.SphereGeometry(1);
const sphereMaterial = new THREE.MeshStandardMaterial({
    color: 0xffff00,
})
const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
// 产生阴影
sphereMesh.castShadow = true;
sphereMesh.position.y = 1
scene.add(sphereMesh);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
// 默认产生
// renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);
document.body.appendChild(stats.domElement);

const orbitControls = new OrbitControls(camera, renderer.domElement);

const clock = new THREE.Clock();


const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(2, 2, 2);
// 开启阴影
directionalLight.castShadow = true;
directionalLight.position.set(1, 1, 1);
// 使阴影更加圆滑
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
scene.add(directionalLight);

const helper = new THREE.DirectionalLightHelper(directionalLight, 5);
scene.add(helper);

const folder1 = gui.addFolder('方向光位置');
folder1.add(directionalLight, 'intensity', 0.1, 1);
folder1.add(directionalLight.position, 'x', 0, 10);
folder1.add(directionalLight.position, 'y', 0, 10);
folder1.add(directionalLight.position, 'z', 0, 10);

// const pointLight = new THREE.PointLight(0xffffff);
// pointLight.position.set(2, 2, 2);
// pointLight.shadow.mapSize.width = 1024;
// pointLight.shadow.mapSize.height = 1024;
// pointLight.castShadow = true;
// scene.add(pointLight);

// const helper = new THREE.PointLightHelper(pointLight, 5);
// scene.add(helper);
// const folder1 = gui.addFolder('方向光位置');
// folder1.add(pointLight, 'intensity', 0.1, 1);
// folder1.add(pointLight.position, 'x', 0, 10);
// folder1.add(pointLight.position, 'y', 0, 10);
// folder1.add(pointLight.position, 'z', 0, 10);

// const spotLight = new THREE.SpotLight(0xffffff);
// spotLight.position.set(2, 2, 2);
// spotLight.shadow.mapSize.width = 1024;
// spotLight.shadow.mapSize.height = 1024;
// spotLight.castShadow = true;
// scene.add(spotLight);

// const helper = new THREE.SpotLightHelper(spotLight, 5);
// scene.add(helper);
// const folder1 = gui.addFolder('方向光位置');
// folder1.add(spotLight, 'intensity', 0.1, 1);
// folder1.add(spotLight.position, 'x', 0, 10);
// folder1.add(spotLight.position, 'y', 0, 10);
// folder1.add(spotLight.position, 'z', 0, 10);

function animations() {
    requestAnimationFrame(animations);
    const time = clock.getElapsedTime();
    stats.update();
    sphereMesh.position.y = 1 + Math.abs(Math.sin(time * 2));
    renderer.render(scene, camera);
    orbitControls.update();
}
animations();