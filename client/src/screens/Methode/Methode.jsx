import React, { useState, useEffect } from "react";
import "./Methode.css";
import Layout from "../../components/Layout/Layout";
import { Helmet } from "react-helmet";
import axios from "axios";

const Methode = () => {
  const [methodes, setMethodes] = useState([]);

  useEffect(() => {
    axios
      .get("/api/meth")
      .then((response) => {
        setMethodes(response.data);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }, []);
  return (
    <div>
      <Helmet>
        <title>Les méthodes les plus avancées en math pour vos enfants</title>
        <link rel="canonical" href="https://www.master-7rqtwti-luxgbhg4vwqu6.ovhcloud-fr-1.webpaas.ovh.net/methode" />

      </Helmet>
      <Layout>
      {methodes.map((methode, index) => {
        return (
          <>
            {" "}
            <div key={index} >
            <div className="methode_banner">
            <img
                    src={`/uploads/${methode.cover}`}
                    alt="cover"
                  />
        </div>
        <div className="methode_bio">
          <h3> {methode.title}</h3>
        </div>
        <div className="methode_wrapper">
          <div className="methode_about_text">
          <div dangerouslySetInnerHTML={{ __html: methode.content1 }} />

          </div>
        </div>
        <br />
        <div className="methode_wrapper2 wrapper2">
          <div className="methode_about_text">
          <div dangerouslySetInnerHTML={{ __html: methode.content2 }} />

          </div>
        </div>
            </div>
            <br />
            <br />
          </>
        );
      })}
       
      </Layout>
    </div>
  );
};

export default Methode;
