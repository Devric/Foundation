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

export default function Layout() {
	const state = useState(GlobalState)

	return (
		<div css={tw`flex h-screen bg-green-300`}>
			<div css={tw`flex-1 flex flex-col overflow-hidden`}>
				<header css={tw`flex justify-between items-center bg-blue-300 p-4`}>
					<div css={tw`flex`}>Left</div>
					<div css={tw`flex`}>Right</div>
				</header>
				<div css={tw`flex h-full`}>
					<nav css={tw`flex flex-grow-0  w-72 h-full bg-pink-500`}>
						<div css={tw`w-full flex mx-auto px-6 py-8`}>
						<div css={tw`w-full h-full flex items-center justify-center text-gray-900 text-xl border-4 border-gray-900 border-dashed`}>Sidebar</div>
						</div>
					</nav>
					<main css={tw`flex flex-grow w-full bg-white overflow-x-hidden overflow-y-auto mb-14`}>
						<div css={tw`flex w-full mx-auto px-6 py-8`}>
							<div css={tw`flex flex-col w-full h-full text-gray-900 text-xl border-4 border-gray-900 border-dashed`}>
								<div css={tw`flex w-full max-w-xl h-60 items-center justify-center mx-auto bg-green-400 border-b border-gray-600`}>Post</div>
								<div css={tw`flex w-full max-w-xl h-60 items-center justify-center mx-auto bg-green-400 border-b border-gray-600`}>Post</div>
								<div css={tw`flex w-full max-w-xl h-60 items-center justify-center mx-auto bg-green-400 border-b border-gray-600`}>Post</div>
								<div css={tw`flex w-full max-w-xl h-60 items-center justify-center mx-auto bg-green-400 border-b border-gray-600`}>Post</div>
								<div css={tw`flex w-full max-w-xl h-60 items-center justify-center mx-auto bg-green-400 border-b border-gray-600`}>Post</div>
							</div>
						</div>
					</main>
					<nav css={tw`flex flex-grow-0 w-72 h-full bg-yellow-400`}>
						<div css={tw`w-full flex mx-auto px-6 py-8`}>
								<div css={tw`w-full h-full flex items-center justify-center text-gray-900 text-xl border-4 border-gray-900 border-dashed`}>Rightbar</div>
						</div>
					</nav>
				</div>
			</div>
		</div>
	)
}
