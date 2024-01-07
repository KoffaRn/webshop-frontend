import React, { useEffect, useState } from "react";
import { Product, Cart, ChangeCartItemQuantity } from "../../hooks/api/apiData";
import useApi from "../../hooks/api/useApi";
import styles from "./Products.module.css";
import AuthContext from "../../store/auth/AuthContextProvider";
import { useContext } from "react";

const Products = () => {
  const { loading, error, request } = useApi();
  const [products, setProducts] = useState<Product[]>([]);
  const { authState } = useContext(AuthContext);
  const [userCart, setUserCart] = useState<Cart>();
  const [message, setMessage] = useState<string>();

  useEffect(() => {
    const handleSuccess = (data: Product[]) => {
      setProducts(data);
    };

    const handleError = (errorMessage: string) => {
      console.error("Error fetching products:", errorMessage);
    };

    request("/products", { method: "GET" }, handleSuccess, handleError);
  }, [request]);

  useEffect(() => {
    const handleGetCartSuccess = (data: Cart) => {
      setUserCart(data);
    };

    const handleError = (errorMessage: string) => {
      console.error("Error fetching user cart:", errorMessage);
    };

    if (authState.isLoggedIn) {
      request(
        "/carts/user/",
        { method: "GET" },
        handleGetCartSuccess,
        handleError,
        true
      );
    }
  }, [authState.isLoggedIn, request]);

  const handleAddToCart = (product: Product) => {
    const handleSuccess = (data: Cart) => {
      if (data != null) setMessage("Added to cart");
    };
    const handleError = (error: string) => {
      console.log("Error adding to cart: " + error);
      setMessage("Error adding to cart");
    };
    const changeCartItemQuantity: ChangeCartItemQuantity = {
      cart: userCart,
      product: product,
      quantity: 1,
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
      handleSuccess,
      handleError
    );
  };

  // Render loading state if data is still loading
  if (loading) {
    return <p>Loading...</p>;
  }

  // Render error state if an error occurred
  if (error) {
    return <p>Error: {error}</p>;
  }

  // Render your component content here
  return (
    <div>
      <h2>Products</h2>
      <p>{message}</p>
      <div className="grid">
        {products.map((product) => (
          <div key={product.id} className="card">
            <p>{product.name}</p>
            <p>{product.description}</p>
            <p>{product.price}</p>
            {authState.isLoggedIn && (
              <button onClick={() => handleAddToCart(product)}>
                Add to Cart
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
