import { createEvent, createStore } from 'effector'
import { debug } from 'patronum'
import { ITodo } from '../../../../shared/types/todo.type'

interface EditTodoText {
	id: string
	text: string
	type?: never // completed не может быть в этом типе
}

interface EditTodoCompleted {
	id: string
	text?: never // text не может быть в этом типе
	type?: 'today' | 'tomorrow' | 'other'
}

type EditTodo = EditTodoText | EditTodoCompleted

export const removeTodo = createEvent<string>()
export const addTodo = createEvent<string>()
export const editTodo = createEvent<EditTodo>()
export const completeTodoToggled = createEvent<string>()

export const $todos = createStore<ITodo[]>([
	{ id: '1', text: 'Buy groceries', completed: false, type: 'today' },
	{
		id: '2',
		text: 'Clean the house',
		completed: true,
		type: 'tomorrow',
	},
	{ id: '3', text: 'Do laundry', completed: false, type: 'other' },
])

$todos.on(removeTodo, (list, id) => {
	return list.filter(todo => todo.id !== id)
})

$todos.on(addTodo, (list, text) => {
	return [
		...list,
		{ id: Date.now().toString(), text, completed: false, type: 'today' },
	]
})

$todos.on(editTodo, (list, { id, text, type }) => {
	if (text !== undefined) {
		return list.map(todo => (todo.id === id ? { ...todo, text } : todo))
	} else if (type !== undefined) {
		return list.map(todo => (todo.id == id ? { ...todo, type } : todo))
	}
	return list
})

$todos.on(completeTodoToggled, (list, id) => {
	return list.map(todo =>
		todo.id === id ? { ...todo, completed: !todo.completed } : todo
	)
})

debug($todos)
