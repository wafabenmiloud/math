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


function Router() {
    const { loggedIn } = useContext(AuthContext);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/quisommesnous" element={<QuiNous />} />
                <Route path="/tarif" element={<Tarif />} />
                <Route path="/pourqui" element={<PourQui />} />
                <Route path="/pourquisec" element={<PourQuiSection/>}/>
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
                        
                    </>
                )}



            </Routes>
        </BrowserRouter>
    );
}
export default Router;