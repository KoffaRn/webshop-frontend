import { FormEventHandler } from "react";
import { Link } from "react-router-dom";
import styles from "./Auth.module.css";

type Props = {
  onSubmit: FormEventHandler<HTMLFormElement>;
};

const RegisterForm = (props: Props) => {
  const { onSubmit } = props;
  return (
    <form onSubmit={onSubmit} className={styles.Form}>
      <div className={styles.Input}>
        <label htmlFor="username">Name</label>
        <input
          id="username"
          name="username"
          type="username"
          required
          placeholder="Username"
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
      <Link className={styles.Link} to={"/user/login"}>
        Already have an account? Sign in
      </Link>
    </form>
  );
};

export default RegisterForm;
