/*
 * @Descripttion: 
 * @version: 
 * @Author: wangshuhua
 * @Date: 2022-12-14 11:35:37
 * @LastEditors: wangshuhua
 * @LastEditTime: 2022-12-14 13:56:17
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { VTKLoader } from 'three/examples/jsm/loaders/VTKLoader';
import Stats from 'three/examples/jsm/libs/stats.module'

var container, stats;

var camera, controls, scene, renderer;

var cross;

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.01, 1e10 );
    camera.position.z = 2;

    scene = new THREE.Scene();

    scene.add( camera );

    // light

    var dirLight = new THREE.DirectionalLight( 0xffffff );
    dirLight.position.set( 200, 200, 1000 ).normalize();

    camera.add( dirLight );
    camera.add( dirLight.target );

    var material = new THREE.MeshLambertMaterial( { color:0xffffff, side: THREE.DoubleSide } );
    
    const getImageUrl = () => {
        return new URL(`../model/vkt/bunny.vtk`, import.meta.url).href;
    }
    var loader = new VTKLoader();
    loader.load( getImageUrl(), function ( geometry ) {

        geometry.computeVertexNormals();

        var mesh = new THREE.Mesh( geometry, material );
        mesh.position.setY( - 0.09 );
        scene.add( mesh );

    } );

    // renderer

    // 渲染器锯齿属性 .antialias
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );

    container = document.createElement( 'div' );
    document.body.appendChild( container );
    container.appendChild( renderer.domElement );

    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    container.appendChild( stats.domElement );

    //

    window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );


}

function animate() {

    requestAnimationFrame( animate );

    renderer.render( scene, camera );

    stats.update();

}
