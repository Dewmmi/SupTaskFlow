import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./styles/Boards.css"

function Boards() {

  const [darkMode, setDarkMode] = useState(false);
  const [boards, setBoards] = useState([])
  const [title, setTitle] = useState("")

  const navigate = useNavigate()

  useEffect(() => {

    const token = localStorage.getItem("token")
    const userId = localStorage.getItem("userId")

    fetch(`http://localhost:1337/api/boards?filters[user][id][$eq]=${userId}&populate=user`, {
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(res => res.json())
      .then(data => {

        console.log("Boards:", data)

        if(data.data){
          setBoards(data.data)
        }
      })
  }, [])

  function createBoard(){

    const token = localStorage.getItem("token")
    const userId = localStorage.getItem("userId")

    fetch("http://localhost:1337/api/boards", {

      method:"POST",
      headers:{
        "Content-Type":"application/json",
        Authorization:"Bearer " + token
      },

      body: JSON.stringify({
        data:{
          title:title,
          user:{
            connect:[parseInt(userId)]
          }
        }
      })
    })

    .then(res => res.json())
    .then(data => {

      console.log("STRAPI RESPONSE:",data)

      if(data.data){
        setBoards([...boards,data.data])
        setTitle("")
      }
    })
  }

  function logout(){
    localStorage.clear()
    window.location.href="/login"
  }


  return(

  <div className={darkMode ? "background_board dark-mode" : "background_board"}>
    <h1>Boards</h1>

    <button onClick={logout} className="logout_board">
      Logout
    </button>

    <button className="dark-toggle-about"
      onClick={() => setDarkMode(!darkMode)}>
      {darkMode ? "Light" : "Dark"}
    </button>

    <hr/>

    <div>
      <input
        className="text_board"
        type="text"
        placeholder="Board title"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
      />

      <button
        onClick={createBoard}
        className="create_button_board"
      >
        Create Board
      </button>
    </div>

    <div className="boards_container">
      {boards.map(board => (

        <div key={board.id} className="board_card">
          <button className="delete_board">
            ✕
          </button>

          <p className="board_title" onClick={() => navigate("/boards/" + board.documentId)}> {board.title}</p>
        </div>
      ))}
    </div>
  </div>
  )
}

export default Boards