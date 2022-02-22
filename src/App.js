import React from 'react'
import NoteList from './notes/NoteList'
import AddNote from './notes/AddNote'
import Workspace from './render/Workspace'
import Context from './context'

function App() {

  const [todos, setTodos] = React.useState([
    // {id: 1, completed: false, rendered: false, title: 'Купить хлеб', description: ''},
    // {id: 2, completed: false, rendered: false, title: 'Купить масло', description: ''},
    // {id: 3, completed: false, rendered: false, title: 'Сделать реферат', description: ''}
  ])

  let localStorageTodos = JSON.parse(localStorage.getItem('todos'))

    if (todos && localStorageTodos) {

    for (let i = 0; i < localStorageTodos.length; i++) {
      
      if (todos[i]) {

        localStorageTodos[i].rendered = false
        todos[i].completed = localStorageTodos[i].completed

        todos[i].id = localStorageTodos[i].id
        todos[i].title = localStorageTodos[i].title
        todos[i].description = localStorageTodos[i].description

      } else if (todos[i] !== true && localStorageTodos[i]) {

        localStorageTodos[i].rendered = false
        todos.push(localStorageTodos[i])

      }
    }
  }

  function toggleTodo(id) {

    setTodos(
      todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo
    }))

    localStorage.setItem('todos', JSON.stringify(todos))
  }

  function addNote(title) {

    setTodos(
      todos.concat([{
      id: new Date(),
      completed: false,
      rendered: false,
      title,
      description: ''
    }]))

  }

  function removeTodo(id) {

    if (window.confirm('Вы точно хотите удалить заметку?')) {

      localStorage.setItem('todos', JSON.stringify(todos))

        for (let i = 0; i < todos.length; i++) {

          if (todos[i].id === id && localStorageTodos[i].id === id) {

            localStorageTodos.splice(i, 1)
            setTodos(
            todos.splice(i, 1)
            )
            localStorage.setItem('todos', JSON.stringify(todos))

          } 

          document.getElementsByTagName('li')[i].classList.remove('active-li')
          document.getElementsByTagName('li')[i].getElementsByTagName('span')[2].classList.remove('active-span')
        }

        document.getElementsByTagName('textarea')[0].setAttribute('disabled', '')
        document.getElementsByTagName('textarea')[1].setAttribute('disabled', '')

        document.getElementsByTagName('textarea')[0].value = ''
        document.getElementsByTagName('textarea')[1].value = ''

      setTodos(todos.filter(todo => {
        return todo.id !== id
      }))
    }

    localStorage.setItem('todos', JSON.stringify(todos))
  }
 
  return (
    <Context.Provider value={{removeTodo}} onChange={localStorage.setItem('todos', JSON.stringify(todos))}> 
    <div className='wrapper'>

      <h1><img className='logo' src="logo.svg" alt="Логотип"/>Лугаком</h1>

      <div className='sidebar'>

          {todos.length ? <div className='todo'><NoteList todos={todos} onToggle={toggleTodo}/></div> : <p className='no-notes'>Заметок нет!</p>}
          
          <AddNote onCreate={addNote} />
      </div>

      <Workspace todos={todos} setTodos={setTodos}/>

    </div>
    </Context.Provider>
  )
}

export default App
