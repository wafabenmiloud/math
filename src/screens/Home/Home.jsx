import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "./Home.css";
import Layout from "../../components/Layout/Layout";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import im1 from "../../assets/home_page/math_01.jpg";
import im2 from "../../assets/home_page/math_02.jpg";
import im3 from "../../assets/home_page/math_03.jpg";
import im4 from "../../assets/home_page/math_04.jpg";
import im5 from "../../assets/home_page/math_05.jpg";
import im6 from "../../assets/home_page/mathotop_adresse.jpg";
import im7 from "../../assets/home_page/propose_mathotop.jpg";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    '"Je vous remercie pour l’aide apportée à notre fille. Elle a pu terminer cette 11ème avec plus de sérénité et aborder ses examens sans trop de stress! En tout cas, votre offre de cours était exactement ce dont elle avait besoin, et je suis trés heureuse d’étre tombée à temps sur votre pub!"',
    '"Ma fille est en 10 VP, Elle est trés studieuse et a beaucoup de plaisir à appreadre les maths chez mathOtop. Les cours lui permettent de progresser, sans inquiétude, car cela renforce ses bases, Nous sommes trés satisiaits de cette expérience avec mathOtop. Cela nous soulage, aussi, en tant que parents."',
    "“Je vous remercie pour les effforts que vous avez fournis à R. Elle a reçu les résultats des ECR de maths aujourd'hui et elle a obtenu 5,5”",
    "“Avec ce cours, mon fils a fait une remontée spectaculaire. Il comprend enfin ce qui se passe en classe et a repris confiance en ses compétences”",
    "“Mille mercis pour tout ce que vous avez apporté à M-J cette dernière année. Un seul immense regret, celui de ne pas vous avoir connue plus vite! Je ne peux que recommander mathOtop autour de moi.”",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 1000);
    return () => clearInterval(interval);
  });
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
    customPaging: (i) => (
      <div
        style={{
          width: "13px",
          height: "13px",
          background: i === currentSlide ? "#6BB13D" : "transparent",
          border: i === currentSlide ? "none" : "1px solid #6BB13D",
          borderRadius: "100%",
        }}
      />
    ),
  };
  const [currentSlide2, setCurrentSlide2] = useState(0);
  const images = [im1, im2, im3, im4, im5];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide2((prevSlide) => (prevSlide + 1) % images.length);
    }, 1000);
    return () => clearInterval(interval);
  });
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
  };

  return (
    <div>
      <Helmet>
        <title>mathOtop | Soutien en math personnalisé pour les enfants</title>
        <link rel="canonical" href="https://www.mathotop.ch/" />

      </Helmet>
      <Layout>
        <div className="carousel_container">
          <Slider {...settings}>
            {slides.map((slide, index) => (
              <div key={index}>
                <div
                  className={`text_container ${
                    index === currentSlide ? "active" : ""
                  }`}
                >
                  <p>{slide}</p>
                </div>
              </div>
            ))}
          </Slider>
          <br />
          <br />
          <Link to="/actual"> Voir tous les témoignages</Link>
        </div>
        <br />
        <br />
        <h2 className="home_bio">
          Pour vivre une année scolaire moins stressante en maths, faites
          confiance à mathOtop. <br /> Depuis 10 ans, nous aidons et motivons
          les élèves <br />
          de la 3ème primaire à la 3ème année de gymnase. Contactez-nous!
        </h2>
        <br />
        <br />
        <div className="home_wrapper">
          <div className="home_about_text">
            <h4>L’offre de mathOtop</h4>
            <p>
              - Une remise à niveau sur mesure, des exercices de rattrapage et
              de perfectionnement pour les élèves de la 3ème primaire au Gymnase
              en Mathématiques
            </p>
            <p>
              - Une préparation aux tests et examens : ECR, certificats, entrée
              dans le public, diplômes du Gymnase
            </p>
            <p>
              - Des cours de Maths-Physique ou Physique du collège au Gymnase
            </p>
            <h4>Grâce à mathOtop, l’élève</h4>
            <p>- retrouve confiance en ses capacités d’apprentissage</p>
            <p>- gagne en autonomie et en rapidité</p>
            <p>- acquiert des automatismes et une méthode de travail</p>
            <p>- progresse et améliore ses résultats scolaires</p>
          </div>
          <div className="home_about_slider">
            <Slider {...settings2}>
              {images.map((image, index) => (
                <div key={index}>
                  <div
                    className={` ${index === currentSlide2 ? "active" : ""}`}
                  >
                    <img src={image} alt="image_presentation" />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <br />
        <div className="home_contact">
          <div className="home_wrapper2">
            <div className="home_about_text2">
              <h4>A qui s’adresse mathOtop ?</h4>
            </div>
            <div className="home_about_slider2">
              <img src={im6} alt="image_presentation" />
            </div>
            <Link to="/pourqui">En savoir plus</Link>
          </div>
          <div className="home_wrapper2">
            <div className="home_about_text2">
              <h4>La méthode mathOtop</h4>
            </div>
            <div className="home_about_slider2">
              <img src={im7} alt="image_presentation" />
            </div>
            <Link to="methode">En savoir plus</Link>
          </div>
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
