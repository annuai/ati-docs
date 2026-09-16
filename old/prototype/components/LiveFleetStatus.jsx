import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const routeSets = [
  [[-19,-30],[-19,-6],[-14,-6],[-14,18],[-8,18]],
  [[-8,18],[-2,18],[-2,4],[4,4]],
  [[-2,4],[-2,-12],[6,-12],[6,22],[14,22]],
  [[11,-20],[11,3],[5,3]]
];
const stationData = [[-19,-6,'S100'],[-14,18,'S101'],[-2,4,'S102'],[4,4,'S103'],[6,22,'S104'],[11,-20,'S105']];
const robotPaths = [
  [[-19,-6],[-14,-6],[-14,18],[-8,18],[-2,18],[-2,4],[4,4]],
  [[-2,-12],[-2,4],[4,4],[4,-20],[11,-20]],
  [[11,-20],[11,3]],
  [[6,22],[14,22]]
];

export function LiveFleetStatus({ robots, selectedRobot, onSelectRobot, paused, onPause }) {
  const [showLayers, setShowLayers] = useState(false);
  const [materialQuery, setMaterialQuery] = useState('');
  return (
    <section className="content">
      <div className="content-head">
        <div className="content-title">Live Fleet Status</div>
        <div className="head-actions">
          <label className="control-field material-search">
            <span>⌕</span><input value={materialQuery} onChange={e => setMaterialQuery(e.target.value)} type="search" placeholder="Search Material" aria-label="Search material" />
          </label>
          <button className={`control-field layer-button ${showLayers ? 'selected' : ''}`} type="button" onClick={() => setShowLayers(v => !v)}>
            <span>Show Layers</span><span>⌄</span>
          </button>
        </div>
      </div>

      <div className="workspace">
        <FacilityMap robots={robots} selectedRobotId={selectedRobot.id} onSelectRobot={onSelectRobot} paused={paused} />
        <RobotDetails robot={selectedRobot} paused={paused} onPause={onPause} />
      </div>
    </section>
  );
}

