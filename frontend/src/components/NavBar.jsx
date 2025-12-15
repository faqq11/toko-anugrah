import { Link, useNavigate } from "react-router";

export default function NavBar() {
  const navigate = useNavigate();

  return (
    <nav className="w-full bg-green-600 px-8 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-2xl font-bold text-white tracking-wide">
          Toko Anugrah
        </div>

        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="text-white text-sm font-medium hover:text-green-200 transition-colors"
          >
            Home
          </Link>

          <Link
            to="/my-order"
            className="text-white text-sm font-medium hover:text-green-200 transition-colors"
          >
            My Order
          </Link>

          <Link
            to="/profile"
            className="text-white text-sm font-medium hover:text-green-200 transition-colors"
          >
            Profile
          </Link>
        </div>

        <button
          type="button"
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
          className="font-semibold text-sm text-white px-4 py-2 hover:cursor-pointer"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
