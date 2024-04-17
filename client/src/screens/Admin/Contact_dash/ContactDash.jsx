import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ContactDash.css";
import Dashboard from "../Dashboard/Dashboard";
const ContactDash = () => {
  const [messages, setMessages] = useState([]);

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
  return (
    <Dashboard> 
      <h2>Formulaire de contact</h2>
      <div className="contact_dash_wrapper">
      {messages.map((msg, index) => {
        const date =
          msg.createdat instanceof Date
            ? msg.createdat
            : new Date(msg.createdat);
        return (
          <div key={index} className="contact_dash_div">
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
        );
      })}
    </div></Dashboard>
   
  );
};

export default ContactDash;
