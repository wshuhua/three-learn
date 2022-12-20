/*
 * @Descripttion: 
 * @version: 
 * @Author: wangshuhua
 * @Date: 2022-12-20 11:32:39
 * @LastEditors: wangshuhua
 * @LastEditTime: 2022-12-20 12:38:37
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import UV_Grid_Sm from '../img/UV_Grid_Sm.jpg';
import t2 from '../img/t1.jpg';

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
    directionalLight.position.set(0, 0, 2);
    scene.add(directionalLight);
}

function initCamera() {
    camera = new THREE.PerspectiveCamera(60, w / h, 1, 3000);
    camera.position.z = 3;
}
function initObject() {
    const texture = new THREE.Texture();
    const texture2 = new THREE.Texture();
    const manage = new THREE.LoadingManager();
    manage.onProgress = function (item, loaded, total) {
        console.log(item, loaded, total);
    };
    const loader = new THREE.ImageLoader(manage);

    loader.load(UV_Grid_Sm, function (image) {
        texture.image = image;
        texture.needsUpdate = true;
    }, function (event) {
        console.log(event, '-----');
    });
    loader.load(t2, function (image) {
        texture2.image = image;
        texture2.needsUpdate = true;
    }, function (event) {
        console.log(event, '-----');
    });
    const objLoader = new OBJLoader(manage);
    const getImageUrl = (url) => {
        return new URL(url, import.meta.url).href;
    }
    var onProgress = function (xhr) {
        if (xhr.lengthComputable) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log(Math.round(percentComplete, 2) + '% downloaded');
        }
    };

    var onError = function (xhr) {
    };

    objLoader.load(getImageUrl('../model/obj/female02/female02.obj'), function (object) {
        object.traverse(function (child) {

            if (child instanceof THREE.Mesh) {
                child.material.map = texture;
            }
        });
        object.position.set(-20, -20, -400);
        scene.add(object);
    }, onProgress, onError)

    objLoader.load(getImageUrl('../model/obj/male02/male02.obj'), function (object) {
        object.traverse(function (child) {

            if (child instanceof THREE.Mesh) {
                child.material.map = texture;
            }
        });
        object.position.set(20, -90, -200);
        scene.add(object);
    }, onProgress, onError)

    objLoader.load(getImageUrl('../model/obj/walt/WaltHead.obj'), function (object) {

        object.position.set(-100, -20, -400);
        scene.add(object);
    }, onProgress, onError)

    objLoader.load(getImageUrl('../model/obj/tree.obj'), function (object) {
        object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.material.map = texture2;
            }
        })
        object.position.set(2, 0, -2);
        scene.add(object);
    }, onProgress, onError)

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