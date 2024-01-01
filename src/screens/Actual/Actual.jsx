import React, { useState } from "react";
import "./Actual.css";
import Layout from "../../components/Layout/Layout";
import img from "../../assets/actual_1.jpg";
import img1 from "../../assets/actual_2.jpg";
import img2 from "../../assets/actual_3.jpg";
import img3 from "../../assets/actual_4.jpg";
import { Helmet } from "react-helmet";

const Actual = () => {
  const initialSections = {
    all: false,
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
  return (
    <div>
      <Helmet>
        <title>mathOtop | Actualités et Témoignages de nos élèves</title>
        <link rel="canonical" href="https://www.mathotop.ch/actual" />

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
                    {section === "all" && (
                      <>
                        {" "}
                        <ActualDiv1
                          date="07 May 2023"
                          title="Préparation aux certificats VP et VG de 11ème année"
                        >
                          <span>
                            {" "}
                            Chaque année pendant les vacances de printemps,
                            mathOtop propose une préparation au certificat de
                            mathématiques de 11ème année VP, VG2 et VG1{" "}
                          </span>
                          <p>
                            {" "}
                            Il s'agit d'une révision ciblée et efficace. Nous
                            revoyons les notions essentielles du programme.{" "}
                            <br />
                            L'élève est placé dans les conditions de l'examen
                            sur la base de problèmes types de certificat. <br />
                            Les stages ont lieu dans les locaux de mathOtop, Rue
                            du Valentin 7 à Lausanne. <br /> Les élèves se
                            préparent ainsi sans stress et consolident leurs
                            connaissances.
                          </p>

                          <span>Déroulement de la demi-journée: </span>
                          <p>
                            - pendant 1h30, entraînement sur la base d'extraits
                            de certificats <br /> - courte pause avec petit
                            goûter offert pour reprendre des forces <br /> -
                            correction détaillée pendant 1h30 environ avec
                            explications, "trucs" et rappels de théorie.
                          </p>
                          <p>
                            Voici quelques témoignages de nos élèves et leurs
                            parents:{" "}
                          </p>
                          <h6>
                            Je vous remercie encore une fois pour votre
                            précieuse aide durant ces deux dernières années. I a
                            obtenu un 6 à son examen de certificat en maths!{" "}
                            <br />
                            <br /> Je suis contente de ma note de certificat en
                            maths et je me suis sentie bien et calme durant
                            l'examen écrit (contrairement aux tests faits dans
                            l'année). Je vous remercie beaucoup pour le temps
                            que vous m'avez accordé durant cette année, de
                            m'avoir expliqué les exercices que je ne comprenais
                            pas et surtout de m'avoir rassurée. <br />
                            <br /> J'ai fini mon diplôme et j'ai reçu mes
                            résultats ce matin. J'ai fait une moyenne de 5.6 en
                            maths. J'ai eu le meilleur résultat de la classe. Je
                            tenais à vous remercier infiniment pour l'aide et le
                            soutien que vous m'avez apportés durant cette année.
                          </h6>
                          <p>
                            Nous répondons volontiers à vos questions. <br />{" "}
                            N'hésitez pas à nous appeler au{" "}
                            <span>079 262 04 00</span> ou à nous écrire:{" "}
                            <span className="h5">info@mathotop.ch</span>.
                          </p>
                        </ActualDiv1>
                        <br />
                        <br />
                        <ActualDiv2
                          date="27 April 2023"
                          title="Préparation aux ECR de maths de 6P et 8P"
                        >
                          <img src={img} alt="image_actualites" /> <br />
                          <span>
                            Stage de préparation aux ECR de 6P et 8P de
                            mathématiques
                          </span>
                          <p>
                            Chaque année pendant les vacances de Pâques,
                            mathOtop propose une révision ciblée et efficace.
                            L'élève est placé dans les conditions de l'examen
                            sur la base des ECR des années précédentes. Il peut
                            ainsi apprendre à gérer son temps, revoir la théorie
                            sur les thèmes principaux, poser ses questions et
                            surtout se préparer sans stress pour aborder le jour
                            de l'ECR en toute confiance.
                          </p>
                          <span>Déroulement de la demi-journée: </span>
                          <p>
                            - pendant 1h30, entraînement sur la base d'ECR des
                            années précédentes <br /> - courte pause avec petit
                            goûter offert pour reprendre des forces <br /> -
                            correction détaillée pendant 1h30 environ avec
                            explications, "trucs" et rappels de théorie.
                          </p>
                          <p>
                            Les stages ont lieu dans les locaux de mathOtop, Rue
                            du Valentin 7 à Lausanne.
                          </p>
                          <p>
                            Contactez-nous pour en savoir plus au 079 262 04 00
                            ou écrivez-nous:{" "}
                            <span className="h5">info@mathotop.ch</span>
                          </p>
                        </ActualDiv2>
                        <br />
                        <br />
                        <ActualDiv1
                          date="06 June 2023"
                          title="Les parents de nos élèves témoignent"
                        >
                          <img src={img1} alt="image_actualites" />
                          <p>
                            Enfin une méthode efficace ! Tout au long de son
                            parcours scolaire, ma fille a rencontré des
                            difficultés en mathématiques. Après de longues
                            recherches et cours d’appui malheureusement
                            inefficaces, nous avons enfin trouvé le prise en
                            charge qu’il lui fallait! La structure MathOtop, de
                            par sa méthode, son expertise et son approche sur
                            mesure, a su pointer les difficultés de ma fille et
                            cibler ses besoins. Résultats : - drill régulier -
                            plus de confiance - amélioration des résultats - les
                            mathématiques ne lui font plus peur Merci à MathOtop
                            et particulièrement à Mme Marclay pour
                            l’investissement et le suivi. On signe pour l’année
                            prochaine sans aucune hésitation!!! Juin 2023
                          </p>
                          <p>
                            Cours utiles, bien organisés et adaptés aux besoins
                            de l'élève. Merci à la merveilleuse enseignante
                            Annette Marclay. Juin 2023
                          </p>
                          <p>
                            mathOtop a fait de ma fille une championne des maths
                            et surtout une passionnée. Sa moyenne est remontée
                            de 1.5 et c'est un vrai plaisir pour ma fille de
                            participer à leurs cours. Je vous recommande cette
                            organisation, MILLE FOIS. Juin 2023
                          </p>
                          <p>
                            Je remercie infiniment mathOtop d'avoir aidé mon
                            fils, il a atteint et même dépassé sa moyenne. Juin
                            2023
                          </p>
                          <p>
                            Superbe amélioration en maths ce semestre. Merci
                            beaucoup pour votre excellent travail! Juin 2022
                          </p>
                          <p>
                            Nous vous remercions de votre grande contribution à
                            l'évolution de W. Merci pour votre soin, votre
                            rigueur et votre pédagogie. Juin 2022
                          </p>
                          <p>
                            Cela va faire 4 ans que je suis inscrit chez
                            mathOtop et ce sont aussi 4 années de pur plaisir.
                            Grâce à vous j'ai réussi à combler mes lacunes en
                            maths en un rien de temps et j'ai réussi à
                            developper mes outils en maths et à les affiner. Je
                            ne saurais pas comment vous remercier. Vous êtes une
                            personne exceptionnelle, vous êtes appliquée dans
                            votre métier et c'est pour cela que j'ai eu autant
                            de plaisir à venir. Juin 2022
                          </p>
                          <p>
                            A nous de vous remercier pour votre précieux soutien
                            les derniers mois... R a bien évolué et s'est senti
                            mieux par rapport aux Maths grâce à vous. Juin 2022
                          </p>
                          <p>
                            Merci infiniment pour votre gentillesse, votre
                            patience, votre souplesse, et votre
                            professionnalisme. U a aussi eu beaucoup de plaisir
                            et pourtant c'était pas gagné! Grâce à vous, il a
                            remonté sa moyenne et repris confiance en ses
                            capacités. Vous avez réussi à lui faire aimer les
                            math! Je vous en suis très reconnaissante et je
                            n'hésiterai pas une seconde à le réinscrire chez
                            vous si le besoin se fait sentir. Juin 2022
                          </p>
                          <p>
                            On ne vous remercie jamais assez et je suis très
                            contente de vous avoir rencontrée et partagé ces
                            moments avec nous. Grace à vous et votre travail, A
                            est heureux à l’école. Un GRAND MERCI pour votre
                            professionnalisme et humanisme. Juin 2022
                          </p>
                          <p>
                            Nous nous réjouissons des progrès de L. Au dernier
                            TA sur les fonctions il a eu 5! Il a également du
                            plaisir à venir chez mathOtop et maîtrise mieux le
                            stress pendant les tests. Merci beaucoup pour votre
                            accompagnement cette année! Juin 2022
                          </p>
                          <p>
                            V a beaucoup aimé les cours de mathOtop, elle y
                            allait toujours avec plaisir. Votre méthode est très
                            efficace et les bonnes notes de V à l'école en font
                            preuve. Mai 2022
                          </p>
                          <p>
                            Je voulais partager ma joie et ma fierté. Y a reçu
                            ses tests et elle a été heureuse d'apprendre qu'elle
                            avait eu deux 6! Mai 2022
                          </p>
                          <p>
                            M souhaite continuer ses cours de mathOtop l'année
                            prochaine et je suis très contente que ce soit
                            elle-même qui a décidé. Je vous remercie très fort
                            pour votre travail, pour votre flexibilité,
                            amabilité et pour tous les détails que vous ajustez
                            à l'enseignement! Mai 2022
                          </p>
                          <p>
                            R got in to VP. Thanks a lot for your help. Février
                            2022
                          </p>
                          <p>
                            Ma fille est en 10 VP. Elle est très studieuse et a
                            beaucoup de plaisir à apprendre les maths chez
                            mathOtop. Les cours lui permettent de progresser,
                            sans inquiétude, car cela renforce ses bases. Nous
                            sommes très satisfaits de cette expérience avec
                            Mathotop. Cela nous soulage, aussi, en tant que
                            parents. Septembre 2021
                          </p>
                          <p>
                            Nous avons inscrit notre fille lorsqu’elle était en
                            10VP. Elle manquait de confiance en elle.
                            L’enseignement des maths dans son établissement ne
                            lui permettrait pas de progresser (30 élèves dans la
                            classe, plusieurs notes basses aux TS avec
                            remédiation systématique pour toute la classe). Les
                            cours de mathOtop lui ont permis d’avoir confiance
                            en elle. Ses résultats se sont bien améliorés car la
                            méthode rigoureuse de mathOtop est appropriée à ma
                            fille. Je ne peux que recommander cette école à tous
                            les élèves dans ce cas. Elle est maintenant au
                            gymnase et très épanouie en mathématiques. Septembre
                            2021
                          </p>
                          <p>
                            Je voulais vous remercier infiniment, car vous êtes
                            vraiment une grande aide pour moi. Juin 2021
                          </p>
                          <p>
                            Un grand merci pour tous vos cours donnés et votre
                            professionnalisme. Y a beaucoup progressé et est
                            vraiment au top grâce à votre technique. Juin 2021
                          </p>
                          <p>
                            Je tiens à vous remercier pour cette fructueuse
                            collaboration. A a rattrapé le retard pris tout au
                            long de sa scolarité. Juin 2021
                          </p>
                          <p>
                            Notre fille a bénéficié de vos cours de
                            mathématiques depuis septembre 2020 et en a tiré un
                            grand profit. Nous tenons à vous remercier pour la
                            qualité des einseignants et des appuis dispensés.
                            Janvier 2021
                          </p>
                          <p>
                            Y est ravie de faire les cours avec vous! Juin 2020
                          </p>
                          <p>
                            L a été très heureuse de passer cette année avec
                            vous. Je profite de l'occasion pour vous remercier
                            également du soutien que vous avez apporté à L et
                            qui lui a permis de passer en voie prégymnasiale.
                            Juin 2020
                          </p>
                          <p>
                            Je vous remercie beaucoup pour tout ce que vous avez
                            fait pour D. Il a pris goût aux maths et moi aussi
                            je suis très contente du progrès de D en maths. Vous
                            l'avez vraiment beaucoup aidé. Juin 2020
                          </p>
                          <p>
                            Je vous remercie de tout le travail fourni avec Y et
                            nous continuons avec plaisir l'année prochaine. Juin
                            2020
                          </p>
                          <p>
                            I me dit qu'il comprend déjà beaucoup mieux certains
                            sujets. D'ailleurs, au dernier TS il a fait un 5 ce
                            qui nous réjouit beaucoup. Mars 2020
                          </p>
                          <p>
                            Je voulais vous dire que mon test de mercredi s'est
                            très bien passé. J'ai eu de nouveau un 6. Mars 2020
                          </p>
                          <p>
                            Un grand merci pour tous les efforts, la patience et
                            la gentillesse dont vous faites preuve avec Y. Ça
                            lui donne confiance en elle et lui fait aimer les
                            maths. Juin 2019
                          </p>
                          <p>
                            Je vous remercie encore une fois pour votre
                            précieuse aide durant ces deux dernières années. I a
                            obtenu un 6 à son examen de certificat en maths!
                            Juin 2019.
                          </p>
                          <p>
                            Mille mercis pour tout ce que vous avez apporté à
                            M-J cette dernière année… un seul immense regret,
                            celui de ne pas vous avoir connue plus vite! Je ne
                            peux que recommander mathOtop autour de moi. Juin
                            2019
                          </p>
                          <p>
                            Je suis contente de ma note de certificat en maths
                            et je me suis sentie bien et calme durant l'examen
                            écrit (contrairement aux tests faits dans l'année).
                            Je vous remercie beaucoup pour le temps que vous
                            m'avez accordé durant cette année, de m'avoir
                            expliqué les exercices que je ne comprenais pas et
                            surtout de m'avoir rassurée. Juin 2019
                          </p>
                          <p>
                            Un grand merci pour tout ce que vous avez fait pour
                            V. Vraiment au top! Juin 2019
                          </p>
                          <p>
                            Nous avons essayé plusieurs centres d'appui en maths
                            avant d'inscrire P chez mathOtop et c'est vraiment
                            exceptionnel ce que vous faites. Merci beaucoup pour
                            votre dévouement. Juin 2019
                          </p>
                          <p>
                            Un grand MERCI. Je pense que vos cours ont bien aidé
                            O. Juin 2019
                          </p>
                          <p>
                            Nous vous remercions infiniment de votre aide qui a
                            permis à Y de réussir ce concours et lui a donné
                            aussi l'envie de continuer les mathématiques. Mai
                            2019
                          </p>
                          <p>
                            Merci pour les résultats, nous sommes vraiment
                            satisfaits. A s'est beaucoup amélioré. Mai 2019
                          </p>
                        </ActualDiv1>
                        <br />
                        <br />
                        <ActualDiv1
                          date="31 July 2018
                        "
                          title="Ouvrez votre centre mathOtop
                        "
                        >
                          <img src={img2} alt="image_actualites" />

                          <p>
                            Vous aimez l'enseignement, les mathématiques et vous
                            avez l’esprit d’entreprise?
                          </p>

                          <span>
                            Alors lancez-vous et ouvrez un centre de soutien
                            scolaire en mathématiques mathOtop dans votre
                            région.
                          </span>
                          <p>
                            Vous bénéficiez d’une grande liberté d’action en
                            gérant votre propre franchise mathOtop : vous
                            choisissez votre taux d’occupation et organisez vos
                            cours. mathOtop met à votre disposition son
                            expérience, sa méthode et son matériel pédagogiques
                            grâce à une formation de départ complète et soignée,
                            un suivi et un partage réguliers.
                          </p>
                          <p>
                            Vous avez la possibilité d’enseigner aux élèves
                            jusqu’à la 8ème année ou jusqu’à la 11ème année.
                          </p>
                          <p>
                            Patience, pédagogie, aisance en mathématiques sont
                            les prérequis pour ce travail à temps partiel
                            enrichissant et stimulant qui s'adresse aussi aux
                            personnes souhaitant reprendre une activité
                            professionnelle après une pause carrière.
                          </p>
                          <p>
                            Pour en savoir plus, consultez notre site internet{" "}
                            <span className="h5">www.mathotop.ch</span>
                            contactez-nous au 079 262 04 00 ou par email :
                            <span className="h5">info@mathotop.ch</span>.
                          </p>
                        </ActualDiv1>
                        <br />
                        <br />
                        <ActualDiv2
                          date="31 July 2018
                        "
                          title="Cours de découverte mathOtop
                        "
                        >
                          <img src={img2} alt="image_actualites" /> <br />
                          <p>
                            En tant qu'élève de mathOtop, tu as la possibilité
                            de faire découvrir ton cours préféré de soutien en
                            maths à tes amis! <br />
                            Si tu le souhaites, tu peux donc venir accompagné(e)
                            d'un ou une camarade. Il suffit de nous l'annoncer
                            une semaine à l'avance. Afin de préparer la venue de
                            ton ami(e), nous aurons besoin de connaître sa
                            classe et le thème qu' il/elle est en train de
                            travailler à l'école.
                            <br />
                            Nous nous réjouissons d'accueillir tes amis à
                            l'occasion de ces cours découverte. Les cours
                            découverte sont bien sûr gratuits et sans
                            engagement!
                          </p>
                        </ActualDiv2>
                        <br />
                        <br />
                        <ActualDiv1
                          date="04 November 2015
                        "
                          title="mathOtop est sur Facebook
                        "
                        >
                          <img src={img3} alt="image_actualites" />
                          <p>
                            Rejoignez notre réseau d'amis sur Facebook{" "}
                            <span className="h5">
                              www.facebook.com/pages/Mathotop/192299997594979
                            </span>
                            .
                          </p>
                        </ActualDiv1>
                      </>
                    )}
                    {section === "ecr" && (
                      <>
                        <ActualDiv1
                          date="07 May 2023"
                          title="Préparation aux certificats VP et VG de 11ème année"
                        >
                          <span>
                            {" "}
                            Chaque année pendant les vacances de printemps,
                            mathOtop propose une préparation au certificat de
                            mathématiques de 11ème année VP, VG2 et VG1{" "}
                          </span>
                          <p>
                            {" "}
                            Il s'agit d'une révision ciblée et efficace. Nous
                            revoyons les notions essentielles du programme.{" "}
                            <br />
                            L'élève est placé dans les conditions de l'examen
                            sur la base de problèmes types de certificat. <br />
                            Les stages ont lieu dans les locaux de mathOtop, Rue
                            du Valentin 7 à Lausanne. <br /> Les élèves se
                            préparent ainsi sans stress et consolident leurs
                            connaissances.
                          </p>

                          <span>Déroulement de la demi-journée: </span>
                          <p>
                            - pendant 1h30, entraînement sur la base d'extraits
                            de certificats <br /> - courte pause avec petit
                            goûter offert pour reprendre des forces <br /> -
                            correction détaillée pendant 1h30 environ avec
                            explications, "trucs" et rappels de théorie.
                          </p>
                          <p>
                            Voici quelques témoignages de nos élèves et leurs
                            parents:{" "}
                          </p>
                          <h6>
                            Je vous remercie encore une fois pour votre
                            précieuse aide durant ces deux dernières années. I a
                            obtenu un 6 à son examen de certificat en maths!{" "}
                            <br />
                            <br /> Je suis contente de ma note de certificat en
                            maths et je me suis sentie bien et calme durant
                            l'examen écrit (contrairement aux tests faits dans
                            l'année). Je vous remercie beaucoup pour le temps
                            que vous m'avez accordé durant cette année, de
                            m'avoir expliqué les exercices que je ne comprenais
                            pas et surtout de m'avoir rassurée. <br />
                            <br /> J'ai fini mon diplôme et j'ai reçu mes
                            résultats ce matin. J'ai fait une moyenne de 5.6 en
                            maths. J'ai eu le meilleur résultat de la classe. Je
                            tenais à vous remercier infiniment pour l'aide et le
                            soutien que vous m'avez apportés durant cette année.
                          </h6>
                          <p>
                            Nous répondons volontiers à vos questions. <br />{" "}
                            N'hésitez pas à nous appeler au{" "}
                            <span>079 262 04 00</span> ou à nous écrire:{" "}
                            <span className="h5">info@mathotop.ch</span>.
                          </p>
                        </ActualDiv1>
                        <br />
                        <br />
                        <ActualDiv2
                          date="27 April 2023"
                          title="Préparation aux ECR de maths de 6P et 8P"
                        >
                          <img src={img} alt="image_actualites" /> <br />
                          <span>
                            Stage de préparation aux ECR de 6P et 8P de
                            mathématiques
                          </span>
                          <p>
                            Chaque année pendant les vacances de Pâques,
                            mathOtop propose une révision ciblée et efficace.
                            L'élève est placé dans les conditions de l'examen
                            sur la base des ECR des années précédentes. Il peut
                            ainsi apprendre à gérer son temps, revoir la théorie
                            sur les thèmes principaux, poser ses questions et
                            surtout se préparer sans stress pour aborder le jour
                            de l'ECR en toute confiance.
                          </p>
                          <span>Déroulement de la demi-journée: </span>
                          <p>
                            - pendant 1h30, entraînement sur la base d'ECR des
                            années précédentes <br /> - courte pause avec petit
                            goûter offert pour reprendre des forces <br /> -
                            correction détaillée pendant 1h30 environ avec
                            explications, "trucs" et rappels de théorie.
                          </p>
                          <p>
                            Les stages ont lieu dans les locaux de mathOtop, Rue
                            du Valentin 7 à Lausanne.
                          </p>
                          <p>
                            Contactez-nous pour en savoir plus au 079 262 04 00
                            ou écrivez-nous:{" "}
                            <span className="h5">info@mathotop.ch</span>
                          </p>
                        </ActualDiv2>
                      </>
                    )}
                    {section === "temoin" && (
                      <>
                        {" "}
                        <ActualDiv1
                          date="06 June 2023"
                          title="Les parents de nos élèves témoignent"
                        >
                          <img src={img1} alt="image_actualites" />
                          <p>
                            Enfin une méthode efficace ! Tout au long de son
                            parcours scolaire, ma fille a rencontré des
                            difficultés en mathématiques. Après de longues
                            recherches et cours d’appui malheureusement
                            inefficaces, nous avons enfin trouvé le prise en
                            charge qu’il lui fallait! La structure MathOtop, de
                            par sa méthode, son expertise et son approche sur
                            mesure, a su pointer les difficultés de ma fille et
                            cibler ses besoins. Résultats : - drill régulier -
                            plus de confiance - amélioration des résultats - les
                            mathématiques ne lui font plus peur Merci à MathOtop
                            et particulièrement à Mme Marclay pour
                            l’investissement et le suivi. On signe pour l’année
                            prochaine sans aucune hésitation!!! Juin 2023
                          </p>
                          <p>
                            Cours utiles, bien organisés et adaptés aux besoins
                            de l'élève. Merci à la merveilleuse enseignante
                            Annette Marclay. Juin 2023
                          </p>
                          <p>
                            mathOtop a fait de ma fille une championne des maths
                            et surtout une passionnée. Sa moyenne est remontée
                            de 1.5 et c'est un vrai plaisir pour ma fille de
                            participer à leurs cours. Je vous recommande cette
                            organisation, MILLE FOIS. Juin 2023
                          </p>
                          <p>
                            Je remercie infiniment mathOtop d'avoir aidé mon
                            fils, il a atteint et même dépassé sa moyenne. Juin
                            2023
                          </p>
                          <p>
                            Superbe amélioration en maths ce semestre. Merci
                            beaucoup pour votre excellent travail! Juin 2022
                          </p>
                          <p>
                            Nous vous remercions de votre grande contribution à
                            l'évolution de W. Merci pour votre soin, votre
                            rigueur et votre pédagogie. Juin 2022
                          </p>
                          <p>
                            Cela va faire 4 ans que je suis inscrit chez
                            mathOtop et ce sont aussi 4 années de pur plaisir.
                            Grâce à vous j'ai réussi à combler mes lacunes en
                            maths en un rien de temps et j'ai réussi à
                            developper mes outils en maths et à les affiner. Je
                            ne saurais pas comment vous remercier. Vous êtes une
                            personne exceptionnelle, vous êtes appliquée dans
                            votre métier et c'est pour cela que j'ai eu autant
                            de plaisir à venir. Juin 2022
                          </p>
                          <p>
                            A nous de vous remercier pour votre précieux soutien
                            les derniers mois... R a bien évolué et s'est senti
                            mieux par rapport aux Maths grâce à vous. Juin 2022
                          </p>
                          <p>
                            Merci infiniment pour votre gentillesse, votre
                            patience, votre souplesse, et votre
                            professionnalisme. U a aussi eu beaucoup de plaisir
                            et pourtant c'était pas gagné! Grâce à vous, il a
                            remonté sa moyenne et repris confiance en ses
                            capacités. Vous avez réussi à lui faire aimer les
                            math! Je vous en suis très reconnaissante et je
                            n'hésiterai pas une seconde à le réinscrire chez
                            vous si le besoin se fait sentir. Juin 2022
                          </p>
                          <p>
                            On ne vous remercie jamais assez et je suis très
                            contente de vous avoir rencontrée et partagé ces
                            moments avec nous. Grace à vous et votre travail, A
                            est heureux à l’école. Un GRAND MERCI pour votre
                            professionnalisme et humanisme. Juin 2022
                          </p>
                          <p>
                            Nous nous réjouissons des progrès de L. Au dernier
                            TA sur les fonctions il a eu 5! Il a également du
                            plaisir à venir chez mathOtop et maîtrise mieux le
                            stress pendant les tests. Merci beaucoup pour votre
                            accompagnement cette année! Juin 2022
                          </p>
                          <p>
                            V a beaucoup aimé les cours de mathOtop, elle y
                            allait toujours avec plaisir. Votre méthode est très
                            efficace et les bonnes notes de V à l'école en font
                            preuve. Mai 2022
                          </p>
                          <p>
                            Je voulais partager ma joie et ma fierté. Y a reçu
                            ses tests et elle a été heureuse d'apprendre qu'elle
                            avait eu deux 6! Mai 2022
                          </p>
                          <p>
                            M souhaite continuer ses cours de mathOtop l'année
                            prochaine et je suis très contente que ce soit
                            elle-même qui a décidé. Je vous remercie très fort
                            pour votre travail, pour votre flexibilité,
                            amabilité et pour tous les détails que vous ajustez
                            à l'enseignement! Mai 2022
                          </p>
                          <p>
                            R got in to VP. Thanks a lot for your help. Février
                            2022
                          </p>
                          <p>
                            Ma fille est en 10 VP. Elle est très studieuse et a
                            beaucoup de plaisir à apprendre les maths chez
                            mathOtop. Les cours lui permettent de progresser,
                            sans inquiétude, car cela renforce ses bases. Nous
                            sommes très satisfaits de cette expérience avec
                            Mathotop. Cela nous soulage, aussi, en tant que
                            parents. Septembre 2021
                          </p>
                          <p>
                            Nous avons inscrit notre fille lorsqu’elle était en
                            10VP. Elle manquait de confiance en elle.
                            L’enseignement des maths dans son établissement ne
                            lui permettrait pas de progresser (30 élèves dans la
                            classe, plusieurs notes basses aux TS avec
                            remédiation systématique pour toute la classe). Les
                            cours de mathOtop lui ont permis d’avoir confiance
                            en elle. Ses résultats se sont bien améliorés car la
                            méthode rigoureuse de mathOtop est appropriée à ma
                            fille. Je ne peux que recommander cette école à tous
                            les élèves dans ce cas. Elle est maintenant au
                            gymnase et très épanouie en mathématiques. Septembre
                            2021
                          </p>
                          <p>
                            Je voulais vous remercier infiniment, car vous êtes
                            vraiment une grande aide pour moi. Juin 2021
                          </p>
                          <p>
                            Un grand merci pour tous vos cours donnés et votre
                            professionnalisme. Y a beaucoup progressé et est
                            vraiment au top grâce à votre technique. Juin 2021
                          </p>
                          <p>
                            Je tiens à vous remercier pour cette fructueuse
                            collaboration. A a rattrapé le retard pris tout au
                            long de sa scolarité. Juin 2021
                          </p>
                          <p>
                            Notre fille a bénéficié de vos cours de
                            mathématiques depuis septembre 2020 et en a tiré un
                            grand profit. Nous tenons à vous remercier pour la
                            qualité des einseignants et des appuis dispensés.
                            Janvier 2021
                          </p>
                          <p>
                            Y est ravie de faire les cours avec vous! Juin 2020
                          </p>
                          <p>
                            L a été très heureuse de passer cette année avec
                            vous. Je profite de l'occasion pour vous remercier
                            également du soutien que vous avez apporté à L et
                            qui lui a permis de passer en voie prégymnasiale.
                            Juin 2020
                          </p>
                          <p>
                            Je vous remercie beaucoup pour tout ce que vous avez
                            fait pour D. Il a pris goût aux maths et moi aussi
                            je suis très contente du progrès de D en maths. Vous
                            l'avez vraiment beaucoup aidé. Juin 2020
                          </p>
                          <p>
                            Je vous remercie de tout le travail fourni avec Y et
                            nous continuons avec plaisir l'année prochaine. Juin
                            2020
                          </p>
                          <p>
                            I me dit qu'il comprend déjà beaucoup mieux certains
                            sujets. D'ailleurs, au dernier TS il a fait un 5 ce
                            qui nous réjouit beaucoup. Mars 2020
                          </p>
                          <p>
                            Je voulais vous dire que mon test de mercredi s'est
                            très bien passé. J'ai eu de nouveau un 6. Mars 2020
                          </p>
                          <p>
                            Un grand merci pour tous les efforts, la patience et
                            la gentillesse dont vous faites preuve avec Y. Ça
                            lui donne confiance en elle et lui fait aimer les
                            maths. Juin 2019
                          </p>
                          <p>
                            Je vous remercie encore une fois pour votre
                            précieuse aide durant ces deux dernières années. I a
                            obtenu un 6 à son examen de certificat en maths!
                            Juin 2019.
                          </p>
                          <p>
                            Mille mercis pour tout ce que vous avez apporté à
                            M-J cette dernière année… un seul immense regret,
                            celui de ne pas vous avoir connue plus vite! Je ne
                            peux que recommander mathOtop autour de moi. Juin
                            2019
                          </p>
                          <p>
                            Je suis contente de ma note de certificat en maths
                            et je me suis sentie bien et calme durant l'examen
                            écrit (contrairement aux tests faits dans l'année).
                            Je vous remercie beaucoup pour le temps que vous
                            m'avez accordé durant cette année, de m'avoir
                            expliqué les exercices que je ne comprenais pas et
                            surtout de m'avoir rassurée. Juin 2019
                          </p>
                          <p>
                            Un grand merci pour tout ce que vous avez fait pour
                            V. Vraiment au top! Juin 2019
                          </p>
                          <p>
                            Nous avons essayé plusieurs centres d'appui en maths
                            avant d'inscrire P chez mathOtop et c'est vraiment
                            exceptionnel ce que vous faites. Merci beaucoup pour
                            votre dévouement. Juin 2019
                          </p>
                          <p>
                            Un grand MERCI. Je pense que vos cours ont bien aidé
                            O. Juin 2019
                          </p>
                          <p>
                            Nous vous remercions infiniment de votre aide qui a
                            permis à Y de réussir ce concours et lui a donné
                            aussi l'envie de continuer les mathématiques. Mai
                            2019
                          </p>
                          <p>
                            Merci pour les résultats, nous sommes vraiment
                            satisfaits. A s'est beaucoup amélioré. Mai 2019
                          </p>
                        </ActualDiv1>
                      </>
                    )}
                    {section === "centre" && (
                      <>
                        {" "}
                        <ActualDiv1
                          date="31 July 2018
                        "
                          title="Ouvrez votre centre mathOtop
                        "
                        >
                          <img src={img2} alt="image_actualites" />

                          <p>
                            Vous aimez l'enseignement, les mathématiques et vous
                            avez l’esprit d’entreprise?
                          </p>

                          <span>
                            Alors lancez-vous et ouvrez un centre de soutien
                            scolaire en mathématiques mathOtop dans votre
                            région.
                          </span>
                          <p>
                            Vous bénéficiez d’une grande liberté d’action en
                            gérant votre propre franchise mathOtop : vous
                            choisissez votre taux d’occupation et organisez vos
                            cours. mathOtop met à votre disposition son
                            expérience, sa méthode et son matériel pédagogiques
                            grâce à une formation de départ complète et soignée,
                            un suivi et un partage réguliers.
                          </p>
                          <p>
                            Vous avez la possibilité d’enseigner aux élèves
                            jusqu’à la 8ème année ou jusqu’à la 11ème année.
                          </p>
                          <p>
                            Patience, pédagogie, aisance en mathématiques sont
                            les prérequis pour ce travail à temps partiel
                            enrichissant et stimulant qui s'adresse aussi aux
                            personnes souhaitant reprendre une activité
                            professionnelle après une pause carrière.
                          </p>
                          <p>
                            Pour en savoir plus, consultez notre site internet{" "}
                            <span className="h5">www.mathotop.ch</span>
                            contactez-nous au 079 262 04 00 ou par email :
                            <span className="h5">info@mathotop.ch</span>.
                          </p>
                        </ActualDiv1>
                      </>
                    )}
                    {section === "ecole" && (
                      <>
                        <ActualDiv2
                          date="31 July 2018
                        "
                          title="Cours de découverte mathOtop
                        "
                        >
                          <img src={img2} alt="image_actualites" /> <br />
                          <p>
                            En tant qu'élève de mathOtop, tu as la possibilité
                            de faire découvrir ton cours préféré de soutien en
                            maths à tes amis! <br />
                            Si tu le souhaites, tu peux donc venir accompagné(e)
                            d'un ou une camarade. Il suffit de nous l'annoncer
                            une semaine à l'avance. Afin de préparer la venue de
                            ton ami(e), nous aurons besoin de connaître sa
                            classe et le thème qu' il/elle est en train de
                            travailler à l'école.
                            <br />
                            Nous nous réjouissons d'accueillir tes amis à
                            l'occasion de ces cours découverte. Les cours
                            découverte sont bien sûr gratuits et sans
                            engagement!
                          </p>
                        </ActualDiv2>
                      </>
                    )}
                    {section === "media" && (
                      <>
                        <ActualDiv1
                          date="04 November 2015
                        "
                          title="mathOtop est sur Facebook
                        "
                        >
                          <img src={img3} alt="image_actualites" />
                          <p>
                            Rejoignez notre réseau d'amis sur Facebook{" "}
                            <span className="h5">
                              www.facebook.com/pages/Mathotop/192299997594979
                            </span>
                            .
                          </p>
                        </ActualDiv1>
                      </>
                    )}
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

const ActualDiv1 = ({ children, date, title }) => {
  return (
    <div className="actual_div1">
      <h4>{date}</h4>
      <h2>{title}</h2>
      {children}
    </div>
  );
};
const ActualDiv2 = ({ children, date, title }) => {
  return (
    <div className="actual_div2">
      <h4>{date}</h4>
      <h2>{title}</h2>
      {children}
    </div>
  );
};
