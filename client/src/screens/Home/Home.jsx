import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "./Home.css";
import Layout from "../../components/Layout/Layout";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";

const Home = () => {
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

  return (
    <div>
      <Helmet>
        <title>mathOtop | Soutien en math personnalisé pour les enfants</title>
        <link
          rel="canonical"
          href="https://www.master-7rqtwti-luxgbhg4vwqu6.ovhcloud-fr-1.webpaas.ovh.net/"
        />
      </Helmet>
      <Layout>
        {slides.map((slide, index) => {
          return (
            <>
              <div className="carousel_container">
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
                <Link to="/actual"> {slide.button}</Link>
              </div>
              <br />
              <br />
            </>
          );
        })}
        {bio.map((bi, index) => {
          return (
            <h2 key={index} className="home_bio">
              {bi.bio}
            </h2>
          );
        })}
        <br />
        <br />
        {sections.map((section, index) => {
          return (
            <>
              {" "}
              <div className="home_wrapper">
                <div className="home_about_text">
                  <div dangerouslySetInnerHTML={{ __html: section.content }} />
                </div>
                <div className="home_about_slider">
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
              <br />
              <br />
            </>
          );
        })}

        <br />
        <div className="home_contact">
          {ssections.map((ssec, index) => {
            return (
              <div className="home_wrapper2" key={index}>
                <div className="home_about_text2">
                  <h4>{ssec.title}</h4>
                </div>
                <div className="home_about_slider2">
                  <img src={`/uploads/${ssec.cover}`} alt="cover" />
                </div>{" "}
                <Link to={`/${ssec.link}`}>{ssec.button}</Link>
              </div>
            );
          })}
        </div>

        <br />
        <br />
        <br />
        <br />
      </Layout>{" "}
    </div>
  );
};

export default Home;
