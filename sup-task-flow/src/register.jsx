import { useState } from "react"
import "./styles/register.css"

function Register() {
  const [darkMode, setDarkMode] = useState(false);
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleRegister(e) {
    e.preventDefault()

    const res = await fetch("http://localhost:1337/api/auth/local/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        email,
        password
      })
    })

    const data = await res.json()
    console.log(data)

    if (data.jwt) {
      alert("Registered!")
    } else {
      alert("Error")
    }
  }

  return (
    <form className={`container-login-register ${darkMode ? "dark-mode" : ""}`} 
    onSubmit={handleRegister}>
    <div className="form-login-register">
        <h2 className="h2-login-register">Register</h2>
            <div >
        <input className="input-login-register" placeholder="username" onChange={(e)=>setUsername(e.target.value)} />
        <input className="input-login-register" placeholder="email" onChange={(e)=>setEmail(e.target.value)} />
        <input className="input-login-register" placeholder="password" type="password" onChange={(e)=>setPassword(e.target.value)} />
            </div>
        <button className="button-login-register" >sign up</button>
        <div className="link-register"> <a href="/login">Login</a></div>
        <button
        type="button"
        className="dark-toggle-login-register"
        onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "Light" : "Dark"}
    </button>
    </div>
    </form>
  )
}

export default Register
