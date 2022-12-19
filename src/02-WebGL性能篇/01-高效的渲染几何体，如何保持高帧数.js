/*
 * @Descripttion: 
 * @version: 
 * @Author: wangshuhua
 * @Date: 2022-12-07 09:55:06
 * @LastEditors: wangshuhua
 * @LastEditTime: 2022-12-19 22:21:33
 */
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
    scene.fog = new THREE.Fog(0x050505, 2000, 3500);
}

function initLight() {
    scene.add( new THREE.AmbientLight( 0x444444 ) );
    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set( 200, 200, 1000 ).normalize();
    scene.add(directionalLight);
}

function initCamera() {
    camera = new THREE.PerspectiveCamera(60, w / h, 1, 3000);
    camera.position.z = 2000;
}
function initObject() {
   const triangles = 1500000;
   
   const geometry = new THREE.BufferGeometry();
   const positions = new Float32Array(triangles * 3 * 3);
   // 一个顶点一个法线
   const normals = new Float32Array(triangles * 3 * 3);
   const colors = new Float32Array(triangles * 3 * 3);

   const color = new THREE.Color();

   const n = 800, n2 = n / 2;
   const d = 12, d2 = d / 2;

   const pA = new THREE.Vector3();
   const pB = new THREE.Vector3();
   const pC = new THREE.Vector3();

   const cb = new THREE.Vector3();
   const ab = new THREE.Vector3();

   for (let i = 0; i < positions.length; i += 9) {
      //-400 ~ 400
      const x = Math.random() * n - n2;
      const y = Math.random() * n - n2;
      const z = Math.random() * n - n2;

      const ax = x + Math.random() * d - d2;
      const ay = y + Math.random() * d - d2;
      const az = z + Math.random() * d - d2;

      const bx = x + Math.random() * d - d2;
      const by = y + Math.random() * d - d2;
      const bz = z + Math.random() * d - d2;


      const cx = x + Math.random() * d - d2;
      const cy = y + Math.random() * d - d2;
      const cz = z + Math.random() * d - d2;

      // 顶点位置
      positions[i] = ax;
      positions[i + 1] = ay;
      positions[i + 2] = az;

      positions[i + 3] = bx;
      positions[i + 4] = by;
      positions[i + 5] = bz;

      positions[i + 6] = cx;
      positions[i + 7] = cy;
      positions[i + 8] = cz;

      // 法线
      pA.set(ax, ay, az);
      pB.set(bx, by, bz);
      pC.set(cx, cy, cz);

      cb.subVectors(pC, pB); // pC - pB
      ab.subVectors(pA, pB); // pA - pB
      cb.cross(ab); // 将该向量设置为它本身与传入的v的叉积

      cb.normalize(); // 将该向量转换为单位向量（unit vector）， 也就是说，将该向量的方向设置为和原向量相同，但是其长度（length）为1。

      const nx = cb.x;
      const ny = cb.y;
      const nz = cb.z;

      normals[ i ]     = nx;
      normals[ i + 1 ] = ny;
      normals[ i + 2 ] = nz;

      normals[ i + 3 ] = nx;
      normals[ i + 4 ] = ny;
      normals[ i + 5 ] = nz;

      normals[ i + 6 ] = nx;
      normals[ i + 7 ] = ny;
      normals[ i + 8 ] = nz;

      // colors
      const vx = (x / n) + 0.5;
      const vy = (y / n) + 0.5;
      const vz = (z / n) + 0.5;
      color.setRGB(vx, vy, vz);

      colors[ i ]     = color.r;
      colors[ i + 1 ] = color.g;
      colors[ i + 2 ] = color.b;

      colors[ i + 3 ] = color.r;
      colors[ i + 4 ] = color.g;
      colors[ i + 5 ] = color.b;

      colors[ i + 6 ] = color.r;
      colors[ i + 7 ] = color.g;
      colors[ i + 8 ] = color.b;
   }

   geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
   geometry.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
   geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

   geometry.computeBoundingBox();

   var material = new THREE.MeshPhongMaterial({
    color: 0xaaaaaa,
    speechSynthesis: 0xffffff,
    shininess: 250,
    side: THREE.DoubleSide,
    vertexColors: true
   })
   const mesh = new THREE.Mesh( geometry, material );
   scene.add( mesh );
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