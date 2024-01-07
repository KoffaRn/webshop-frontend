import { Link } from "react-router-dom";
import styles from "../Header.module.css";
const AdminHeader = () => {
  return (
    <div className={styles.header}>
      <p>
        Admin tools:
        <Link to="/adminTools/orders">View all orders</Link>{" "}
        <Link to="/adminTools/carts">View all carts</Link>{" "}
        <Link to="/adminTools/users">View all users</Link>{" "}
        <Link to="/adminTools/products">View all products</Link>{" "}
        <Link to="/adminTools/addProduct">Add product</Link>{" "}
      </p>
    </div>
  );
};
export default AdminHeader;
