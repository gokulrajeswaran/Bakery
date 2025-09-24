import { useCart } from "../Cart/CartContext";
import { Link } from "react-router-dom";

export default function CartPage() {
	const { items, total, incrementItem, decrementItem, removeItem, clearCart } = useCart();

	return (
		<div className="max-w-4xl mx-auto p-6">
			<h1 className="text-2xl font-bold mb-4">Your Cart</h1>
			{items.length === 0 ? (
				<div className="text-gray-600">
					<p>Your cart is empty.</p>
					<Link to="/" className="text-red-600 underline">Continue shopping</Link>
				</div>
			) : (
				<div className="space-y-4">
					<ul className="divide-y divide-gray-200 bg-white rounded shadow">
						{items.map((item) => (
							<li key={item.id} className="p-4 flex items-center gap-4">
								<img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
								<div className="flex-1">
									<div className="font-semibold">{item.name}</div>
									<div className="text-sm text-gray-600">₹{Number(item.price).toFixed(2)}</div>
								</div>
								<div className="flex items-center gap-2">
									<button className="px-2 py-1 border rounded" onClick={() => decrementItem(item.id)}>-</button>
									<span className="min-w-6 text-center">{item.quantity}</span>
									<button className="px-2 py-1 border rounded" onClick={() => incrementItem(item.id)}>+</button>
								</div>
								<div className="w-24 text-right font-semibold">₹{(item.price * item.quantity).toFixed(2)}</div>
								<button className="ml-4 text-red-600" onClick={() => removeItem(item.id)}>Remove</button>
							</li>
						))}
					</ul>
					<div className="flex items-center justify-between mt-4">
						<button className="text-gray-600" onClick={clearCart}>Clear cart</button>
						<div className="text-xl font-bold">Total: ₹{total.toFixed(2)}</div>
					</div>
					<div className="flex gap-3 mt-4">
						<Link to="/" className="px-4 py-2 border rounded">Continue shopping</Link>
						<button className="px-4 py-2 bg-red-600 text-white rounded">Checkout</button>
					</div>
				</div>
			)}
		</div>
	);
}


