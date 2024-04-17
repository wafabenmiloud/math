import React, { useState } from "react";
import "./Popup.css";

export default function Popup({ message, onCancel, onConfirm }) {
  const [modal, setModal] = useState(true);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <>
      <div className="modal">
        <div onClick={toggleModal} className="overlay"></div>
        <div className="modal-content">
          <p>{message}</p>
          <div className="modal-content-buttons">
               <button className="close-modal" onClick={onCancel}>
            Annuler
          </button>
          <button className="open-modal" onClick={onConfirm}>
            Confirmer
          </button>
          </div>
       
        </div>
      </div>
    </>
  );
}
