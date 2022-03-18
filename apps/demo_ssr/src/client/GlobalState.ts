import { createState, useState } from '@hookstate/core'

export default createState({
	counter: 0,
	isLoggedin: false
})

export { useState } from '@hookstate/core'

export { Persistence } from '@hookstate/persistence';
