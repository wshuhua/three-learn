/*
 * @Descripttion: 
 * @version: 
 * @Author: wangshuhua
 * @Date: 2022-12-06 16:09:59
 * @LastEditors: wangshuhua
 * @LastEditTime: 2022-12-14 11:15:21
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

import t1 from '../img/t1.jpg';

const scene = new THREE.Scene();
const stats = new Stats();
const gui = new GUI();
let width = window.innerWidth;
let height = window.innerHeight;
// 透视相机
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
camera.position.set(0, 3, 3);
camera.lookAt(0, 0, 0);


// 贴图 texture
const loader = new THREE.TextureLoader();
const texture4 = loader.load(t1)
// texture4.magFilter = THREE.LinearFilter;
texture4.magFilter = THREE.NearestFilter;
texture4.wrapS = THREE.RepeatWrapping;
texture4.wrapT = THREE.RepeatWrapping;
texture4.repeat.set(20, 20);

const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.MeshStandardMaterial({
    // color: 0xff0000,
    map: texture4,
    side: THREE.DoubleSide
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.position.set(0, 0, 0);
plane.rotation.x = - 0.5 * Math.PI;
plane.receiveShadow = true;
scene.add(plane)

const m1 = new THREE.MeshStandardMaterial({ map: loader.load('https://threejs.org/manual/examples/resources/images/flower-1.jpg') })
const m2 = new THREE.MeshStandardMaterial({ map: loader.load('https://threejs.org/manual/examples/resources/images/flower-2.jpg') })
const m3 = new THREE.MeshStandardMaterial({ map: loader.load('https://threejs.org/manual/examples/resources/images/flower-3.jpg') })
const m4 = new THREE.MeshStandardMaterial({ map: loader.load('https://threejs.org/manual/examples/resources/images/flower-4.jpg') })
const m5 = new THREE.MeshStandardMaterial({ map: loader.load('https://threejs.org/manual/examples/resources/images/flower-5.jpg') })
const m6 = new THREE.MeshStandardMaterial({ map: loader.load('https://threejs.org/manual/examples/resources/images/flower-6.jpg') })
const box = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    [m1, m2, m3, m4, m5, m6]
)
box.castShadow = true;
box.position.y = 0.5001;
scene.add(box);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.castShadow = true;
directionalLight.position.set(1, 1, 1);
// directionalLight.shadow.mapSize.width = 1024;
// directionalLight.shadow.mapSize.height = 1024;
scene.add(directionalLight);

// const helper = new THREE.DirectionalLightHelper(directionalLight, 5);
// scene.add(helper);

const folder1 = gui.addFolder('方向光位置');
folder1.add(directionalLight, 'intensity', 0.1, 1);
folder1.add(directionalLight.position, 'x', 0, 10);
folder1.add(directionalLight.position, 'y', 0, 10);
folder1.add(directionalLight.position, 'z', 0, 10);

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);
document.body.appendChild(stats.domElement);

const orbitControls = new OrbitControls(camera, renderer.domElement);

const clock = new THREE.Clock();

function animations() {
    requestAnimationFrame(animations);
    const time = clock.getElapsedTime();
    stats.update();
    renderer.render(scene, camera);
    orbitControls.update();
}
animations();