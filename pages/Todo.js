import Tasks from '@/components/Tasks'
import React from 'react'

const Todo = ({deleteTask,tasks, input,setInput, addtask}) => {
  console.log(tasks)
  return (
    <div>
      <input value={input} onChange={e => setInput(e.target.value)} type="text" placeholder="Enter task" />
      <button onClick={addtask}>Add Task</button>
    {
      tasks.map(todo => (
        <Tasks key={todo.id} taskText={todo.taskText} onClick={deleteTask(todo.id)} />
      ))
    }
    </div>
  )
}

export default Todo
