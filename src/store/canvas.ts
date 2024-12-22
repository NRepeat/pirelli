import { create } from 'zustand'
import { Vector3 } from 'three'
interface CanvasState {
	cameraPosition: Vector3
	defaultCameraPosition: Vector3,
	setCameraPosition: (position: Vector3) => void
	defaultAnimation: boolean,
	setIsDefaultAnimation: (isDefault: boolean) => void
	tierTab: string | null,
	setTierTab: (tab: string | null) => void
	setDefaultAnimation: () => void
	orbitControlBehavior: boolean,
	setOrbitControlBehavior: (is: boolean) => void
}

const useCanvasStore = create<CanvasState>()((set) => ({
	cameraPosition: new Vector3(5, 0, 12),
	defaultCameraPosition: new Vector3(5, 0, 12),
	defaultAnimation: true,
	tierTab: null,
	setCameraPosition: (position) => set(() => ({ cameraPosition: position })),
	setIsDefaultAnimation: (isDefault) => set(() => ({ defaultAnimation: isDefault })),
	setTierTab: (tab) => set(() => ({ tierTab: tab })),
	setDefaultAnimation: () => set((state) => ({ defaultAnimation: true, cameraPosition: state.defaultCameraPosition })),
	setOrbitControlBehavior: (is) => set(() => ({ orbitControlBehavior: is })),
	orbitControlBehavior: false,
}))
export default useCanvasStore
