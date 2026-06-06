import { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [candidates, setCandidates] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    experience: ""
  });

  const token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/candidates/all", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();
      setCandidates(data);
    } catch {
      toast.error("Failed to load");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addCandidate = async () => {
    const res = await fetch("http://127.0.0.1:8000/candidates/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(form)
    });

    if (res.ok) {
      toast.success("Candidate added");
      setShowModal(false);
      setForm({ name:"", email:"", phone:"", skills:"", experience:"" });
      fetchData();
    } else {
      toast.error("Failed");
    }
  };

  const filtered = candidates.filter(c =>
    c.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>

      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          + Add Candidate
        </button>
      </div>

      {/* SEARCH */}
      <input
        className="border p-2 mb-4 w-full"
        placeholder="Search candidate..."
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* STATS */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 shadow rounded">
          Total: {candidates.length}
        </div>
        <div className="bg-white p-4 shadow rounded">
          Active: {candidates.length}
        </div>
        <div className="bg-white p-4 shadow rounded">
          Status: Live
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded shadow">
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Skills</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map(c => (
              <tr key={c.id} className="border-b">
                <td className="p-2">{c.id}</td>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td>{c.skills}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 w-96 rounded">

            <h2 className="text-xl mb-3">Add Candidate</h2>

            {Object.keys(form).map(key => (
              <input
                key={key}
                className="border p-2 w-full mb-2"
                placeholder={key}
                value={form[key]}
                onChange={(e) =>
                  setForm({ ...form, [key]: e.target.value })
                }
              />
            ))}

            <div className="flex justify-end gap-2 mt-3">
              <button onClick={() => setShowModal(false)}>
                Cancel
              </button>

              <button
                onClick={addCandidate}
                className="bg-purple-600 text-white px-3 py-1"
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}

    </Layout>
  );
}