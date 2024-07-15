import { Typography } from '@mui/material'
import { FC } from 'react'
import { ITodo } from '../../shared/types/todo.type'
import Todo from './ui/todo'

interface IProps {
	title: string
	todos: ITodo[]
}

const TodosContainer: FC<IProps> = ({ title, todos }) => {
	return (
		<div className='text-center bg-sky-700 h-full rounded-lg p-2'>
			<Typography variant='h5' my={2}>
				{title}
			</Typography>
			{todos.map((todo: ITodo) => (
				<Todo todo={todo} key={todo.id} />
			))}
		</div>
	)
}

export default TodosContainer
