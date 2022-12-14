/*
 * @Descripttion: 
 * @version: 
 * @Author: wangshuhua
 * @Date: 2022-12-08 14:01:01
 * @LastEditors: wangshuhua
 * @LastEditTime: 2022-12-08 15:40:48
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

var scene, camera, renderer, controls, line;
const clock = new THREE.Clock();

threeStart();

function threeStart() {
    initScene();
    initLight();
    initCamera();
    initObject();
    initThree();
    animation();
}
function initThree() {
    renderer = new THREE.WebGLRenderer({
        antialias: true //是否执行抗锯齿
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    controls = new OrbitControls(camera, renderer.domElement);
}

function initCamera() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 10, 10);
    camera.lookAt(0, 0, 0);
}

function initScene() {
    scene = new THREE.Scene();
}

function initLight() {
    const ambientLight = new THREE.AmbientLight(0xffffff,);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 1, 1);
    scene.add(ambientLight, directionalLight);
}
function initObject() {
    const points = [];
    const material = new THREE.LineBasicMaterial({ linewidth: 2, color: 0xffffff });
    const point1 = new THREE.Vector3(-1, 0, -1);
    const point2 = new THREE.Vector3(1, 0, 1);
    points.push(point1)
    points.push(point2)
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    line = new THREE.Line(geometry, material);
    scene.add(line);

}

function animation() {
    const time = clock.getElapsedTime();
    requestAnimationFrame(animation);
    line.rotation.y = time / 0.01;
    renderer.render(scene, camera);
    controls.update();
}