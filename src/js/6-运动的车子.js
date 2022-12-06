/*
 * @Descripttion: 
 * @version: 
 * @Author: wangshuhua
 * @Date: 2022-12-06 16:07:56
 * @LastEditors: wangshuhua
 * @LastEditTime: 2022-12-06 16:10:13
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';

const scene = new THREE.Scene();
const stats = new Stats();
const material = new THREE.MeshNormalMaterial();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 0, 5);
camera.lookAt(0, 0, 0)

// 整个汽车
const car = new THREE.Group();

// 车身
const body = new THREE.Group();

const bodyCube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 2, 0.5),
    material
);

body.add(bodyCube1);

const bodyCube2 = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.5, 0.5),
    new THREE.MeshBasicMaterial(),
);
bodyCube2.position.z = 0.5;
body.add(bodyCube2);

car.add(body);

const wheelGroup1 = new THREE.Group();
const wheel1 = new THREE.Mesh(
    new THREE.BoxGeometry(0.1, 0.7, 0.7),
    material
)
wheelGroup1.position.set(-0.7, 0.6, 0)
wheelGroup1.add(wheel1);

const wheelGroup2 = new THREE.Group();
const wheel2 = new THREE.Mesh(
    new THREE.BoxGeometry(0.1, 0.7, 0.7),
    material
)
wheelGroup2.position.set(0.7, 0.6, 0)
wheelGroup2.add(wheel2);



const wheelGroup3 = new THREE.Group();
const wheel3 = new THREE.Mesh(
    new THREE.BoxGeometry(0.1, 0.7, 0.7),
    material
)
wheelGroup3.position.set(0.7, -0.6, 0)
wheelGroup3.add(wheel3);


const wheelGroup4 = new THREE.Group();
const wheel4 = new THREE.Mesh(
    new THREE.BoxGeometry(0.1, 0.7, 0.7),
    material
)
wheelGroup4.position.set(-0.7, -0.6, 0)
wheelGroup4.add(wheel4);

car.add(wheelGroup1);
car.add(wheelGroup2);
car.add(wheelGroup3);
car.add(wheelGroup4);

scene.add(car);

// 轮胎

const circle = new THREE.Group();
let n = 20;
for (let i = 0; i < n; i++) {
    let r = 0.5;
    const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.2);
    const mesh = new THREE.Mesh(
        geometry,
        material
    );
    mesh.position.x = r * Math.cos(Math.PI * 2 / n * i);
    mesh.position.y = r * Math.sin(Math.PI * 2 / n * i);
    circle.add(mesh);
}
circle.rotation.y = -0.5 * Math.PI;
wheelGroup1.add(circle);
wheelGroup2.add(circle.clone());
wheelGroup3.add(circle.clone());
wheelGroup4.add(circle.clone());

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
    wheelGroup1.rotation.x = time;
    wheelGroup2.rotation.x = time;
    wheelGroup3.rotation.x = time;
    wheelGroup4.rotation.x = time;
    car.position.y = time % 2;

    requestAnimationFrame(animation);
    renderer.render(scene, camera);
    stats.update();
    orbitControls.update();
}
animation();
