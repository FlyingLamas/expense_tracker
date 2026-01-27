import { useState } from "react";

import api from "../api/axios";

function Login() {

  const [username, setUsername] = useState("");
        // We are initializing it with strings, because we want the to have value type as strings.
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    // The following command prevents page from refreshing, because refreshin is the default behavior of HTML. We do this because if page gets refreshed, our react state will get wiped clean.
    event.preventDefault();   
    try {
      const response = await api.post("account/login/", {
              //  await is the pause button, which tells javascript, wait till django sends a reply.
      username,
      password,
    });

    console.log(response.data);
    // response data will contain access and refresh token.
    // response is a massive object containing everything about the transaction (Headers, Status Code 200, Config).
    // .data: This is the specific part we care about that is the - JSON body Django sent back.

    } catch (error) {
      console.log(error);
    }
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
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <button type="submit">Login</button>

      </form>
    </div>
  );
}

export default Login;
