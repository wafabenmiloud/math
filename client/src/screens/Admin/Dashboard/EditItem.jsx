import "react-quill/dist/quill.snow.css";
import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import axios from "axios";
import { BsArrowLeftShort } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Popup from "../Popups/Popup";

export default function EditItem() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [url1, setUrl1] = useState("");
  const [url2, setUrl2] = useState("");

  const [showPopup, setShowPopup] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/item/${id}`)
      .then((response) => {
        setTitle(response.data.itemDoc.title);
        setUrl1(response.data.itemDoc.f_url);
        setUrl2(response.data.itemDoc.b_url);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }, []);

  async function updateItem() {
    const requestData = {
      id: id,
      title: title,
      f_url: url1,
      b_url: url2,
    };

    try {
      const response = await axios.put("/api/item", requestData);

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

      <form className="dash_create_form">
        <h2>Titre</h2>
        <input
          type="text"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <h2>Lien Frontend</h2>
        <select value={url1} onChange={(ev) => setUrl1(ev.target.value)}>
          <option value="">...</option>
          <option value="">Présentation</option>
          <option value="quisommesnous">Qui sommes-nous ?</option>
          <option value="tarif">Cours et tarifs</option>
          <option value="pourqui">Pour qui ?</option>
          <option value="methode">La méthode</option>
          <option value="actual">Actualités</option>
          <option value="exercices">Exercices</option>
        </select>
        <h2>Lien Backoffice</h2>
        <select value={url2} onChange={(ev) => setUrl2(ev.target.value)}>
          <option value="">...</option>
          <option value="dashboard">Présentation</option>
          <option value="quinousdash">Qui sommes-nous ?</option>
          <option value="tarifdash">Cours et tarifs</option>
          <option value="quidash">Pour qui ?</option>
          <option value="methdash">La méthode</option>
          <option value="actdash">Actualités</option>
          <option value="exdash">Exercices</option>
        </select>
        <button type="button" onClick={() => setShowPopup(true)}>
          Modifier
        </button>{" "}
      </form>
      {showPopup && (
        <Popup
          message="Êtes-vous sûr(e) de vouloir continuer ?"
          onCancel={() => setShowPopup(false)}
          onConfirm={(ev) => {
            setShowPopup(false);
            updateItem(ev);
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
