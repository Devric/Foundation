/* AuthRedirect
 *
 * Used at page level, redirects user to login page, if logim expiredimport * as React from 'react';
 */

import React from 'react'

import {
	useLocation,
	Navigate,
} from 'react-router-dom';


export default function AuthRedirect({ children }: { children: JSX.Element }) {
	let auth = {user:false};
	let location = useLocation();
	let error = false

	let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJvYiIsIm1ldGEiOnsibXNnIjoic29tZSBtZXNzYWdlIn0sImlhdCI6MTY0NzM0MTQzNiwiZXhwIjoxNjQ3MzQyMzM2fQ.MGYPAHx6u5w634g67PsaihSKsNuBiThMOJLMnyEvEDQ"

	console.log(jwtDecode(token))

	// Check JWT


	if (error) {
		// Redirect them to the /login page, but save the current location they were
		// trying to go to when they were redirected. This allows us to send them
		// along to that page after they login, which is a nicer user experience
		// than dropping them off on the home page.
		return <Navigate to="/login" state={{ from: location }} replace={true} />;
	}
	return ( children );
}

function jwtDecode(token: string): string {
	// if window defiend return decoded
	if (typeof window !== "undefined") return (window as any).atob(token.split('.')[1])
	return ""
}
