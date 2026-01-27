import { useState } from "react";

function Login() {

  const [username, setUsername] = useState("");
        // We are initializing it with strings, because we want the to have value type as strings.
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    // The following command prevents page from refreshing,because this is the default behavior of HTML. We do this because if page gets refreshed, our react state will get wiped clean.
    event.preventDefault();   
    console.log(username, password);
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>

        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Login</button>

      </form>
    </div>
  );
}

export default Login;
