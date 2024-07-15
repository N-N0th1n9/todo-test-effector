import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useUnit } from 'effector-react'
import TodosContainer from '../entities/todos-container'
import { $todos } from '../entities/todos-container/ui/todo/model'

function Home() {
	const todos = useUnit($todos)

	return (
		<div>
			<div className='flex gap-2 my-7'>
				<TextField
					fullWidth
					label='Create'
					className='basis-4/5'
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
				<Button variant='contained' className='basis-1/5'>
					Add todo
				</Button>
			</div>
			<div className='flex gap-7'>
				<TodosContainer
					todos={todos.filter(todo => todo.type === 'today')}
					title='Today'
				/>
				<TodosContainer
					todos={todos.filter(todo => todo.type === 'tomorrow')}
					title='Tomorrow'
				/>
				<TodosContainer
					todos={todos.filter(todo => todo.type === 'other')}
					title='7 days'
				/>
			</div>
		</div>
	)
}

export default Home
