import fs from 'fs'
import path from 'path'
import express, {ErrorRequestHandler, Request, Response, NextFunction} from 'express'
import bodyParser from 'body-parser'
import ApiRoutes from './src/api'

import Debug from 'debug'

const debug = Debug('server')

const isTest = process.env.NODE_ENV === 'test' || !!process.env.VITE_TEST_BUILD
const isProd = process.env.NODE_ENV === 'production'

process.env.MY_CUSTOM_SECRET = 'API_KEY_qwertyuiop'

async function createServer(
	root = process.cwd()
) {
	const resolve = (p: string) => path.resolve(__dirname, p)

	const indexProd = isProd
	? fs.readFileSync(resolve('dist/client/index.html'), 'utf-8')
	: ''

	const app = express()

	app.use(bodyParser.json())

	/**
	 * @type {import('vite').ViteDevServer}
	 */
	let vite: any
	if (!isProd) {
		debug('Starting: isProd: '+isProd)
		vite = await require('vite').createServer({
			root,
			logLevel: isTest ? 'error' : 'info',
			server: {
				middlewareMode: 'ssr',
				watch: {
					// During tests we edit the files too fast and sometimes chokidar
					// misses change events, so enforce polling for consistency
					usePolling: true,
					interval: 100
				}
			}
		})
		// use vite's connect instance as middleware
		app.use(vite.middlewares)
	} else {
		app.use(require('compression')())
		app.use(
			require('serve-static')(resolve('dist/client'), {
				index: false
			})
		)
	}

	app.use('/api', ApiRoutes)

	app.use('*', async (req:any, res:any) => {
		try {
			const url:string = req.originalUrl

			let template, render
			if (!isProd) {
				// always read fresh template in dev
				template = fs.readFileSync(resolve('index.html'), 'utf-8')
				template = await vite.transformIndexHtml(url, template)
				render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render
			} else {
				template = indexProd
				render = require('./dist/server/entry-server.js').render
			}

			const context: any = {}
			const appHtml = render(url, context)

			if (context.url) {
				// Somewhere a `<Redirect>` was rendered
				return res.redirect(301, context.url)
			}

			const html = template.replace(`<!--app-html-->`, appHtml)

			res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
		} catch (e: any) {
			!isProd && vite.ssrFixStacktrace(e)
			console.log(e.stack)
			res.status(500).end(e.stack)
		}
	})

	// @TODO refactor Error handler, detect type and map message
	app.use((err: Error, req: Request,res:Response,next: NextFunction)=>{
		if (err) {
			console.error(err)
			// Just throw a catch all for now, needs user message, server message
			res.status(500).send({error: "Server error"})
		}
	})

	return { app, vite }
}

if (!isTest) {
	createServer().then(({ app }) =>
		app.listen(3000, () => {
			console.log('http://localhost:3000')
		})
	)
}

// for test use
export default createServer
