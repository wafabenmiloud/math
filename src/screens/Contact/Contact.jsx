import React from "react";
import "./Contact.css";
import Layout from "../../components/Layout/Layout";
import { MdMailOutline } from "react-icons/md";

import im from "../../assets/contact.jpg";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Conatct = () => {
  return (
    <div>
      <Helmet>
        <title>Conatctez-nous | MathOtop</title>
        <link rel="canonical" href="https://www.mathotop.ch/contact" />

      </Helmet>{" "}
      <Layout>
        <div className="contact_wrapper">
          <div className="contact_about_text">
            <span>mathOtop Lausanne</span>
            <div>
              <p>Annette Marclay</p>
              <p>079 358 58 09</p>
            </div>
            <div>
              <p>Anne Lechanteur</p>
              <p>079 262 04 00</p>
            </div>
            <Link to="/contactform">
              <MdMailOutline size={20} />
              Formulaire de contact
            </Link>
          </div>
          <div className="contact_about_slider">
            <img src={im} alt="image_contact" />
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Conatct;
