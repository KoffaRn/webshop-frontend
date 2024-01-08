import { useState } from "react";
import useApi from "../../../hooks/api/useApi";
import { Product } from "../../../hooks/api/apiData";

const AdminAddProduct = () => {
  const { loading, error, request } = useApi();
  const [message, setMessage] = useState<String>();
  const [formData, setFormData] = useState<{
    name?: string;
    description?: string;
    price?: number;
    active?: boolean;
    current?: boolean;
  }>({
    active: true,
    current: true,
  });
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const handleSuccess = (data: Product) => {
      setFormData(data);
      setMessage("Product added");
    };
    const handleError = (error: string) => {
      setMessage(error);
    };
    request(
      "/products",
      {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      },
      handleSuccess,
      handleError
    );
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error adding products</p>;

  return (
    <div className="card">
      <p>{message}</p>
      <form onSubmit={handleSubmit}>
        <label>
          Name: <input type="text" name="name" onChange={handleChange} />
        </label>{" "}
        <label>
          Description:{" "}
          <input type="text" name="description" onChange={handleChange} />
        </label>{" "}
        <label>
          Price: <input type="number" name="price" onChange={handleChange} />
        </label>
        <label>
          <input
            type="checkbox"
            checked={!!formData.active}
            name="active"
            onChange={handleChange}
          />{" "}
          Active
        </label>{" "}
        <label>
          <input
            type="checkbox"
            checked={!!formData.current}
            name="current"
            onChange={handleChange}
          />{" "}
          Current
        </label>{" "}
        <button type="submit">Add product</button>
      </form>
    </div>
  );
};

export default AdminAddProduct;
