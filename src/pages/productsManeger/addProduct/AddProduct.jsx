import { ErrorMessage, Field, Form, Formik } from "formik";
import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";
import { getData, postDataWithFile } from "../../../libs/services";
import styles from "./AddProduct.module.css";
import { useEffect, useState } from "react";
import { validationProduct } from "../../../libs/validation";
import { useLocation } from "react-router-dom";
const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const location = useLocation();
  const product = location.state?.product || null;

  const handleFileChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setFieldValue("image", file);
      };
      reader.readAsDataURL(file);
    }
  };

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

  const addProduct = async (values, { resetForm }) => {
    try {
      const formattedValues = {
        ...values,
        seo: {
          title: values.seo.title,
          description: values.seo.description,
          keywords: values.seo.keywords
            ? values.seo.keywords.split(",").map((kw) => kw.trim())
            : [],
        },
      };

      if (product) {
       
        await postDataWithFile(
          `/product/${product._id}`,
          formattedValues,
          "PUT"
        );
      } else {
       
        await postDataWithFile("/product", formattedValues);
      }
      
      resetForm();
      setImage(null);
    } catch (error) {
      console.error("Помилка при додаванні продукту:", error);
    }
  };
useEffect(() => {
  if (product?.image) {
    setImage(product.image);
  }
}, [product]);
  return (
    <div className={styles.container}>
      <Formik
        enableReinitialize={true}
        initialValues={{
          name: product?.name || "",
          description: product?.description || "",
          price: product?.price || "",
          categories: product?.categories?.map((cat) => cat._id) || [],
          image: product?.image || null,
          discount: product?.discount || "",
          seo: {
            title: product?.seo?.title ?? "",
            description: product?.seo?.description ?? "",
            keywords: Array.isArray(product?.seo?.keywords)
              ? product.seo.keywords.join(", ")
              : "",
          },
        }}
        validationSchema={validationProduct}
        onSubmit={addProduct}
      >
        {({ setFieldValue, values }) => (
          <Form className={styles.form}>
            <div>
              <label>Назва</label>
              <Field type="text" name="name" />
              <ErrorMessage
                name="name"
                component="span"
                className={styles.error}
              />
            </div>

            <div>
              <label>Опис</label>
              <Field as="textarea" name="description" />
              <ErrorMessage
                name="description"
                component="span"
                className={styles.error}
              />
            </div>

            <div>
              <label>Ціна</label>
              <Field type="number" name="price" />
              <ErrorMessage
                name="price"
                component="span"
                className={styles.error}
              />
            </div>

            <div>
              <label>Категорії</label>
              {categories.length > 0 ? (
                categories.map(({ _id, name }) => (
                  <div key={_id}>
                    <Field
                      type="checkbox"
                      name="categories"
                      value={_id}
                      id={`category-${_id}`}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        const newCategories = checked
                          ? [...values.categories, _id]
                          : values.categories.filter((catId) => catId !== _id);
                        setFieldValue("categories", newCategories);
                      }}
                    />
                    <label htmlFor={`category-${_id}`}>{name}</label>
                  </div>
                ))
              ) : (
                <p>Немає доступних категорій</p>
              )}
            </div>

            <div>
              <label>Фото</label>
              {image ? (
                <div>
                  <img
                    src={image}
                    alt="Preview"
                    className={styles.imagePreview}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImage(null);
                      setFieldValue("image", null);
                    }}
                  >
                    Видалити
                  </button>
                </div>
              ) : (
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(event) => handleFileChange(event, setFieldValue)}
                />
              )}
              <ErrorMessage
                name="image"
                component="span"
                className={styles.error}
              />
            </div>

            <div>
              <label>Знижка</label>
              <Field type="number" name="discount" />
              <ErrorMessage
                name="discount"
                component="span"
                className={styles.error}
              />
            </div>

            <div>
              <label>Заголовок для SEO</label>
              <Field type="text" name="seo.title" />
              <ErrorMessage
                name="seo.title"
                component="span"
                className={styles.error}
              />
            </div>

            <div>
              <label>Опис для SEO</label>
              <Field as="textarea" name="seo.description" />
              <ErrorMessage
                name="seo.description"
                component="span"
                className={styles.error}
              />
            </div>

            <div>
              <label>Ключові слова (через кому)</label>
              <Field type="text" name="seo.keywords" />
              <ErrorMessage
                name="seo.keywords"
                component="span"
                className={styles.error}
              />
            </div>

            <Button type="submit">Підвердити</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddProduct;
