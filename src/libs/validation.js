import * as Yup from "yup";
export const validationProduct = Yup.object().shape({
  name: Yup.string().required("Обов'язкове поле"),
  description: Yup.string().required("Обов'язкове поле"),
  price: Yup.string().required("Обов'язкове поле"),

  size: Yup.string().required("Обов'язкове поле"),
  image: Yup.mixed().required("Додайте фото"),
  discount: Yup.number().min(0, "Знижка не може бути меншою за 0"),
  seo: Yup.object().shape({
    title: Yup.string().required("Обов'язкове поле"),
    description: Yup.string().required("Обов'язкове поле"),
    keywords: Yup.string()
      .required("Обов'язкове поле")
      .test("is-array", "Введіть слова через кому", (value) =>
        value?.includes(",")
      ),
  }),
});
export const validationCategory = Yup.object().shape({
  name: Yup.string().required("Обов'язкове поле"),
  description: Yup.string().required("Обов'язкове поле"),

  image: Yup.mixed().required("Додайте фото"),
});
