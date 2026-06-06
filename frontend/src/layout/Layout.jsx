import { Link, useNavigate } from "react-router-dom";

export default function Layout({ children }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-64 bg-white shadow-lg p-5">
        <h1 className="text-xl font-bold text-purple-600 mb-6">
          TechKraft SaaS
        </h1>

        <nav className="space-y-3">
          <Link className="block" to="/dashboard">Dashboard</Link>
          <button onClick={logout} className="text-red-500">
            Logout
          </button>
        </nav>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-6">
        {children}
      </div>
    </div>
  );
}