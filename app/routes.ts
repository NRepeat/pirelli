import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

	export default [
  layout("components/ui/main-layout.tsx", [
			index("routes/home.tsx"),
	]),
		]satisfies RouteConfig;