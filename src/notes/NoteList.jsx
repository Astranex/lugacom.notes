import React, {useState} from 'react'
import PropTypes from 'prop-types'
import NoteItem from './NoteItem'

function NoteList(props) {
	const [value, setValue] = useState('')

	const filteredNotes = props.todos.filter(todo => {
		return todo.title.toLowerCase().includes(value.toLowerCase())
	})

	function search(event) {
		setValue(event.target.value)

		for (let i = 0; i < filteredNotes.length; i++) {
	 		document.getElementsByTagName('li')[i].classList.remove('active-li')
	 		document.getElementsByTagName('li')[i].getElementsByTagName('span')[2].classList.remove('active-span')
	 		filteredNotes[i].rendered = false
	 	}

	  	document.getElementsByTagName('textarea')[0].setAttribute('disabled', '')
	  	document.getElementsByTagName('textarea')[1].setAttribute('disabled', '')

	  	document.getElementsByTagName('textarea')[0].value = ''
	  	document.getElementsByTagName('textarea')[1].value = ''
	}

	return (
		<ul>
			<input placeholder='Поиск заметки... &#128269;' type="text" onChange={search}/>
			{
			filteredNotes.map((todo, index) => {
				return <NoteItem todos={filteredNotes} todo={todo} index={index} key={todo.id} onChange={props.onToggle}/>
			})
			}
		</ul>
	)
}

NoteList.propTypes = {
	todos: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default NoteList