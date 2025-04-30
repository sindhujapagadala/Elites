import { useState } from "react";
import axios from "axios";

function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:8080/user/login?name=${name}&email=${email}&password=${password}`
      );

      if (response.status === 200) {
        console.log("Login successful:", response.data);
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage("An error occurred while logging in.");
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  );
}

export default Login;
