/*
 * @Descripttion: 
 * @version: 
 * @Author: wangshuhua
 * @Date: 2022-12-07 09:55:06
 * @LastEditors: wangshuhua
 * @LastEditTime: 2022-12-14 10:31:27
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const colors = {
    road: 0x4c4a4b,
    line: 0xffffff,
    cloud: 0xffffff,
    frontGrass: 0x61974b,
    backGrass: 0xb1d744,
    tree: 0x64a525,
    post: 0x7a5753,
    build: 0x75d1c2,
    background: 0x95e4e8,
    shadow: 0x3f662d
}
const w = window.innerWidth;
const h = window.innerHeight;

const groundW = 50;
const groundH = 10;


let scene, camera, ambientLight, renderer, controls, clock;
let cloudGroup, cloudGroup1, treeGroup
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
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(w, h);
    renderer.setClearColor(colors.background);
    document.body.appendChild(renderer.domElement);
    controls = new OrbitControls(camera, renderer.domElement);
    clock = new THREE.Clock();
}
function initScene() {
    scene = new THREE.Scene();
}

function initLight() {
    // light
    ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);
}

function initCamera() {
    camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.set(0, 0.2, 5);
    camera.lookAt(0, 0, 0);
}

function initObject() {

    // 地面
    const groundGroup = new THREE.Group();

    const roadGroup = new THREE.Group();

    const planeGeometry = new THREE.PlaneGeometry(2, groundH);
    const planeMaterial = new THREE.MeshStandardMaterial({
        color: colors.road,
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);

    const leftLineMaterial = new THREE.MeshStandardMaterial({
        color: colors.line,
    });
    const leftLine = new THREE.Mesh(
        new THREE.PlaneGeometry(0.1, groundH),
        leftLineMaterial
    );
    leftLine.position.z = 0.001;
    leftLine.position.x = -0.6;

    const rightLine = leftLine.clone();
    rightLine.position.z = 0.001;
    rightLine.position.x = 0.6;

    const dashGroup = new THREE.Group();

    let total = 21;
    for (let i = 0; i < total; i++) {
        const dash = new THREE.Mesh(
            new THREE.PlaneGeometry(0.1, 0.3),
            new THREE.MeshStandardMaterial({ color: colors.line }),
        )
        dash.position.z = 0.001;
        dash.position.y = - 0.5 * groundH + 0.5 * i;
        dashGroup.add(dash);
    }
    // 树木

    treeGroup = new THREE.Group();
    const leftTreeGroup = new THREE.Group();
    const singleTreeGroup = new THREE.Group();

    const topTree = new THREE.Mesh(
        new THREE.ConeGeometry(0.2, 0.3, 5),
        new THREE.MeshStandardMaterial({ color: colors.tree }),
    )

    const middleTree = new THREE.Mesh(
        new THREE.ConeGeometry(0.3, 0.4, 5),
        new THREE.MeshStandardMaterial({ color: colors.tree }),
    )
    const bottomTree = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.05, 0.2),
        new THREE.MeshStandardMaterial({ color: colors.post }),
    )
    const treeShadow = new THREE.Mesh(
        new THREE.CircleGeometry(0.3, 5),
        new THREE.MeshStandardMaterial({ color: colors.shadow }),
    );
    bottomTree.position.y = 0.1;
    middleTree.position.y = 0.4;
    topTree.position.y = 0.6;

    treeShadow.position.y = 0.001;
    treeShadow.rotation.x = -0.5 * Math.PI
    singleTreeGroup.add(topTree, middleTree, bottomTree, treeShadow);
    singleTreeGroup.scale.set(0.6, 0.6, 0.6)

    const treeNom = 11;
    for (let i = 0; i < treeNom; i++) {
        const tree = singleTreeGroup.clone();
        tree.position.z = -0.5 * groundH + i * 1;
        tree.position.x = 0.001;
        leftTreeGroup.add(tree);
    }
    leftTreeGroup.position.x = - 1.2;

    const rightTreeGroup = leftTreeGroup.clone();
    rightTreeGroup.position.x = 1.2;
    treeGroup.add(leftTreeGroup, rightTreeGroup);

    // 草地
    const frontGrass = new THREE.Mesh(
        new THREE.PlaneGeometry(groundW, groundH / 2),
        new THREE.MeshStandardMaterial({
            color: colors.frontGrass,
        })
    );
    frontGrass.position.z = -0.001;
    frontGrass.position.y = groundH / 4;

    const backGrass = new THREE.Mesh(
        new THREE.PlaneGeometry(groundW, groundH / 2),
        new THREE.MeshStandardMaterial({
            color: colors.backGrass,
        })
    );
    backGrass.position.z = -0.001;
    backGrass.position.y = - groundH / 4;
    // 楼宇
    const buildGroup = new THREE.Group();
    const buildTotal = 20;
    for (let i = 0; i < buildTotal; i++) {
        const width = Math.random() + 0.5;
        const height = Math.random() + 1;
        const depth = Math.random();
        const build = new THREE.Mesh(
            new THREE.BoxGeometry(width, height, depth),
            new THREE.MeshStandardMaterial({
                color: colors.build,
            })
        );
        build.position.z = - groundH / 2;
        build.position.y = height / 2;
        build.position.x = - groundW / 2 + 2 * i + (Math.random() - 0.5) * 5;
        buildGroup.add(build);
    }

    // 白云
    cloudGroup = new THREE.Group();
    const cloud1 = new THREE.Mesh(
        new THREE.SphereGeometry(0.4),
        new THREE.MeshBasicMaterial({ color: colors.cloud }),
    )
    const cloud2 = new THREE.Mesh(
        new THREE.SphereGeometry(0.6),
        new THREE.MeshBasicMaterial({ color: colors.cloud }),
    )
    const cloud3 = new THREE.Mesh(
        new THREE.SphereGeometry(0.5),
        new THREE.MeshBasicMaterial({ color: colors.cloud }),
    )
    const cloud4 = new THREE.Mesh(
        new THREE.SphereGeometry(0.3),
        new THREE.MeshBasicMaterial({ color: colors.cloud }),
    )
    cloud1.position.x = -1.4;
    cloud1.position.y = 0.1;
    cloud2.position.x = -0.9;
    cloud3.position.x = -0.3;
    cloud4.position.x = 0.1;
    cloudGroup.add(cloud1, cloud2, cloud3, cloud4);
    cloudGroup.position.z = - groundH / 2 - 1;
    cloudGroup.position.y = 2.5;

    cloudGroup1 = cloudGroup.clone();

    cloudGroup1.position.x = 4;
    cloudGroup1.position.y = 2.5;
    cloudGroup1.scale.set(0.5, 0.5, 0.5);
    roadGroup.add(plane, leftLine, rightLine, dashGroup)
    groundGroup.add(roadGroup, frontGrass, backGrass);
    groundGroup.rotation.x = -0.5 * Math.PI;
    scene.add(groundGroup, treeGroup, buildGroup, cloudGroup, cloudGroup1);
}

function animate() {
    const time = clock.getElapsedTime();
    requestAnimationFrame(animate);

    cloudGroup.position.x = Math.sin(time * 0.1) * 7
    cloudGroup1.position.x = Math.sin(time / 2) + 4;
    treeGroup.position.z = time * 0.2

    renderer.render(scene, camera);
    controls.update();
};