import "react-quill/dist/quill.snow.css";
import React, { useState, useEffect } from "react";
import Editor from "../../../components/Editor/Editor";
import "./TarifDash.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BsArrowLeftShort } from "react-icons/bs";
import Popup from "../Popups/Popup";

export default function CreateTarif() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);
  async function createNewTarif() {
    const requestData = {
      title: title,
      content: content,
    };

    try {
      const response = await axios.post("/api/tarif", requestData);

      if (response.status === 200) {
        navigate("/tarifdash");
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
          onChange={(ev) => {
            setTitle(ev.target.value);
          }}
        />

        <h2>Description</h2>

        <Editor
          value={content}
          onChange={(value) => {
            setContent(value);
          }}
        />
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
            createNewTarif(ev);
          }}
        />
      )}
      {showPopup2 && (
        <Popup
          message="Êtes-vous sûr(e) de vouloir quitter ?"
          onCancel={() => setShowPopup2(false)}
          onConfirm={(ev) => {
            setShowPopup2(false);
            navigate("/tarifdash");
          }}
        />
      )}
    </div>
  );
}
