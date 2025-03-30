import Button from "../button/Button";
import styles from "./Table.module.css";
import { Pencil, Trash } from "lucide-react";
const Table = ({
  data = [],
  price,
  category,
  onEdit,
  onDelete,
  size,
  discount,
}) => {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>№</th>
            <th>Зображення</th>
            <th>Назва</th>
            <th>Опис</th>
            {price && <th>Ціна</th>}
            {discount && <th>Знижка</th>}

            {size && <th>Розмір</th>}

            {category && <th>Категорії</th>}

            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>
                <img
                  src={item.image}
                  alt={item.name}
                  width="50"
                  height="50"
                  style={{ borderRadius: "5px" }}
                />
              </td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              {price && <td>{item.price} грн</td>}
              {discount && <td>{item.discount}</td>}

              {size && <td>{item.size}</td>}

              {category && (
                <td>
                  {category && item.categories.length > 0
                    ? item.categories.map((cat) => cat.name).join(" , ")
                    : "Немає категорій"}
                </td>
              )}

              <td className={styles.buttons}>
                <Button onClick={() => onEdit(item)}>
                  <Pencil size={20} />
                </Button>
                <Button onClick={() => onDelete(item)}>
                  <Trash size={20} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
