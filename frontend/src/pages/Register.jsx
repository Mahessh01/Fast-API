import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:8000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Registered successfully");
        navigate("/login");
      } else {
        toast.error(data.detail || "Registration failed");
      }
    } catch {
      toast.error("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded shadow w-96">
        <h2 className="text-xl font-bold mb-4">Register</h2>

        <input
          className="w-full border p-2 mb-3"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

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

        <button className="w-full bg-green-600 text-white p-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;