import express from 'express'
import helmet from 'helmet'
import { SetupLoadBalancer } from './LoadBalancer.middleware'
import { SetupLogging } from './Logging.middleware'
import { setupRateLimit } from './RateLimiter.middleware'
import { setupAuth } from './Authentication.middleware'
import routes from './RoutesRegistry'

// TODO Circut breaker https://medium.com/geekculture/nodejs-circuit-breaker-pattern-ed6b31896a57
// TODO service discovery https://microservices.io/patterns/client-side-discovery.html
// TODO tls certificates, tokens
// TODO caching
// TODO protocal adaptor, websockete, http, http2
// TODO version control
// TODO notification / events
// TODO monitoring
// TODO authorisation
// TODO Protocol Translation: Converts one protocol into another, making interaction between clients and back-end services much more straightforward.
// TODO Representing Ranges: Allows clients to request a range of resources.
// TODO Resource Labels: Labels resources to make them easier to find and manage.
// TODO Long Running Operations: Allows clients to start long-running operations and check their status later.
// TODO List Sub-Collections: Allows clients to retrieve a subset of a collection.
// TODO Retryable API Calls: Allows clients to safely retry failed API calls.
// TODO Idempotent API Methods: Allows clients to safely retry API methods that cannot easily be idempotent.
// TODO Resource View: Allows clients to limit which parts of the resource the server should return in its responses.

const app = express()
const port = 3040


// Basic
// ==============================
app.use(express.json())
app.use(helmet())

// Logger
// ==============================
SetupLogging(app)

// Load Blancer
// ==============================
SetupLoadBalancer(app, routes)

// Rate Limit
// ==============================
setupRateLimit(app, routes)

// Rate Limit
// ==============================
setupAuth(app, routes)



// Fallback
// ==============================

// TODO expose a derived object, and let the frontend check status so it doesnt block server side
app.get('/', (req:any, res:any)=> {
	res.json(routes)
})

app.listen(port, ()=>{
	console.log(`API Gateway Started at port ${port}`)
})
