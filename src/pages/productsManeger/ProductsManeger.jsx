import { NavLink, Routes, Route } from "react-router-dom";
import styles from "./ProductsManeger.module.css";
import Products from "./products/Products";
import Categories from "./categories/Categories";
import AddProduct from "./addProduct/AddProduct";
import AddCategory from "./addCategory/AddCategory";

const ProductsMeneger = (props) => {
  return (
    <div className={styles.container}>
      <ul className={styles.btnsList}>
        <li>
          <NavLink
            to="/products-maneger/products"
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ""}`
            }
          >
            Усі продукти
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/products-maneger/categories"
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ""}`
            }
          >
            Усі категорії
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/products-maneger/add-product"
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ""}`
            }
          >
            Додати продукт
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/products-maneger/add-category"
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ""}`
            }
          >
            Додати категорію
          </NavLink>
        </li>
      </ul>
      <div className={styles.content}>
        <Routes>
          <Route path="/products" element={<Products />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/add-category" element={<AddCategory />} />
        </Routes>
      </div>
    </div>
  );
};

export default ProductsMeneger;
