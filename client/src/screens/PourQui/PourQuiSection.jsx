import React from "react";
import "./PourQui.css";
import Layout from "../../components/Layout/Layout";
import im from "../../assets/pour_qui_banner2.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsArrowLeftShort } from "react-icons/bs";
import { Helmet } from "react-helmet";

const PourQuiSection = () => {
  const location = useLocation();
  const { title0, bio, letter, title1, seccontent } = location.state || {};
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
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
          <h3>{title0}</h3>
          <div dangerouslySetInnerHTML={{ __html: bio }} />

          <Link to="/methode">En savoir plus sur la méthode</Link>
        </div>

        <div className="pour_qui_section_wrapper">
          <div className="pour_qui_about_text">
            <div
              className="pour_qui_title"
              style={{ justifyContent: "flex-start" }}
            >
              <h1>{letter}</h1>
              <h4>{title1}</h4>
            </div>
            <div dangerouslySetInnerHTML={{ __html: seccontent }} />
              <BsArrowLeftShort className="arrow" onClick={handleGoBack}/>
          </div>
        </div>
      </Layout>
    </div>
  );
};
export default PourQuiSection;
