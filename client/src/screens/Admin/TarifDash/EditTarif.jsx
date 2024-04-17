import "react-quill/dist/quill.snow.css";
import React, { useState, useEffect } from "react";
import Editor from "../../../components/Editor/Editor";
import "./TarifDash.css";
import axios from "axios";
import { BsArrowLeftShort } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Popup from "../Popups/Popup";

export default function EditTarif() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/tarif/${id}`)
      .then((response) => {
        setTitle(response.data.tarifDoc.title);
        setContent(response.data.tarifDoc.content);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }, []);

  async function updateTarif() {

    const requestData = {
      id:id,
      title: title,
      content: content
    };

    try {
      const response = await axios.put("/api/tarif", requestData);

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

      <form
        className="dash_create_form"
      >
        <h2>Titre</h2>
        <input
          type="text"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />

        <h2>Description</h2>

        <Editor value={content} onChange={setContent} />

        <button type="button" onClick={() => setShowPopup(true)}>
          Modifier
        </button>      </form>
      {showPopup && (
        <Popup
          message="Êtes-vous sûr(e) de vouloir continuer ?"
          onCancel={() => setShowPopup(false)}
          onConfirm={(ev) => {
            setShowPopup(false);
            updateTarif(ev);
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
