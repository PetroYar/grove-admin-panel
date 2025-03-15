import { useEffect, useState } from "react";
import styles from "./Categories.module.css";
import { deleteData, getData } from "../../../libs/services";
import Table from "../../../components/table/Table";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ConfirmModal from "../../../components/сonfirmModal/ConfirmModal";

const Categories = (props) => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigation = useNavigate();
  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await getData("/category");
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);
  const deleteCategory = async (id) => {
    try {
      await deleteData(`/category/${id}`);

      setCategories((prevCategory) =>
        prevCategory.filter((category) => category._id !== id)
      );
      toast.success("Категорію видаленно!");
    } catch (error) {
      console.error("Помилка при видаленні категорії:", error);
    }finally{
      setIsModalOpen(false)
    }
  };

  const editCategory = (category) => {
    navigation("/products-maneger/add-category", { state: { category } });
  };
  const handleDeleteClick = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };
  return (
    <div className={styles.container}>
      <Table
        data={categories}
        onDelete={handleDeleteClick}
        onEdit={editCategory}
      />
      {isModalOpen && (
        <ConfirmModal
          message={`Ви впевнені, що хочете видалити категорію ${selectedCategory?.name} ?`}
          onCancel={() => setIsModalOpen(false)}
          onConfirm={() => deleteCategory(selectedCategory._id)}
        />
      )}
    </div>
  );
};

export default Categories;
