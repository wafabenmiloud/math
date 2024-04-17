import "react-quill/dist/quill.snow.css";
import React, { useState, useEffect } from "react";
import Editor from "../../../components/Editor/Editor";
import "./PourQuiDash.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BsArrowLeftShort } from "react-icons/bs";
import Popup from "../Popups/Popup";

export default function CreateQuiSec() {
  const [title, setTitle] = useState("");
  const [lien, setLien] = useState("");
  const [letter, setLetter] = useState("");
  const [content, setContent] = useState("");
  const [button, setButton] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);
  const navigate = useNavigate();

  async function createNewQui() {
    const payload = {
      title: title,
      letter: letter,
      content: content,
      lien: lien,
      button: button
    };
    try {
      const response = await axios.post("/api/quisec", payload);

      if (response.status === 200) {
        navigate("/quidash");
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
        <h2>Lettre</h2>

        <input
          type="text"
          placeholder={"..."}
          value={letter}
          onChange={(ev) => setLetter(ev.target.value)}
        />
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

        <select value={lien} onChange={(ev) => setLien(ev.target.value)}>
          <option value="">...</option>
          <option value="pourquisection/A">
            A - Notions de base non acquises
          </option>
          <option value="pourquisection/B">
            B - Notions de base partiellement acquises
          </option>
          <option value="pourquisection/C">
            C - Notions de base connues mais à intégrer
          </option>
        </select>

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
            createNewQui(ev);
          }}
        />
      )}
      {showPopup2 && (
        <Popup
          message="Êtes-vous sûr(e) de vouloir quitter ?"
          onCancel={() => setShowPopup2(false)}
          onConfirm={(ev) => {
            setShowPopup2(false);
            navigate("/quidash");
          }}
        />
      )}
    </div>
  );
}
