import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function RegisterPage() {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });
  const navigate = useNavigate();

  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/users/register", user);

      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <div className="min-h-screen w-screen flex items-center justify-center bg-slate-100">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex flex-col items-center gap-1 py-6 bg-green-600">
            <h1 className="text-2xl font-bold text-white">Toko Anugrah</h1>
          </div>
          <div className="py-4">
            <h1 className="text-center text-xl font-semibold">Register</h1>
          </div>

          <form
            className="flex flex-col gap-4 px-6 py-6"
            onSubmit={registerHandler}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-600">
                  First Name
                </label>
                <input
                  className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={user.first_name}
                  onChange={(e) =>
                    setUser({ ...user, first_name: e.target.value })
                  }
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-600">
                  Last Name
                </label>
                <input
                  className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={user.last_name}
                  onChange={(e) =>
                    setUser({ ...user, last_name: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-slate-600">
                Email
              </label>
              <input
                type="email"
                className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-slate-600">
                Password
              </label>
              <input
                type="password"
                className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-600">
                  Phone
                </label>
                <input
                  className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={user.phone}
                  onChange={(e) => setUser({ ...user, phone: e.target.value })}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-600">
                  Address
                </label>
                <input
                  className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={user.address}
                  onChange={(e) =>
                    setUser({ ...user, address: e.target.value })
                  }
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-2 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
            >
              Register
            </button>
          </form>

          <p className="text-center pb-6">
            Already have an account?{" "}
            <Link
              className="text-green-600 hover:text-green-500 underline"
              to={"/login"}
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
