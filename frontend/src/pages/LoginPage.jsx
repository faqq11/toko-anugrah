import axios from "axios";
import { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router";

export default function LoginPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/" replace />;
  }

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/users/login",
        user
      );

      localStorage.setItem("token", data.data.access_token);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <div className="min-h-screen w-screen flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex flex-col items-center gap-1 py-6 bg-green-600">
            <h1 className="text-2xl font-bold text-white">Toko Anugrah</h1>
          </div>

          <div className="py-4">
            <h2 className="text-center text-xl font-semibold">Login</h2>
          </div>

          <form
            className="flex flex-col gap-5 px-6 py-6"
            onSubmit={loginHandler}
          >
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-slate-600">
                Email
              </label>
              <input
                type="email"
                placeholder="example@mail.com"
                className="border border-slate-300 rounded-lg px-3 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                value={user?.email}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-slate-600">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                className="border border-slate-300 rounded-lg px-3 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                value={user?.password}
              />
            </div>

            <button
              type="submit"
              className="mt-2 bg-green-600 hover:bg-green-700
                   text-white font-semibold py-2 rounded-lg
                   transition duration-200 shadow-sm"
            >
              Login
            </button>
          </form>
          <p className="text-center pb-6">
            Don't have an account yet?{" "}
            <Link
              className="text-green-600 hover:text-green-500 underline"
              to={"/register"}
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
