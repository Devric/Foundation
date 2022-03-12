import './styles/index.css'
import { Link, Route, Switch } from 'react-router-dom'

// Auto generates routes from files under ./pages
// https://vitejs.dev/guide/features.html#glob-import
const pages = import.meta.globEager('./pages/*.jsx')

const routes = Object.keys(pages).map((path) => {
	const name = path.match(/\.\/pages\/(.*)\.jsx$/)[1]
	return {
		name,
		path: name === 'Home' ? '/' : `/${name.toLowerCase()}`,
		component: pages[path].default
	}
})

export function App() {
	return (
		<>
			<nav>
				<ul>
					{routes.map(({ name, path }) => {
						return (
							<li key={path}>
								<Link to={path}>
									<button className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-gray-600 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-800">   
										{name}
									</button>
								</Link>
							</li>
						)
					})}
				</ul>
			</nav>
			<Switch>
				{routes.map(({ path, component: RouteComp }) => {
					return (
						<Route key={path} path={path}>
							<RouteComp />
						</Route>
					)
				})}
			</Switch>
			</>
	)
}
