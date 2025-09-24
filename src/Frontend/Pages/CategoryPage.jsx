import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../cart/CartContext";

export default function CategoryPage({ category: categoryProp }) {
  const params = useParams();
  const category = categoryProp || (params?.name || "");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addItem } = useCart();

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError("");

    fetch(`http://localhost:5000/admin/products?category=${encodeURIComponent(category)}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to load products");
        return res.json();
      })
      .then((data) => {
        if (isMounted) setProducts(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        if (isMounted) setError(err.message || "Something went wrong");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [category]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{category}</h1>

      {loading && <p>Loading products...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.length === 0 && (
            <p className="col-span-full text-gray-600">No products found.</p>
          )}

          {products.map((p) => (
            <div className="bg-white border-red-600 overflow-hidden hover:shadow-lg transition duration-300">
            <img 
              src={p.image} 
              alt={p.name}  
              className="w-full h-90 object-cover"
            />
            <div className="p-4 space-y-2">
              <h2 className="text-lg font-semibold text-red-600">{p.name}</h2>
              <p className="text-sm text-gray-700">{p.description}</p>
              <div className="font-bold text-red-700 text-lg">₹{Number(p.price).toFixed(2)}</div>
              <button 
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
                onClick={() => addItem(p, 1)}
              >
                Add to Cart
              </button>
            </div>
          </div>
          
          ))}
        </div>
      )}
    </div>
  );
}