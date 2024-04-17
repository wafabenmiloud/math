import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "./Exercices.css";
import Layout from "../../components/Layout/Layout";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Helmet } from "react-helmet";
import axios from "axios";

const Exercices = () => {
  const [exercices, setExercices] = useState([]);
  const [currentSlides, setCurrentSlides] = useState([]);

  useEffect(() => {
    axios
      .get("/api/ex")
      .then((response) => {
        setExercices(response.data);
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
      setCurrentSlides((prev) =>
        prev.map((slide, index) => (index === newIndex ? newIndex : slide))
      );
    },
  };

  return (
    <div>
      <Helmet>
        <title>Exercices | MathOtop</title>
        <link
          rel="canonical"
          href="https://www.master-7rqtwti-luxgbhg4vwqu6.ovhcloud-fr-1.webpaas.ovh.net/exercices"
        />
      </Helmet>
      <Layout>
        {exercices.map((exercise, index) => {
          return (
            <div key={index}>
              <h2 className="ex_bio">
              {exercise.title}
              </h2>
              <br />
              <br />
              <div className="ex_wrapper">
                <div className="ex_about_text">
                <div
                      dangerouslySetInnerHTML={{ __html: exercise.content }}
                    />
                </div>
                <div className="ex_about_slider">
                <Slider {...settings} initialSlide={currentSlides[index]}>
                      {exercise.files.map((image, imageIndex) => (
                        <div key={imageIndex}>
                          <div
                            className={`imagecontainer ${
                              imageIndex === currentSlides[index]
                                ? "active"
                                : ""
                            }`}
                          >
                            <img
                              src={`/uploads/${image}`}
                              alt="image_exercice"
                            />
                          </div>
                        </div>
                      ))}
                    </Slider>
                </div>
              </div>
              <br />
              <br />{" "}
            </div>
          );
        })}
      </Layout>
    </div>
  );
};

export default Exercices;
