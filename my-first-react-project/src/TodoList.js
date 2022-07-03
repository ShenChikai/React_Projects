import React from 'react'
import Todo from './Todo'

// Project Tutorial from https://www.youtube.com/watch?v=hQAHSlTtcmY
export default function TodoList({todos, toggleTodo}) {
  return (
    todos.map(todo => {
      return <Todo key={todo.id} toggleTodo={toggleTodo} todo={todo} />
    })
  )
}
