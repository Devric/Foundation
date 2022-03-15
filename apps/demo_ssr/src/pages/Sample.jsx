import React from 'react'
import GlobalState, { useState } from '../client/GlobalState'
import tw, { css } from 'twin.macro'

// Assets
import imgHero from '../assets/hero.jpg'
import imga from '../assets/a.png'
import imgb from '../assets/b.png'

let styles = {
	header: css`
		color: green;
		${tw`text-3xl font-bold underline`}
	`,
	hero: css`
		background: url("${imgHero}");
		${tw`container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center p-8 pt-12 pb-12 text-gray-200`}
	`,
}

export default function Sample() {
	const state = useState(GlobalState)

	return (
		<>
		<div id="hero" css={styles.hero}>

			<div css={tw`flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left`}>

				<p css={tw`uppercase w-full`}>What business are you?</p>

				<h1 css={tw`my-4 text-5xl font-bold leading-tight`}>
					Main Hero Message to sell yourself!
				</h1>

				<p css={tw`leading-normal text-2xl mb-8`}>
					Sub-hero message, not too long and not too short. Make it just right!
				</p>

				<button 
					css={tw`mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none transform transition hover:scale-105 duration-300 ease-in-out`}>
					Subscribe
				</button>

			</div>

		</div>


		<section css={tw`bg-gray-200 mt-8 border-b py-8`}>

			<h1 css={tw`w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800`}>
				Title
			</h1>

			<div css={tw`container max-w-5xl mx-auto m-8`}>
				<div css={tw`flex flex-grow flex-wrap`}>

					<div css={tw`w-5/6 sm:w-1/2 p-6`}>

						<h3 css={tw`text-3xl text-gray-800 font-bold leading-none mb-3`}>
							Lorem ipsum dolor sit amet
						</h3>

						<p css={tw`text-gray-600 mb-8`}>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at ipsum eu nunc commodo posuere et sit amet ligula.
						</p>

					</div>

					<div css={tw`w-full sm:w-1/2 p-6`}>
						<img src={imga} alt="" />
					</div>

				</div>

				<div css={tw`flex flex-wrap flex-grow flex-col-reverse sm:flex-row`}>

					<div css={tw`w-full sm:w-1/2 p-6 mt-6`}> 
						<div css={tw`w-full sm:w-1/2 p-6`}>
							<img src={imgb} alt="" />
						</div>
					</div>

					<div css={tw`w-full sm:w-1/2 p-6 mt-6`}>

						<div css={tw`align-middle`}>

							<h3 css={tw`text-3xl text-gray-800 font-bold leading-none mb-3`}> Lorem ipsum dolor sit amet </h3>

							<p css={tw`text-gray-600 mb-8`}>

								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at ipsum eu nunc commodo posuere et sit amet ligula.

								<br /> <br />

								Images from:

								<a css={tw`text-pink-500 underline`} href="https://undraw.co/">undraw.co</a>

							</p>

						</div>
					</div>
				</div>
			</div>

		</section>

		<section css={tw`bg-white border-b py-8`}>

		<div css={tw`container mx-auto flex flex-wrap pt-4 pb-12`}>

			<h1 css={tw`w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800`}> Title </h1>

			<div css={tw`w-full mb-4`}>
				<div css={tw`h-1 mx-auto w-64 opacity-25 my-0 py-0 rounded-t`}></div>
			</div>

			<div css={tw`w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink`}>

			<div css={tw`flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow`}>

				<a href="#" css={tw`flex flex-wrap no-underline hover:no-underline`}>

					<p css={tw`w-full text-gray-600 text-xs md:text-sm px-6`}> xGETTING STARTED </p>
					<div css={tw`w-full font-bold text-xl text-gray-800 px-6`}> Lorem ipsum dolor sit amet. </div>
					<p css={tw`text-gray-800 text-base px-6 mb-5`}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at ipsum eu nunc commodo posuere et sit amet ligula.
					</p>

				</a>

			</div>

			<div css={tw`flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6`}>
				<div css={tw`flex items-center justify-start`}>
					<button css={tw`mx-auto lg:mx-0 hover:underline text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none transform transition hover:scale-105 duration-300 ease-in-out`}>
						Action
					</button>
				</div>
			</div>

			</div>

			<div css={tw`w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink`}>

			<div css={tw`flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow`}>

				<a href="#" css={tw`flex flex-wrap no-underline hover:no-underline`}>

					<p css={tw`w-full text-gray-600 text-xs md:text-sm px-6`}> xGETTING STARTED </p>
					<div css={tw`w-full font-bold text-xl text-gray-800 px-6`}> Lorem ipsum dolor sit amet. </div>
					<p css={tw`text-gray-800 text-base px-6 mb-5`}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at ipsum eu nunc commodo posuere et sit amet ligula.
					</p>

				</a>

			</div>

				<div css={tw`flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6`}>
					<div css={tw`flex items-center justify-start`}>
						<button css={tw`mx-auto lg:mx-0 hover:underline text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none transform transition hover:scale-105 duration-300 ease-in-out`}>
							Action
						</button>
					</div>
				</div>

			</div>

			<div css={tw`w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink`}>

			<div css={tw`flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow`}>

				<a href="#" css={tw`flex flex-wrap no-underline hover:no-underline`}>

					<p css={tw`w-full text-gray-600 text-xs md:text-sm px-6`}> xGETTING STARTED </p>
					<div css={tw`w-full font-bold text-xl text-gray-800 px-6`}> Lorem ipsum dolor sit amet. </div>
					<p css={tw`text-gray-800 text-base px-6 mb-5`}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at ipsum eu nunc commodo posuere et sit amet ligula.
					</p>
				</a>

				</div>

				<div css={tw`flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6`}>
					<div css={tw`flex items-center justify-start`}>
						<button css={tw`mx-auto lg:mx-0 hover:underline text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none transform transition hover:scale-105 duration-300 ease-in-out`}>
							Action
						</button>
					</div>
				</div>

			</div>

		</div>

		</section>

		<section css={tw`bg-gray-100 py-8`}>

			<div css={tw`container mx-auto px-2 pt-4 pb-12 text-gray-800`}>

				<h1 css={tw`w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800`}> Pricing </h1>


				<div css={tw`flex flex-col sm:flex-row justify-center pt-12 my-12 sm:my-4`}>

				<div css={tw`flex flex-col w-5/6 lg:w-1/4 mx-auto lg:mx-0 rounded-none lg:rounded-l-lg bg-white mt-4`}>

					<div css={tw`flex-1 bg-white text-gray-600 rounded-t rounded-b-none overflow-hidden shadow`}>

						<div css={tw`p-8 text-3xl font-bold text-center border-b-4`}> Free </div>

						<ul css={tw`w-full text-center text-sm`}>
							<li css={tw`border-b py-4`}>Thing</li>
							<li css={tw`border-b py-4`}>Thing</li>
							<li css={tw`border-b py-4`}>Thing</li>
						</ul>

					</div>

					<div css={tw`flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6`}>

						<div css={tw`w-full pt-6 text-3xl text-gray-600 font-bold text-center`}>

							£0 <span css={tw`text-base`}>for one user</span>

						</div>

						<div css={tw`flex items-center justify-center`}>
							<button css={tw`mx-auto lg:mx-0 hover:underline  text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none transform transition hover:scale-105 duration-300 ease-in-out`}>
								Sign Up
							</button>
						</div>

					</div>

				</div>

				<div css={tw`flex flex-col w-5/6 lg:w-1/3 mx-auto lg:mx-0 rounded-lg bg-white mt-4 sm:-mt-6 shadow-lg z-10`}>

					<div css={tw`flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow`}>

					<div css={tw`w-full p-8 text-3xl font-bold text-center`}> Basic </div>

					<div css={tw`h-1 w-full  my-0 py-0 rounded-t`}></div>

						<ul css={tw`w-full text-center text-base font-bold`}>
							<li css={tw`border-b py-4`}>Thing</li>
							<li css={tw`border-b py-4`}>Thing</li>
							<li css={tw`border-b py-4`}>Thing</li>
						</ul>

					</div>

					<div css={tw`flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6`}>

					<div css={tw`w-full pt-6 text-4xl font-bold text-center`}>

						£x.99

						<span css={tw`text-base`}>/ per user</span>

					</div>

					<div css={tw`flex items-center justify-center`}>

						<button css={tw`mx-auto lg:mx-0 hover:underline  text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none transform transition hover:scale-105 duration-300 ease-in-out`}>

						Sign Up

						</button>

					</div>

					</div>

				</div>

				<div css={tw`flex flex-col w-5/6 lg:w-1/4 mx-auto lg:mx-0 rounded-none lg:rounded-l-lg bg-white mt-4`}>

					<div css={tw`flex-1 bg-white text-gray-600 rounded-t rounded-b-none overflow-hidden shadow`}>

						<div css={tw`p-8 text-3xl font-bold text-center border-b-4`}> Pro </div>

						<ul css={tw`w-full text-center text-sm`}>
							<li css={tw`border-b py-4`}>Thing</li>
							<li css={tw`border-b py-4`}>Thing</li>
							<li css={tw`border-b py-4`}>Thing</li>
						</ul>

					</div>

					<div css={tw`flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6`}>

						<div css={tw`w-full pt-6 text-3xl text-gray-600 font-bold text-center`}>

							£0 <span css={tw`text-base`}>for one user</span>

						</div>

						<div css={tw`flex items-center justify-center`}>
							<button css={tw`mx-auto lg:mx-0 hover:underline  text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none transform transition hover:scale-105 duration-300 ease-in-out`}>
								Sign Up
							</button>
						</div>

					</div>

				</div>

				</div>

			</div>

		</section>


		<section css={tw`container mx-auto text-center py-6 mb-12`}>

			<h1 css={tw`w-full my-2 text-5xl font-bold leading-tight text-center text-white`}>
				Call to Action
			</h1>

			<h3 css={tw`my-4 text-3xl leading-tight`}>
				Main Hero Message to sell yourself!
			</h3>

			<button css={tw`mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none transform transition hover:scale-105 duration-300 ease-in-out`}>
				Action!
			</button>

		</section>

		<footer css={tw`bg-white`}>

			<div css={tw`container mx-auto px-8`}>

				<div css={tw`w-full flex flex-col md:flex-row py-6`}>

				<div css={tw`flex-1`}>

					<p css={tw`uppercase text-gray-500 md:mb-6`}>Links</p>

					<ul css={tw`mb-6`}>
						<li css={tw`mt-2 inline-block mr-2 md:block md:mr-0`}>
							<a href="#" ccss={tw`no-underline hover:underline text-gray-800 hover:text-pink-500`}>GOGO</a>
						</li>
						<li css={tw`mt-2 inline-block mr-2 md:block md:mr-0`}>
							<a href="#" ccss={tw`no-underline hover:underline text-gray-800 hover:text-pink-500`}>GOGO</a>
						</li>
						<li css={tw`mt-2 inline-block mr-2 md:block md:mr-0`}>
							<a href="#" ccss={tw`no-underline hover:underline text-gray-800 hover:text-pink-500`}>GOGO</a>
						</li>
					</ul>

				</div>

				<div css={tw`flex-1`}>

					<p css={tw`uppercase text-gray-500 md:mb-6`}>Legal</p>

					<ul css={tw`mb-6`}>
						<li css={tw`mt-2 inline-block mr-2 md:block md:mr-0`}>
							<a href="#" ccss={tw`no-underline hover:underline text-gray-800 hover:text-pink-500`}>GOGO</a>
						</li>
						<li css={tw`mt-2 inline-block mr-2 md:block md:mr-0`}>
							<a href="#" ccss={tw`no-underline hover:underline text-gray-800 hover:text-pink-500`}>GOGO</a>
						</li>
						<li css={tw`mt-2 inline-block mr-2 md:block md:mr-0`}>
							<a href="#" ccss={tw`no-underline hover:underline text-gray-800 hover:text-pink-500`}>GOGO</a>
						</li>
					</ul>

				</div>

				<div css={tw`flex-1`}>

					<p css={tw`uppercase text-gray-500 md:mb-6`}>Social</p>

					<ul css={tw`mb-6`}>
						<li css={tw`mt-2 inline-block mr-2 md:block md:mr-0`}>
							<a href="#" ccss={tw`no-underline hover:underline text-gray-800 hover:text-pink-500`}>GOGO</a>
						</li>
						<li css={tw`mt-2 inline-block mr-2 md:block md:mr-0`}>
							<a href="#" ccss={tw`no-underline hover:underline text-gray-800 hover:text-pink-500`}>GOGO</a>
						</li>
						<li css={tw`mt-2 inline-block mr-2 md:block md:mr-0`}>
							<a href="#" ccss={tw`no-underline hover:underline text-gray-800 hover:text-pink-500`}>GOGO</a>
						</li>
					</ul>

				</div>

				<div css={tw`flex-1`}>

					<p css={tw`uppercase text-gray-500 md:mb-6`}>Company</p>

					<ul css={tw`mb-6`}>
						<li css={tw`mt-2 inline-block mr-2 md:block md:mr-0`}>
							<a href="#" ccss={tw`no-underline hover:underline text-gray-800 hover:text-pink-500`}>GOGO</a>
						</li>
						<li css={tw`mt-2 inline-block mr-2 md:block md:mr-0`}>
							<a href="#" ccss={tw`no-underline hover:underline text-gray-800 hover:text-pink-500`}>GOGO</a>
						</li>
						<li css={tw`mt-2 inline-block mr-2 md:block md:mr-0`}>
							<a href="#" ccss={tw`no-underline hover:underline text-gray-800 hover:text-pink-500`}>GOGO</a>
						</li>
					</ul>

				</div>

				</div>

			</div>

		</footer>
	</>

	)
}
