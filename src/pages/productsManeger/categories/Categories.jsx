import { useEffect, useState } from "react";
import styles from "./Categories.module.css";
import { deleteData, getData } from "../../../libs/services";
import Table from "../../../components/table/Table";
import { useNavigate } from "react-router-dom";

const Categories = (props) => {
  const [categories, setCategories] = useState([]);
const navigation = useNavigate()
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
    } catch (error) {
      console.error("Помилка при видаленні категорії:", error);
    }
  };

const editCategory= (category)=>{
navigation("/productsManeger/add-category", { state: { category } });
}

  return (
    <div className={styles.container}>
      <Table data={categories} onDelete={deleteCategory} onEdit={editCategory} />
    </div>
  );
};

export default Categories;
