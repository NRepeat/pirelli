import Porsche from "./Porche/Proche"
import * as THREE from 'three'
import { useLayoutEffect, useRef, useState } from 'react'
import { Canvas, applyProps, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { LayerMaterial, Color, Depth } from 'lamina'
const MainCanvas = () => {
	const [degraded, degrade] = useState(false)
	return (
		<div id="canvas-container">
			<Canvas shadows camera={{ position: [5, 0, 15], fov: 30 }}>
				<spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} castShadow intensity={2} shadow-bias={-0.0001} />
				<ambientLight intensity={0.5} />
				<Porsche scale={1.6} position={[-0.5, -0.18, 0]} rotation={[0, Math.PI / 5, 0]} />

				{/** PerfMon will detect performance issues */}
				{/* Renders contents "live" into a HDRI environment (scene.environment). */}

				<CameraRig />
			</Canvas>
		</div>
	)
}
function CameraRig({ v = new THREE.Vector3() }) {
	return useFrame((state) => {
		const t = state.clock.elapsedTime
		state.camera.position.lerp(v.set(Math.sin(t / 5), 0, 12 + Math.cos(t / 5) / 2), 0.05)
		state.camera.lookAt(0, 0, 0)
	})
}
function Lightformers({ positions = [2, 0, 2, 0, 2, 0, 2, 0] }) {
	const group = useRef()
	useFrame((state, delta) => (group.current.position.z += delta * 10) > 20 && (group.current.position.z = -60))
	return (
		<>
			{/* Ceiling */}
			<Lightformer intensity={0.75} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
			<group rotation={[0, 0.5, 0]}>
				<group ref={group}>
					{positions.map((x, i) => (
						<Lightformer key={i} form="circle" intensity={2} rotation={[Math.PI / 2, 0, 0]} position={[x, 4, i * 4]} scale={[3, 1, 1]} />
					))}
				</group>
			</group>
			{/* Sides */}
			<Lightformer intensity={4} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[20, 0.1, 1]} />
			<Lightformer rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[20, 0.5, 1]} />
			<Lightformer rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 1, 1]} />
			{/* Accent (red) */}
			<Float speed={5} floatIntensity={2} rotationIntensity={2}>
				<Lightformer form="ring" color="red" intensity={1} scale={10} position={[-15, 4, -18]} target={[0, 0, 0]} />
			</Float>
			{/* Background */}
			<mesh scale={100}>
				<sphereGeometry args={[1, 64, 64]} />
				<LayerMaterial side={THREE.BackSide}>
					<Color color="#444" alpha={1} mode="normal" />
					<Depth colorA="blue" colorB="black" alpha={0.5} mode="normal" near={0} far={300} origin={[100, 100, 100]} />
				</LayerMaterial>
			</mesh>
		</>
	)
}
export default MainCanvas

