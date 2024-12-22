import React from 'react'
import Navbar from './navbar'
import { Outlet } from 'react-router'

const MainLayout = () => {
		return (
			<div>
			<Navbar/>
			<main>
					<Outlet />
			</main>
	</div>
		)
}

export default MainLayout