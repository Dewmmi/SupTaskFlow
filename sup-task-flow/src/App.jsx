import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./login"
import Register from "./register"
import About from "./About"
import Boards from "./Boards"
import BoardDetails from "./BoardDetails"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/boards" element={<Boards />} />
        <Route path="/boards/:id" element={<BoardDetails />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App