import { HtmlHTMLAttributes } from "react"
import { tabs } from "../assets/tier-data"

const TierInfoTab = ({ value, props }: { value: string | null, props?: HtmlHTMLAttributes<HTMLDivElement> }) => {

	return (
		<div className="bg-gray-800/20 absolute top-[145px] text-white z-20 p-4" {...props}>
			<div className="flex w-[320px]">
				{value && tabs[value]}
			</div>
		</div>
	)
}

export default TierInfoTab