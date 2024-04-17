import React, { useState, useEffect } from "react";
import "./Actual.css";
import Layout from "../../components/Layout/Layout";
import { Helmet } from "react-helmet";
import axios from "axios";

const Actual = () => {
  const [posts, setPosts] = useState([]);
  const initialSections = {
    ecr: false,
    temoin: true,
    centre: false,
    ecole: false,
    media: false,
  };

  const [sections, setSections] = useState(initialSections);
  const toggleSection = (section) => {
    const updatedSections = { ...initialSections, [section]: true };
    for (const key in updatedSections) {
      if (key !== section) {
        updatedSections[key] = false;
      }
    }
    setSections(updatedSections);
  };

  useEffect(() => {
    axios
      .get("/api/post")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }, []);
  function renderSection(sectionName) {
    const filteredPosts = posts.filter((data) => data.type === sectionName);
    return (
      <>
        {filteredPosts.map((data, index) => {
          const date =
            data.date instanceof Date ? data.date : new Date(data.date);
          return (
            <>
              {index % 2 === 0 ? (
                <ActualDiv1
                  date={date.toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                  title={data.title}
                  banner={`/uploads/${data.cover}`}
                >
                  <div dangerouslySetInnerHTML={{ __html: data.content }} />
                </ActualDiv1>
              ) : (
                <ActualDiv2
                  date={date.toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                  title={data.title}
                  banner={`/uploads/${data.cover}`}
                >
                  <div dangerouslySetInnerHTML={{ __html: data.content }} />
                </ActualDiv2>
              )}
              <br />
              <br />
            </>
          );
        })}
      </>
    );
  }

  return (
    <div>
      <Helmet>
        <title>mathOtop | Actualités et Témoignages de nos élèves</title>
        <link
          rel="canonical"
          href="https://www.master-7rqtwti-luxgbhg4vwqu6.ovhcloud-fr-1.webpaas.ovh.net/actual"
        />
      </Helmet>{" "}
      <Layout>
        <div className="actual_wrapper">
          <div className="actual_buttons">
            <h2>Thèmes</h2>
            <button
              onClick={() => toggleSection("ecr")}
              className={sections.ecr ? "actual_buttonVisible" : ""}
            >
              Préparation aux ECR et certificat
            </button>
            <button
              onClick={() => toggleSection("temoin")}
              className={sections.temoin ? "actual_buttonVisible" : ""}
            >
              Témoignages
            </button>
            <button
              onClick={() => toggleSection("centre")}
              className={sections.centre ? "actual_buttonVisible" : ""}
            >
              Ouvrez votre centre mathOtop
            </button>
            <button
              onClick={() => toggleSection("ecole")}
              className={sections.ecole ? "actual_buttonVisible" : ""}
            >
              Vie de l'école
            </button>
            <button
              onClick={() => toggleSection("media")}
              className={sections.media ? "actual_buttonVisible" : ""}
            >
              Médias
            </button>
          </div>
          <div className="actual_content">
            {Object.keys(sections).map((section) => {
              if (sections[section]) {
                return (
                  <>
                    {section === "ecr" && renderSection("ecr")}
                    {section === "temoin" && renderSection("temoin")}
                    {section === "centre" && renderSection("centre")}
                    {section === "ecole" && renderSection("ecole")}
                    {section === "media" && renderSection("media")}
                  </>
                );
              }
              return null;
            })}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Actual;

const ActualDiv1 = ({ children, date, title, banner }) => {
  return (
    <div className="actual_div1">
      <h4>{date}</h4>
      <h2>{title}</h2>
      <img src={banner} alt="" />
      {children}
    </div>
  );
};
const ActualDiv2 = ({ children, date, title, banner }) => {
  return (
    <div className="actual_div2">
      <h4>{date}</h4>
      <h2>{title}</h2>
      <img src={banner} alt="" />
      {children}
    </div>
  );
};
