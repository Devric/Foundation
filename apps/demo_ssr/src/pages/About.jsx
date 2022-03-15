import React,{useEffect} from 'react'
import GlobalglobalState from '../client/GlobalState'
import { useState } from '@hookstate/core'

export default function About() {
	const globalState = useState(GlobalglobalState)

	const localState = useState('xyz')

	useEffect(()=>{
		// localState.set("asdf")
	},[])

	return (
		<>
			<h1>About</h1>
			{globalState.get()}
			<button onClick={() => globalState.set(p => p + 1)}>Add</button>

			<div suppressHydrationWarning>
				{JSON.stringify(localState.get())}
				<button onClick={() => localState.set(p => "x")}>test</button>
			</div>
		</>
	)
}

