import { useState } from "react";
import { Product } from "../../../hooks/api/apiData";
import useApi from "../../../hooks/api/useApi";

interface ProductFormProps {
  product: Product;
}
interface JsonPatch {
  op: string;
  path: string;
  value: string;
}
const ProductForm: React.FC<ProductFormProps> = ({ product }) => {
  const { loading, error, request } = useApi();
  const [message, setMessage] = useState<String>();
  const [apiProduct, setApiProduct] = useState<Product>();
  const [formData, setFormData] = useState({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    active: product.active,
    current: product.current,
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const handleSuccess = (data: Product) => {
      setMessage("Product updated");
      setApiProduct(data);
    };
    const handleError = (error: string) => {
      console.log("Error changing product: " + error);
    };
    let jsonPatch: JsonPatch[] = [];
    jsonPatch.push({
      op: "replace",
      path: "/name",
      value: formData.name,
    });
    jsonPatch.push({
      op: "replace",
      path: "/description",
      value: formData.description,
    });
    jsonPatch.push({
      op: "replace",
      path: "/price",
      value: String(formData.price),
    });
    jsonPatch.push({
      op: "replace",
      path: "/active",
      value: String(formData.active),
    });
    jsonPatch.push({
      op: "replace",
      path: "/current",
      value: String(formData.current),
    });
    console.log(JSON.stringify(jsonPatch));
    request(
      `/products/${product.id}`,
      {
        method: "PATCH",
        body: JSON.stringify(jsonPatch),
        headers: { "Content-Type": "application/json" },
      },
      handleSuccess,
      handleError
    );
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error with product</p>;

  return (
    <div className="card">
      <p>{message}</p>
      <form key={product.id} onSubmit={handleSubmit}>
        <label>
          Name:{" "}
          <input
            type="text"
            placeholder={product.name}
            value={formData.name}
            name="name"
            onChange={handleChange}
          ></input>
        </label>
        <label>
          Description:
          <input
            type="text"
            placeholder={product.description}
            value={formData.description}
            name="description"
            onChange={handleChange}
          ></input>
        </label>
        <label>
          Price
          <input
            type="number"
            placeholder={String(product.price)}
            value={formData.price}
            name="price"
            onChange={handleChange}
          ></input>
        </label>
        <p />
        <label>
          <input
            type="checkbox"
            checked={formData.active}
            name="active"
            onChange={handleChange}
          ></input>
          Active
        </label>
        <label>
          <input
            type="checkbox"
            checked={formData.current}
            name="current"
            onChange={handleChange}
          ></input>
          Current
        </label>
        <button type="submit">Update product</button>
      </form>
    </div>
  );
};
export default ProductForm;
