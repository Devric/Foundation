import React from 'react'
import GlobalState, { useState } from '../client/GlobalState'
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

export default function Register() {
	const state = useState(GlobalState)

	return (
		<div css={tw`relative items-center justify-center w-full overflow-x-hidden lg:pt-40 lg:pb-40 xl:pt-40 xl:pb-64`}>
			<div>
				register
			</div>
		</div>
	)
}
