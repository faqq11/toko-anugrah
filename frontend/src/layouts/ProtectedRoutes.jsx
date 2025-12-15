import { Navigate, Outlet } from "react-router";
import NavBar from "../components/NavBar";

export default function ProtectedRoute() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="min-h-screen bg-amber-100 px-20 py-8">
        <Outlet />
      </div>
    </div>
  );
}
