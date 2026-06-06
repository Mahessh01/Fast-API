import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Candidates() {
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    // 🔒 if no token, redirect
    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, []);

    // FETCH CANDIDATES
    const fetchCandidates = async () => {
        try {
            const res = await fetch("http://127.0.0.1:8000/candidates/all", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                throw new Error("Failed to fetch");
            }

            const data = await res.json();
            setCandidates(data);
        } catch (err) {
            toast.error("Error loading candidates");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCandidates();
    }, []);

    // DELETE
    const deleteCandidate = async (id) => {
        if (!confirm("Delete this candidate?")) return;

        try {
            const res = await fetch(
                `http://127.0.0.1:8000/candidates/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.ok) {
                toast.success("Deleted");
                fetchCandidates();
            } else {
                toast.error("Delete failed");
            }
        } catch (err) {
            toast.error("Server error");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            {/* HEADER */}
            <div className="flex justify-between mb-6">
                <h1 className="text-2xl font-bold">Candidates</h1>

                <button
                    onClick={() => navigate("/dashboard")}
                    className="bg-purple-600 text-white px-4 py-2 rounded"
                >
                    Back to Dashboard
                </button>
            </div>

            {/* CONTENT */}
            {loading ? (
                <p>Loading...</p>
            ) : candidates.length === 0 ? (
                <p>No candidates found</p>
            ) : (
                <table className="w-full bg-white shadow rounded">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-3">ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Skills</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {candidates.map((c) => (
                            <tr key={c.id} className="border-b">
                                <td className="p-3">{c.id}</td>
                                <td>{c.name}</td>
                                <td>{c.email}</td>
                                <td>{c.phone}</td>
                                <td>{c.skills}</td>
                                <td>
                                    <button
                                        onClick={() => deleteCandidate(c.id)}
                                        className="text-red-500"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Candidates;