import React from 'react'

function Workspace(props) {

  function editTodo() {
      props.setTodos(
      props.todos.map(todo => {

        localStorage.setItem('todos', JSON.stringify(props.todos)) // Сохранение изменений в Local Storage

        if (todo.rendered === true && document.getElementsByTagName('textarea')[0].value != false) {

        todo.title = document.getElementsByTagName('textarea')[0].value
        todo.description = document.getElementsByTagName('textarea')[1].value
        
        }  

        return todo
    }))
      localStorage.setItem('todos', JSON.stringify(props.todos))
  }

  return (
          <div className="render"> 
          <div className="render-title">
            <textarea disabled placeholder='Заголовок' onChange={editTodo}></textarea>
          </div>
          <div className="render-description">
            <textarea disabled placeholder='Описание заметки' onChange={editTodo}></textarea>
          </div>      
        </div>
  )
}

export default Workspace