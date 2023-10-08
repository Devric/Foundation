import express from 'express'
import helmet from 'helmet'
import { SetupLoadBalancer } from './LoadBalancer.middleware'
import { SetupLogging} from './Logging.middleware'

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

const app = express()
const port = 3040


// Basic
// ==============================
app.use(express.json())
app.use(helmet())

// Logger
// ==============================
SetupLogging(app)

let routes = {
	'/posts': {
		strategy: 'ROUND_ROBIN', // load balacner
		targets: [ 'http://localhost:9999', 'http://localhost:9998' ] // load balancer
	},
	'/comments':{
		strategy: 'ROUND_ROBIN', // load balancer
		targets: [ 'http://localhost:9999' ] // load balancer
	}
}

// Load Blancer
// ==============================
SetupLoadBalancer(app, routes)



// Fallback
// ==============================

// TODO expose a derived object, and let the frontend check status so it doesnt block server side
app.get('/', (req:any, res:any)=> {
	res.json(routes)
})

app.listen(port, ()=>{
	console.log(`API Gateway Started at port ${port}`)
})
