import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

function loadInitialCart() {
	try {
		const raw = localStorage.getItem("cart_v1");
		return raw ? JSON.parse(raw) : [];
	} catch {
		return [];
	}
}



export function CartProvider({ children }) {
	const [items, setItems] = useState(loadInitialCart);

	useEffect(() => {
		localStorage.setItem("cart_v1", JSON.stringify(items));
	}, [items]);

	const addItem = (product, quantity = 1) => {
		setItems((prev) => {
			const index = prev.findIndex((i) => i.id === product._id || i.id === product.id);
			const id = product._id || product.id;
			if (index !== -1) {
				const next = [...prev];
				next[index] = { ...next[index], quantity: next[index].quantity + quantity };
				return next;
			}
			return [
				...prev,
				{
					id,
					name: product.name,
					price: Number(product.price) || 0,
					image: product.image,
					quantity,
				},
			];
		});
	};

	const incrementItem = (id) => {
		setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i)));
	};

	const decrementItem = (id) => {
		setItems((prev) =>
			prev
				.map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
				.filter((i) => i.quantity > 0)
		);
	};

	const removeItem = (id) => {
		setItems((prev) => prev.filter((i) => i.id !== id));
	};

	const clearCart = () => setItems([]);

	const count = useMemo(() => items.reduce((n, i) => n + i.quantity, 0), [items]);
	const total = useMemo(() => items.reduce((n, i) => n + i.price * i.quantity, 0), [items]);

	const value = useMemo(
		() => ({ items, addItem, incrementItem, decrementItem, removeItem, clearCart, count, total }),
		[items, count, total]
	);

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
	const ctx = useContext(CartContext);
	if (!ctx) throw new Error("useCart must be used within CartProvider");
	return ctx;
}
