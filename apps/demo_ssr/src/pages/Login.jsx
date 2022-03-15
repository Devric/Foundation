import React,{useEffect} from 'react'
import GlobalState, { useState } from '../client/GlobalState'
import tw, { css } from 'twin.macro'

import { Persistence } from '@hookstate/persistence';

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

export default function Login() {
	const state = useState(GlobalState)
	const LocalAuth = useState("")

	if (typeof window !== "undefined") LocalAuth.attach(Persistence("auth"));

	const formState = useState({ email: "", pass: "", isDirty: false })

	let location = useLocation
	// state.from is saved at AuthRedirect
	let from = location.state?.from?.pathname || '/'
	function BackToOriginalUrl() {
		navigate(from, {replace: true})
	}

	useEffect(()=>{
		LocalAuth.set("sdfasofijaweoifjag23432")
	},[])

	return (
		<div css={tw`relative items-center justify-center w-full overflow-x-hidden lg:pt-40 lg:pb-40 xl:pt-40 xl:pb-64`}>
			<div>
				debug {JSON.stringify(formState.get())}
			</div>
			<div>
				Email:
				<input name="email" type="email"    value={formState.email.get()} onChange={_handleFormUpdate} css={tw`form-input px-4 py-3 rounded-md`} />
			</div>
			<div>
				Pass:
				<input name="pass" type="password"  value={formState.pass.get()} onChange={_handleFormUpdate} css={tw`form-input px-4 py-3 rounded-md`} />
			</div>
			<button onClick={_handleLogin}>Login</button>
		</div>
	)

	function _handleFormUpdate(e) {
		// var value = e.target.name === "tags"
		// 					? e.target.value.split(",")
		// 					: e.target.value;

		var {name, value} = e.target
		formState.set( props => ({ 
			...props,
			[name]: value,
			isDirty: true
		}))
	}

	function _handleLogin(e) {
		e.preventDefault()
		fetch('http://localhost:3000/api/auth/login', {
			method: 'post',
			body: JSON.stringify(formState.get()),
			headers: {
				"Content-Type": "application/json"
			}
		})
	}
}
