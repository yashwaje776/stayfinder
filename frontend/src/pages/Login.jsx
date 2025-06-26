import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/Usercontext";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const { settoken, backend_url } = useContext(UserContext);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("user"); 

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { data } = await axios.post(`${backend_url}/api/user/login`, { email, password });
      if (data.success) {
        localStorage.setItem("token", data.token);
        settoken(data.token);
        toast.success("Login successful");
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleRegister = async () => {
    try {
      const { data } = await axios.post(`${backend_url}/api/user/register`, {
        username,
        email,
        password,
        role, 
      });
      if (data.success) {
        localStorage.setItem("token", data.token);
        settoken(data.token);
        toast.success("Account created successfully");
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      await handleLogin();
    } else {
      await handleRegister();
    }
  };

  return (
 <form
  onSubmit={handleSubmit}
  className="fixed inset-0 flex items-center justify-center bg-gray-300 z-50"
>

      <div className="w-full max-w-md bg-[#EFF1DB] border border-gray-200 rounded-xl shadow-lg p-8 space-y-5">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          {isLogin ? "Welcome Back" : "Create an Account"}
        </h2>

        {!isLogin && (
          <>
            <div>
              <label className="text-sm text-gray-600">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Account Type</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="user">User</option>
                <option value="host">Host</option>
              </select>
            </div>
          </>
        )}

        <div>
          <label className="text-sm text-gray-600">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition cursor-pointer"
        >
          {isLogin ? "Login" : "Create Account"}
        </button>

        <p className="text-sm text-gray-600 text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign up here" : "Login here"}
          </span>
        </p>
      </div>
    </form>
  );
};

export default Login;
