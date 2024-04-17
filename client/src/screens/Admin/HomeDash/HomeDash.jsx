import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "./HomeDash.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import axios from "axios";
import Dashboard from "../Dashboard/Dashboard";
import Popup from "../Popups/Popup";

const HomeDash = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);
  const [sectionIdToDelete, setSectionIdToDelete] = useState(null);
  const [ssectionIdToDelete, setSsectionIdToDelete] = useState(null);

  //slides
  const [currentSlides, setCurrentSlides] = useState([]);
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    axios
      .get("/api/slides")
      .then((response) => {
        setSlides(response.data);
        setCurrentSlides(response.data.map(() => 0));
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
    nextArrow: <></>,
    prevArrow: <></>,
    beforeChange: (oldIndex, newIndex) => {
      setCurrentSlides((prev) =>
        prev.map((slide, index) => (index === newIndex ? newIndex : slide))
      );
    },
    customPaging: (i) => (
      <div
        style={{
          width: "13px",
          height: "13px",
          background: i === currentSlides[i] ? "#6BB13D" : "transparent",
          border: i === currentSlides[i] ? "none" : "1px solid #6BB13D",
          borderRadius: "100%",
        }}
      />
    ),
  };

  //bio
  const [bio, setBio] = useState([]);
  useEffect(() => {
    axios
      .get("/api/bio")
      .then((response) => {
        setBio(response.data);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }, []);

  //big section
  const [sections, setSections] = useState([]);
  const [currentSlides2, setCurrentSlides2] = useState([]);
  useEffect(() => {
    axios
      .get("/api/section")
      .then((response) => {
        setSections(response.data);
        // Initialize current slides for each exercise
        setCurrentSlides2(response.data.map(() => 0));
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }, []);
  const settings2 = {
    dots: false,
    infinite: true,
    fade: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <></>,
    prevArrow: <></>,
    beforeChange: (oldIndex, newIndex) => {
      setCurrentSlides2((prev) =>
        prev.map((slide, index) => (index === newIndex ? newIndex : slide))
      );
    },
  };
  async function handleDeleteSection(id) {
    try {
      await axios.delete(`/api/section/${id}`);
      setSections((prevSections) =>
        prevSections.filter((sec) => sec.id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  }

  //small section
  const [ssections, setSsections] = useState([]);
  useEffect(() => {
    axios
      .get("/api/ssection")
      .then((response) => {
        setSsections(response.data);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }, []);
  async function handleDeleteSSection(id) {
    try {
      await axios.delete(`/api/ssection/${id}`);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Dashboard>
      <h2>Présentation</h2>
      {/* <div className="home_dash_control"> 
      <Link to={"/createslides"} className="edit_button" >
            <IoIosAddCircle size={20} />
          </Link></div> */}
      {slides.map((slide, index) => {
        return (
          <>
            <div className="dash_carousel_container">
              <div className="home_dash_control">
                <Link to={`/editslides/${slide.id}`} className="edit_button">
                  <FaRegEdit size={20} />
                </Link>{" "}
              </div>
              <Slider {...settings} initialSlide={currentSlides[index]}>
                {slide.slides.map((sl, index) => (
                  <div key={index}>
                    <div
                      className={`text_container ${
                        index === currentSlides[index] ? "active" : ""
                      }`}
                    >
                      <p>{sl}</p>
                    </div>
                  </div>
                ))}
              </Slider>
              <br />
              <br />
              <Link to="/dashboard">{slide.button}</Link>
            </div>
            <br />
            <br />
          </>
        );
      })}
      {/*<div className="home_dash_control">
        <Link to={"/createbio"} className="edit_button">
          <IoIosAddCircle size={20} />
        </Link>
      </div> */}
      {bio.map((bi, index) => {
        return (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              width: "90%",
              margin: "auto",
            }}
          >
            <h2 className="home_dash_bio">{bi.bio}</h2>
            <Link to={`/editbio/${bi.id}`} className="edit_button">
              <FaRegEdit size={20} />
            </Link>{" "}
          </div>
        );
      })}

      <br />
      <br />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {sections.map((section, index) => {
          return (
            <>
              {" "}
              <div
                key={index}
                style={{
                  border: "6px solid #b0d694",
                  width: "95%",
                  margin: "auto",
                }}
              >
                <div className="home_dash_wrapper">
                  <div className="home_dash_about_text">
                    <div
                      dangerouslySetInnerHTML={{ __html: section.content }}
                    />
                  </div>
                  <div className="home_dash_about_slider">
                    <Slider {...settings2} initialSlide={currentSlides2[index]}>
                      {section.files.map((image, index) => (
                        <div key={index}>
                          <div
                            style={{ width: "100%" }}
                            className={` ${
                              index === currentSlides2[index] ? "active" : ""
                            }`}
                          >
                            <img
                              src={`/uploads/${image}`}
                              alt="image_exercice"
                              style={{ width: "100%" }}
                            />
                          </div>
                        </div>
                      ))}
                    </Slider>
                  </div>
                </div>
                <div className="control_buttons">
                  <div className="edit_button_wrapper">
                    <Link to={`/editsection/${section.id}`}>
                      <FaRegEdit size={20} className="edit_button" />
                    </Link>{" "}
                  </div>
                  <div className="delete_button_wrapper">
                    <MdDelete
                      size={20}
                      className="delete_button"
                      onClick={() => {
                        setShowPopup(true);
                        setSectionIdToDelete(section.id);
                      }}
                    />
                  </div>
                </div>
                <br />
                <br />
              </div>
              <br />
            </>
          );
        })}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignSelf: "center",
            width: "100px",
            height: "100px",
          }}
        >
          <Link to={"/createsection"} className="edit_button">
            <IoIosAddCircle size={60} />
          </Link>
        </div>
      </div>

      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="home_dash_contact">
        {ssections.map((ssec, index) => {
          return (
            <div
              className="home_dash_wrapper2"
              key={index}
              style={{ border: "6px solid #b0d694" }}
            >
              <div className="home_dash_about_text2">
                <h4>{ssec.title}</h4>
              </div>
              <div className="home_dash_about_slider2">
                <img src={`/uploads/${ssec.cover}`} alt="cover" />
              </div>{" "}
              <Link className="a" to={`/${ssec.link}`}>
                {ssec.button}
              </Link>
              <div className="control_buttons">
                <div className="edit_button_wrapper">
                  <Link to={`/editssection/${ssec.id}`}>
                    <FaRegEdit size={20} className="edit_button" />
                  </Link>{" "}
                </div>
                <div className="delete_button_wrapper">
                  <MdDelete
                    size={20}
                    className="delete_button"
                    onClick={() => {
                      setShowPopup2(true);
                      setSsectionIdToDelete(ssec.id); // Set the ssection id to delete
                    }}
                  />
                </div>
              </div>
              <br />
            </div>
          );
        })}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignSelf: "center",
            width: "100px",
            height: "100px",
          }}
        >
          <Link to={"/createssection"} className="edit_button">
            <IoIosAddCircle size={60} />
          </Link>
        </div>
      </div>
      {showPopup && (
        <Popup
          message="Êtes-vous sûr(e) de vouloir continuer ?"
          onCancel={() => setShowPopup(false)}
          onConfirm={() => {
            setShowPopup(false);
            handleDeleteSection(sectionIdToDelete);
          }}
        />
      )}
      {showPopup2 && (
        <Popup
          message="Êtes-vous sûr(e) de vouloir continuer ?"
          onCancel={() => setShowPopup2(false)}
          onConfirm={() => {
            setShowPopup2(false);
            handleDeleteSSection(ssectionIdToDelete);
          }}
        />
      )}
    </Dashboard>
  );
};

export default HomeDash;
