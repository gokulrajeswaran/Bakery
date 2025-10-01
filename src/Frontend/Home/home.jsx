import { useEffect, useState } from "react";
import { useCart } from "../Cart/CartContext";   // <-- import cart hook

const images = [
  "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&w=2560&q=80",
  "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=2940&q=80",
  "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?auto=format&fit=crop&w=2762&q=80",
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [products, setProducts] = useState([]);
  const [allproducts, setAllproducts] = useState([]);
  const { addItem } = useCart();   // <-- get addItem from context

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Fetch sweets (popular category)
  useEffect(() => {
    fetch("http://localhost:5000/admin/products?category=Sweets")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  // Fetch all products
  useEffect(() => {
    fetch("http://localhost:5000/admin/products")
      .then((res) => res.json())
      .then((data) => setAllproducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      {/* Carousel */}
      <div className="relative w-full mx-auto h-[300px] md:h-[500px] overflow-hidden shadow-lg">
        <div
          className="flex transition-transform ease-out duration-700"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Slide ${idx}`}
              className="w-full h-full object-cover flex-shrink-0"
            />
          ))}
        </div>
      </div>

      {/* Popular Categories */}
      <h1 className="mt-6 text-2xl font-bold text-gray-800 text-center">
        Most Popular Categories
      </h1>
      <br />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.length === 0 && (
          <p className="col-span-full text-gray-600">No products found.</p>
        )}

        {products.map((p) => (
          <div
            key={p._id}
            className="bg-white border-red-600 overflow-hidden hover:shadow-lg transition duration-300"
          >
            <img src={p.image} alt={p.name} className="w-full h-90 object-cover" />
            <div className="p-4 space-y-2">
              <h2 className="text-lg font-semibold text-red-600">{p.name}</h2>
              <p className="text-sm text-gray-700">{p.description}</p>
              <div className="font-bold text-red-700 text-lg">₹{Number(p.price).toFixed(2)}</div>
              <button
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
                onClick={() => addItem(p, 1)}   // <-- add to cart works now
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Start Your Cart */}
      <h1 className="mt-6 text-2xl font-bold text-gray-800 text-center">
        Start Your Cart
      </h1>
      <br></br>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {allproducts.length === 0 && (
          <p className="col-span-full text-gray-600">No products found.</p>
        )}

        {allproducts.map((p) => (   // <-- FIXED: was using products before
          <div
            key={p._id}
            className="bg-white border-red-600 overflow-hidden hover:shadow-lg transition duration-300"
          >
            <img src={p.image} alt={p.name} className="w-full h-90 object-cover" />
            <div className="p-4 space-y-2">
              <h2 className="text-lg font-semibold text-red-600">{p.name}</h2>
              <p className="text-sm text-gray-700">{p.description}</p>
              <div className="font-bold text-red-700 text-lg">₹{Number(p.price).toFixed(2)}</div>
              <button
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
                onClick={() => addItem(p, 1)}   // <-- add to cart works here too
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
