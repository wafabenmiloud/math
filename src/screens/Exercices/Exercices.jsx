import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "./Exercices.css";
import Layout from "../../components/Layout/Layout";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import im1 from "../../assets/exercices/ex1.jpg";
import im2 from "../../assets/exercices/ex2.jpg";
import im3 from "../../assets/exercices/ex3.jpg";
import im4 from "../../assets/exercices/ex4.jpg";
import im5 from "../../assets/exercices/ex5.jpg";
import im6 from "../../assets/exercices/ex6.jpg";
import { Helmet } from "react-helmet";

const Exercices = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [im1, im2, im3, im4, im5, im6];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 1000);
    return () => clearInterval(interval);
  });

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
  };
  return (
    <div>
      <Helmet>
        <title>Exercices | MathOtop</title>
        <link rel="canonical" href="https://www.mathotop.ch/exercices" />

      </Helmet>
      <Layout>
        <h2 className="ex_bio">
          mathOtop a développé un programme d’exercices adapté à chaque élève de
          la 3ème à la 11ème
        </h2>
        <br />
        <br />
        <div className="ex_wrapper">
          <div className="ex_about_text">
            <p>
              Les feuilles d’exercices sont destinées à l’entraînement quotidien
              de dix à quinze minutes à la maison.
            </p>
            <p>
              Ces exercices variés permettent d’aborder une même notion de
              différentes façons pour aider l’élève à comprendre, mémoriser et
              utiliser ses connaissances dans des situations diverses.
            </p>
            <p>
              L’objectif est d’acquérir des automatismes de calcul qui
              permettront de gagner en confiance, en rapidité et en autonomie.
            </p>
            <p>
              Calcul avec les opérations de base, logique, fractions,
              proportionnalité, algèbre, géométrie, etc. L’ensemble des
              programmes est couvert.
            </p>
            <p>
              N’hésitez pas à découvrir plus en détails notre offre pédagogique
              en prenant rendez-vous pour un entretien sans engagement.
            </p>
          </div>
          <div className="ex_about_slider">
            <Slider {...settings}>
              {images.map((image, index) => (
                <div key={index}>
                  <div
                    className={`imagecontainer ${
                      index === currentSlide ? "active" : ""
                    }`}
                  >
                    <img src={image} alt="image_exercice" />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Exercices;
