import React, { useState, useEffect } from "react";
import "./Tarif.css";
import Layout from "../../components/Layout/Layout";
import { Helmet } from "react-helmet";
import axios from "axios";

const Tarif = () => {
  const [tarifs, setTarifs] = useState([]);

  useEffect(() => {
    axios
      .get("/api/tarif")
      .then((response) => {
        setTarifs(response.data);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }, []);
  return (
    <div>
      <Helmet>
        <title>Cours de maths mathOtop à Lausanne</title>
        <link
          rel="canonical"
          href="https://www.master-7rqtwti-luxgbhg4vwqu6.ovhcloud-fr-1.webpaas.ovh.net/tarif"
        />
      </Helmet>
      <Layout>
        {tarifs.map((tarif, index) => {
          return (
            <>
                <div key={index} className="tarif_about_text">
                  <h4>{tarif.title}</h4>
                  <div className="tarifcontent" dangerouslySetInnerHTML={{ __html: tarif.content }} />
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

export default Tarif;
