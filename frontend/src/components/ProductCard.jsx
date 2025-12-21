import { useNavigate } from "react-router";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  return (
    <div className="border rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition duration-200 flex flex-col">
      <div className="h-40 bg-slate-100 flex items-center justify-center">
        <img
          src={product.image || "https://via.placeholder.com/150"}
          alt={product.name}
          className="object-contain h-full"
        />
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="font-semibold text-slate-800 line-clamp-1">
          {product.name}
        </h3>

        <p className="text-sm text-slate-500">{product.brand}</p>

        <div className="flex flex-wrap gap-1">
          {product.categories.map((cat, i) => (
            <span
              key={i}
              className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full"
            >
              {cat}
            </span>
          ))}
        </div>

        <p className="text-sm text-slate-600 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-3">
          <p className="font-semibold text-green-600">
            Rp {product.price.toLocaleString("id-ID")}
          </p>

          <span
            className={`text-xs font-medium px-2 py-1 rounded ${
              product.stock > 0
                ? "bg-slate-100 text-slate-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {product.stock > 0 ? `Stock: ${product.stock}` : "Out of stock"}
          </span>
        </div>

        <button
          className="bg-green-600 text-white rounded-lg py-2 hover:bg-green-500 cursor-pointer"
          onClick={() => navigate(`/products/${product.id}`)}
        >
          Detail
        </button>
      </div>
    </div>
  );
}
