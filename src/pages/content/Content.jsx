import React, { useEffect, useState } from "react";
import styles from "./Content.module.css";
import { getData, updateData } from "../../libs/services";
import { Pencil, Trash } from "lucide-react";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";

const Content = () => {
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState("");
  const [pageContent, setPageContent] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getPages = async () => {
      try {
        const response = await getData("/content/pages");
        setPages(response);
      } catch (error) {
        console.error("Error fetching pages:", error);
      }
    };

    getPages();
  }, []);

  useEffect(() => {
    if (!selectedPage) return;

    const getContentPage = async () => {
      try {
        const response = await getData(`/content/page/${selectedPage}`);
        setPageContent(response);
      } catch (error) {
        console.error("Error fetching page content:", error);
      }
    };

    getContentPage();
  }, [selectedPage]);

  const editContent = async (content) => {
    navigate("/edit-content", { state: { content } });
  };

  return (
    <div className={styles.container}>
      <select
        onChange={(e) => setSelectedPage(e.target.value)}
        value={selectedPage}
      >
        <option value="" disabled>
          Виберіть сторінку
        </option>
        {pages.map((page) => (
          <option key={page} value={page}>
            {page}
          </option>
        ))}
      </select>

      {selectedPage ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>№</th>
              <th>Ключ</th>
              <th>Значення</th>
              <th>Дії</th>
            </tr>
          </thead>
          <tbody>
            {pageContent.length > 0 ? (
              pageContent.map((item, index) => (
                <tr key={item.key}>
                  <td>{index + 1}</td>
                  <td>{item.key}</td>
                  <td>
                    {item.value ? (
                      item.value
                    ) : (
                      <img style={{ width: "50px" }} src={item.image} />
                    )}
                  </td>
                  <td>
                    <Button onClick={() => editContent(item)}>
                      <Pencil size={20} />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">Дані відсутні</td>
              </tr>
            )}
          </tbody>
        </table>
      ) : (
        <span>Виберіть сторінку</span>
      )}
    </div>
  );
};

export default Content;
