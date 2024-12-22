import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { Outlet } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "App" },
  ];
}

export default function Home() {
  
  return <>
  <Welcome />
  </>
}
