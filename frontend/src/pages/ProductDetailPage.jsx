import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        const { data } = await axios.get(
          `http://localhost:3000/api/products/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setProduct(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = async () => {
    try {
      setAdding(true);
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:3000/api/cart/items",
        { product_id: product.id, quantity: qty },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      navigate("/");
    } catch (err) {
      console.error(err);
    } finally {
      setAdding(false);
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!product) return <p className="p-6">Product not found</p>;

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6 grid grid-cols-2 gap-8">
      <div className="flex items-center justify-center bg-slate-50 rounded-lg">
        <img
          src={product.image || "https://via.placeholder.com/400"}
          alt={product.name}
          className="w-full h-80 object-contain"
        />
      </div>

      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold">{product.name}</h1>

        <p className="text-sm text-slate-500">{product.brand}</p>

        <div className="flex gap-2 flex-wrap">
          {product.categories?.map((cat) => (
            <span
              key={cat}
              className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full"
            >
              {cat}
            </span>
          ))}
        </div>

        <p className="text-slate-700">{product.description}</p>

        <p className="text-xl font-bold text-green-600">
          Rp {product.price.toLocaleString("id-ID")}
        </p>

        <p className="text-sm text-slate-500">Stock: {product.stock}</p>

        <div className="flex items-center gap-3 mt-4">
          <span className="text-sm">Quantity</span>
          <div className="flex gap-2 overflow-hidden">
            <button
              className={`px-3 py-1 rounded-lg text-white ${
                qty <= 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
              disabled={qty <= 1}
              onClick={() => setQty(qty - 1)}
            >
              -
            </button>
            <span className="px-4 py-1">{qty}</span>
            <button
              className={`px-3 py-1 rounded-lg text-white ${
                qty >= product.stock
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
              disabled={qty >= product.stock}
              onClick={() => setQty(qty + 1)}
            >
              +
            </button>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            className={`px-6 py-2 rounded-lg text-white transition ${
              adding
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
            disabled={adding}
            onClick={() => addToCart()}
          >
            {adding ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
