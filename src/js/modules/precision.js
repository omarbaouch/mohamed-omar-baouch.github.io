import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

// The original Blender model is rendered locally: no iframe or external service.
export async function createPrecisionScene(host) {
  const renderer = new THREE.WebGLRenderer({ alpha:true, antialias:true, powerPreference:'low-power' });
  let disposed=false, raf=0, running=false, phase=Math.acos(-.4), last=0, pointerX=0, pointerY=0;
  let observer;
  let environment;
  const scene = new THREE.Scene();
  const slider=host.querySelector('input[type="range"]');
  const camera = new THREE.PerspectiveCamera(32, 4/3, .1, 80);
  camera.position.set(6.5,5.2,10.2);
  camera.lookAt(0,0,0);
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));
  renderer.toneMapping=THREE.AgXToneMapping;
  renderer.toneMappingExposure=1.25;
  renderer.domElement.className='precision-canvas';
  renderer.domElement.setAttribute('aria-hidden','true');
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  environment=pmrem.fromScene(room,.04);
  scene.environment=environment.texture;
  scene.environmentIntensity=1.7;
  room.dispose(); pmrem.dispose();
  const key = new THREE.DirectionalLight(0xd8eaff,4);
  key.position.set(-3,6,5); scene.add(key);
  const rim = new THREE.DirectionalLight(0xffa16a,3);
  rim.position.set(3,3,-5); scene.add(rim);
  let gltf;
  try { gltf=await new GLTFLoader().loadAsync('/motion/precision.glb'); }
  catch(error) { environment.dispose(); renderer.dispose(); throw error; }
  const model=gltf.scene;
  // Lighting and the floor are rebuilt for a seamless web composition.
  const floor=model.getObjectByName('Infinite_studio_floor');
  if(floor) floor.visible=false;
  model.traverse(o=>{ if(o.name==='Infinite studio floor') o.visible=false; });
  scene.add(model);
  const names=['Rear flange','Bearing housing','Copper rotor','Turbine wheel','Front locking collar'];
  const groups=names.map(name=>model.getObjectByName(name.replaceAll(' ','_')) || model.getObjectByName(name));
  if(groups.some(o=>!o)) {
    environment.dispose(); renderer.dispose();
    throw new Error('Incomplete precision model');
  }
  const draw=(opening)=>{
    groups.forEach((g,i)=>{
      g.position.x=(i-2)*(.44+.84*opening);
      g.rotation.x=i===3 ? phase*.7 : .12*Math.sin(phase);
    });
    camera.position.x=6.5+pointerX*.6;
    camera.position.y=5.2+pointerY*.35;
    camera.lookAt(0,0,0);
    renderer.render(scene,camera);
  };
  let opening=.7;
  const resize=()=>{
    if(disposed) return;
    const {width,height}=host.getBoundingClientRect();
    if(!width || !height) return;
    renderer.setSize(width,height,false);
    camera.aspect=width/height; camera.updateProjectionMatrix(); draw(opening);
  };
  host.append(renderer.domElement);
  observer=new ResizeObserver(resize); observer.observe(host); resize();
  const tick=now=>{
    if(!running || disposed) return;
    phase+=Math.min((now-last)/1000,.05)*Math.PI/4;
    last=now;
    opening=(1-Math.cos(phase))/2;
    if(slider) slider.value=String(Math.round(opening*100));
    draw(opening);
    host.style.setProperty('--film-progress',opening);
    raf=requestAnimationFrame(tick);
  };
  const pause=()=>{ running=false;cancelAnimationFrame(raf); };
  const dispose=()=>{
    if(disposed) return;
    pause();disposed=true;observer.disconnect();environment.dispose();
    model.traverse(o=>{
      o.geometry?.dispose();
      const materials=Array.isArray(o.material)?o.material:[o.material];
      materials.forEach(m=>m?.dispose());
    });
    renderer.dispose();renderer.domElement.remove();
  };
  renderer.domElement.addEventListener('webglcontextlost',event=>{
    event.preventDefault();pause();host.dispatchEvent(new Event('precisionlost'));
  });
  return {
    play(){ if(running||disposed)return;running=true;last=performance.now();raf=requestAnimationFrame(tick); },
    pause,
    seek(value){pause();opening=value;phase=Math.acos(1-2*value);draw(value);host.style.setProperty('--film-progress',value);},
    point(x,y){pointerX=x;pointerY=y;},
    dispose
  };
}
