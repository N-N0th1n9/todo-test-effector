import { createEvent, createStore } from 'effector'
import { ITodo } from '../../../../shared/types/todo.type'

export const removeTodo = createEvent<number>()

export const $todos = createStore<ITodo[]>([
	{ id: 1, text: 'Buy groceries', completed: false, type: 'today' },
	{ id: 2, text: 'Clean the house', completed: true, type: 'tomorrow' },
	{ id: 3, text: 'Do laundry', completed: false, type: 'other' },
])

$todos.on(removeTodo, (list, id) => {
	return list.filter(todo => todo.id !== id)
})
