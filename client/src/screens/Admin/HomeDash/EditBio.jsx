import "react-quill/dist/quill.snow.css";
import React, { useState, useEffect } from "react";
import "./HomeDash.css";
import axios from "axios";
import { BsArrowLeftShort } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Popup from "../Popups/Popup";

export default function EditBio() {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/bio/${id}`)
      .then((response) => {
        setContent(response.data.bioDoc.bio);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }, []);

  async function updateBio() {
    const payload = {
      id: id,
      bio: content,
    };
    try {
      const response = await axios.put("/api/bio", payload);

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
        <input
          type="text"
          value={content}
          onChange={(ev) => setContent(ev.target.value)}
        />
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
            updateBio(ev);
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
