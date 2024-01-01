import './App.css';
import {Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Home from './screens/Home/Home';
import QuiNous from './screens/QuiNous/QuiNous';
import Tarif from './screens/Tarif/Tarif';
import PourQui from './screens/PourQui/PourQui';
import Methode from './screens/Methode/Methode';
import Exercices from './screens/Exercices/Exercices';
import Actual from './screens/Actual/Actual';
import PourQuiSection from './screens/PourQui/PourQuiSection';
import Conatct from './screens/Contact/Contact';
import ConatctForm from './screens/ContactForm/ContactForm';

function App() {

  return (

    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/siege" element={<QuiNous />} />
        <Route path="/tarif" element={<Tarif />} />
        <Route path="/pourqui" element={<PourQui />} />
        <Route path="/pourquisection/A" element={<PourQuiSection alpha="A" title="Acquisition des connaissances de base grâce à une répétition régulière et encadrée">
          <p>Nous retravaillons les notions des années antérieures pour que votre enfant rattrape son retard.
          </p>
          <p>Nous proposons différentes stratégies d'apprentissage pour qu'il acquiert  une méthode de travail efficace.
          </p>
          <p>Nous lui redonnons confiance en lui et valorisons ses efforts.
          </p>
          <p>Grâce à un travail régulier,  il approfondit durablement ses connaissances et il améliore ses résultats.
          </p>
        </PourQuiSection>} />
        <Route path="/pourquisection/B" element={<PourQuiSection alpha="B" title="Consolidation des connaissances de base grâce à des exercices ciblés">
          <p>Nous identifions et retravaillons les lacunes des années antérieures. Votre enfant peut à nouveau suivre normalement le rythme de la classe.
          </p>
          <p>Nous l'accompagnons dans l'apprentissage des nouvelles notions.
          </p>
          <p>Grâce à l’acquisition d’une méthode de travail efficace et d’automatismes, il obtient de meilleurs résultats.
          </p>
          <p>Nous lui redonnons goût aux mathématiques.
          </p>
        </PourQuiSection>} />
        <Route path="/pourquisection/C" element={<PourQuiSection alpha="C" title="Approfondissement et intégration des connaissances de base dans une vision globale">
          <p>Nous approfondissons les connaissances de base et travaillons progressivement les nouvelles notions.
          </p>
          <p>Nous faisons le lien entre les différents thèmes abordés pour que votre enfant ait une vision plus globale des mathématiques.
          </p>
          <p>Il acquiert rapidité et précision.
          </p>
          <p>Il se sent plus sûr de lui et ses résultats en témoignent.
          </p>
        </PourQuiSection>} />
        <Route path="/methode" element={<Methode />} />
        <Route path="/exercices" element={<Exercices />} />
        <Route path="/actual" element={<Actual />} />
        <Route path="/contact" element={<Conatct />} />
        <Route path="/contactform" element={<ConatctForm />} />
      </Routes>
    </Router>
  );

}


export default App;
