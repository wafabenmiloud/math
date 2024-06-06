import React, { useState, useEffect } from "react";
import "./PourQui.css";
import Layout from "../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";

const PourQui = () => {
  const navigate = useNavigate();

  //banner+bio
  const [qui, setQui] = useState([]);
  useEffect(() => {
    axios
      .get("/api/qui")
      .then((response) => {
        setQui(response.data);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }, []);

  //sections
  const [sections, setSections] = useState([]);
  useEffect(() => {
    axios
      .get("/api/quisec")
      .then((response) => {
        setSections(response.data);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }, []);
  const handleNavigation = (section) => {
    navigate("/pourquisec", {
      state: {
        title0: section.title0,
        bio: section.bio,
        letter: section.letter,
        title1: section.title1,
        seccontent: section.seccontent,
      },
    });
  };
  return (
    <div>
      <Helmet>
        <title>MathOtop | Notion de base en mathématique pour enfants</title>
        <link
          rel="canonical"
          href="https://www.master-7rqtwti-luxgbhg4vwqu6.ovhcloud-fr-1.webpaas.ovh.net/pourqui"
        />
      </Helmet>
      <Layout>
        {qui.map((q, index) => {
          return (
            <>
              {" "}
              <div key={index}>
                <div className="pour_qui_banner">
                  <img src={`/uploads/${q.cover}`} alt="cover" />{" "}
                </div>
                <div className="pour_qui_bio">
                  <h3>{q.title} </h3>
                  <div dangerouslySetInnerHTML={{ __html: q.content }} />
                </div>
              </div>
              <br />
              <br />
            </>
          );
        })}
        <div className="pour_qui_contact">
          {sections.map((sec, index) => {
            return (
              <div className="pour_qui_wrapper" key={index}>
                <div className="pour_qui_about_text">
                  <div className="pour_qui_title">
                    <h1>{sec.letter}</h1>
                    <h4>{sec.title}</h4>
                  </div>
                  <div className="pour_qui_content" dangerouslySetInnerHTML={{ __html: sec.content }} />
                </div>
                <button onClick={() => handleNavigation(sec)}>
                  {sec.button}
                </button>
              </div>
            );
          })}
        </div>
      </Layout>
    </div>
  );
};
export default PourQui;
