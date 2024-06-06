import React, { useRef, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import { FaTimes } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";
import logo from "../../assets/logo.png";
import { AiFillLike } from "react-icons/ai";
import { GiRotaryPhone } from "react-icons/gi";

const Navbar = () => {
  const { pathname } = useLocation();

  const navRef = useRef();
  const [dropdown, setDropdown] = useState(false);
  const handleDropdown = (event) => {
    setDropdown((current) => !current);
  };
  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <div className="nav_column">
      <div className="nav_buttons">
        <div className="layout_button">
          <button>
            <AiFillLike />
            Suivre 164
          </button>
        </div>
      </div>
      <div className="nav_wrapper">
        <li>
          <Link className="navbar__link2" to="/">
            <img src={logo} alt="logo" />
          </Link>
        </li>
        <nav ref={navRef} className="navbar__menu">
          <div className="navbar__menu">
            <div className="navbar_ro">
              <li className="menu__item">
                <NavLink className="navbar__link" to="/">
                  Présentation
                </NavLink>
              </li>
              <li onMouseEnter={handleDropdown} onMouseLeave={handleDropdown}>
                <Link
                  className={
                    pathname.includes("/quisommesnous") ||
                    pathname.includes("/tarif")
                      ? "navbar__link active"
                      : "navbar__link"
                  }
                  to="#"
                >
                  Organisation et tarifs
                </Link>

                {dropdown && (
                  <ul className="dropdown">
                    <div className="col border">
                      <li>
                        <NavLink className="navbar__link" to="/quisommesnous">
                          Qui sommes-nous ?
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className="navbar__link" to="/tarif">
                          Cours et tarifs
                        </NavLink>
                      </li>
                    </div>
                  </ul>
                )}
              </li>{" "}
              <li className="menu__item">
                <NavLink
                  className={
                    pathname.includes("/pourquisection/A") ||
                    pathname.includes("/pourquisection/B") ||
                    pathname.includes("/pourquisection/C")
                      ? "navbar__link active"
                      : "navbar__link"
                  }
                  to="/pourqui"
                >
                  Pour qui ?
                </NavLink>
              </li>
              <li className="menu__item">
                <NavLink className="navbar__link" to="/methode">
                  La méthode
                </NavLink>
              </li>
              <li className="menu__item">
                <NavLink className="navbar__link" to="/actual">
                  Actualités
                </NavLink>
              </li>
              <li className="menu__item">
                <NavLink className="navbar__link" to="/exercices">
                  Exercices
                </NavLink>
              </li>
             
            </div> <div className="layout_button2">
                <Link to="/contact">
                  <GiRotaryPhone size={20} />
                  Contactez-nous
                </Link>
              </div>
          </div>
          <button className="navbar__btn close" onClick={showNavbar}>
            <FaTimes color="#558b3d" />
          </button>
        </nav>
        <div className="row">
          <button className="navbar__btn open " onClick={showNavbar}>
            <AiOutlineMenu color="#558b3d" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
