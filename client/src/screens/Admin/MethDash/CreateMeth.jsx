import "react-quill/dist/quill.snow.css";
import React, { useState, useEffect } from "react";
import Editor from "../../../components/Editor/Editor";
import "./MethDash.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdAddToPhotos } from "react-icons/md";
import { BsArrowLeftShort } from "react-icons/bs";
import Popup from "../Popups/Popup";

export default function CreateMeth() {
  const [title, setTitle] = useState("");
  const [content1, setContent1] = useState("");
  const [content2, setContent2] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);
  const handleFileChange = (ev) => {
    setFile(ev.target.files[0]);
  };

  async function createNewMeth() {

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content1", content1);
    formData.append("content2", content2);
    formData.append("file", file);

    try {
      const response = await axios.post("/api/meth", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        navigate("/methdash");
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
      <form
        className="dash_create_form"
      
      >
        <h2>Titre</h2>

        <input
          type="text"
          placeholder={"..."}
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />

        <h2>Média <span style={{ fontSize: "10px" }}>
            (.jpg, .jpeg, .png, .gif)
          </span></h2>
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
          />
        </label>
        {file && (
          <div>
            <p>{file.name}</p>
            <img src={URL.createObjectURL(file)} alt="Selected File" />
          </div>
        )}
        <h2>Paragraphes</h2>

        <Editor value={content1} onChange={setContent1} />
        <br />
        <Editor value={content2} onChange={setContent2} />

        <button type="button" onClick={() => setShowPopup(true)}>
          Ajouter
        </button>
      </form>
      {showPopup && (
        <Popup
          message="Êtes-vous sûr(e) de vouloir continuer ?"
          onCancel={() => setShowPopup(false)}
          onConfirm={(ev) => {
            setShowPopup(false);
            createNewMeth(ev);
          }}
        />
      )}
      {showPopup2 && (
        <Popup
          message="Êtes-vous sûr(e) de vouloir quitter ?"
          onCancel={() => setShowPopup2(false)}
          onConfirm={(ev) => {
            setShowPopup2(false);
            navigate("/methdash");
          }}
        />
      )}
    </div>
  );
}
