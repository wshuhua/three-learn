/*
 * @Descripttion: 
 * @version: 
 * @Author: wangshuhua
 * @Date: 2022-12-07 09:55:06
 * @LastEditors: wangshuhua
 * @LastEditTime: 2022-12-14 13:52:59
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { VTKLoader } from 'three/examples/jsm/loaders/VTKLoader';

let w = window.innerWidth;
let h = window.innerHeight;

let scene, camera, renderer, controls, clock;

start();

function start() {
    initScene();
    initCamera();
    initLight();
    initObject();
    initThree();
    animate();
}
function initThree() {
    renderer = new THREE.WebGLRenderer({antialias: false});
    renderer.setSize(w, h);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    clock = new THREE.Clock();
    window.addEventListener('resize', onWindowResize, false);
}
function initScene() {
    scene = new THREE.Scene();
}

function initLight() {
    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set( 200, 200, 1000 ).normalize();
    scene.add(directionalLight);
}

function initCamera() {
    camera = new THREE.PerspectiveCamera(60, w / h, 0.01, 1000);
    camera.position.z = 0.2;
}
function initObject() {
    const getImageUrl = () => {
        return new URL(`../model/vkt/bunny.vtk`, import.meta.url).href;
    }
    const material = new THREE.MeshLambertMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    const loader = new VTKLoader();
    loader.load(getImageUrl(), function (geometry) {
        // 通过面片法向量的平均值计算每个顶点的法向量。
        geometry.computeVertexNormals();
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.setY(- 0.09);
        scene.add(mesh);
    });
}

function animate() {
    const time = clock.getElapsedTime();
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
    controls.update();
};
function onWindowResize() {
    w = window.innerWidth;
    h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);


}