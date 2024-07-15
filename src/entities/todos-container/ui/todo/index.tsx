import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { Typography } from '@mui/material'
import { useUnit } from 'effector-react'
import { FC } from 'react'
import { ITodo } from '../../../../shared/types/todo.type'
import { removeTodo } from './model'

interface ITodoProps {
	todo: ITodo
}

const Todo: FC<ITodoProps> = ({ todo }) => {
	const remove = useUnit(removeTodo)

	return (
		<div className='flex mb-3 bg-sky-600 p-2 rounded-md border border-gray-800'>
			<Typography
				variant='body1'
				key={todo.id}
				className={`flex basis-3/4 pl-4 ${
					todo.completed ? 'line-through' : ''
				}`}
			>
				{todo.text}
			</Typography>
			<div className='flex basis-1/4'>
				<button>
					<EditOutlinedIcon />
				</button>
				<button onClick={() => remove(todo.id)}>
					<DeleteOutlineOutlinedIcon />
				</button>
			</div>
		</div>
	)
}

export default Todo
