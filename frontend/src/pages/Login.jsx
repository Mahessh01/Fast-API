import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.access_token) {
        localStorage.setItem("token", data.access_token);
        toast.success("Login successful");
        navigate("/dashboard");
      } else {
        toast.error(data.detail || "Login failed");
      }
    } catch {
      toast.error("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        <input
          className="w-full border p-2 mb-3"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full border p-2 mb-3"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-blue-600 text-white p-2 rounded">
          Login
        </button>

        <p
          className="text-blue-600 mt-3 cursor-pointer"
          onClick={() => navigate("/register")}
        >
          Create account
        </p>
      </form>
    </div>
  );
}

export default Login;