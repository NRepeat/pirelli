const Navbar = () => {
	return (
		<header className="flex  items-center border-red bg-yellow border-default  border-l-0 border-r-0 border-t-0 py-2  px-3">
			<div className='flex w-full justify-start items-center gap-2'>
				<div className='flex flex-col'>
					<span>Custom </span>
					<span>wheels</span>
				</div>
			</div>
			<nav className='flex w-full justify-end gap-4
			'>
				<button>
					Buy now
				</button>
				<button>FAQ</button>
			</nav>
		</header>
	)
}

export default Navbar