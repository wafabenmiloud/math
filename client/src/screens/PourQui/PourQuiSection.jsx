import React from "react";
import "./PourQui.css";
import Layout from "../../components/Layout/Layout";
import im from "../../assets/pour_qui_banner2.jpg";
import { Link } from "react-router-dom";
import { BsArrowLeftShort } from "react-icons/bs";
import { Helmet } from "react-helmet";

const PourQuiSection = ({ children, alpha, title }) => {
  return (
    <div>
      <Helmet>
        <title>Que propose mathOtop ? | MathOtop</title>
      </Helmet>
      <Layout>
        <div className="pour_qui_banner">
          <img src={im} alt="pour_qui_banner" />
        </div>
        <div className="pour_qui_bio">
          <h3>Que propose mathOtop ?</h3>
          <p>
            De nombreux élèves ont des difficultés à aborder les mathématiques.
          </p>
          <p>
            Sans soutien personnalisé, ils peuvent rapidement perdre pied et les
            mathématiques sont alors à l’origine de blocages, de démotivation et
            même d’échec scolaire.
          </p>
          <p>Quelle est la nature des difficultés de votre enfant ?</p>
          <Link to="/methode">En savoir plus sur la méthode</Link>
        </div>
        <div className="pour_qui_section_wrapper">
          <div className="pour_qui_about_text">
            <div
              className="pour_qui_title"
              style={{ justifyContent: "flex-start" }}
            >
              <h1>{alpha}</h1>
              <h4>{title}</h4>
            </div>
            {children}
            <Link to="/pourqui" className="arrow">
              <BsArrowLeftShort />
            </Link>
          </div>
        </div>
      </Layout>
    </div>
  );
};
export default PourQuiSection;
