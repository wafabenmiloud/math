import "react-quill/dist/quill.snow.css";
import { useState, useEffect } from "react";
import Editor from "../../../components/Editor/Editor";
import "./ActualDash.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdAddToPhotos } from "react-icons/md";
import { BsArrowLeftShort } from "react-icons/bs";
import Popup from "../Popups/Popup";

export default function CreatePost() {
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [type, setType] = useState("");

  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);

  const getCurrentDate = () => {
    const currentDate = new Date(date);
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleFileChange = (ev) => {
    setFile(ev.target.files[0]);
  };

  async function createNewPost() {
    setDate(getCurrentDate());

    const formData = new FormData();
    formData.append("title", title);
    formData.append("date", date);
    formData.append("type", type);
    formData.append("summary", summary);
    formData.append("content", content);
    formData.append("file", file);
    try {
      const response = await axios.post("/api/post", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        navigate("/actdash");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
  async function valid() { 
    if (!date) {
      alert("Le champ Date est vide !");
      return;
    }
    if (!title) {
      alert("Le champ Titre est vide !");
      return;
    }
     if (!summary) {
      alert("Le champ Résumé est vide !");
      return;
    }
    if (!type) {
      alert("Le champ Type est vide !");
      return;
    }
  
    if (!content) {
      alert("Le champ Description est vide !");
      return;
    }
    setShowPopup(true);
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="create_form_wrapper">
      <BsArrowLeftShort onClick={() => setShowPopup2(true)} className="arr" />

      <form className="create_form">
        <h2>Date</h2>

        <input
          type="date"
          value={date}
          onChange={(ev) => setDate(ev.target.value)}
        />
        <h2>Titre</h2>

        <input
          type="text"
          placeholder={"..."}
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <h2>Résumé</h2>

        <input
          type="text"
          placeholder={"..."}
          value={summary}
          onChange={(ev) => setSummary(ev.target.value)}
        />
        <h2>Type de post </h2>
        <div className="type_radio">
          <div>
            {" "}
            <input
              type="radio"
              name="type"
              value="ecr"
              checked={type === "ecr"}
              onChange={(ev) => setType(ev.target.value)}
            />
            <label>Préparation aux ECR et certificat</label>
          </div>
          <div>
            {" "}
            <input
              type="radio"
              name="type"
              value="temoin"
              checked={type === "temoin"}
              onChange={(ev) => setType(ev.target.value)}
            />{" "}
            <label>Témoignages</label>{" "}
          </div>
          <div>
            {" "}
            <input
              type="radio"
              name="type"
              value="centre"
              checked={type === "centre"}
              onChange={(ev) => setType(ev.target.value)}
            />{" "}
            <label>Ouvrez votre centre mathOtop</label>
          </div>
          <div>
            {" "}
            <input
              type="radio"
              name="type"
              value="ecole"
              checked={type === "ecole"}
              onChange={(ev) => setType(ev.target.value)}
            />{" "}
            <label>Vie de l'école</label>
          </div>
          <div>
            {" "}
            <input
              type="radio"
              name="type"
              value="media"
              checked={type === "media"}
              onChange={(ev) => setType(ev.target.value)}
            />{" "}
            <label>Médias</label>
          </div>
        </div>
        <h2>
          Média{" "}
          <span style={{ fontSize: "10px" }}>(.jpg, .jpeg, .png, .gif)</span>
        </h2>
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
            <img
              src={URL.createObjectURL(file)}
              alt="Selected File"
              style={{ width: "100%" }}
            />
          </div>
        )}
        <h2>Description</h2>
        <Editor value={content} onChange={setContent} />
        <button
          type="button"
          onClick={() => {
            valid();
          }}
        >
          Ajouter
        </button>
      </form>
      {showPopup && (
        <Popup
          message="Êtes-vous sûr(e) de vouloir continuer ?"
          onCancel={() => setShowPopup(false)}
          onConfirm={(ev) => {
            setShowPopup(false);
            createNewPost(ev);
          }}
        />
      )}
      {showPopup2 && (
        <Popup
          message="Êtes-vous sûr(e) de vouloir quitter ?"
          onCancel={() => setShowPopup2(false)}
          onConfirm={(ev) => {
            setShowPopup2(false);
            navigate("/actdash");
          }}
        />
      )}
    </div>
  );
}
