/*
 * @Descripttion: 
 * @version: 
 * @Author: wangshuhua
 * @Date: 2022-12-06 16:07:57
 * @LastEditors: wangshuhua
 * @LastEditTime: 2022-12-06 16:11:17
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

const scene = new THREE.Scene();
const stats = new Stats();
const gui = new GUI();
const material = new THREE.MeshNormalMaterial({
    wireframe: true,
    // flatShading: true
});
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0)
// gui.add(object, property, [min], [max], [step]) ⇒ Controller
const folder1 = gui.addFolder('相机位置')
folder1.add(camera.position, 'x', -50, 50).name('相机位置x');
folder1.add(camera.position, 'y', -50, 50).name('相机位置y');
folder1.add(camera.position, 'z', -50, 50).name('相机位置z');

const boxColors = {
    color: 0xffff00
}
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshBasicMaterial({
    color: boxColors.color
})

gui.addColor(boxColors, 'color').onChange(() => {
    console.log('color')
    // boxMaterial.color.set(boxColors.color) 等价于下面
    boxMaterial.color = new THREE.Color(boxColors.color)
});
const mesh = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(mesh);

const folder2 = gui.addFolder('boxGeometry 位置')
folder2.add(mesh.position, 'x', -10, 10);
folder2.add(mesh.position, 'y', -10, 10);
folder2.add(mesh.position, 'z', -10, 10);

const circleGeometry = new THREE.SphereGeometry(1);
const circleMaterial = new THREE.MeshNormalMaterial();
const circle = new THREE.Mesh(circleGeometry, circleMaterial);
circle.position.set(0, 0, 2);
scene.add(circle);

const axes = new THREE.AxesHelper(20, 20, 20);
scene.add(axes);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
document.body.appendChild(stats.domElement);
const clock = new THREE.Clock();

const orbitControls = new OrbitControls(camera, renderer.domElement);
const controls = {
    r: 5,
    speed: 1,
    stop: () => {
        controls.speed = 0;
    }
}
gui.add(controls, 'r', 1, 10).name('运动半径');
gui.add(controls, 'speed', 1, 20).name('运动速度');
gui.add(controls, 'stop').name('运动停止');
function animation() {
    const time = clock.getElapsedTime();
    circle.position.x = controls.r * Math.sin(controls.speed * time);
    circle.position.z = controls.r * Math.cos(controls.speed * time);
    requestAnimationFrame(animation);
    renderer.render(scene, camera);
    stats.update();
    orbitControls.update();
}
animation();