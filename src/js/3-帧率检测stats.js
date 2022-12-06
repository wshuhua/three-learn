/*
 * @Descripttion: 
 * @version: 
 * @Author: wangshuhua
 * @Date: 2022-12-06 15:55:16
 * @LastEditors: wangshuhua
 * @LastEditTime: 2022-12-06 15:55:43
 */
import * as THREE from 'three';
import Stat from 'three/examples/jsm/libs/stats.module'

const scene = new THREE.Scene();
const stats = new Stat();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 10;
camera.lookAt(0, 0, 0)

// const geometry = new THREE.BoxGeometry(2, 2, 2)
// const material = new THREE.MeshBasicMaterial({
//     color: 0x00ff00 * Math.random()
// });

// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

const axes = new THREE.AxesHelper(20);
scene.add(axes);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
document.body.appendChild(stats.domElement);

let cubes = [];
function createCube() {
    let d = Math.random();
    const w = d * 2;
    const h = d * 2;
    const z = d * 2;
    const cube = new THREE.BoxGeometry(w, h, z);
    const material = new THREE.MeshBasicMaterial({
        color: 0xffffff * Math.random()
    });

    const mesh = new THREE.Mesh(cube, material);
    mesh.position.x = (Math.random() - 0.5) * 10;
    mesh.position.y = (Math.random() - 0.5) * 10;
    mesh.position.x = (Math.random() - 0.5) * 10;
    cubes.push(mesh);
    scene.add(mesh);
}
let n = 20;

for (let i = 0; i < n; i++) {
    createCube();
}
const clock = new THREE.Clock();

function animation() {
    const time = clock.getElapsedTime();

    requestAnimationFrame(animation);
    cubes.forEach((cube, index) => {
        cube.rotation.x = time * 0.2 + index;
        cube.rotation.y = time * 0.2 + index;
    })
    renderer.render(scene, camera);
    stats.update();
}
animation();