import React from 'react'
import { QueryClient, QueryClientProvider} from 'react-query'
import { Link, Routes, Route } from 'react-router-dom'
import tw, { css } from 'twin.macro'

import TopMenu from './client/component/TopMenu'
import AuthRedirect from './client/component/AuthRedirect'

const queryClient = new QueryClient()

// Auto generates routes from files under ./pages
// https://vitejs.dev/guide/features.html#glob-import
const pages = import.meta.globEager('./pages/*.jsx')

const routes = Object.keys(pages).map((path) => {
	const name = path.match(/\.\/pages\/(.*)\.jsx$/)[1]
	return {
		name,
		path: name === 'Home' ? '/' : `/${name.toLowerCase()}`,
		component: pages[path].default,
		secured: name === 'About'
	}
})

// reorder routes based on the below array so that we can list in auto generated navigation
const orderedRoutes = ['Home', 'Ajax', 'About','Sample','Layout', 'Login'].map((name:string)=> routes.filter(route => route.name === name)[0])

let styles = {
	nav: css`
		${tw`absolute top-0 left-0 z-50
			flex flex-col items-center
			justify-between hidden
			w-full h-64 pt-5 mt-24 text-sm text-gray-800 bg-white
			border-t border-gray-200
			md:w-auto md:flex-row md:h-24
			lg:text-base md:bg-transparent md:mt-0
			md:border-none md:py-0 md:flex md:relative`}
	`,
	navLink: css`
		${tw`
			ml-0 mr-0 font-bold md:ml-12 md:mr-3 lg:mr-8 hover:text-indigo-600
		`}
	`,
	loginBtn: css`
		${tw`relative z-40 px-3 py-2 mr-0 text-sm font-bold text-pink-500 md:px-5 bg-red-400 lg:text-white sm:mr-3 md:mt-0 rounded-lg`}
	`,
	startBtn: css`
		${tw`relative z-40 inline-block w-auto h-full px-5 py-3 text-sm font-bold leading-none text-white transition-all transition duration-100 duration-300 bg-indigo-700 rounded shadow-md lg:bg-white lg:text-indigo-700 sm:w-full lg:shadow-none hover:shadow-xl`}
	`,
	navBtnContainer: css`
		${tw`absolute left-0 flex-col items-center justify-center hidden w-full pb-8 mt-48 border-b border-gray-200 md:relative md:w-auto md:bg-transparent md:border-none md:mt-0 md:flex-row md:p-0 md:items-end md:flex md:justify-between`}

	`
}

export function App() {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<header css={tw`container h-24`}>
					<TopMenu routes={orderedRoutes} />
				</header>
				<Routes>
					{routes.map(({ path, secured, component: RouteComp }) => {
						if (secured) {
							return (
								<Route key={path} path={path} element={
									<AuthRedirect>
										<RouteComp />
									</AuthRedirect>
								} />
							)
						} else {
							return (
								<Route key={path} path={path} element={<RouteComp />} />
							)
						}
					})}
				</Routes>
			</QueryClientProvider>
		</>
	)
}
