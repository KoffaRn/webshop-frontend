import { Order } from "../../hooks/api/apiData";
import useApi from "../../hooks/api/useApi";
import { useEffect, useState } from "react";
import Products from "./Products";

const Orders = () => {
  const { loading, error, request } = useApi();
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {
    const handleSuccess = (data: Order[]) => {
      setOrders(data);
    };
    const handleError = (errorMessage: string) => {
      console.error("Error: ", errorMessage);
    };

    request(
      `/orders/user/`,
      { method: "GET" },
      handleSuccess,
      handleError,
      true
    );
  }, [request]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div>
      <h2>Orders</h2>

      <div className="grid">
        {orders.map((order) => {
          let orderTotal = 0; // Initialize order total for each order

          return (
            <div key={order.id} className="card">
              <h3>
                {order.user.username}, {order.id}
              </h3>
              {order.products.map((orderItem) => {
                const itemTotal = orderItem.product.price * orderItem.quantity;
                orderTotal += itemTotal;

                return (
                  <div key={orderItem.id}>
                    <p>
                      Name: {orderItem.product.name}, Price:{" "}
                      {orderItem.product.price}, Quantity: {orderItem.quantity}
                    </p>
                  </div>
                );
              })}
              <p>Order total: {orderTotal}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
