import React, { useState, useEffect } from "react";
import "./ContactForm.css";
import Layout from "../../components/Layout/Layout";
import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { evaluate } from 'mathjs';

const ConatctForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [mathAnswer, setMathAnswer] = useState("");
  const [mathQuestion, setMathQuestion] = useState("");

  useEffect(() => {
    generateRandomMathQuestion();
  }, []);

  const generateRandomMathQuestion = () => {
    const operand1 = Math.floor(Math.random() * 10) + 1;
    const operand2 = Math.floor(Math.random() * 10) + 1;
    const operators = ["+", "-", "*"];
    const operator = operators[Math.floor(Math.random() * operators.length)];

    setMathQuestion(`${operand1} ${operator} ${operand2} = `);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = evaluate(mathQuestion.substring(0, mathQuestion.length - 2));
  
      if (parseInt(mathAnswer, 10) === result) {
        const emailBody = `
        ${message}
        \n\n\n\n\n\n
        Informations complémentaires:
        Nom complet: ${firstName} ${lastName}
        Téléphone: ${phoneNumber}
        Ville: ${city}
        Adresse email: ${email}
        `;
        const mailtoUrl = `mailto:info@mathotop.ch?subject=Prise%20de%20contact&body=${encodeURIComponent(
          emailBody
        )}`;
        window.location.href = mailtoUrl;
      } else {
        console.log("Incorrect math answer");
      }
      generateRandomMathQuestion();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  
  return (
    <div>
      <Helmet>
      <title>Conatct | MathOtop</title>
      <link rel="canonical" href="https://www.mathotop.ch/contactform" />

      </Helmet>
      <Layout>
        <div className="contact_form_wrapper">
          <Link to="/contact" className="arrow">
            <BsArrowLeft size={50} color="#9CBC8C" />
          </Link>
          <form
            onSubmit={handleSubmit}
            action="https://formspree.io/f/xoqoggbd"
            method="POST"
          >
            <div className="contact_text_field">
              <input
                type="text"
                placeholder="Nom *"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Prénom *"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="contact_text_field">
              <input
                type="text"
                placeholder="Ville *"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Tel *"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <div className="contact_text_field">
              <input
                type="email"
                placeholder="Adresse email *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="contact_text_field">
              <textarea
                cols="95"
                rows="10"
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
            <p className="legal">* Mentions obligatoires</p>
            <div className="math_question">
              <h6>
                This question is for testing whether or not you are a human
                visitor and to prevent automated spam submissions.
              </h6>
              <h5>
                Math question
                <span> * </span>
              </h5>
              <div className="math_question_row">
                <p>
                  Solve this simple math problem and enter the result. E.g. for
                  1+3, enter 4.
                </p>
                <div className="math_question_row">
                  <h3>{mathQuestion}</h3>
                  <input
                    type="number"
                    name=""
                    id=""
                    value={mathAnswer}
                    onChange={(e) => setMathAnswer(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="contact_button">
              {" "}
              <button type="submit">Envoyer</button>
            </div>
          </form>
        </div>
      </Layout>
    </div>
  );
};

export default ConatctForm;
