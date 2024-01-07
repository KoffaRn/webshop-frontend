import useApi from "../../../hooks/api/useApi";
import { User } from "../../../hooks/api/apiData";
import { useEffect, useState } from "react";

const AdminUsers = () => {
  const { loading, error, request } = useApi();
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const handleSucces = (data: User[]) => {
      setUsers(data);
    };
    const handleError = (error: string) => {
      console.log("Error getting users: " + error);
    };
    request("/users", { method: "GET" }, handleSucces, handleError);
  }, [request]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error getting users</p>;
  return (
    <div className="grid">
      {users.map((user) => (
        <div key={user.id} className="card">
          <h3>
            {user.id}, {user.username}
          </h3>
          <p>{user.roles.map((role) => role.authority) + ", "}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminUsers;
