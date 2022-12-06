/*
 * @Descripttion: 
 * @version: 
 * @Author: wangshuhua
 * @Date: 2022-12-06 16:07:57
 * @LastEditors: wangshuhua
 * @LastEditTime: 2022-12-06 16:11:51
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Stats from 'three/examples/jsm/libs/stats.module.js';

const scene = new THREE.Scene();
const stats = new Stats();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(5, 1, 0);
camera.lookAt(0, 0, 0);

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
// 基本材质 材质不受光照的影响。
const boxMaterial = new THREE.MeshBasicMaterial({
    color: 0xffff00
});
// 
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
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