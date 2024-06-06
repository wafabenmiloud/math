import React from "react";
import "./Dashboard.css";
import { Helmet } from "react-helmet";
import Header from "../Header/Header";
import { NavLink } from "react-router-dom";

const Dashboard = ({ children }) => {

  return (
    <>
      <Helmet>
        <title>Admin | Dashboard</title>
      </Helmet>
      <div className="dashboard">
        <Header />
        <div className="dashboard_wrapper">
          <div className="dashboard_buttons_wrapper">
            <div className="dashboard_buttons">
              
              <NavLink className="dashboard_buttonVisible" to="/dashboard">
                Présentation
               
              </NavLink>
              <NavLink className="dashboard_buttonVisible" to="/quinousdash">
              Qui sommes nous ?
               
              </NavLink>
              <NavLink className="dashboard_buttonVisible" to="/tarifdash">
              Cours et tarifs
               
              </NavLink>
          
              <NavLink className="dashboard_buttonVisible" to="/quidash">
                Pour qui ?{" "}
               
              </NavLink>
              <NavLink className="dashboard_buttonVisible" to="/methdash">
                La méthode
              
              </NavLink>
              <NavLink className="dashboard_buttonVisible" to="/actdash">
                Actualités
               
              </NavLink>
              <NavLink className="dashboard_buttonVisible" to="/exdash">
                Exercices
               
              </NavLink>
              <NavLink className="dashboard_buttonVisible" to="/contactdash">
              Boîte de messagerie
              </NavLink>
            </div>
            <div className="dashboard_footer none">
              <p>
                Vous souhaitez en savoir plus ? <br /> Alors, contactez-nous !
              </p>
              <a href="mailto:info@mathotop.ch">info@mathotop.ch</a>
            </div>
          </div>

          <div className="dashboard_content">{children}</div>
          <div className="dashboard_footer none2">
            <p>
              Vous souhaitez en savoir plus ? <br /> Alors, contactez-nous !
            </p>
            <a href="mailto:info@mathotop.ch">info@mathotop.ch</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
