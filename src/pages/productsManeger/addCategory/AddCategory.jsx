import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import Button from "../../../components/button/Button";
import styles from "./AddCategory.module.css";

import  { validationCategory } from "../../../libs/validation";
import Input from "../../../components/input/Input";
import { postDataWithFile } from "../../../libs/services";
import { useLocation } from "react-router-dom";

const AddCategory = (props) => {
  const [image, setImage] = useState(null);
  const location = useLocation();
  const category = location.state?.category || null;
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

  const addCategory = async (values, { resetForm }) => {
    
    try {
    
        if (category) {
          await postDataWithFile(
            `/category/${category._id}`,
            values,
            "PUT"
          );
          alert('ок')
        } else {
          await postDataWithFile("/category", values);
          alert('err')
        }
      
      resetForm();
      setImage(null);
    } catch (error) {
      console.error("Помилка при додаванні категорії", error);
    }
  };
useEffect(() => {
  if (category?.image) {
    setImage(category.image);
  }
}, [category]);
  return (
    <div className={styles.container}>
      <Formik
        initialValues={{
          name: category?.name || "",
          description: category?.description || "",
          image: category?.image || null,
        }}
        validationSchema={validationCategory}
        onSubmit={addCategory}
      >
        {({ setFieldValue }) => (
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
                component="div"
                className={styles.error}
              />
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

            <Button type="submit">Додати</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddCategory;
