import { Typography } from '@mui/material'
import { useUnit } from 'effector-react'
import { DragEvent, FC } from 'react'
import { ITodo } from '../../shared/types/todo.type'
import Todo from './ui/todo'
import { editTodo } from './ui/todo/model'

interface IProps {
	type: ITodo['type']
	todos: ITodo[]
}

const TodosContainer: FC<IProps> = ({ type, todos }) => {
	const edit = useUnit(editTodo)

	const handleDrop = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		const draggedTodoId = e.dataTransfer.getData('text/plain')
		console.log(`Dropped Todo ID: ${draggedTodoId}, Target Type: ${type}`)

		// Обновляем тип задачи
		edit({ id: draggedTodoId, type: type })
	}

	return (
		<div
			className='text-center bg-sky-700 h-full rounded-lg p-2'
			onDrop={handleDrop}
			onDragOver={e => e.preventDefault()}
		>
			<Typography variant='h5' my={2}>
				{type.charAt(0).toUpperCase() + type.slice(1)}
			</Typography>
			{todos.map((todo: ITodo) => (
				<Todo todo={todo} key={todo.id} />
			))}
		</div>
	)
}

export default TodosContainer
