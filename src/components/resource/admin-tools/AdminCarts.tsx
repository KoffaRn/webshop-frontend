import { useEffect, useState } from "react";
import useApi from "../../../hooks/api/useApi";
import { Cart } from "../../../hooks/api/apiData";

const AdminCarts = () => {
  const { loading, error, request } = useApi();
  const [carts, setCarts] = useState<Cart[]>([]);
  useEffect(() => {
    const handleSuccess = (data: Cart[]) => {
      setCarts(data);
    };
    const handleError = (error: string) => {
      console.log("Error getting carts: " + error);
    };
    request("/carts", { method: "GET" }, handleSuccess, handleError);
  }, [request]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error getting carts</p>;
  return (
    <div>
      <h2>All carts</h2>
      <div className="grid">
        {carts.map((cart) => (
          <div key={cart.id} className="card">
            <h3>
              {cart.id}, {cart.user.username}
            </h3>
            {cart.cartItems.map((item) => (
              <div key={item.id} className="card">
                <p>Name: {item.product.name}</p>
                <p>Price: {item.product.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCarts;
