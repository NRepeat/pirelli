import { useGLTF } from "@react-three/drei";
import { applyProps, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Mesh, Vector3 } from "three";
import { Euler, Object3D } from "three";

export function Porsche(props: JSX.IntrinsicElements["group"]) {
	const { scene, nodes, materials } = useGLTF("/911-transformed.glb");
	const clonedScene = useRef<Object3D>(scene.clone()); // Клонируем модель при загрузке


	useEffect(() => {
		Object.values(nodes).forEach((node) => {
			if (node instanceof Mesh) {
				node.castShadow = true;
				node.receiveShadow = true;
			}
		});

		applyProps(materials.rubber, {
			color: "#222",
			roughness: 0.6,
			roughnessMap: null,
			normalScale: [4, 4],
		});
		applyProps(materials.window, { color: "black", roughness: 0, clearcoat: 0.1 });
		applyProps(materials.coat, {
			envMapIntensity: 4,
			roughness: 0.5,
			metalness: 1,
		});
		applyProps(materials.paint, {
			envMapIntensity: 2,
			roughness: 0.45,
			metalness: 0.8,
			color: "#000f07",
		});
	}, [nodes, materials]);

	return <primitive  {...props} object={clonedScene.current} />;
}

const Porsches = ({ isActive, setIsActive }: { isActive: 'prev' | 'next' | null, setIsActive: (isActive: 'prev' | 'next' | null) => void }) => {
	console.log('isActive', isActive)
	const [models] = useState([
		{ id: 1, scale: 1.6, position: [-0.5, -0.18, 0], rotation: [0, Math.PI / 5, 0], angle: 0 },
		{ id: 2, scale: 1.6, position: [-14, -0.18, -12], rotation: [0, Math.PI / 5, 0], angle: Math.PI / 2 },
	]);

	useFrame((state) => {
		const car1 = state.scene.getObjectByName("car1");
		const car2 = state.scene.getObjectByName("car2");

		if (isActive === 'next') {
			car2?.scale.set(1.6, 1.6, 1.6)
			if (car1) {
				car1.position.x += 0.04;
				car1.position.z -= 0.04
			}
			if (car2) {
				car2.position.x += 0.04;

				car2.position.z += 0.04
				if (car2?.position.x >= -0.5 && car2?.position.z >= 0) {
					setIsActive(null);
				}
			}


		} else if (isActive === 'prev') {
			console.log('car2?.position.x', car1?.position.x)


			if (car1) {
				car1.position.x -= 0.04;
				car1.position.z += 0.04

			}
			if (car2) {
				car2.position.x -= 0.04;
				car2.position.z -= 0.04
				if (car2.position.x <= -14 && car2?.position.z <= -12) {
					// car2?.scale.set(0, 0, 0)
					setIsActive(null);
				}
			}


		}
	});


	return (
		<>
			{models.map((model) => (
				<Porsche
					key={model.id}
					scale={model.scale}
					name={`car${model.id}`}
					position={model.position as unknown as Vector3}
					rotation={model.rotation as unknown as Euler}
				/>
			))}
		</>

	)
}

export default Porsches