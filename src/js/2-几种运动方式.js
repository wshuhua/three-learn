/*
 * @Descripttion: 
 * @version: 
 * @Author: wangshuhua
 * @Date: 2022-12-06 15:37:33
 * @LastEditors: wangshuhua
 * @LastEditTime: 2022-12-06 15:52:42
 */
import * as THREE from 'three';

const scene = new THREE.Scene();

const axes = new THREE.AxesHelper();
scene.add(axes)

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 0, 20);
camera.lookAt(0, 0, 0);

const mesh = new THREE.Mesh(
 new THREE.BoxGeometry(1, 1, 1),
 new THREE.MeshBasicMaterial({color: 0xff0000})
);
mesh.position.set(0, 0, 0);
scene.add(mesh);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.append(renderer.domElement);

const clock = new THREE.Clock();
function animation() {
    const time = clock.getElapsedTime();
    mesh.position.x = Math.sin(time * 2) * 2
    mesh.position.y = Math.cos(time * 2) * 2

    requestAnimationFrame(animation);
    renderer.render(scene, camera);
}
animation();