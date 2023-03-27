import React from 'react'

const Tasks = ({ taskText, onClick }) => {
    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "5%" }}>
            <div style={{ display: "flex" }}>
                <div style={{ margin: "10px" }}>
                    {taskText}
                </div>
                <button style={{cursor: "pointer"}} onClick={onClick}>Delete</button>
            </div>
        </div>
    )
}

export default Tasks