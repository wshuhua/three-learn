/*
 * @Descripttion: 
 * @version: 
 * @Author: wangshuhua
 * @Date: 2022-12-06 16:07:56
 * @LastEditors: wangshuhua
 * @LastEditTime: 2022-12-06 16:10:56
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';

const scene = new THREE.Scene();
const stats = new Stats();
const material = new THREE.MeshNormalMaterial({
    wireframe: true,
    // flatShading: true
});
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0)

// 【宽度，分段数】
// BoxGeometry(width : Float, height : Float, depth : Float, widthSegments : Integer, heightSegments : Integer, depthSegments : Integer)
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 10, 10, 10),
    material
);
scene.add(mesh);

const mesh1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5),
    material
)
mesh1.position.y = 2;
scene.add(mesh1);




const axes = new THREE.AxesHelper(20, 20, 20);
scene.add(axes);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
document.body.appendChild(stats.domElement);
const clock = new THREE.Clock();

const orbitControls = new OrbitControls(camera, renderer.domElement);
function animation() {
    const time = clock.getElapsedTime();

    requestAnimationFrame(animation);
    renderer.render(scene, camera);
    stats.update();
    orbitControls.update();
}
animation();