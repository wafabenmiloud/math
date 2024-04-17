import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthContext from "./context/AuthContext";
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
import Login from './screens/Admin/Login/Login';
import Notifications from "./screens/Admin/Notifications/Notifications";
import CreatePost from "./screens/Admin/Actual_dash/CreatePost";
import EditPost from "./screens/Admin/Actual_dash/EditPost";
import CreateEx from "./screens/Admin/ExDash/CreateEx";
import EditEx from "./screens/Admin/ExDash/EditEx";
import CreateMeth from "./screens/Admin/MethDash/CreateMeth";
import EditMeth from "./screens/Admin/MethDash/EditMeth";
import CreateQuiNous from "./screens/Admin/QuiNousDash/CreateQuiNous";
import EditQuiNous from "./screens/Admin/QuiNousDash/EditQuiNous";
import CreateTarif from "./screens/Admin/TarifDash/CreateTarif";
import EditTarif from "./screens/Admin/TarifDash/EditTarif";
import CreateSlides from "./screens/Admin/HomeDash/CreateSlides";
import EditSlides from "./screens/Admin/HomeDash/EditSlides";
import CreateSection from "./screens/Admin/HomeDash/CreateSection";
import EditSection from "./screens/Admin/HomeDash/EditSection";
import CreateSSection from "./screens/Admin/HomeDash/CreateSSection";
import EditSSection from "./screens/Admin/HomeDash/EditSSection";
import CreateBio from "./screens/Admin/HomeDash/CreateBio";
import EditBio from "./screens/Admin/HomeDash/EditBio";
import CreateQui from "./screens/Admin/PourQuiDash/CreateQui";
import EditQui from "./screens/Admin/PourQuiDash/EditQui";
import CreateQuiSec from "./screens/Admin/PourQuiDash/CreateQuiSec";
import EditQuiSec from "./screens/Admin/PourQuiDash/EditQuiSec";
import HomeDash from "./screens/Admin/HomeDash/HomeDash";
import QuiNousDash from "./screens/Admin/QuiNousDash/QuiNousDash";
import TarifDash from "./screens/Admin/TarifDash/TarifDash";
import PourQuiDash from "./screens/Admin/PourQuiDash/PourQuiDash";
import MethDash from "./screens/Admin/MethDash/MethDash";
import ActualDash from "./screens/Admin/Actual_dash/ActualDash";
import ExDash from "./screens/Admin/ExDash/ExDash";
import ContactDash from "./screens/Admin/Contact_dash/ContactDash";
import CreateItem from "./screens/Admin/Dashboard/CreateItem";
import EditItem from "./screens/Admin/Dashboard/EditItem";



function Router() {
    const { loggedIn } = useContext(AuthContext);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/quisommesnous" element={<QuiNous />} />
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
                {!loggedIn && (
                    <>
                        <Route path="/admin" element={<Login />} />
                    </>
                )}
                {loggedIn && (
                    <>
                        <Route path="/dashboard" element={<HomeDash />} />
                        <Route path="/quinousdash" element={<QuiNousDash />} />
                        <Route path="/tarifdash" element={<TarifDash />} />
                        <Route path="/quidash" element={<PourQuiDash />} />
                        <Route path="/methdash" element={<MethDash />} />
                        <Route path="/actdash" element={<ActualDash />} />
                        <Route path="/exdash" element={<ExDash />} />


                        <Route path="/contactdash" element={<ContactDash />} />
                        <Route path="/notif" element={<Notifications />} />
                        <Route path="/createpost" element={<CreatePost />} />
                        <Route path="/edit/:id" element={<EditPost />} />
                        <Route path="/createex" element={<CreateEx />} />
                        <Route path="/editex/:id" element={<EditEx />} />
                        <Route path="/createmeth" element={<CreateMeth />} />
                        <Route path="/editmeth/:id" element={<EditMeth />} />
                        <Route path="/createquinous" element={<CreateQuiNous />} />
                        <Route path="/editquinous/:id" element={<EditQuiNous />} />
                        <Route path="/createtarif" element={<CreateTarif />} />
                        <Route path="/edittarif/:id" element={<EditTarif />} />
                        <Route path="/createslides" element={<CreateSlides />} />
                        <Route path="/editslides/:id" element={<EditSlides />} />
                        <Route path="/createsection" element={<CreateSection />} />
                        <Route path="/editsection/:id" element={<EditSection />} />
                        <Route path="/createbio" element={<CreateBio />} />
                        <Route path="/editbio/:id" element={<EditBio />} />
                        <Route path="/createssection" element={<CreateSSection />} />
                        <Route path="/editssection/:id" element={<EditSSection />} />
                        <Route path="/createqui" element={<CreateQui />} />
                        <Route path="/editqui/:id" element={<EditQui />} />
                        <Route path="/createquisec" element={<CreateQuiSec />} />
                        <Route path="/editquisec/:id" element={<EditQuiSec />} />
                        <Route path="/createitem" element={<CreateItem />} />
                        <Route path="/edititem/:id" element={<EditItem />} />
                    </>
                )}



            </Routes>
        </BrowserRouter>
    );
}
export default Router;