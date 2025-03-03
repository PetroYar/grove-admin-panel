import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";
import { postDataWithFile } from "../../../libs/services";

const EditContent = (props) => {
  const location = useLocation();
  const content = location.state?.content;
  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(file);
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const editContent = async (e) => {
    e.preventDefault();
    try {
      const newContent = {
        ...content,
        value: input,
      };

      if (image) {
        newContent.image = image;
      }

      const updateContent = await postDataWithFile(
        `/content/${content.key}`,
        newContent,
        "PUT"
      );

      console.log(updateContent);
      navigate(-1);
    } catch (error) {
      console.error("Помилка при оновленні контенту:", error);
    }
  };

  useEffect(() => {
    if (content.image) {
      setImage(content.image);
      setImagePreview(content.image);
    } else {
      setInput(content.value || "");
    }
  }, [content]);

  return (
    <form onSubmit={editContent}>
      {!content.value ? (
        <div>
          <label>Фото</label>
          {image ? (
            <div>
              <img src={imagePreview} alt="Preview" />

              <button
                type="button"
                onClick={() => {
                  setImage(null);
                }}
              >
                Видалити
              </button>
            </div>
          ) : (
            <Input type="file" accept="image/*" onChange={handleFileChange} />
          )}
        </div>
      ) : (
        <Input
          textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      )}

      <Button>Підтвердити</Button>
    </form>
  );
};

export default EditContent;
