import React, {useEffect} from 'react'
import GlobalState, { useState } from '../client/GlobalState'
import tw, { css } from 'twin.macro'

import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from 'react-router-dom';

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
	const formState = useState({
		email: "",
		confirm: "",
		pass: "",
		isDirty: false
	})

	let location = useLocation
	// state.from is saved at AuthRedirect
	let from = location.state?.from?.pathname || '/'
	function BackToOriginalUrl() {
		navigate(from, {replace: true})
	}

	useEffect(()=>{
	},[])

	return (
		<div css={tw`min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0`} >
			<header css={tw`max-w-lg mx-auto`}>
				<a href="#">
					<h1  css={tw`text-4xl font-bold text-center`}>Register</h1>
				</a>
			</header>

			<main css={tw`bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl`}>
				<section>
					<h3 css={tw`font-bold text-2xl`}>Welcome to Register</h3>
					<p css={tw`text-gray-600 pt-2`}>Register to your account.</p>
				</section>

				<section css={tw`mt-10`}>
					<form css={tw`flex flex-col`} method="POST" action="#">
						<div css={tw`mb-6 pt-3 rounded bg-gray-200`}>
							<label css={tw`block text-gray-700 text-sm font-bold mb-2 ml-3`}>Email</label>
							<input type="email" value={formState.email.get()} onChange={_handleFormUpdate}  name="email" css={tw`bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3`} />
						</div>
						{formState.email.get() !== "" ? (
							<div css={tw`mb-6 pt-3 rounded bg-gray-200`}>
								<label css={tw`block text-gray-700 text-sm font-bold mb-2 ml-3`}>Confirm Email</label>
								<input type="email" value={formState.confirm.get()} onChange={_handleFormUpdate}  name="confirm" css={tw`bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3`} />
							</div>
						):""}
						<div css={tw`mb-6 pt-3 rounded bg-gray-200`}>
							<label css={tw`block text-gray-700 text-sm font-bold mb-2 ml-3`} >Password</label>
					<input type="password"  value={formState.pass.get()} onChange={_handleFormUpdate}  name="pass" css={tw`bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3`} />
						</div>
						<div css={tw`flex justify-end`}>
							<a href="#" css={tw`text-sm text-purple-600 hover:text-purple-700 hover:underline mb-6`}>Forgot your password?</a>
						</div>

						<button onClick={_handleRegister} css={tw`bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200`}>Register</button>
						<div>
							debug {JSON.stringify(formState.get())}
						</div>
					</form>
				</section>
			</main>

			<div css={tw`max-w-lg mx-auto text-center mt-12 mb-6`}>
				<p css={tw`text-white`}>Don't have an account? 
					<a href="#" css={tw`font-bold hover:underline`}>Sign up</a>.
				</p>
			</div>

			<footer css={tw`max-w-lg mx-auto flex justify-center text-white`}>
				<a href="#" css={tw`hover:underline`}>Contact</a>
				<span css={tw`mx-3`}>•</span>
				<a href="#" css={tw`hover:underline`}>Privacy</a>
			</footer>
		</div>
	)

	function _handleFormUpdate(e) {
		// var value = e.target.name === "tags"
		// 	? e.target.value.split(",")
		// 	: e.target.value;

		var {name, value} = e.target
		formState.set( props => ({ 
			...props,
			[name]: value,
			isDirty: true
		}))
	}

	function _handleRegister(e) {
		e.preventDefault()

		// @TODO block if confirm dont match email

		fetch('http://localhost:3000/api/auth/register', {
			method: 'post',
			body: JSON.stringify(formState.get()),
			headers: {
				"Content-Type": "application/json"
			}
		})
	}
}
