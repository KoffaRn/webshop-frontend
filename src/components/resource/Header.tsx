import styles from "./Header.module.css";
import AuthContext from "../../store/auth/AuthContextProvider";
import { useContext } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const { authState, globalLogOutDispatch } = useContext(AuthContext);
  const handleLogout = () => {
    globalLogOutDispatch();
  };

  return (
    <div className={styles.header}>
      <h1>Welcome to the JavaJedis webshop</h1>
      <Link to="/products">Products</Link>{" "}
      {authState.isLoggedIn ? (
        <>
          <Link to="/cart">Cart</Link> <Link to="/orders">Orders</Link> Welcome{" "}
          {authState.username + " "}
          <button onClick={handleLogout}>Logout</button>
          {console.log(authState.isAdmin)}
        </>
      ) : (
        <Link to="/user/login">Log in</Link>
      )}
    </div>
  );
}
