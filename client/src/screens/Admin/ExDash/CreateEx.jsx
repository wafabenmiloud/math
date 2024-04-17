import "react-quill/dist/quill.snow.css";
import { useState, useEffect } from "react";
import Editor from "../../../components/Editor/Editor";
import "./ExDash.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdAddToPhotos } from "react-icons/md";
import { BsArrowLeftShort } from "react-icons/bs";
import Popup from "../Popups/Popup";

export default function CreateEx() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);
  const handleFileChange = (ev) => {
    const selectedFiles = Array.from(ev.target.files);
    setFiles(selectedFiles);
  };

  async function createNewEx() {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    files.forEach((file) => {
      formData.append("files", file);
    });
    try {
      const response = await axios.post("/api/ex", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        navigate("/exdash");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="dash_create_form_wrapper">
      <BsArrowLeftShort onClick={() => setShowPopup2(true)} className="arr" />

      <form className="dash_create_form">
        <h2>Titre</h2>
        <input
          type="text"
          placeholder={"..."}
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />

        <h2>Média</h2>
        <label htmlFor="fileInput">
          <MdAddToPhotos
            color="#000"
            size={25}
            style={{ marginTop: "5px", cursor: "pointer" }}
          />
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleFileChange}
            multiple
          />
        </label>
        <div className="fileurls">
        {files.length > 0 && (
          <div>
            {files.map((file, index) => (
              <div key={index}>
                <img
                  src={URL.createObjectURL(file)}
                  alt="Selected File"
                  width={35}
                  height={35}
                />
              </div>
            ))}
          </div>
        )}</div>
        <h2>Description</h2>

        <Editor value={content} onChange={setContent} />

        <button type="button" onClick={() => setShowPopup(true)}>Ajouter</button>
      </form>
      {showPopup && (
        <Popup
          message="Êtes-vous sûr(e) de vouloir continuer ?"
          onCancel={() => setShowPopup(false)}
          onConfirm={(ev) => {
            setShowPopup(false);
            createNewEx(ev);
          }}
        />
      )}
      {showPopup2 && (
        <Popup
          message="Êtes-vous sûr(e) de vouloir quitter ?"
          onCancel={() => setShowPopup2(false)}
          onConfirm={(ev) => {
            setShowPopup2(false);
            navigate("/exdash");
          }}
        />
      )}
    </div>
  );
}
