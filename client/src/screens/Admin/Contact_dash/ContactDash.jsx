import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ContactDash.css";
import Dashboard from "../Dashboard/Dashboard";
import { MdClose } from "react-icons/md";
import Popup from "../Popups/Popup";

const ContactDash = () => {
  const [messages, setMessages] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [sectionIdToDelete, setSectionIdToDelete] = useState(null);

  useEffect(() => {
    axios
      .get("/api/contact")
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }, []);
  async function handleDelete(id) {
    try {
      await axios.delete(`/api/contact/${id}`);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Dashboard>
      <h2>Boîte de messagerie</h2>
      <div className="contact_dash_wrapper">
        {messages.map((msg, index) => {
          const date =
            msg.createdat instanceof Date
              ? msg.createdat
              : new Date(msg.createdat);
          return (
            <div key={index} style={{ position: "relative", display: "inline-block" }}>
              <div  className="contact_dash_div">
                <div className="contact_dash_div_date">
                  <h5>
                    {" "}
                    {date.toLocaleDateString("fr-FR", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </h5>
                </div>

                <h5>
                  Nom: {msg.firstname} {msg.lastname}
                </h5>
                <h5>Adresse: {msg.city}</h5>
                <h5>Tel: {msg.phonenumber}</h5>
                <h5>Email: {msg.email}</h5>
                <br />
                <p>Message: {msg.message}</p>
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "-10px",
                  right: "-10px",
                  backgroundColor: "white",
                  borderRadius: "50%",
                  boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.5)",
                  padding: "2px",
                  cursor: "pointer",
                }}
              >
                <MdClose size={20}  onClick={() => {
                      setShowPopup(true);
                      setSectionIdToDelete(msg.id);
                    }} />
              </div>
            </div>
          );
        })}
      </div>
      {showPopup && (
        <Popup
          message="Êtes-vous sûr(e) de vouloir supprimer le message ?"
          onCancel={() => setShowPopup(false)}
          onConfirm={() => {
            setShowPopup(false);
            handleDelete(sectionIdToDelete);
          }}
        />
      )}
    </Dashboard>
  );
};

export default ContactDash;
