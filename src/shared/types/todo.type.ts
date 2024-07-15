export interface ITodo {
	id: number
	text: string
	completed: boolean
	type: 'today' | 'tomorrow' | 'other'
}
