// Global dependencies
import { useState, useCallback, useContext } from "react";

// Project dependencies
import AuthContext from "../../store/auth/AuthContextProvider";
import authCtx from "../../store/auth/AuthContextProvider";

const BASE_URL = "http://localhost:8080";

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { authState, globalLogOutDispatch } = useContext(AuthContext);

  const request = useCallback(
    async (
      endpoint: string,
      params: { [key: string]: any },
      handleSuccessResponse: (data: any) => void,
      handleErrorResponse?: (error: string) => void,
      useId?: boolean
    ) => {
      setLoading(true);
      setError(null);

      try {
        // NOTE: If user is logged in, insert the auth token into request headers for authorization
        if (authState.isLoggedIn) {
          params.headers = {
            ...params.headers,
            Authorization: `Bearer ${authState.authToken}`,
          };
          console.log(params.headers);
        }
        let url = BASE_URL + endpoint;
        if (useId) url += authState.userId;
        console.log(url);
        const response = await fetch(url, { ...params });
        if (!response.ok) {
          const data = await response.json(); // Assume always json response
          throw new Error(data.error);
        }
        const data = await response.json(); // Assume always json response
        console.log(data);
        // If response is okay and no errors, then successful request
        handleSuccessResponse && (await handleSuccessResponse(data));
      } catch (error: any) {
        // NOTE: If it's unauthorized error, then we will auto log user out

        // Handle error if specified
        if (handleErrorResponse) {
          handleErrorResponse(error.message || error.error || error);
        } else {
          setError(error.message || error.error || error);
        }
      }

      setLoading(false);
    },

    [
      authState.isLoggedIn,
      authState.authToken,
      globalLogOutDispatch,
      authState.userId,
    ]
  );

  return {
    loading: loading,
    error: error,
    request: request,
    setError: setError,
  };
};

export default useApi;
