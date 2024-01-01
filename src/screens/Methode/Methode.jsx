import React from "react";
import "./Methode.css";
import Layout from "../../components/Layout/Layout";
import im1 from "../../assets/methode_banner.jpg";
import { Helmet } from "react-helmet";

const Methode = () => {
  return (
    <div>
      <Helmet>
        <title>Les méthodes les plus avancées en math pour vos enfants</title>
        <link rel="canonical" href="https://www.mathotop.ch/methode" />

      </Helmet>
      <Layout>
        <div className="methode_banner">
          <img src={im1} alt="image_methode" />
        </div>
        <div className="methode_bio">
          <h3>La méthode mathOtop pour les élèves du primaire au gymnase</h3>
        </div>
        <div className="methode_wrapper">
          <div className="methode_about_text">
            <h4>
              mathOtop, une méthode d'apprentissage structurée et progressive
            </h4>

            <p>
              Dès les classes primaires, l'élève doit acquérir les connaissances
              de base en mathématiques sur lesquelles viendront s'ajouter au fil
              des années des notions de plus en plus complexes. Une maison
              solide est construite sur des fondations saines:
            </p>
            <span>
              mathOtop aide votre enfant à assimiler durablement les notions de
              base qui seront les fondations de sa scolarité en maths.
            </span>
            <p>La méthode mathOtop consiste en:</p>
            <p>
              - une discussion avec vous et votre enfant sur les difficultés que
              vous posent les mathématiques au quotidien
            </p>
            <p>
              - une évaluation des acquis qui permettra l'identification des
              lacunes et blocages
            </p>
            <p>
              - la mise en place d'un programme de rattrapage individualisé et
              structuré, axé sur les besoins de votre enfant
            </p>
            <p>
              - la révision des tests et examens grâce à des exercices ciblés
            </p>
            <p>
              L'objectif principal est le{" "}
              <span>
                renforcement des fondations du savoir mathématique et la mise en
                confiance des élèves.
              </span>
            </p>
          </div>
        </div>
        <br />
        <div className="methode_wrapper2 wrapper2">
          <div className="methode_about_text">
            <p>
              Votre enfant se rend dans les locaux de mathOtop chaque semaine
              pour un cours de 60 minutes. Il retrouve 2 à 3 autres élèves au
              maximum. Chaque élève travaille sur un programme personnalisé
              adapté à ses besoins, dans une ambiance studieuse de classe où il
              va pouvoir se concentrer, travailler de manière autonome et poser
              ses questions. Pendant le cours, l'élève travaille les notions non
              assimilées ou aborde un nouveau thème avec le soutien de
              l'enseignant/e. Il prépare soigneusement les tests ou examens à
              venir. Le rendez-vous hebdomadaire permet d'établir une relation
              de confiance entre l'élève et l'enseignant/e mais aussi de
              réactualiser les besoins. À la fin du cours, les élèves du
              primaire et du secondaire reçoivent des devoirs pour une dizaine
              de minutes de travail quotidien à la maison. Ces exercices de
              drill sont corrigés et expliqués.
            </p>
            <p>
              Les élèves du gymnase travaillent sur leurs brochures, car chaque
              gymnase a développé son propre matériel pédagogique.
              L'enseignant/e complète si nécessaire avec des exercices
              supplémentaires et/ou un rappel de théorie et indique aux élèves
              les exercices à revoir ou à préparer en fonction de l'avancement
              du thème.
            </p>
            <span>
              Chez mathOtop, travail régulier et confiance en soi sont les
              piliers d'une scolarité sereine en mathématiques.
            </span>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Methode;
