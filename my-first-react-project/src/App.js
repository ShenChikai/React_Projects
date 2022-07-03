import React, {useState, useRef, useEffect} from "react"
import Todo from './TodoList'
import { v4 as uuidv4 } from 'uuid'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  // React: useState, create an state array of [obj, func to manipulate obj]
  const [todos, setTodos] = useState([])
  // React: useRef, provide reference to target element
  const todoNameRef = useRef()
  // React: useEffect, do smth when smth changes
  //    Load, This will be called only once with a empty target for change
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) {
      setTodos(storedTodos)
      console.log('TodoList Loaded:', storedTodos)
    }
  }, [])
  
  //    Store, save todos to local when changed
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
    console.log('TodoList Saved.')
  }, [todos])

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null
  }

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
      <Todo todos={todos} toggleTodo={toggleTodo} />
      <input ref = {todoNameRef} type="text" />
      <button onClick={handleAddTodo}> Add Todo </button>
      <button onClick={handleClearTodos}> Clear Completed</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  )
}

export default App;
