import React from 'react'
import GlobalState, { useState } from '../GlobalState'

let styles = {
	header: `text-3xl font-bold underline`
}

export default function Home() {
	const state = useState(GlobalState)

	return (
		<>
			<h1 className={styles.header}  css={css`color: green`}> Hello world! </h1>

			{state.get()}

			<button onClick={() => state.set(p => p + 1)}>Add</button>
		</>
	)
}
