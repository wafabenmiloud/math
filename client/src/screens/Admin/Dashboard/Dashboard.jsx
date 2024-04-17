import React, { useState } from "react";
import "./Dashboard.css";
import { Helmet } from "react-helmet";
import Header from "../Header/Header";
import { NavLink, Link, useLocation } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";

const Dashboard = ({ children }) => {
  const { pathname } = useLocation();
  const [dropdown, setDropdown] = useState(false);
  const handleDropdown = (event) => {
    setDropdown((current) => !current);
  };
  return (
    <>
      <Helmet>
        <title>Admin | Dashboard</title>
        <link
          rel="canonical"
          href="https://www.master-7rqtwti-luxgbhg4vwqu6.ovhcloud-fr-1.webpaas.ovh.net/dashboard"
        />
      </Helmet>
      <div className="dashboard">
        <Header />
        <div className="dashboard_wrapper">
          <div className="dashboard_buttons_wrapper">
            <div className="dashboard_buttons">
              
              <NavLink className="dashboard_buttonVisible" to="/dashboard">
                Présentation
               
              </NavLink>
              <div
                onMouseEnter={handleDropdown}
                onMouseLeave={handleDropdown}
                className="dropdown_wrapper"
              >
                <Link
                  to="#"
                  className={
                    pathname.includes("/quinousdash") ||
                    pathname.includes("/tarifdash")
                      ? "dashboard_buttonVisible active"
                      : "dashboard_buttonVisible"
                  }
                >
                  Organisation et tarifs{" "}
               
                </Link>

                {dropdown && (
                  <div className="dash_dropdown">
                    <div className="col border">
                      <NavLink
                        className="dash_dropdown_buttonVisible"
                        to="/quinousdash"
                      >
                        Qui sommes nous ?{" "}
                       
                      </NavLink>
                      <NavLink
                        className="dash_dropdown_buttonVisible"
                        to="/tarifdash"
                      >
                        Cours et tarifs{" "}
                        
                      </NavLink>
                    </div>{" "}
                  </div>
                )}
              </div>
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
                Formulaire de contact
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
