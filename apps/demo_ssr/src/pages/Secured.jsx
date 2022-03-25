import { useQuery, useMutation } from 'react-query'
import React,{useEffect, useRef} from 'react'
import GlobalglobalState from '../client/GlobalState'
import { useState } from '@hookstate/core'
import tw, { css } from 'twin.macro'

let styles = {
	header: css`
		color: green;
		${tw`text-3xl font-bold underline`}
	`,
	heroLeft: css`
		${tw`z-30 flex flex-col items-center w-full max-w-xl pt-48 text-center lg:items-start lg:w-1/2 lg:pt-20 xl:pt-40 lg:text-left`}
	`,
	heroRight: css`
		${tw`relative z-50 flex flex-col justify-center w-full h-full lg:w-1/2`}
	`,
	// using TW and Emotion
	// text-'test-red' comes from tailwind customize settings
	hoverStyles: css`
		${tw`text-test-red`}
		&:hover {
			border-color: black;
			${tw`text-black`}
		}
	`
}


export default function Secured() {
	const globalState = useState(GlobalglobalState)

	const { isLoading, error, data } = useQuery('testData', () => {
		return fetch('http://localhost:3000/api/test')
		.then(res => {
			return res.text()
		})
	})

	if (isLoading) return 'loading'
	if (error) return 'error: ' + error.message

	return (
		<div css={tw`relative items-center justify-center w-full overflow-x-hidden lg:pt-40 lg:pb-40 xl:pt-40 xl:pb-64`}>
			<div css={tw`container flex flex-col items-center justify-between h-full max-w-6xl px-8 mx-auto -mt-32 lg:flex-row xl:px-0`}>
				<div css={styles.heroLeft}>
					<h1 css={styles.header}> Secured Page </h1>
				</div>
				<div css={styles.heroRight}>
					<p css={tw`text-center text-8xl`}>
						{globalState.counter.get()}
					</p>
					<button css={tw`bg-indigo-400 p-2 text-white rounded-lg`} onClick={() => globalState.counter.set(p => p + 1)}>Add</button>
				</div>
			</div>

			<hr />

			<h1>{data.message}</h1>
			<Name/>
		</div>
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
			<input type="text" ref={inputRef} css={[tw`border`, styles.hoverStyles]} />
			<button onClick={()=> mutation.mutate( inputRef.current.value) }>Update</button>
		</>
	)
}

