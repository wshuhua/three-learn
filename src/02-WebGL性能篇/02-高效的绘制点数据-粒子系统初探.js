import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

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
    renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setSize(w, h);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    clock = new THREE.Clock();
    window.addEventListener('resize', onWindowResize, false);
}
function initScene() {
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x050505, 2000, 3500);
}

function initLight() {
    scene.add(new THREE.AmbientLight(0x444444));
    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(200, 200, 1000).normalize();
    scene.add(directionalLight);
}

function initCamera() {
    camera = new THREE.PerspectiveCamera(60, w / h, 1, 3000);
    camera.position.z = 2000;
}
function initObject() {
    const triangles = 500000;

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(triangles * 3 * 3);
    const colors = new Float32Array(triangles * 3 * 3);

    const color = new THREE.Color();

    const n = 800, n2 = n / 2;

    for (let i = 0; i < positions.length; i += 9) {
        //-400 ~ 400
        const x = Math.random() * n - n2;
        const y = Math.random() * n - n2;
        const z = Math.random() * n - n2;

        // 顶点位置
        positions[i] = x;
        positions[i + 1] = y;
        positions[i + 2] = z;


        // colors
        const vx = (x / n) + 0.5;
        const vy = (y / n) + 0.5;
        const vz = (z / n) + 0.5;
        color.setRGB(vx, vy, vz);

        colors[i] = color.r;
        colors[i + 1] = color.g;
        colors[i + 2] = color.b;
    }

    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    geometry.computeBoundingSphere();

    var material = new THREE.PointsMaterial({
        size: 10,
        vertexColors: true
    })
    const mesh = new THREE.Points(geometry, material);
    scene.add(mesh);
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