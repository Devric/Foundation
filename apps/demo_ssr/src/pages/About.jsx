import React from 'react'
import GlobalState, { useState } from '../GlobalState'

export default function About() {
	const state = useState(GlobalState)
  return (
    <>
      <h1>About</h1>
		{state.get()}
		<button onClick={() => state.set(p => p + 1)}>Add</button>
    </>
  )
}