function FacilityMap({ robots, selectedRobotId, onSelectRobot, paused }) {
  const holderRef = useRef(null);
  const apiRef = useRef(null);
  useEffect(() => {
    const holder = holderRef.current;
    if (!holder) return;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xe9edeb);
    const camera = new THREE.PerspectiveCamera(42, holder.clientWidth / holder.clientHeight, .1, 150);
    camera.position.set(23, 28, 31);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(holder.clientWidth, holder.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    holder.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0); controls.enableDamping = true; controls.dampingFactor = .08;
    controls.maxPolarAngle = Math.PI / 2.08; controls.minDistance = 18; controls.maxDistance = 55;
    scene.add(new THREE.HemisphereLight(0xffffff, 0x8ea39c, 2.5));
    const dl = new THREE.DirectionalLight(0xffffff, 2.4); dl.position.set(20, 32, 18); dl.castShadow = true; dl.shadow.mapSize.set(2048, 2048); scene.add(dl);
    const floorMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: .92 });
    const wallMat = new THREE.MeshStandardMaterial({ color: 0x44534e, roughness: .78 });
    const innerMat = new THREE.MeshStandardMaterial({ color: 0x73817c, roughness: .84 });
    const shelfMat = new THREE.MeshStandardMaterial({ color: 0xd9dfdc, roughness: .8 });
    const routeMat = new THREE.MeshStandardMaterial({ color: 0x159a8d, emissive: 0x0a7168, emissiveIntensity: .45, roughness: .4 });
    const yellowMat = new THREE.MeshStandardMaterial({ color: 0xf4c63d, roughness: .45, metalness: .08 });
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(48, 72), floorMat); floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor);
    const grid = new THREE.GridHelper(48, 24, 0xdde5e2, 0xe8eeeb); grid.position.y = .006; scene.add(grid);
    const box = (x,z,w,d,h,mat=wallMat) => { const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat); m.position.set(x,h/2,z); m.castShadow=true; m.receiveShadow=true; scene.add(m); return m; };
    const wall = (x,z,w,d,h=2.4,mat=wallMat) => box(x,z,w,d,h,mat);
    const pathSeg = (a,b,width=.38) => { const av=new THREE.Vector3(a[0],.05,a[1]), bv=new THREE.Vector3(b[0],.05,b[1]); const mid=av.clone().add(bv).multiplyScalar(.5), len=av.distanceTo(bv); const m=new THREE.Mesh(new THREE.BoxGeometry(width,.08,len),routeMat); m.position.copy(mid); m.rotation.y=Math.atan2(bv.x-av.x,bv.z-av.z); scene.add(m); };
    wall(0,-35,46,.5); wall(0,35,46,.5); wall(-23,0,.5,70); wall(23,0,.5,70);
    wall(-8,0,.35,57,2.1,innerMat); wall(6,0,.35,55,2.1,innerMat); wall(15.5,0,.35,59,2.1,innerMat);
    wall(10,-27,10,.35,2.1,innerMat); wall(14,-23,.35,8,2.1,innerMat); wall(9,-23,.35,7,2.1,innerMat);
    wall(-12,29,20,.35,2.1,innerMat); wall(1,29,14,.35,2.1,innerMat);
    for(let z=-27;z<=25;z+=5.8){box(-17,z,3.5,1.1,.72,shelfMat);box(-12.8,z+.8,1.1,3.6,1.25,innerMat)}
    for(let z=-25;z<=23;z+=7.5){box(-4.8,z,1.3,4.8,.65,shelfMat);box(-1.7,z+1,1.3,3.2,.65,shelfMat)}
    for(let z=-22;z<=22;z+=8){wall(19,z,7,.3,2.1,innerMat);box(18,z-2,4.3,2.1,.7,shelfMat)}
    [[0,-10,3,1.4],[2,-1,2.6,1.3],[0,8,4.3,1.4],[3,15,2,1.1],[10,7,2,4],[10,18,3,1.2],[-2,23,3.2,1.2]].forEach(a=>box(...a,.72,shelfMat));
    routeSets.forEach(r=>r.slice(0,-1).forEach((p,i)=>pathSeg(p,r[i+1])));
    stationData.forEach(([x,z])=>{ const ring=new THREE.Mesh(new THREE.CylinderGeometry(.62,.62,.1,28),new THREE.MeshStandardMaterial({color:0x159a8d,emissive:0x0b776d,emissiveIntensity:.35})); ring.position.set(x,.1,z);scene.add(ring); const core=new THREE.Mesh(new THREE.CylinderGeometry(.28,.28,.13,20),new THREE.MeshStandardMaterial({color:0xffffff})); core.position.set(x,.16,z);scene.add(core); });
    const robotObjects=[];
    robots.forEach((r,i)=>{
      const g=new THREE.Group();
      const body=new THREE.Mesh(new THREE.BoxGeometry(1.35,.58,1.65),yellowMat); body.position.y=.62; body.castShadow=true; g.add(body);
      const cabin=new THREE.Mesh(new THREE.BoxGeometry(.86,.34,.75),new THREE.MeshStandardMaterial({color:0x29332f,roughness:.45})); cabin.position.y=1.07; g.add(cabin);
      const sensor=new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.18,20),new THREE.MeshStandardMaterial({color:0x17a79a,emissive:0x0b7169,emissiveIntensity:.8})); sensor.position.y=1.33; g.add(sensor);
      const wg=new THREE.CylinderGeometry(.22,.22,.18,16), wm=new THREE.MeshStandardMaterial({color:0x232927});
      [[-.72,.31,-.52],[.72,.31,-.52],[-.72,.31,.52],[.72,.31,.52]].forEach(([x,y,z])=>{const w=new THREE.Mesh(wg,wm);w.rotation.z=Math.PI/2;w.position.set(x,y,z);g.add(w)});
      let halo=null;
      if(r.status==='Blocked'){ halo=new THREE.Mesh(new THREE.TorusGeometry(1.5,.09,10,48),new THREE.MeshBasicMaterial({color:0xf05a5a,transparent:true,opacity:.75})); halo.rotation.x=Math.PI/2;halo.position.y=.08;g.add(halo); }
      g.userData={id:r.id,status:r.status,path:robotPaths[i].map(p=>new THREE.Vector3(p[0],.35,p[1])),seg:0,t:0,phase:'move',pause:0,halo};
      g.position.copy(g.userData.path[0]); scene.add(g); robotObjects.push(g);
    });
    apiRef.current={camera,controls,renderer,holder,reset:()=>{camera.position.set(23,28,31);controls.target.set(0,0,0)},zoom:(n)=>camera.position.multiplyScalar(n)};
    let raf;
    const clock=new THREE.Clock();
    const angleDelta=(a,b)=>{let d=(b-a+Math.PI)%(Math.PI*2)-Math.PI;return d};
    const updateRobot=(r,dt,time)=>{const d=r.userData;if(d.halo){d.halo.material.opacity=.28+.55*(.5+.5*Math.sin(time*5));d.halo.scale.setScalar(1+.12*(.5+.5*Math.sin(time*5)));} if(paused||d.status!=='Moving'||d.path.length<2)return; const a=d.path[d.seg],b=d.path[d.seg+1]; if(d.phase==='move'){const dir=b.clone().sub(a);const dist=dir.length();dir.normalize();d.t+=.78*dt/dist;r.position.lerpVectors(a,b,Math.min(d.t,1));const target=Math.atan2(dir.x,dir.z);r.rotation.y+=angleDelta(r.rotation.y,target)*Math.min(1,dt*2.2);if(d.t>=1){d.t=0;if(d.seg<d.path.length-2){d.phase='pause';d.pause=1.1}else{d.seg=0;d.phase='pause';d.pause=.8}}}else{d.pause-=dt;if(d.pause<=0){d.seg=(d.seg+1)%(d.path.length-1);d.phase='turn';d.turnTarget=Math.atan2(d.path[d.seg+1].x-d.path[d.seg].x,d.path[d.seg+1].z-d.path[d.seg].z)}}if(d.phase==='turn'){const diff=angleDelta(r.rotation.y,d.turnTarget);r.rotation.y+=Math.sign(diff)*Math.min(Math.abs(diff),dt*1.35);if(Math.abs(diff)<.03)d.phase='move'}};
    const ray=new THREE.Raycaster(),mouse=new THREE.Vector2();
    const onPointer=(e)=>{const rect=renderer.domElement.getBoundingClientRect();mouse.x=((e.clientX-rect.left)/rect.width)*2-1;mouse.y=-((e.clientY-rect.top)/rect.height)*2+1;ray.setFromCamera(mouse,camera);const hits=ray.intersectObjects(robotObjects,true);if(hits.length){let o=hits[0].object;while(o.parent&&!robotObjects.includes(o))o=o.parent;if(robotObjects.includes(o))onSelectRobot(o.userData.id)}};
    renderer.domElement.addEventListener('pointerdown',onPointer);
    const resize=()=>{camera.aspect=holder.clientWidth/holder.clientHeight;camera.updateProjectionMatrix();renderer.setSize(holder.clientWidth,holder.clientHeight)};
    const observer=new ResizeObserver(resize); observer.observe(holder);
    const animate=()=>{raf=requestAnimationFrame(animate);const dt=Math.min(clock.getDelta(),.05),t=clock.elapsedTime;robotObjects.forEach(r=>updateRobot(r,dt,t));controls.update();renderer.render(scene,camera)}; animate();
    return ()=>{cancelAnimationFrame(raf);observer.disconnect();renderer.domElement.removeEventListener('pointerdown',onPointer);controls.dispose();renderer.dispose();holder.removeChild(renderer.domElement);apiRef.current=null};
  }, [robots, paused, onSelectRobot]);
  return (
    <section className="map-card" aria-label="Interactive 3D facility map">
      <div ref={holderRef} id="scene" />
      <div className="map-chip"><strong>3D LIVE MAP</strong> · Zone 24 · {robots.length} robots online</div>
      <div className="map-legend">
        <LegendItem type="route" label="Active path" />
        <LegendItem type="yellow" label="Moving" />
        <LegendItem type="red" label="Blocked" />
        <LegendItem type="green" label="Station" />
      </div>
      <div className="map-tools">
        <button className="map-tool" type="button" title="Reset view" aria-label="Reset view" onClick={() => apiRef.current?.reset()}>⌂</button>
        <button className="map-tool" type="button" aria-label="Zoom in" onClick={() => apiRef.current?.zoom(.88)}>＋</button>
        <button className="map-tool" type="button" aria-label="Zoom out" onClick={() => apiRef.current?.zoom(1.12)}>−</button>
      </div>
      <div className="map-selection">Selected · {selectedRobotId}</div>
    </section>
  );
}

