import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
	// cart state
	const [cart, setCart] = useState([]);
	// item amount state
	const [itemAmount, setItemAmount] = useState(0);
	// total price state
	const [total, setTotal] = useState(0);

	useEffect(() => {
		const total = cart.reduce((accumulator, currentItem) => {
			return accumulator + currentItem.price * currentItem.amount;
		}, 0);
		setTotal(total);
	}, [cart]);

	// update item amount
	useEffect(() => {
		if (cart) {
			const amount = cart.reduce((accumulator, currentItem) => {
				return accumulator + currentItem.amount;
			}, 0);
			setItemAmount(amount);
		}
	}, [cart]);

	// add to cart
	const addToCart = (product, id) => {
		if (!product || id === undefined) {
			console.error("Invalid product or id");
			return;
		}
	
		// Convert IDs to same type for comparison
		const productId = String(id);
		
		const newItem = { ...product, amount: 1 };
		// check if the item is already in the cart
		const cartItem = cart.find((item) => String(item.id) === productId);
		
		if (cartItem) {
			const newCart = [...cart].map((item) => {
				if (String(item.id) === productId) {
					return { ...item, amount: cartItem.amount + 1 };
				} else return item;
			});
			setCart(newCart);
		} else {
			setCart([...cart, newItem]);
		}
	};

	// remove from cart
	const removeFromCart = (id) => {
		const newCart = cart.filter((item) => {
			return item.id !== id;
		});
		setCart(newCart);
	};

	// clear cart
	const clearCart = () => {
		setCart([]);
	};

	// increase amount
	const increaseAmount = (id) => {
		const newCart = [...cart].map((item) => {
			if (item.id === id) {
				return { ...item, amount: item.amount + 1 };
			} else return item;
		});
		setCart(newCart);
	};

	// decrease amount
	const decreaseAmount = (id) => {
		const cartItem = cart.find((item) => item.id === id);
		if (cartItem) {
			if (cartItem.amount === 1) {
				removeFromCart(id);
			} else {
				const newCart = cart.map((item) => {
					if (item.id === id) {
						return { ...item, amount: item.amount - 1 };
					} else return item;
				});
				setCart(newCart);
			}
		}
	};

	return (
		<CartContext.Provider
			value={{
				cart,
				addToCart,
				removeFromCart,
				clearCart,
				increaseAmount,
				decreaseAmount,
				itemAmount,
				total,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export default CartProvider;