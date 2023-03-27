import Tasks from '@/components/Tasks'
import React from 'react'

const Todo = ({ deleteTask, tasks, input, setInput, addtask }) => {
  console.log(tasks)
  return (
    <div>
      <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
        <input style={{margin: "10px", height: "30px"}} value={input} onChange={e => setInput(e.target.value)} type="text" placeholder="Enter task" />
        <button onClick={addtask} style={{height: "30px"}}>Add Task</button>
      </div>
      {
        tasks.map(todo => (
          <Tasks key={todo.id} taskText={todo.taskText} onClick={deleteTask(todo.id)} />
        ))
      }
    </div>
  )
}

export default Todo
