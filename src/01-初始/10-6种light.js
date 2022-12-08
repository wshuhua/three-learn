import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';

const scene = new THREE.Scene();
const stats = new Stats();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);

const gui = new GUI();
// const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
// const boxMaterial = new THREE.MeshStandardMaterial({
//     color: 0xffff00
// });
// const box = new THREE.Mesh(boxGeometry, boxMaterial);
// box.position.set(-10, 0, 0)
// scene.add(box);


// const pointPosition = {
//     x: -10,
//     y: 0,
//     z: 3,
// }

// const boxColors = {
//     color: 0xffff00
// }

// // 点光源(灯泡发出来的光)
// const pointLight = new THREE.PointLight(boxColors.color, 1, 100);
// pointLight.position.set(pointPosition.x, pointPosition.y, pointPosition.z)
// scene.add(pointLight);

// const folder1 = gui.addFolder('点光源位置');
// folder1.add(pointLight.position, 'x', -20, 0);
// folder1.add(pointLight.position, 'y', -10, 0);
// folder1.add(pointLight.position, 'z', -10, 0);
// folder1.addColor(boxColors, 'color').onChange(() => {
//     pointLight.color = new THREE.Color(boxColors.color);
// });



const sphereGeometry = new THREE.SphereGeometry(1);
const sphereMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
})
const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
// sphereMesh.position.set(2, 0, 0);
// scene.add(sphereMesh);

// // 场景光
// const light = new THREE.AmbientLight(0x404040);
// scene.add(light);

// // 辅助线
// const sphereSize = 1;
// const pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
// scene.add(pointLightHelper);

// const sphereMesh2 = sphereMesh.clone();
// sphereMesh2.position.set(5, 0, 0);
// scene.add(sphereMesh2);


// const spontPosition = {
//     x: 4,
//     y: 5,
//     z: 5,
// }

// const spotColors = {
//     color: 0x00ff00
// }

// const spotLight = new THREE.SpotLight(spotColors.color);
// spotLight.position.set(spontPosition.x, spontPosition.y, spontPosition.z);
// scene.add(spotLight);

// // 台灯光
// const folder2 = gui.addFolder('聚光灯');
// folder2.add(spotLight.position, 'x', 0, 10);
// folder2.add(spotLight.position, 'y', -5, 10);
// folder2.add(spotLight.position, 'z', -5, 10);

// const spotLightHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(spotLightHelper);

// const sphere2 = sphereMesh.clone();
// sphere2.position.set(7, 0, 0);
// scene.add(sphere2);

// // 方向光
// const directionLight = new THREE.DirectionalLight(0xffffff, 0.5);
// directionLight.position.set(10, 0, 0);
// scene.add(directionLight);

// const folder1 = gui.addFolder('方向光位置');
// folder1.add(directionLight, 'intensity', 0.1, 1);
// folder1.add(directionLight.position, 'x', 0, 10);
// folder1.add(directionLight.position, 'y', 0, 10);
// folder1.add(directionLight.position, 'z', 0, 10);

// const helper = new THREE.DirectionalLightHelper(directionLight, 5);
// scene.add(helper);

// 平面光光源
// const sphere3 = sphereMesh.clone();
// sphere3.position.set(0, 0, 0);
// scene.add(sphere3);

// const obj = {
//     intensity: 1,
//     width: 10,
//     height: 10
// };
// const rectAreaLight = new THREE.RectAreaLight(0xffffff, obj.intensity, obj.width, obj.height);
// rectAreaLight.position.set(0, 0, 4);
// const helper = new RectAreaLightHelper(rectAreaLight);
// scene.add(rectAreaLight, helper);
// const rectFolder = gui.addFolder('平面光光源');
// rectFolder.add(rectAreaLight, 'intensity', 0, 1).name('光源强度');
// rectFolder.add(rectAreaLight, 'width', 0, 20).name('光源宽度');
// rectFolder.add(rectAreaLight, 'height', 0, 20).name('光源高度');


// 半球光
const obj = {
    skyColor: 0xffffff,
    groundColor: 0xffff00,
    intensity: 1
};
const sphere4 = sphereMesh.clone();
sphere4.position.set(3, 0, 0);
const hemisphereLight = new THREE.HemisphereLight(obj.skyColor, obj.groundColor, obj.intensity);
const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 2);

const hemiFolder = gui.addFolder('半球光');
hemiFolder.add(hemisphereLight, 'intensity', 0, 1).name('强度');
hemiFolder.add(hemisphereLight.position, 'x', -5, 5);
hemiFolder.add(hemisphereLight.position, 'y', -5, 5);
hemiFolder.add(hemisphereLight.position, 'z', -5, 5);
scene.add(sphere4, hemisphereLight, hemisphereLightHelper);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
document.body.appendChild(stats.domElement);

const orbitControls = new OrbitControls(camera, renderer.domElement);

const axes = new THREE.AxesHelper(20, 20, 20);
scene.add(axes);
const clock = new THREE.Clock();

function animations() {
    requestAnimationFrame(animations);
    const time = clock.getElapsedTime();
    stats.update();
    renderer.render(scene, camera);
    orbitControls.update();
}
animations();