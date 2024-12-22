import { HtmlHTMLAttributes } from "react"
import useCanvasStore from "../store/canvas"
import { Vector3 } from 'three'


export type TierButtonsProps = { position: Vector3, tab: string, defaultAnimation: boolean, textValue?: string | undefined }
const TierButtonType = ({ textValue, props, position, tab, defaultAnimation }: { props?: HtmlHTMLAttributes<HTMLButtonElement> } & TierButtonsProps) => {
	const canvasState = useCanvasStore((state) => state)
	const handleChangePosition = ({ position, tab, defaultAnimation }: TierButtonsProps) => {
		canvasState.setCameraPosition(new Vector3(...position))
		canvasState.setTierTab(tab)
		canvasState.setIsDefaultAnimation(defaultAnimation)
	}
	return (
		<button onClick={() => handleChangePosition({ defaultAnimation, position, tab })} className="hover:bg-[#ABABBF] p-4 transition" {...props}>
			{textValue}
		</button>
	)
}

export default TierButtonType