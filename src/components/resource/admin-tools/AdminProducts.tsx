import { useEffect, useState } from "react";
import useApi from "../../../hooks/api/useApi";
import { Product } from "../../../hooks/api/apiData";
import ProductForm from "./ProductForm";

const AdminProducts = () => {
  const { loading, error, request } = useApi();
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const handleSuccess = (data: Product[]) => {
      setProducts(data);
    };
    const handleError = (error: string) => {
      console.log("Error getting products: " + error);
    };
    request("/products/all", { method: "GET" }, handleSuccess, handleError);
  }, [request]);
  return (
    <div className="grid">
      {products.map((product) => (
        <ProductForm key={product.id} product={product} />
      ))}
    </div>
  );
};
export default AdminProducts;
