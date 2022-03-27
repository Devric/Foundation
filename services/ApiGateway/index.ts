import express from 'express'
import helmet from 'helmet'
import { createProxyMiddleware } from 'http-proxy-middleware'

const app = express()
const port = 3040


app.use(express.json())
app.use(helmet())

let registry = {
	'/posts': {
		targets: [ 'http://localhost:9999' ]
	},
	'/comments':{
		targets: [ 'http://localhost:9999' ]
	}
}


// forward by registry
for (const [key,val] of Object.entries(registry)){
	app.use(key, (req, res,next)=>{
		createProxyMiddleware(val.targets[0])(req,res,next)
	})

	//app.use('/posts', createProxyMiddleware('http://localhost:9999'))
	//app.use('/comments', createProxyMiddleware('http://localhost:9999'))
}


app.get('/', (req, res)=> res.send('Status Page'))

app.listen(port, ()=>{
	console.log(`API Gateway Started at port ${port}`)
})
