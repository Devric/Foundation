// AuthGuard
//
// Used to guard authetnication and authroization at component level
// renders 3 outcomes: 
// -- child component if has permission
// -- to hide the child component
// -- to hide child and show not permitted message

import React from 'react'


// children: child component that should be rendered
// permission
// hide: boolean, should render message or hide the component completely
export default function AuthGuard({ children, permission, hide }: { children: React.ReactNode, permission:string, hide:boolean }) {
	let auth = {user:false};
	let error = false

	let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJvYiIsIm1ldGEiOnsibXNnIjoic29tZSBtZXNzYWdlIn0sImlhdCI6MTY0NzM0MTQzNiwiZXhwIjoxNjQ3MzQyMzM2fQ.MGYPAHx6u5w634g67PsaihSKsNuBiThMOJLMnyEvEDQ"

	console.log(jwtDecode(token))

	if (error) {
		if(hide) {
			return ""
		} else {
			return (
				<>No Permission</>
			)
		}
	}

	// if success with permission
	return ( children );
}

// TODO shared client lib, cannot use jwt.verify as Buffer dont exists in browser
function jwtDecode(token: string): string {
	// if window defiend return decoded
	if (typeof window !== "undefined") return (window as any).atob(token.split('.')[1])
	return ""
}


