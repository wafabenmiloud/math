import React from "react";
import "./PourQui.css";
import Layout from "../../components/Layout/Layout";
import im1 from "../../assets/pour_qui_banner.jpg";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const PourQui = () => {
  return (
    <div>
      <Helmet>
        <title>MathOtop | Notion de base en mathématique pour enfants</title>
        <link rel="canonical" href="https://www.mathotop.ch/pourqui" />

      </Helmet>
      <Layout>
        <div className="pour_qui_banner">
          <img src={im1} alt="pour_qui_banner" />
        </div>
        <div className="pour_qui_bio">
          <h3>A qui s'adresse mathOtop ?</h3>
          <p>
            De nombreux élèves ont des difficultés à aborder les mathématiques.
          </p>
          <p>
            Sans soutien personnalisé, ils peuvent rapidement perdre pied et les
            mathématiques sont alors à l’origine de blocages, de démotivation et
            même d’échec scolaire.
          </p>
          <p>Quelle est la nature des difficultés de votre enfant ?</p>
        </div>
        <div className="pour_qui_contact">
          <div className="pour_qui_wrapper">
            <div className="pour_qui_about_text">
              <div className="pour_qui_title">
                <h1>A</h1>
                <h4>Notions de base non acquises</h4>
              </div>
              <p>
                Votre enfant a accumulé les retards; il ne suit plus en classe.
              </p>
              <p>Il est stressé face aux nouvelles notions.</p>
              <p>Il a perdu confiance en lui.</p>
              <p>Il a des résultats insuffisants.</p>
            </div>

            <Link to="/pourquisection/A">Que propose mathOtop</Link>
          </div>
          <div className="pour_qui_wrapper">
            <div className="pour_qui_about_text">
              <div className="pour_qui_title">
                <h1>B</h1>
                <h4>Notions de base partiellement acquises</h4>
              </div>
              <p>
                Votre enfant ne parvient pas toujours à suivre le rythme de la
                classe, car il a des lacunes dans les notions de base.
              </p>
              <p>Il commet beaucoup d'erreurs.</p>
              <p>
                Il a des résultats moyens ou irréguliers mais s'améliorerait
                facilement avec un appui ciblé.
              </p>
            </div>

            <Link to="/pourquisection/B">Que propose mathOtop</Link>
          </div>
          <div className="pour_qui_wrapper">
            <div className="pour_qui_about_text">
              <div className="pour_qui_title">
                <h1>C</h1>
                <h4>Notions de base connues mais à intégrer</h4>
              </div>
              <p>
                Votre enfant a des résultats satisfaisants voire bons mais doit
                lutter pour les maintenir.
              </p>
              <p>
                Des erreurs d'inattention l'empêchent d'atteindre de très bons
                résultats.
              </p>
              <p>Il se met trop de pression.</p>
              <p>
                Il veut progresser pour passer sereinement dans la classe
                supérieure.
              </p>
            </div>

            <Link to="/pourquisection/C">Que propose mathOtop</Link>
          </div>
        </div>
      </Layout>
    </div>
  );
};
export default PourQui;
