import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import Context from '../context'

function NoteItem({todos, todo, index, onChange}) {
	const {removeTodo} = useContext(Context)
	const classSpan = []
	const classLi = []

	if (todo.completed) {
		classSpan.push('span-completed')
		classLi.push('li-completed')

		if (todo.rendered) {
			classLi.push('active-li')		
		}

	} else {

		if (todo.rendered) {
			classLi.push('active-li')		
		}

	}

		for (let i = 0; i < todos.length; i++) {
	  		if (todos[i].rendered === true && document.getElementsByTagName('li')[i].classList.contains('active-li') === false) {

	  			document.getElementsByTagName('textarea')[0].setAttribute('disabled', '')
	  			document.getElementsByTagName('textarea')[1].setAttribute('disabled', '')

	  			document.getElementsByTagName('textarea')[0].value = ''
	  			document.getElementsByTagName('textarea')[1].value = ''

	  			todos[i].rendered = false
	  		}
	  	}

	  function liOnClick() {

	  	todo.rendered = !todo.rendered

	  	for (let i = 0; i < todos.length; i++) {

	  		if (document.getElementsByTagName('li')[i].getAttribute('id') !== todo.id) {
	  			document.getElementsByTagName('li')[i].classList.remove('active-li')
	  			document.getElementsByTagName('li')[i].getElementsByTagName('span')[2].classList.remove('active-span')
	  			todos[i].rendered = false
	  		}

	  	}

	  	if (todo.rendered === true) {

	 		document.getElementById(todo.id).classList.add('active-li')
	 		document.getElementById(todo.id).getElementsByTagName('span')[2].classList.add('active-span')

	 		document.getElementsByTagName('textarea')[0].removeAttribute('disabled')
	  		document.getElementsByTagName('textarea')[1].removeAttribute('disabled')

	  		document.getElementsByTagName('textarea')[0].value = todo.title
			document.getElementsByTagName('textarea')[1].value = todo.description

	  	} else if (todo.rendered === false) {

	  		document.getElementById(todo.id).classList.remove('active-li')
	  		document.getElementById(todo.id).getElementsByTagName('span')[2].classList.remove('active-span')

	  		document.getElementsByTagName('textarea')[0].setAttribute('disabled', '')
	  		document.getElementsByTagName('textarea')[1].setAttribute('disabled', '')

	  		document.getElementsByTagName('textarea')[0].value = ''
			document.getElementsByTagName('textarea')[1].value = ''

	  	} else {
	  		document.getElementsByTagName('textarea')[0].setAttribute('disabled', '')
	  		document.getElementsByTagName('textarea')[1].setAttribute('disabled', '')

	  		document.getElementsByTagName('textarea')[0].value = ''
			document.getElementsByTagName('textarea')[1].value = ''
	  	}

	  }

	return (
		<li id={todo.id} className={classLi.join(' ')}>
		<span className={classSpan.join(' ')}>
		<input checked={todo.completed} type="checkbox" id={todo.id} onChange={() => onChange(todo.id)}/>
		{index + 1}. <span>{todo.title}</span>
		</span> 
		<div className='buttons'>
			<span>&#9998;</span>
			<button onClick={liOnClick} className='edit-button'>• • •</button> 
			<button onClick={removeTodo.bind(null, todo.id)}>&times;</button>
		</div>
		</li>
	)
}

NoteItem.propTypes = {
	todo: PropTypes.object.isRequired,
	index: PropTypes.number.isRequired,
	onChange: PropTypes.func.isRequired
}

export default NoteItem