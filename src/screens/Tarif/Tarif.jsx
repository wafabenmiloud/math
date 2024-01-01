import React from "react";
import "./Tarif.css";
import Layout from "../../components/Layout/Layout";
import { Helmet } from "react-helmet";

const Tarif = () => {
  return (
    <div>
      <Helmet>
        <title>Cours de maths mathOtop à Lausanne</title>
        <link rel="canonical" href="https://www.mathotop.ch/tarif" />

      </Helmet>
      <Layout>
        <div className="tarif_wrapper2">
          <div className="tarif_about_text">
            <h4>mathOtop à Lausanne</h4>
            <span>Enseignants : </span>
            <div>
              <p>Annette Marclay</p>
              <p>Lundi, mercredi, jeudi</p>
            </div>
            <div>
              <p>Anne Lechanteur</p>
              <p>Lundi, mercredi, jeudi</p>
            </div>
            <div>
              <p>J-F Dreyfus</p>
              <p>Mardi, mercredi et cours en ligne</p>
            </div>
            <div>
              <p>Philippe Dupont</p>
              <p>Vendredi et cours en ligne</p>
            </div>
            <br />
            <br />
            <a href="mailto:info@mathotop.ch" className="button">
              info@mathotop.ch
            </a>
            <br />
            <br />
            <span>Adresse du cours hebdomadaire : </span>
            <p className="tarif_small_p">Rue du Valentin 7</p>
            <p className="tarif_small_p">1004 Lausanne</p>
            <p className="tarif_small_p">
              Dans les locaux de l'Ecole catholique du Valentin, au premier
              étage du bâtiment principal.
            </p>
            <p className="tarif_small_p">
              Locaux situés à 100 mètres de la Place de la Riponne et de la
              Place Bel-Air et desservis par le M2 et de nombreuses lignes de
              bus.{" "}
            </p>
            <a
              href="https://www.google.com/maps/place/Rue+du+Valentin+7,+1004+Lausanne,+Suisse/@46.5239949,6.6304834,18z/data=!4m6!3m5!1s0x478c2e2e28d1a937:0xad824944cc8bd801!8m2!3d46.5236467!4d6.631476!16s%2Fg%2F11c25dpx0f?entry=ttu"
              className="a"
            >
              Plan interactif
            </a>
          </div>
        </div>
        <br />
        <br />
        <div className="tarif_wrapper">
          <div className="tarif_about_text2">
            <h4>Organisation et tarifs (dès la rentrée 2023/2024)</h4>
            <span>Elèves du primaire et du secondaire : </span>
            <div>
              <p>Frais d’inscription</p>
              <p>
                {" "}
                Fr. 80.- (bilan d'évaluation, compte-rendu par écrit détaillé,
                mise en place du programme personnalisé)
              </p>
            </div>
            <p>
              Abonnement mensuel (les cours ont lieu du lundi au jeudi d'août à
              fin juin)
            </p>
            <div className="tarif_div1">
              <p>Elèves du primaire:</p>
              <p>Fr. 198.-</p>
            </div>
            <div className="tarif_div1">
              <p>Elèves du secondaire:</p>
              <p>Fr. 210.-</p>
            </div>
            <p>
              {" "}
              incluant le matériel pédagogique développé par mathOtop pour la
              classe et la maison, le cours hebdomadaire de 60 minutes et les
              devoirs pour les vacances d'octobre, d'hiver, des Relâches et de
              Pâques.
            </p>
            <span>
              Elèves du gymnase (école de maturité, de commerce et de culture
              générale) et apprentis
            </span>
            <div className="tarif_div2">
              <p>Frais d’inscription</p>
              <p> Fr. 30.- (mise en place du programme personnalisé)</p>
            </div>
            <div className="tarif_div3">
              <p>Facturation par cours suivi (60 minutes):</p>
              <p> Fr. 58.-</p>
            </div>
            <p>
              Les cours pour les élèves du gymnase et les apprentis ont lieu les
              mardi, mercredi et vendredi d'août à fin juin. Prix pour des cours
              privés en ligne sur demande.
            </p>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Tarif;
