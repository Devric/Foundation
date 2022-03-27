import express from 'express'
import helmet from 'helmet'
import { createProxyMiddleware } from 'http-proxy-middleware'
import LoadBalancer from './LoadBalancer'
import morgan from 'morgan'

const app = express()
const port = 3040


app.use(express.json())
app.use(helmet())

// TODO decide on using pino express-pino-logger
app.use(morgan('combined'))

let registry = {
	'/posts': {
		strategy: 'ROUND_ROBIN',
		targets: [ 'http://localhost:9999', 'http://localhost:9998' ]
	},
	'/comments':{
		strategy: 'ROUND_ROBIN',
		targets: [ 'http://localhost:9999' ]
	}
}


// forward by registry
for (const [key,val] of Object.entries(registry)){
	var LB = new LoadBalancer()

	app.use(key, (req, res,next)=>{
		let target = LB.ROUND_ROBIN(val.targets)
		createProxyMiddleware(target)(req,res,next)
	})

	//app.use('/posts', createProxyMiddleware('http://localhost:9999'))
	//app.use('/comments', createProxyMiddleware('http://localhost:9999'))
}


app.get('/', (req, res)=> res.send('Status Page'))

app.listen(port, ()=>{
	console.log(`API Gateway Started at port ${port}`)
})
