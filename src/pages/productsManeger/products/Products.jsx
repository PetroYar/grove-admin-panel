import { useEffect, useState } from "react";
import styles from "./Products.module.css";
import { deleteData, getData } from "../../../libs/services";
import Table from "../../../components/table/Table";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ConfirmModal from "../../../components/сonfirmModal/ConfirmModal";

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      toast.success("Продукт видалено!");

    } catch (error) {
      toast.success("Помилка при видаленні спробуйте пізніше!");

      console.error("Помилка при видаленні продукту:", error);
    }finally{
      setIsModalOpen(false)
    }
  };

const handleDeleteClick = (product) => {
  setSelectedProduct(product);
  setIsModalOpen(true);
};

  return (
    <div className={styles.container}>
      <Table
        price
        data={data?.products}
        onDelete={handleDeleteClick}
        onEdit={editProduct}
        category
      />
      {isModalOpen && (
        <ConfirmModal
          message={`Ви впевнені, що хочете видалити продукт ${selectedProduct?.name} ?`}
          onCancel={() => setIsModalOpen(false)}
          onConfirm={() => deleteProduct(selectedProduct._id)}
        />
      )}
    </div>
  );
};

export default Products;
