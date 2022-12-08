/*
 * @Descripttion: 
 * @version: 
 * @Author: wangshuhua
 * @Date: 2022-12-06 16:07:51
 * @LastEditors: wangshuhua
 * @LastEditTime: 2022-12-06 16:13:09
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

const scene = new THREE.Scene();
const stats = new Stats();
let width = window.innerWidth;
let height = window.innerHeight;
// 透视相机
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
// 正交相机
// const camera = new THREE.OrthographicCamera(-window.innerWidth / 200, window.innerWidth / 200, window.innerHeight/200, -window.innerHeight/200, 0.1, 100)
camera.position.set(0, 2, 5);
camera.zoom = 20;
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

const planeGeometry1 = new THREE.PlaneGeometry(2, 10);
const planeMaterial1 = new THREE.MeshBasicMaterial({
    color: 0xffffff,
});
const plane2 = new THREE.Mesh(planeGeometry1, planeMaterial1);
plane2.rotation.x = - 0.5 * Math.PI;
plane2.position.y = 0.001
scene.add(plane2);

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
renderer.setSize(width, height);
renderer.shadowMap.enabled = true;
// 默认产生
// renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);
document.body.appendChild(stats.domElement);

const orbitControls = new OrbitControls(camera, renderer.domElement);

const clock = new THREE.Clock();


const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(2, 2, 2);
pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.mapSize.height = 1024;
pointLight.castShadow = true;
scene.add(pointLight);

const folder1 = gui.addFolder('方向光位置');
folder1.add(pointLight, 'intensity', 0.1, 1);
folder1.add(pointLight.position, 'x', 0, 10);
folder1.add(pointLight.position, 'y', 0, 10);
folder1.add(pointLight.position, 'z', 0, 10);

function animations() {
    requestAnimationFrame(animations);
    const time = clock.getElapsedTime();
    stats.update();
    // camera.position.x = Math.sin(time);
    // camera.position.z = Math.cos(time);
    // camera.zoom = 2;
    // camera.updateProjectionMatrix();
    renderer.render(scene, camera);
    orbitControls.update();
}
animations();