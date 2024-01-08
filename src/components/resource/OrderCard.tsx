import { Order } from "../../hooks/api/apiData";
import useApi from "../../hooks/api/useApi";

interface OrderCardProps {
  order: Order;
}
const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const { loading, error, request } = useApi();
  let orderTotal = 0;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading order</p>;
  return (
    <div className="card" key={order.id}>
      <h3>
        {order.user.username}, {order.id}
      </h3>
      {order.products.map((orderItem) => {
        const itemTotal = orderItem.product.price * orderItem.quantity;
        orderTotal += itemTotal;
        return (
          <div key={orderItem.id}>
            <p>
              Name: {orderItem.product.name}
              Price: {orderItem.product.price}
              Quantity: {orderItem.quantity}
            </p>
            <p>Order total: {orderTotal}</p>
          </div>
        );
      })}
    </div>
  );
};

export default OrderCard;