function LegendItem({type,label}) { return <div className="legend-item"><span className={`legend-mark ${type}`} /><span>{label}</span></div>; }

function RobotDetails({ robot, paused, onPause }) {
  const blocked = robot.status === 'Blocked';
  return (
    <aside className="details" aria-label="Robot details">
      <div className="details-top">
        <div className={`status-pill ${blocked ? 'blocked' : ''}`}><i /> <span>{robot.status}</span></div>
        <button className="close-button" type="button" aria-label="Close robot details">×</button>
      </div>
      <div className="robot-visual"><img className="robot-image" src="/assets/ati-sherpa.png" alt="ATI autonomous mobile robot" /></div>
      <div className="robot-heading"><div><div className="eyebrow">Robot</div><h2>{robot.id}</h2></div><div className="robot-state">{robot.status}</div></div>
      <section className="detail-section">
        <h3>Robot Details</h3>
        <div className="kv-row"><span>Battery</span><strong>{robot.battery}%</strong></div>
        <div className="battery-bar"><span style={{width:`${robot.battery}%`}} /></div>
        <div className="kv-row"><span>Current state</span><span>{robot.status}</span></div>
      </section>
      <section className="detail-section">
        <h3>Trip Details</h3>
        <div className="kv-row"><span>Trip ID</span><strong>{robot.id}</strong></div>
        <div className="kv-row"><span>Next Station</span><span>{robot.station}</span></div>
      </section>
      <section className="detail-section">
        <div className="activity-header"><h3>Recent Activity</h3><button className="view-all" type="button">View all</button></div>
        <Activity amber={blocked} event={blocked ? 'Path blocked at S101' : 'Trip progress updated'} time="09:40:10" />
        <Activity event="Slowed down" time="09:37:55" />
        <Activity event={`Trip ${robot.id} assigned`} time="09:35:12" />
      </section>
      <button className="pause-button" type="button" onClick={onPause}>{paused ? '▷ Resume' : 'Ⅱ Pause'}</button>
    </aside>
  );
}

function Activity({amber,event,time}) { return <div className={`activity ${amber?'amber':''}`}><span className="activity-dot" /><div><div className="activity-event">{event}</div><div className="activity-time">{time}</div></div></div>; }
