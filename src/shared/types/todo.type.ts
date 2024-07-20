export interface ITodo {
	id: string
	text: string
	completed: boolean
	type: 'today' | 'tomorrow' | 'other'
}
