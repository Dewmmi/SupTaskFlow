import { useState } from "react"

function TaskCard({ title }) {
  const [isUrgent, setIsUrgent] = useState(false)

  return (
    <div
      style={{
        border: "10px solid black",
        padding: "10px",
        margin: "10px",
        backgroundColor: isUrgent ? "red" : "white"
      }}
    >
      <h3>{title}</h3>
      <button onClick={() => setIsUrgent(true)}>
        Urgent
      </button>
    </div>
  )
}

export default TaskCard
