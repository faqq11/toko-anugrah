import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import SideBar from "../components/SideBar";

export default function AdminLayout() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(res.data.data);
      } catch (err) {
        console.error(err);
        navigate("/login", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  useEffect(() => {
    if (!loading && user && user.role !== "admin") {
      navigate("/", { replace: true });
    }
  }, [user, loading, navigate]);

  if (loading) return <p>Loading...</p>;

  if (!user || user.role !== "admin") return null;

  return (
    <>
      <div className="min-h-screen flex">
        <SideBar />
        <div className="min-h-screen bg-amber-100">
          <Outlet />
        </div>
      </div>
    </>
  );
}
