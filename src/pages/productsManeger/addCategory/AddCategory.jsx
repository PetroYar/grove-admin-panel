import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import Button from "../../../components/button/Button";
import styles from "./AddCategory.module.css";

import  { validationCategory } from "../../../libs/validation";
import Input from "../../../components/input/Input";
import { postDataWithFile } from "../../../libs/services";

const AddCategory = (props) => {
  const [image, setImage] = useState(null);

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
    console.log(values);
    try {
      const data = await postDataWithFile("/category", values);
     
      resetForm();
      setImage(null);
    } catch (error) {
      console.error("Помилка при додаванні категорії", error);
    }
  };

  return (
    <div className={styles.container}>
      <Formik
        initialValues={{ name: "", description: "", image: null }}
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
              <Input
                type="file"
                name="image"
                accept="image/*"
                onChange={(event) => handleFileChange(event, setFieldValue)}
              />
              <ErrorMessage
                name="image"
                component="div"
                className={styles.error}
              />
            </div>

            {image && (
              <img
                className={styles.img}
                src={image}
                alt="Прев’ю"
                style={{ maxWidth: "200px", marginTop: "10px" }}
              />
            )}

            <Button type="submit">Додати</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddCategory;
