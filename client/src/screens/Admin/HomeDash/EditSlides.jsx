import "react-quill/dist/quill.snow.css";
import { useState, useEffect } from "react";
import "./HomeDash.css";
import axios from "axios";
import { BsArrowLeftShort } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { TagsInput } from "react-tag-input-component";
import Popup from "../Popups/Popup";

export default function EditSlides() {

  const { id } = useParams();
  const [slides, setSlides] = useState([]);
  const [button, setButton] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/slides/${id}`)
      .then((response) => {
        setSlides(response.data.slidesDoc.slides);
        setButton(response.data.slidesDoc.button);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }, []);

  async function updateSlides() {
    const requestData = {
      slides: slides,
      button: button,
      id: id,
    };

    try {
      const response = await axios.put("/api/slides", requestData);
      console.log(requestData);

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
        <button type="button" onClick={() => setShowPopup(true)}>
          Modifier
        </button>
      </form>
      {showPopup && (
        <Popup
          message="Êtes-vous sûr(e) de vouloir continuer ?"
          onCancel={() => setShowPopup(false)}
          onConfirm={(ev) => {
            setShowPopup(false);
            updateSlides(ev);
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
