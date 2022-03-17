import React,{useEffect} from 'react'
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
	`
}

export default function Secured() {
	const globalState = useState(GlobalglobalState)


	return (
		<div css={tw`relative items-center justify-center w-full overflow-x-hidden lg:pt-40 lg:pb-40 xl:pt-40 xl:pb-64`}>
			<div css={tw`container flex flex-col items-center justify-between h-full max-w-6xl px-8 mx-auto -mt-32 lg:flex-row xl:px-0`}>
				<div css={styles.heroLeft}>
					<h1 css={styles.header}> Secured Page </h1>
				</div>
				<div css={styles.heroRight}>
					<p css={tw`text-center text-8xl`}>
						{globalState.get()}
					</p>
					<button css={tw`bg-indigo-400 p-2 text-white rounded-lg`} onClick={() => globalState.set(p => p + 1)}>Add</button>
				</div>
			</div>
		</div>
	)
}

