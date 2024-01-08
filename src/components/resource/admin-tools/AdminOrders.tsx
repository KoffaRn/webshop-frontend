import { useEffect, useState } from "react";
import useApi from "../../../hooks/api/useApi";
import { Order } from "../../../hooks/api/apiData";
import OrderCard from "../OrderCard";

const AdminOrders = () => {
  const { loading, error, request } = useApi();
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {
    const handleSuccess = (data: Order[]) => {
      setOrders(data);
    };
    const handleError = (error: string) => {
      console.log(error);
    };
    request("/orders", { method: "GET" }, handleSuccess, handleError);
  }, [request]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading orders</p>;
  return (
    <div>
      <h2>All orders</h2>
      <div className="grid">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};
export default AdminOrders;
