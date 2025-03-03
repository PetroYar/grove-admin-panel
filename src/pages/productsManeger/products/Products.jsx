import { useEffect, useState } from "react";
import styles from "./Products.module.css";
import { deleteData, getData } from "../../../libs/services";
import Table from "../../../components/table/Table";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await getData("/products");
        
        setData(data);
      } catch (error) {}
    };

    getProducts();
  }, []);

  const editProduct = (product) => {
    navigate("/products-maneger/add-product", { state: { product } });
  };

  const deleteProduct = async (id) => {
    console.log(id);
    try {
      await deleteData(`/product/${id}`);

      setData((prevData) => ({
        ...prevData,
        products: prevData.products.filter((product) => product._id !== id),
      }));
    } catch (error) {
      console.error("Помилка при видаленні продукту:", error);
    }
  };

  return (
    <div className={styles.container}>
      <Table
        price
        data={data?.products}
        onDelete={deleteProduct}
        onEdit={editProduct}
      />
    </div>
  );
};

export default Products;
