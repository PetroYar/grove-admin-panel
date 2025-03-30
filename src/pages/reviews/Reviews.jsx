import React, { useEffect, useState } from "react";
import styles from "./Reviews.module.css";
import { deleteData, getData, updateData } from "../../libs/services";
import { formatDate } from "../../libs/formatDate";
import Button from "../../components/button/Button";
import toast from "react-hot-toast";
import { Trash } from "lucide-react";

const Reviews = (props) => {
  const [data, setData] = useState();

  useEffect(() => {
    const getComments = async (params) => {
      try {
        const res = await getData("/comment");
        setData(res);
      } catch (error) {}
    };

    getComments();
  }, []);

const handleTogglePublish = async (id, currentStatus) => {
  try {
    const newStatus = !currentStatus;
    const res = await updateData(`/comment/${id}`, {
      isPublished: newStatus,
    });

    if (res) {
      setData((prevData) => ({
        ...prevData,
        comments: prevData.comments.map((comment) =>
          comment._id === id ? { ...comment, isPublished: newStatus } : comment
      ),
    }));
  }
  
  toast.success(newStatus ? 'Коментар опубліковано':'Публікацію скасовано')
  } catch (error) {
    console.error("Помилка оновлення коментаря:", error);
  }
};

const handleDelete = async (id) => {
  try {
    await deleteData(`/comment/${id}`); 

    
    setData((prevData) => ({
      ...prevData,
      comments: prevData.comments.filter((comment) => comment._id !== id),
    }));
     
      

    toast.success("Коментар успішно видалено"); 
  } catch (error) {
    console.error("Помилка при видаленні коментаря:", error);
    toast.error("Не вдалося видалити коментар"); 
  }
};


  return (
    <div className={styles.reviews}>
      <h2>Відгуки</h2>
      <table border="1" className={styles.table}>
        <thead>
          <tr>
            <th>Номер</th>
            <th>Автор</th>
            <th>Текст</th>
            <th>Дата</th>
            <th>Опубліковано</th>
            <th>Опублікувати / Скасувати</th>
            <th>Дія</th>
          </tr>
        </thead>
        <tbody>
          {data?.comments.map((comment, id) => (
            <tr key={comment._id}>
              <td>{id + 1}</td>
              <td>{comment.user}</td>
              <td>{comment.description}</td>
              <td>{formatDate(comment.createdAt)}</td>
              <td>{comment.isPublished ? "Так" : "Ні"}</td>
              <td>
                <Button
                  onClick={() =>
                    handleTogglePublish(comment._id, comment.isPublished)
                  }
                >
                  {comment.isPublished ? "Сховати" : "Опублікувати"}
                </Button>
              </td>
              <td>
                <Button onClick={() => handleDelete(comment._id)}>
                  <Trash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reviews;
