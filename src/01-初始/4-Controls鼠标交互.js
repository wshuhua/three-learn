/*
 * @Descripttion: 
 * @version: 
 * @Author: wangshuhua
 * @Date: 2022-12-06 16:05:13
 * @LastEditors: wangshuhua
 * @LastEditTime: 2022-12-06 16:05:23
 */
import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const stats = new Stats();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 3;
camera.lookAt(0, 0, 0)

const geometry = new THREE.SphereGeometry(1)
const material = new THREE.MeshNormalMaterial();
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);    
const axes = new THREE.AxesHelper(20, 20, 20);
scene.add(axes);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
document.body.appendChild(stats.domElement);


const orbitControls = new OrbitControls(camera, renderer.domElement);
const clock = new THREE.Clock();
function animation() {
    const time = clock.getElapsedTime();

    requestAnimationFrame(animation);
    // mesh.rotation.x = time * 0.2;
    // mesh.rotation.y = time * 0.2;
    // mesh.rotation.x = time * 0.5;
    // mesh.rotation.y = time * 0.5;
    renderer.render(scene, camera);
    stats.update();
    orbitControls.update();
}
animation();