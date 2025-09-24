import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../Cart/CartContext";

export default function Nav() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items, count, total, incrementItem, decrementItem, removeItem, clearCart } = useCart();

  return (
    <>
      {/* Navbar */}
      <nav className="relative flex items-center justify-between bg-red-600 text-white p-6 shadow-md">
        <div className="text-xl font-bold">Famous Bakery</div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          <li><Link to="/" className="hover:text-yellow-300">Home</Link></li>
          <li><Link to="/category/Cakes" className="hover:text-yellow-300">Cakes</Link></li>
          <li><Link to="/category/Puffs" className="hover:text-yellow-300">Puffs</Link></li>
          <li><Link to="/category/Sweets" className="hover:text-yellow-300">Sweets</Link></li>
          <li><Link to="/category/Cookies" className="hover:text-yellow-300">Cookies</Link></li>
          <li><Link to="/category/Snacks" className="hover:text-yellow-300">Snacks</Link></li>
          <li><Link to="/order" className="hover:text-yellow-300">Orders</Link></li>
        </ul>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* Cart Icon */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="hover:text-yellow-300"
            aria-label="Open Cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293a1 1 0 000 1.414L7 13zm10 0a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {count > 0 && (
              <span className="ml-1 inline-flex items-center justify-center text-xs bg-yellow-300 text-red-800 rounded-full px-2 py-0.5">
                {count}
              </span>
            )}
          </button>

          {/* Login Button */}
          <Link
            to="/login"
            className="bg-white text-red-600 px-4 py-2 rounded shadow hover:bg-gray-100 transition"
          >
            Login
          </Link>

          {/* Hamburger Menu Button */}
          <button
            className={`md:hidden flex items-center px-3 py-2 border rounded text-white border-gray-400 hover:text-yellow-400 transition-transform duration-300 ${isMenuOpen ? "rotate-90" : ""
              }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            <svg
              className="fill-current h-6 w-6"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              ) : (
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`absolute top-full left-0 w-full bg-red-600 md:hidden overflow-hidden transition-all duration-500 ease-in-out z-20 ${isMenuOpen ? "max-h-96 py-4" : "max-h-0 py-0"
            }`}
        >
          <ul className="flex flex-col items-center space-y-4 text-white">
            {[
              ["Home", "/"],
              ["Cakes", "/category/Cakes"],
              ["Puffs", "/category/Puffs"],
              ["Sweets", "/category/Sweets"],
              ["Cookies", "/category/Cookies"],
              ["Snacks", "/category/Snacks"],
              ["Orders", "/order"],
            ].map(([label, path], index) => (
              <li
                key={label}
                className={`transform transition-all duration-300 delay-${index * 75} hover:text-yellow-300`}
              >
                <Link to={path} onClick={() => setIsMenuOpen(false)}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Sliding Cart */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-gray-100 shadow-xl transform transition-transform duration-300 z-40 ${isCartOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-300">
          <h2 className="font-bold text-lg">My Cart</h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-gray-600 hover:text-red-600"
            aria-label="Close Cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-4 space-y-4 h-[calc(100%-56px)] flex flex-col">
          {items.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            <>
              <ul className="flex-1 overflow-auto divide-y divide-gray-200">
                {items.map((item) => (
                  <li key={item.id} className="py-3 flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                    <div className="flex-1">
                      <div className="font-semibold text-sm">{item.name}</div>
                      <div className="text-xs text-gray-600">₹{item.price.toFixed(2)}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="px-2 py-1 border rounded" onClick={() => decrementItem(item.id)}>-</button>
                      <span className="min-w-5 text-center text-sm">{item.quantity}</span>
                      <button className="px-2 py-1 border rounded" onClick={() => incrementItem(item.id)}>+</button>
                    </div>
                    <div className="w-16 text-right text-sm font-semibold">₹{(item.price * item.quantity).toFixed(2)}</div>
                    <button className="ml-2 text-red-600 text-sm" onClick={() => removeItem(item.id)}>x</button>
                  </li>
                ))}
              </ul>
              <div className="border-t pt-3 space-y-2">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 border border-gray-400 py-2 rounded hover:bg-gray-200 transition" onClick={clearCart}>Clear</button>
                  <Link to="/cart" onClick={() => setIsCartOpen(false)} className="flex-1 text-center bg-gray-700 text-white py-2 rounded hover:bg-gray-600 transition">Checkout</Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
