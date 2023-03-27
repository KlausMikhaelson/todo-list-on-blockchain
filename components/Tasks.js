import React from 'react'

const Tasks = ({ taskText, onClick }) => {
    return (
        <div>
            <div>
                {taskText}
            </div>
            <button onClick={onClick}>Delete</button>
        </div>
    )
}

export default Tasks