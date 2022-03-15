import React from 'react'
import tw, { css } from 'twin.macro'
import { Link, Routes, Route } from 'react-router-dom'

let styles = {
	header: css`
		color: green;
		${tw`text-3xl font-bold underline`}
	`,
	heroLeft: css`
		${tw`z-30 flex flex-col items-center w-full max-w-xl pt-48 text-center lg:items-start lg:w-1/2 lg:pt-20 xl:pt-40 lg:text-left`}
	`,
	heroRight: css`
		${tw`relative z-50 flex flex-col justify-center w-full h-full lg:w-1/2`}
	`
}


interface iRoutes {
	name: string
	path: string
	component: JSX.Element
	secured: string
}

export default function TopMenu({routes}:{routes:iRoutes[]}) {
	console.log(routes)


	return (
		<nav id="header" css={tw`fixed w-full z-30 top-0 text-white`}>

			<div css={tw`w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2`}>

				<div css={tw`pl-4 flex items-center`}>

					<a css={tw`text-black no-underline hover:no-underline font-bold text-2xl lg:text-4xl`} href="#">
						LANDING
					</a>

				</div>

				<div css={tw`block lg:hidden pr-4`}>

					<button id="nav-toggle" css={tw`flex items-center p-1 text-pink-800 hover:text-gray-900 focus:outline-none transform transition hover:scale-105 duration-300 ease-in-out`}>
						Some Button
					</button>

				</div>

				<div css={tw`w-full flex-grow lg:flex lg:items-center lg:w-auto hidden mt-2 lg:mt-0 bg-white lg:bg-transparent text-black p-4 lg:p-0 z-20`} id="nav-content">

					<ul css={tw`lg:flex justify-end flex-1 items-center`}>


						{routes.map(({ name, path }, i) => {
							return (
								<li css={tw`mr-3`}  key={i}>
									<Link to={path} css={tw`inline-block py-2 px-4 text-black font-bold no-underline`} href="#"> {name} </Link>
								</li>
							)
						})}

						<div >
						</div>



					</ul>

					<Link to="/register" >
						<button id="navAction" css={tw`mx-auto lg:mx-0 hover:underline bg-indigo-700 text-white bg-pink-500 font-bold rounded-xl mt-4 lg:mt-0 py-4 px-8 shadow opacity-75 focus:outline-none transform transition hover:scale-105 duration-300 ease-in-out`} >
							Register
						</button>
					</Link>

				</div>

			</div>

			<hr css={tw`border-b border-gray-100 opacity-25 my-0 py-0`} />

		</nav>
	)
}
