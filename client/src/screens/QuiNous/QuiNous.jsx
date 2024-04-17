import React, { useState, useEffect } from "react";
import "./QuiNous.css";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { Helmet } from "react-helmet";

const QuiNous = () => {
  const [quinous, setQuiNous] = useState([]);
  useEffect(() => {
    axios
      .get("/api/quinous")
      .then((response) => {
        setQuiNous(response.data);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }, []);
  return (
    <div>
      <Helmet>
        <title>Siège | MathOtop</title>
        <link
          rel="canonical"
          href="https://www.master-7rqtwti-luxgbhg4vwqu6.ovhcloud-fr-1.webpaas.ovh.net/quisommesnous"
        />
      </Helmet>
      <Layout>
        {quinous.map((data, index) => {
          return (
            <>
              <div key={index} className="qui_wrapper">
                <div className="qui_about_text">
                  <h4>{data.title}</h4>
                  <div dangerouslySetInnerHTML={{ __html: data.content }} />
                </div>
                <div className="qui_about_slider">
                  <img src={`/uploads/${data.cover}`} alt="cover" />
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

export default QuiNous;
