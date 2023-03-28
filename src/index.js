import * as THREE from "three";
import './sass/main.scss'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
 
gsap.registerPlugin( ScrollTrigger, ScrollToPlugin );

import "./assets/iphone.glb";
import "./assets/back.jpg"
//scene
const scene = new THREE.Scene();

//scene.background = new THREE.Color(0xdddddd);

//sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//light
const light = new THREE.PointLight(0xffeecf, 4, 100);
light.position.set(10, 10, 10);
scene.add(light);

//set up camera//field of vew-how much can see,
const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height);
camera.position.z = 20;
scene.add(camera);

//paint it on canvas
//rendere
const canvas = document.querySelector(".webgl");

const renderer = new THREE.WebGLRenderer({ 
  canvas : canvas,
  alpha:true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(10);
renderer.render(scene, camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = false;
controls.autoRotateSpeed = 50;

//resize
window.addEventListener("resize", () => {
  //update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  //update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

//loader
let loader = new GLTFLoader();
//let car;

//gsap.registerPlugin("ScrollTrigger")
loader.load("iphone.glb", (glb) => {
  console.log(glb);
  let iphone = glb.scene.children[0];
  iphone.scale.set(10, 10, 10);
  scene.add(glb.scene);
  renderer.render(scene, camera);
  //  animate();
  // iphone.rotation.x = 3.14*2.5;
  // iphone.rotation.y= 3.14*1.5;
  // iphone.scale.set(50,50,50);
 const tl= gsap.timeline({
  scrollTrigger:{
    trigger:".s2",
    endTrigger:".s6",
    scrub:1,
    start:"top top",
    end:"bottom bottom"
  }
 });
 tl.fromTo(iphone.position ,{x:100},{x:0}).
 to(iphone.rotation, {z:3.14}).
 to(iphone.rotation,{ y:3.14*0.5,},"sametime").
 to(iphone.scale, {x:12,y:12,z:12},"sametime").
 to(iphone.rotation,{y:0,z:0},"sametime1").
 to(iphone.scale,{x:10,y:10,z:10},"sametime1").
 to(iphone.position,{x:10}).
 to(iphone.position,{x:0},"sametime2").
 to(iphone.rotation,{y:3.14*0.5,z:3.14*0.5,x:3.14*2},"sametime2").
 to(iphone.scale,{x:50,y:50,z:50})
});
//3d model
const loop = () => {
  controls.update();
  //mesh.position.x += 0.2;
  // mesh.rotation+= 2
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};
loop();

//gsap.fromTo(".webgl",{scale:0},{scale:1.5,duration:5});
