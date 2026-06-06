import { useNavigate } from "react-router-dom";

function Settings() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>

      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}

export default Settings;