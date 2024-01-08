import { useCallback, useEffect, useState } from "react";
import useApi from "../../../hooks/api/useApi";
import { Product } from "../../../hooks/api/apiData";
import ProductForm from "./ProductForm";

const AdminProducts = () => {
  const { loading, error, request } = useApi();
  const [products, setProducts] = useState<Product[]>([]);
  const handleUpdate = () => {
    setState();
  };
  const setState = useCallback(() => {
    const handleSuccess = (data: Product[]) => {
      setProducts(data);
    };
    const handleError = (error: string) => {
      console.log("Error getting products: " + error);
    };
    request("/products/all", { method: "GET" }, handleSuccess, handleError);
  }, [request]);
  useEffect(() => {
    setState();
  }, [setState]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error getting products</p>;
  return (
    <div className="grid">
      {products.map((product) => (
        <ProductForm
          key={product.id}
          product={product}
          updateParent={handleUpdate}
        />
      ))}
    </div>
  );
};
export default AdminProducts;
