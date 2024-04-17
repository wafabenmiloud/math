import "react-quill/dist/quill.snow.css";
import React, { useState, useEffect } from "react";
import "./HomeDash.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BsArrowLeftShort } from "react-icons/bs";
import { Link } from "react-router-dom";
import { TagsInput } from "react-tag-input-component";

export default function CreateSlides() {
  const [slides, setSlides] = useState([]);
  const [button, setButton] = useState("");

  const navigate = useNavigate();

  async function createNewSlider(ev) {
    ev.preventDefault();
    const requestData = {
      slides: slides,
      button: button,
    };
    try {
      const response = await axios.post("/api/slides", requestData);
      if (response.status === 200) {
        navigate("/dashboard");
      }
      console.log(slides);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="dash_create_form_wrapper">
      <Link to="/dashboard" className="arr">
        <BsArrowLeftShort />
      </Link>
      <form
        className="dash_create_form"
        onSubmit={createNewSlider}
        encType="multipart/form-data"
      >
        <h2>Nom du bouton</h2>
        <input
          type="text"
          placeholder={"..."}
          value={button}
          onChange={(ev) => setButton(ev.target.value)}
        />
        <h2>Slides</h2>
        <div style={{ width: "100%" }}>
          <div style={{ width: "100%" }}>
            <TagsInput
              style={{ width: "100%" }}
              value={slides}
              onChange={setSlides}
              name="slides"
              placeholder="Appuyez sur Entrée pour ajouter une nouvelle étiquette"
            />
          </div>
        </div>

        {slides.length > 0 && (
          <div>
            {slides.map((slide, index) => (
              <div key={index}>
                <h5>{slide}</h5>
              </div>
            ))}
          </div>
        )}
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}
