import {
  CartItem,
  Cart,
  ChangeCartItemQuantity,
  Product,
} from "../../hooks/api/apiData";
import { UserData } from "../../store/auth/AuthContextProvider";
import useApi from "../../hooks/api/useApi";
import { useEffect, useState } from "react";

const handleAddProduct = (changeCartItemQuantity: ChangeCartItemQuantity) => {};

const CartViewer = () => {
  const { loading, error, request } = useApi();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cart, setCart] = useState<Cart>();
  const [message, setMessage] = useState<String>();

  useEffect(() => {
    const handleSuccess = (data: Cart) => {
      setCartItems(data.cartItems);
      setCart(data);
    };

    const handleError = (errorMessage: string) => {
      console.error("Error: ", errorMessage);
    };

    request(
      "/carts/user/",
      { method: "GET" },
      handleSuccess,
      handleError,
      true
    );
  }, [request]);

  const handleChangeQuantity = (cartItem: CartItem, newQuantity: number) => {
    const quantityDifference = newQuantity - cartItem.quantity;
    const changeCartItemQuantity: ChangeCartItemQuantity = {
      cart: cart,
      product: cartItem.product,
      quantity: quantityDifference,
    };

    const handleUpdateSuccess = (updatedCart: Cart) => {
      setCart(updatedCart);
      setCartItems(updatedCart.cartItems);
    };

    request(
      "/carts/addProduct",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(changeCartItemQuantity),
      },
      handleUpdateSuccess
    );
  };

  const handleBuyCart = () => {
    if (cart == null) {
      setMessage("No active cart");
      return;
    }

    if (!Array.isArray(cart.cartItems) || cart.cartItems.length === 0) {
      setMessage("No items in cart");
      return;
    }

    const handleBuySuccess = (updatedCart: Cart) => {
      setMessage("Cart bought");
      setCart(updatedCart);
      setCartItems([]);
    };

    request(
      "/carts/buy",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cart),
      },
      handleBuySuccess
    );
  };

  if (loading) return <p>Loading</p>;
  if (error) return <p>Error: {error}</p>;

  if (cart == null) {
    return (
      <div>
        <h2>Cart</h2>
        <p>{message}</p>
        <p>No active cart</p>
      </div>
    );
  }

  if (!Array.isArray(cart.cartItems) || cart.cartItems.length === 0) {
    return (
      <div>
        <h2>Cart</h2>
        <p>{message}</p>
        <p>Empty cart</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Cart</h2>
      <p>{message}</p>
      <div className="grid">
        {cartItems.map((cartItem) => {
          const itemTotal = cartItem.product.price * cartItem.quantity;

          return (
            <div key={cartItem.id} className="card">
              <p>Name: {cartItem.product.name}</p>
              <p>Price: {cartItem.product.price}</p>
              <label>
                Quantity:{" "}
                <input
                  type="number"
                  min="0"
                  value={cartItem.quantity}
                  onChange={(e) =>
                    handleChangeQuantity(cartItem, parseInt(e.target.value, 10))
                  }
                />
              </label>
              <p>Item total: {itemTotal}</p>
            </div>
          );
        })}
      </div>
      <p />
      <p>
        Total value:{" "}
        {cartItems.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        )}
      </p>
      <button onClick={handleBuyCart} className="button">
        Buy cart
      </button>
    </div>
  );
};

export default CartViewer;
