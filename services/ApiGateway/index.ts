import express from 'express'
import helmet from 'helmet'
import { createProxyMiddleware } from 'http-proxy-middleware'
import LoadBalancer from './LoadBalancer'
import morgan from 'morgan'
import request from './request'

const app = express()
const port = 3040


app.use(express.json())
app.use(helmet())

// TODO decide on using pino express-pino-logger
app.use(morgan('combined'))

// TODO Circut breaker https://medium.com/geekculture/nodejs-circuit-breaker-pattern-ed6b31896a57
// TODO service discovery https://microservices.io/patterns/client-side-discovery.html
// TODO rate limiting
// TODO tls certificates, tokens
// TODO caching
// TODO protocal adaptor, websockete, http, http2
// TODO version control
// TODO notification / events
// TODO monitoring
// TODO authentication / authorisation
// TODO move Resgistry as configuration file

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


// TODO expose a derived object, and let the frontend check status so it doesnt block server side
app.get('/', (req, res)=> {
	res.json(registry)
})

app.listen(port, ()=>{
	console.log(`API Gateway Started at port ${port}`)
})
