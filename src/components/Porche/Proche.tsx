import { useGLTF } from "@react-three/drei"
import { applyProps, PrimitiveProps } from "@react-three/fiber"
import { useLayoutEffect } from "react"

function Porsche(props: Omit<PrimitiveProps, 'object'>) {
	const { scene, nodes, materials } = useGLTF('/911-transformed.glb')
	useLayoutEffect(() => {
		Object.values(nodes).forEach((node) => {
			if (node) {
				node.castShadow = true
				node.receiveShadow = true
			}
		})
		applyProps(materials.rubber, { color: '#222', roughness: 0.6, roughnessMap: null, normalScale: [4, 4] })
		applyProps(materials.window, { color: 'black', roughness: 0, clearcoat: 0.1 })
		applyProps(materials.coat, { envMapIntensity: 4, roughness: 0.5, metalness: 1 })
		applyProps(materials.paint, { envMapIntensity: 2, roughness: 0.45, metalness: 0.8, color: '#000f07' })
	}, [nodes, materials])
	return <primitive {...props} object={scene} />
}
export default Porsche