import { useQuery, useMutation } from 'react-query'
import {useRef} from 'react'

export default function Env() {
	const { isLoading, error, data } = useQuery('testData', () => {
		return fetch('http://localhost:3000/api/test')
		.then(res => {
			return res.text()
		})
	})

	if (isLoading) return 'loading'
	if (error) return 'error: ' + error.message

	return (
		<>
			<h1>{data.message}</h1>
			<Name/>
		</>
	)
}

function Name() {
	const inputRef = useRef()

	const { isLoading, error, data } = useQuery('testName', () => {
		return fetch('http://localhost:3000/api/test/name')
		.then(res => {
			return res.text()
		})
	}, {
		refetchInterval: 2000
	})

	const mutation = useMutation(( newName ) => {
		return fetch('http://localhost:3000/api/test/name', {
			method: 'post',
			body: JSON.stringify({data: newName}),
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then((res)=> console.log(res))
	})

	if (isLoading) return 'loading'
	if (error) return 'error: ' + error.message

	return (
		<>
			<p>{data}</p>
			<input type="text" ref={inputRef} className="border-2 border-indigo-500" />
			<button onClick={()=> mutation.mutate( inputRef.current.value) }>Update</button>
		</>
	)
}
