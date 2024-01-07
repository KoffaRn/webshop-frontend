import { useEffect, useState } from "react";
import useApi from "../../../hooks/api/useApi";
import { Order } from "../../../hooks/api/apiData";

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
          <div key={order.id} className="card">
            <h3>
              {order.id}, {order.user.username}
            </h3>
            {order.products.map((product) => (
              <div key={product.id} className="card">
                <p>{product.product.name}</p>
                <p>{product.quantity}</p>
                <p>{product.product.price}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
export default AdminOrders;
