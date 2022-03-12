import GlobalState, { useState } from '../GlobalState'

export default function Home() {
	const state = useState(GlobalState)

	return (
		<>
			<h1 className="text-3xl font-bold underline"> Hello world! </h1>

			{state.get()}
			<button onClick={() => state.set(p => p + 1)}>Add</button>
		</>
	)
}
