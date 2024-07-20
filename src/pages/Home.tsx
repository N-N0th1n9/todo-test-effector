import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useUnit } from 'effector-react'
import { FormEvent, useState } from 'react'
import TodosContainer from '../entities/todos-container'
import { $todos, addTodo } from '../entities/todos-container/ui/todo/model'

function Home() {
	const [todos, createTodo] = useUnit([$todos, addTodo])
	const [text, setText] = useState('')

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (text.trim()) {
			createTodo(text)
			setText('')
		}
	}

	return (
		<div>
			<form className='flex gap-2 my-7' onSubmit={handleSubmit}>
				<TextField
					fullWidth
					label='Create'
					className='basis-4/5'
					value={text}
					onChange={e => setText(e.target.value)}
					sx={{
						borderRadius: 1,
						color: '#ffffffde',
						'& .MuiOutlinedInput-root': {
							'& fieldset': {
								borderColor: '#ffffffde',
							},
							'&:hover fieldset': {
								borderColor: '#ffffffde',
							},
							'&.Mui-focused fieldset': {
								borderColor: '#ffffffde',
							},
						},
						'& .MuiInputBase-root': {
							color: '#ffffffde',
						},
						'& .MuiInputLabel-root': {
							color: '#ffffffde',
						},
					}}
				/>
				<Button variant='contained' className='basis-1/5' type='submit'>
					Add todo
				</Button>
			</form>
			<div className='flex gap-7'>
				<TodosContainer
					todos={todos.filter(todo => todo.type === 'today')}
					type='today'
				/>
				<TodosContainer
					todos={todos.filter(todo => todo.type === 'tomorrow')}
					type='tomorrow'
				/>
				<TodosContainer
					todos={todos.filter(todo => todo.type === 'other')}
					type='other'
				/>
			</div>
		</div>
	)
}

export default Home
