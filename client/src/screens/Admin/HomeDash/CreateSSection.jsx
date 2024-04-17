import "react-quill/dist/quill.snow.css";
import React, { useState, useEffect } from "react";
import "./HomeDash.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdAddToPhotos } from "react-icons/md";
import { BsArrowLeftShort } from "react-icons/bs";
import Popup from "../Popups/Popup";

export default function CreateSSection() {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [file, setFile] = useState(null);
  const [button, setButton] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (ev) => {
    setFile(ev.target.files[0]);
  };
  async function createSNewSection() {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("link", link);
    formData.append("file", file);
    formData.append("button", button);

    try {
      const response = await axios.post("/api/ssection", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        navigate("/dashboard");
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
        <h2>Nom du bouton</h2>
        <input
          type="text"
          placeholder={"..."}
          value={button}
          onChange={(ev) => setButton(ev.target.value)}
        />
        <h2>Lien</h2>

        <select value={link} onChange={(ev) => setLink(ev.target.value)}>
          <option value="">...</option>
          <option value="quisommesnous">Qui sommes-nous ?</option>
          <option value="tarif">Cours et tarifs</option>
          <option value="pourqui">Pour qui ?</option>
          <option value="methode">La méthode</option>
          <option value="actual">Actualités</option>
          <option value="exercices">Exercices</option>
        </select>

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
          />
        </label>
        {file && (
          <div>
            <p>{file.name}</p>
            <img src={URL.createObjectURL(file)} alt="Selected File" />
          </div>
        )}

<button type="button" onClick={() => setShowPopup(true)}>Ajouter</button>
      </form>
      {showPopup && (
        <Popup
          message="Êtes-vous sûr(e) de vouloir continuer ?"
          onCancel={() => setShowPopup(false)}
          onConfirm={(ev) => {
            setShowPopup(false);
            createSNewSection(ev);
          }}
        />
      )}
      {showPopup2 && (
        <Popup
          message="Êtes-vous sûr(e) de vouloir quitter ?"
          onCancel={() => setShowPopup2(false)}
          onConfirm={(ev) => {
            setShowPopup2(false);
            navigate("/dashboard");
          }}
        />
      )}
    </div>
  );
}
