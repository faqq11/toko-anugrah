import { useState, useEffect } from "react";
import axios from "axios";

export default function CartPage() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  const updateCartItemQty = async (id, quantity) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:3000/api/cart/items/${id}`,
        { quantity },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCart = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const { data } = await axios.get("http://localhost:3000/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCart(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const deleteCartItem = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/api/cart/items/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6 text-slate-800">Your Cart</h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow border border-slate-200">
        <table className="w-full border-collapse">
          <thead className="bg-slate-100 text-slate-700 border-b border-slate-200">
            <tr>
              <th className="text-left px-4 py-3 font-semibold">Product</th>
              <th className="text-center px-4 py-3 font-semibold">Price</th>
              <th className="text-center px-4 py-3 font-semibold">Quantity</th>
              <th className="text-center px-4 py-3 font-semibold">Subtotal</th>
              <th className="text-center px-4 py-3 font-semibold">Action</th>
            </tr>
          </thead>

          <tbody>
            {cart?.items?.map((item) => (
              <tr
                key={item.id}
                className="border-b border-slate-200 text-sm hover:bg-green-50 transition"
              >
                <td className="px-4 py-3 font-medium text-slate-700">
                  {item.product_name}
                </td>

                <td className="px-4 py-3 text-center text-slate-600">
                  Rp {item.product_price.toLocaleString("id-ID")}
                </td>

                <td className="px-4 py-3 text-center text-slate-700">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      className="px-2 py-1 bg-slate-200 rounded hover:bg-slate-300"
                      disabled={item.quantity <= 1}
                      onClick={() =>
                        updateCartItemQty(item.id, item.quantity - 1)
                      }
                    >
                      -
                    </button>

                    <span className="w-8 text-center">{item.quantity}</span>

                    <button
                      className="px-2 py-1 bg-slate-200 rounded hover:bg-slate-300"
                      onClick={() =>
                        updateCartItemQty(item.id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </td>

                <td className="px-4 py-3 text-center font-semibold text-slate-800">
                  Rp {item.subtotal.toLocaleString("id-ID")}
                </td>

                <td className="px-4 py-3">
                  <div className="flex justify-center gap-2">
                    <button
                      className="px-3 py-1 text-sm rounded-lg bg-red-600 text-white hover:bg-red-500 transition hover:cursor-pointer"
                      onClick={() => deleteCartItem(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot className="bg-slate-50 border-t border-slate-200">
            <tr>
              <td
                colSpan={3}
                className="px-4 py-3 text-center font-semibold text-slate-700"
              >
                Total
              </td>

              <td className="px-4 py-3 text-center font-bold text-slate-800">
                Rp {cart?.total_amount?.toLocaleString("id-ID")}
              </td>

              <td className="px-4 py-3 text-center">
                <button className="px-3 py-1 rounded-lg bg-green-600 text-white hover:bg-green-500 hover:cursor-pointer transition shadow-sm">
                  Checkout
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
