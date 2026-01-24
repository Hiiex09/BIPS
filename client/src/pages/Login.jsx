import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { loginUser } from "../api/auth_api.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const queryClient = useQueryClient();

  const { mutate: login } = useMutation({
    mutationKey: ["login"],
    mutationFn: loginUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["checkAuth"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div className="min-h p-20">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend className="m-5">Login</legend>
          <label className="floating-label m-3">
            <span>Email</span>
            <input
              type="text"
              placeholder="Email"
              className="input input-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="floating-label m-3">
            <span>Password</span>
            <input
              type="password"
              placeholder="Password"
              className="input input-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button className="btn btn-primary mx-3">Login</button>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;
