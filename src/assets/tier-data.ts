import { TierButtonsProps } from "../components/tier-button-type"
import { Vector3 } from 'three'
export const tabs: { [key: string]: string } = {
	1: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus veritatis exercitationem error a sed accusamus molestias distinctio saepe tempore, ipsum tenetur quia nobis amet vero quam dicta eos, ad sapiente! ',
	2: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus veritatis exercitationem error a sed accusamus molestias distinctio saepe tempore, ipsum tenetur quia nobis amet vero quam dicta eos, ad sapiente!tempore, ipsum tenetur quia nobis amet vero quam dicta eos, ad sapiente!tempore, ipsum tenetur quia nobis amet vero quam dicta eos, ad sapiente! '
	,
	3: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus veritatis exercitationem error a sed accusamus molestias distinctio saepe tempore, ipsum tenetur quia nobis amet vero quam dicta eos, ad sapiente! tempore, ipsum tenetur quia nobis amet vero quam dicta eos, ad sapiente!tempore, ipsum tenetur quia nobis amet vero quam dicta eos, ad sapiente!'
}
export const tier_buttons: { [key: string]: TierButtonsProps } = {
	summer: { textValue: 'Summer', defaultAnimation: false, position: new Vector3(-2, -1, 5), tab: '1' },
	winter: { textValue: 'Winter', defaultAnimation: false, position: new Vector3(-6, -1, -2), tab: '2' },
	allSeason: { textValue: 'All seasons', defaultAnimation: true, position: new Vector3(-2, -1, 5), tab: '3' },
}