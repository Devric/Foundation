/* AuthRedirect
 *
 * Used at page level, redirects user to login page, if logim expiredimport * as React from 'react';
 */

import React, {useEffect} from 'react'
import GlobalState, { useState, Persistence } from '../GlobalState'

import {
	useLocation,
	Navigate,
} from 'react-router-dom';


export default function AuthRedirect({ children }: { children: JSX.Element }) {
	let location = useLocation();
	let error = false

	const LocalAuth = useState(null)
	if (typeof window !== "undefined") LocalAuth.attach(Persistence("auth"));

	var token = LocalAuth.get()

	var auth = typeof token === "string" && !jwtExpired(token)


	return auth ? ( children ) : (<Navigate to="/login" state={{ from: location }} replace={true} /> )
}

function jwtDecode(token: string): string {
	// if window defiend return decoded
	if (typeof window !== "undefined") return (window as any).atob(token.split('.')[1])
	return ""
}

function jwtExpired(token: string): boolean {
	var { exp } = JSON.parse(jwtDecode(token))
	return Math.floor((new Date).getTime() / 1000) >= exp
}
