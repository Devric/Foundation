import express from 'express'
import helmet from 'helmet'
import console from 'console'
import AsyncContext from 'AsyncContext'

const app = express()
const port = 3050

const asyncContext = new AsyncContext<{id:number}>()

// Basic
// ==============================
app.use(express.json())
app.use(helmet())

// Logger
// ==============================
// SetupLogging(app)

// Setup Async Context
// ==============================

let reqId = 0
app.use((req,res,next)=> {
	reqId++; // counter
	let time = Math.random() * (10000) // random to 10 seconds;

	console.log(`${reqId}-${time}`)

	asyncContext.setContext({id: reqId})

	setTimeout(()=>{
		next()
	}, time) 
})

// TODO expose a derived object, and let the frontend check status so it doesnt block server side
app.get('/', (req:any, res:any)=> {
	console.log('id-'+ JSON.stringify(asyncContext.getContext()))
	res.sendStatus(200)
})

app.listen(port, ()=>{
	console.log(`App Started at port ${port}`)
})
