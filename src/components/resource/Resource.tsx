import { useCallback, useContext, useEffect, useState } from "react";
import useApi from "../../hooks/api/useApi";
import authCtx from "../../store/auth/AuthContextProvider";
import styles from "./Resource.module.css";

const Resource = () => {
  const { globalLogOutDispatch } = useContext(authCtx);

  return (
    <div className={styles.Resource}>
      <button onClick={globalLogOutDispatch}>Log Out</button>
    </div>
  );
};

export default Resource;
