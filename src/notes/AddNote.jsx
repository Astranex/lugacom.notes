import React, {useState} from 'react'
import PropTypes from 'prop-types'

function AddNote ({onCreate}) {
	const [value, setValue] = useState('')

	function sumbitHandler(event) {
		event.preventDefault()

		if (value.trim()) {
			onCreate(value)
			setValue('')
		}
	}

	return (
		<form className='add-note-form' onSubmit={sumbitHandler}>
			<input placeholder='Введите текст заметки...' className='add-note-input' value={value} onChange={event => setValue(event.target.value)}/>
			<button className='add-note-button' type='submit'>Добавить<br/>заметку<br/>+</button>
		</form>
	)
}

AddNote.propTypes = {
	onCreate: PropTypes.func.isRequired
}

export default AddNote