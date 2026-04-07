import { useState } from "react";
import "./styles/login-register.css";

function Login() {
  const [darkMode, setDarkMode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:1337/api/auth/local", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          identifier: email,
          password: password
        })
      });

      const data = await res.json();
      console.log("Login response:", data);

      if (data.jwt && data.user) {
     
        localStorage.setItem("token", data.jwt);
        localStorage.setItem("userId", data.user.id);

        window.location.href = "/boards"; 
      } else {
        alert("Login failed. Please check your credentials.");
      }
      
    } catch (err) {
      console.error("Login error:", err);
      alert("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      className={`container-login-register ${darkMode ? "dark-mode" : ""}`}
      onSubmit={handleLogin}>

      <div className="form-login-register">
        <h2 className="h2-login-register">Login</h2>

        <div>
          <input
            className="input-login-register"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="input-login-register"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="button-login-register" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="link-register">
          <a href="/register">Sign up</a>
        </div>
      </div>

      <button
        type="button"
        className="dark-toggle-login-register"
        onClick={() => setDarkMode(!darkMode)}>  
        {darkMode ? "Light" : "Dark"}
      </button>
    </form>
  );
}

export default Login;