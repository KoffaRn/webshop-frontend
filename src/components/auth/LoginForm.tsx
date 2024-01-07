import { FormEventHandler } from "react";
import { Link } from "react-router-dom";
import styles from "./Auth.module.css";

type Props = {
  onSubmit: FormEventHandler<HTMLFormElement>;
};

const LoginForm = (props: Props) => {
  const { onSubmit } = props;
  return (
    <form onSubmit={onSubmit} className={styles.Form}>
      <div className={styles.Input}>
        <label htmlFor="username">username</label>
        <input
          id="username"
          name="username"
          type="username"
          required
          placeholder="username"
        />
      </div>
      <div className={styles.Input}>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          placeholder="Password"
        />
      </div>
      <button type="submit">Submit</button>
      <Link className={styles.Link} to={"/user/register"}>
        Don't have an account? Sign up
      </Link>
    </form>
  );
};

export default LoginForm;
