import CheckIcon from '@mui/icons-material/Check'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { useUnit } from 'effector-react'
import { ChangeEvent, DragEvent, FC, useEffect, useRef, useState } from 'react'
import { ITodo } from '../../../../shared/types/todo.type'
import { completeTodoToggled, editTodo, removeTodo } from './model'

interface ITodoProps {
	todo: ITodo
}

const Todo: FC<ITodoProps> = ({ todo }) => {
	const [remove, complete, edit] = useUnit([
		removeTodo,
		completeTodoToggled,
		editTodo,
	])
	const [isEdit, setIsEdit] = useState(false)
	const [newText, setNewText] = useState(todo.text)
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (isEdit && inputRef.current) {
			inputRef.current.focus()
		}
	}, [isEdit])

	const handleEdit = () => {
		if (!isEdit) {
			setIsEdit(true)
			return
		}

		edit({ id: todo.id, text: newText })
		setIsEdit(false)
	}

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setNewText(e.target.value)
	}

	const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
		e.dataTransfer.setData('text/plain', todo.id)
		e.dataTransfer.dropEffect = 'move'
	}

	return (
		<div
			className='flex mb-3 bg-sky-600 p-2 rounded-md border border-gray-800 cursor-pointer'
			draggable
			onDragStart={handleDragStart}
		>
			<button onClick={() => complete(todo.id)} className='basis-1/12'>
				<CheckIcon />
			</button>
			<input
				type='text'
				value={newText}
				className={`bg-transparent pl-4 ${
					todo.completed ? 'line-through' : ''
				}`}
				disabled={!isEdit}
				ref={inputRef}
				onChange={handleInputChange}
			/>
			<div className='flex basis-1/4 justify-end'>
				<button onClick={handleEdit}>
					<EditOutlinedIcon />
				</button>
				<button onClick={() => remove(todo.id)}>
					<DeleteOutlineOutlinedIcon />
				</button>
			</div>
			<DragIndicatorOutlinedIcon className='ml-2' />
		</div>
	)
}

export default Todo
