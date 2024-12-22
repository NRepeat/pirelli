import * as THREE from 'three'
import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { LayerMaterial, Color, Depth } from 'lamina'
import { AccumulativeShadows, Environment, Lightformer, OrbitControls, PerformanceMonitor, RandomizedLight } from "@react-three/drei"
import TierInfoTab from "./tier-info-tab"
import { tier_buttons } from "../assets/tier-data"
import TierButtonType from "./tier-button-type"
import useCanvasStore from "../store/canvas"
import Porsches from "./Porche/Proche"
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";

const MainCanvas = () => {
	const [active, setActive] = useState<'prev' | 'next' | null>(
		null
	)
	const canvasState = useCanvasStore((state) => state)

	const changeNextModel = () => {
		setActive('next')
	};
	const changePrevModel = () => {
		setActive('prev')
	};
	const handleOrbitControlRotationStart = () => {
		canvasState.setOrbitControlBehavior(true)
	}

	const handleOrbitControlRotationStop = () => {
		canvasState.setOrbitControlBehavior(false)
	}

	return (
		<div className="canvas relative">
			<div className="bg-gray-800/20 absolute top-0 text-white z-20 p-4 w-[420px]">
				<h1 className="font-semibold text-2xl cursor-pointer" onClick={() => canvasState.setDefaultAnimation()}>
					Porsche 911 Carrera 4S
				</h1>
				<div className="flex gap-2 underline cursor-pointer">

					{Object.keys(tier_buttons).map(key => <TierButtonType key={key} defaultAnimation={tier_buttons[key].defaultAnimation} textValue={tier_buttons[key].textValue} position={tier_buttons[key].position} tab={tier_buttons[key].tab} />)}
				</div>

			</div>
			<button onClick={changeNextModel} className="bg-gray-800/20 absolute e top-1/2 left-0 text-white z-20">
				< MdOutlineNavigateBefore className="w-12 h-12" />
			</button>
			<button onClick={changePrevModel} className="bg-gray-800/20 absolute top-1/2   right-0 text-white z-20">
				<MdOutlineNavigateNext className="w-12 h-12" />
			</button>
			{canvasState.tierTab && <TierInfoTab value={canvasState.tierTab} />
			}
			<Canvas shadows camera={{ position: canvasState.cameraPosition, fov: 30 }} dpr={[1, 12]}  >
				<OrbitControls onStart={handleOrbitControlRotationStart} onEnd={handleOrbitControlRotationStop} enableZoom={false} />
				<spotLight position={[1, 12, 3]} angle={2} penumbra={1} castShadow intensity={2} shadow-bias={-0.02} />
				<ambientLight intensity={12} />
				<Porsches isActive={active} setIsActive={setActive} />
				<AccumulativeShadows position={[0, -1.14, 0]} frames={100} alphaTest={1} scale={30}>
					<RandomizedLight amount={2} radius={21} ambient={21} position={[12, 52, -12]} />
				</AccumulativeShadows>
				{/** PerfMon will detect performance issues */}
				<PerformanceMonitor />
				{/* Renders contents "live" into a HDRI environment (scene.environment). */}
				<Environment frames={Infinity} resolution={156} background blur={1}>
					<Lightformers />
				</Environment>
				<CameraRig position={canvasState.cameraPosition} defaultAnimation={canvasState.defaultAnimation} orbitControlBehavior={canvasState.orbitControlBehavior} />
			</Canvas>
		</div>
	)
}


function CameraRig({ position: [targetX, targetY, targetZ], defaultAnimation, orbitControlBehavior }: { position: THREE.Vector3, defaultAnimation: boolean, orbitControlBehavior: boolean }) {

	const frame = useFrame((state) => {
		if (!orbitControlBehavior) {
			if (defaultAnimation) {
				const v = new THREE.Vector3()
				const t = state.clock.elapsedTime
				state.camera.position.lerp(v.set(Math.sin(t / 5), 0, 12 + Math.cos(t / 5) / 2), 0.05)
				state.camera.lookAt(0, 0, 0)
				return
			}
			const camera = state.camera
			const x = THREE.MathUtils.damp(
				camera.position.x,
				targetX,
				4,
				0.1
			);
			const y = THREE.MathUtils.damp(
				camera.position.y,
				targetY,
				4,
				0.1
			);
			const z = THREE.MathUtils.damp(
				camera.position.z,
				targetZ,
				4,
				0.1
			);
			camera.position.lerp({ x, y, z }, 0.1)

			camera.lookAt(0, 0, 0)
		}

	})


	return frame
}
function Lightformers({ positions = [0, 0, 3, 0, 0, 0, 0, 0] }) {
	const group = useRef<THREE.Group<THREE.Object3DEventMap>>(null)

	useFrame((_, delta) => {
		if (group.current) {
			if (group.current.position)
				return (group.current.position.z += delta * 10) > 20 && (group.current.position.z = -60)
		}
	})

	return (
		<>
			<Lightformer intensity={0.75} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
			<group rotation={[0, 0.5, 0]}>
				<group ref={group}>
					{positions.map((x, i) => (
						<Lightformer key={i} form="circle" intensity={10} rotation={[Math.PI / 2, 0, 0]} position={[x, 4, i * 4]} scale={[3, 1, 1]} />
					))}
				</group>
			</group>
			{/* Sides */}
			<Lightformer intensity={12} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[20, 0.1, 1]} />
			<Lightformer rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[20, 0.5, 1]} />
			<Lightformer rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 1, 1]} />
			{/* Accent (red) */}

			{/* Background */}
			<mesh scale={100}>
				<sphereGeometry args={[1, 64, 64]} />
				<LayerMaterial side={THREE.BackSide}>
					<Color color="#002e15" alpha={1} mode="darken" />
					<Depth colorA="#ffffff" colorB="black" alpha={0.5} mode="normal" near={10} far={400} origin={[100, 100, 100]} />
				</LayerMaterial>
			</mesh>
		</>
	)
}
export default MainCanvas

