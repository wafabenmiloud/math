import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import axios from "axios";
import "./ExDash.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoIosAddCircle } from "react-icons/io";
import Dashboard from "../Dashboard/Dashboard";
import Popup from "../Popups/Popup";

const ExDash = () => {
  const [exercices, setExercices] = useState([]);
  const [currentSlides, setCurrentSlides] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [sectionIdToDelete, setSectionIdToDelete] = useState(null);

  useEffect(() => {
    axios
      .get("/api/ex")
      .then((response) => {
        setExercices(response.data);
        // Initialize current slides for each exercise
        setCurrentSlides(response.data.map(() => 0));
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    fade: true,
    speed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    nextArrow: <></>,
    prevArrow: <></>,
    beforeChange: (oldIndex, newIndex) => {
      // Update current slide index for the current exercise
      setCurrentSlides((prev) =>
        prev.map((slide, index) => (index === newIndex ? newIndex : slide))
      );
    },
  };

  async function handleDelete(id) {
    try {
      await axios.delete(`/api/ex/${id}`);
      // Remove the exercise from the list after deletion
      setExercices((prevExercises) =>
        prevExercises.filter((exercise) => exercise.id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Dashboard>
      <h2>Exercices</h2>
      {exercices.map((exercise, index) => {
        return (
          <>
            <div key={index}>
              <h2 className="ex_dash_bio">{exercise.title}</h2>
              <br />
              <br />
              <div className="ex_dash_wrapper">
                <div className="ex_dash_about_text">
                  <div dangerouslySetInnerHTML={{ __html: exercise.content }} />
                </div>
                <div className="ex_dash_about_slider">
                  <Slider {...settings} initialSlide={currentSlides[index]}>
                    {exercise.files.map((image, imageIndex) => (
                      <div key={imageIndex}>
                        <div
                          className={`imagecontainer ${
                            imageIndex === currentSlides[index] ? "active" : ""
                          }`}
                        >
                          <img src={`/uploads/${image}`} alt="image_exercice" />
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
              <br /><br />
              <div className="control_buttons">
                <div className="edit_button_wrapper">
                  <Link to={`/editex/${exercise.id}`}>
                    <FaRegEdit size={20} className="edit_button" />
                  </Link>{" "}
                </div>
                <div className="delete_button_wrapper">
                  <MdDelete
                    size={20}
                    className="delete_button"
                    onClick={() => {
                      setShowPopup(true);
                      setSectionIdToDelete(exercise.id);
                    }}
                  />
                </div>
              </div>
              <br />
              <br />{" "}
            </div>
            <div></div>
            <br />
            <br />
          </>
        );
      })}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Link to={"/createex"} className="edit_button">
          <IoIosAddCircle size={60} />
        </Link>
      </div>
      {showPopup && (
        <Popup
          message="Êtes-vous sûr(e) de vouloir continuer ?"
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

export default ExDash;
