/*
 * @Descripttion: 
 * @version: 
 * @Author: wangshuhua
 * @Date: 2022-12-06 16:06:51
 * @LastEditors: wangshuhua
 * @LastEditTime: 2022-12-06 16:07:17
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';

const scene = new THREE.Scene();
const stats = new Stats();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 0, 5);
camera.lookAt(0, 0, 0)

const group = new THREE.Group();
const group2 = new THREE.Group();

// 太阳
const geometry1 = new THREE.SphereGeometry(1);
const material1 = new THREE.MeshBasicMaterial({
    color: 0xFFFF00
});
const cube1 = new THREE.Mesh(geometry1, material1);
group.add(cube1)



// 地球
const geometry2 = new THREE.SphereGeometry(0.5);
const material2 = new THREE.MeshBasicMaterial({
    color: 0x00FF00
});
const cube2 = new THREE.Mesh(geometry2, material2);
group2.position.y = 2.5;

group2.add(cube2)



// 月亮
const geometry3 = new THREE.SphereGeometry(0.2);
const material3 = new THREE.MeshBasicMaterial({
    color: 0x0000FF
});
const cube3 = new THREE.Mesh(geometry3, material3);
// 相对于 group2 来计算
cube3.position.y = 1;
group2.add(cube3)

group.add(group2)

scene.add(group)

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
document.body.appendChild(stats.domElement);
const clock = new THREE.Clock();

const orbitControls = new OrbitControls(camera, renderer.domElement);
function animation() {
    const time = clock.getElapsedTime();

    cube1.rotation.z = time;
    cube2.rotation.z = time;
    cube3.rotation.z = time;


    // 地球和月亮围绕着太阳转
    group.rotation.z = time * 0.5;
    // 月亮围绕地球转
    group2.rotation.z = time * 0.5;

    requestAnimationFrame(animation);
    renderer.render(scene, camera);
    stats.update();
    orbitControls.update();
}
animation();