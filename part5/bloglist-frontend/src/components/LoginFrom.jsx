import { useState } from "react"


const LoginForm = ({ handleLogin }) => {
  const { username, setUsername } = useState('')
  const { password, setPassword } = useState('')

  const handleLogin = (event) => {
    event.preventDefault()
    handleLogin({ username, password })
  }

  return (
    <form>
      <div>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Log in</button>
    </form>
  )
}

export default LoginForm