import { Order } from "../../hooks/api/apiData";
import useApi from "../../hooks/api/useApi";
import { useEffect, useState } from "react";
import OrderCard from "./OrderCard";

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
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
