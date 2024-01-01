import React from "react";
import "./QuiNous.css";
import Layout from "../../components/Layout/Layout";

import im from "../../assets/qui_nous.jpg";
import { Helmet } from "react-helmet";

const QuiNous = () => {
  return (
    <div>
      <Helmet>
      <title>Siège | MathOtop</title>
      <link rel="canonical" href="https://www.mathotop.ch/siege" />

      </Helmet>
      <Layout>
        <div className="qui_wrapper">
          <div className="qui_about_text">
            <h4>mathOtop se présente</h4>
            <p>
              mathOtop a été créée par Annette Marclay et Anne Lechanteur en
              2013.
            </p>
            <p>
              La méthode mathOtop, élaborée en collaboration avec des
              psychologues et des enseignants propose un matériel pédagogique
              spécialement conçu pour soutenir les élèves rencontrant des
              difficultés en mathématiques.
            </p>
            <p>
              Initialement destinée aux enfants jusqu’à la 8ème année, la
              pédagogie a été étendue jusqu’à la 11ème année et au
              postobligatoire à la demande de nos élèves.
            </p>
            <p>
              S’appuyant sur le plan d’étude romand, l’enseignement de mathOtop
              a pour objectif, au travers d’exercices variés, d’aider les élèves
              à combler leurs lacunes, à reprendre confiance en eux et à obtenir
              de meilleurs résultats.
            </p>
            <p>Le matériel est adapté et complété en continu.</p>
          </div>
          <div className="qui_about_slider">
            <img src={im} alt="qui_sommes_nous_banner" />
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default QuiNous;
