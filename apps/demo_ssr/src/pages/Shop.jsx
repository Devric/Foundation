import React, {useRef, useEffect} from 'react'
import tw, { css } from 'twin.macro'
// import { Oracle } from 'Oracle'


export default function Shop() {
	let oracle;
	let frame = useRef()

	useEffect(()=>{
		if (window !== undefined) {
			import('Oracle').then(({ Oracle })=>{
				oracle = new Oracle();
				oracle.createHost(['http://127.0.0.1:3000','http://127.0.0.1:8887', 'http://127.0.0.1:8888'])
				oracle.register({
					host: "http://127.0.0.1:3000",
					module: "container",
					actions: []
				})
			})
		}
	}, [])

	return (
		<>
			<pre>{`
This is iframe component at http://127.0.0.1:8887
communicate to betwen layers via oracle.

At project root, use pnpm demo and navigate to http://127.0.0.1:3000
NOTE: do not use localhost

Layers:
- React SSR 127.0.0.1:3000
	- Iframe 127.0.0.1:8887
		- Module federation 127.0.0.1:8888

				`} </pre>
			<iframe ref={frame} src="http://127.0.0.1:8887" style={{ width:'100%', 'min-height':'1300px' }} frameBorder="0" scrolling="no" onLoad={(e)=> setTimeout(() => {
				console.log(frame.current.contentWindow)
							frame.current.style.height = frame.current.contentWindow.document.body.scrollHeight + 'px';
						}, 50)}></iframe>
		</>
	)
}
