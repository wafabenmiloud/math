import React, { useState, useEffect } from "react";
import "./MethDash.css";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";
import { IoIosAddCircle } from "react-icons/io";
import Dashboard from "../Dashboard/Dashboard";
import Popup from "../Popups/Popup";

const MethDash = () => {
  const [methodes, setMethodes] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [sectionIdToDelete, setSectionIdToDelete] = useState(null);

  useEffect(() => {
    axios
      .get("/api/meth")
      .then((response) => {
        setMethodes(response.data);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }, []);

  async function handleDelete(id) {
    try {
      await axios.delete(`/api/meth/${id}`);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Dashboard>
      <h2>La méthode</h2>
        <div  style={{
      display: "flex",
      flexDirection: "column",
     
    }}>
      {methodes.map((methode, index) => {
        return (
          <>
            {" "}
            <div key={index} style={{ border: "6px solid #b0d694" }}>
              <div className="meth_dash_banner">
              <img
                    src={`/uploads/${methode.cover}`}
                    alt="cover"
                  />
              </div>
              <div className="meth_dash_bio">
                <h3>
                {methode.title}
                </h3>
              </div>
              <div className="meth_dash_wrapper">
                <div className="meth_dash_about_text">
                <div dangerouslySetInnerHTML={{ __html: methode.content1 }} />
                </div>
              </div>
              <br />
              <div className="meth_dash_wrapper2 wrapper2">
                <div className="meth_dash_about_text">
                <div dangerouslySetInnerHTML={{ __html: methode.content2 }} />
                </div>
              </div>
              <div className="control_buttons">
                <div className="edit_button_wrapper">
                  <Link to={`/editmeth/${methode.id}`}>
                    <FaRegEdit size={20} className="edit_button" /> 
                  </Link>{" "}
                </div>
                <div className="delete_button_wrapper">
                  <MdDelete
                    size={20}
                    className="delete_button"
                    onClick={() => {
                      setShowPopup(true);
                      setSectionIdToDelete(methode.id);
                    }}
                  />
                </div>
               
              </div>
              <br />
              <br />
            </div>
            <br />
            <br />
          </>
        );
      })}
       <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignSelf:"center",
            width: "100px",
            height: "100px",
          }}
        >
          <Link to={"/createmeth"} className="edit_button">
            <IoIosAddCircle size={60} />
          </Link>
        </div>
    </div>
    {showPopup && (
        <Popup
          message="Êtes-vous sûr(e) de vouloir continuer ?"
          onCancel={() => setShowPopup(false)}
          onConfirm={() => {
            setShowPopup(false);
            handleDelete(sectionIdToDelete);
          }}
        />
      )}
    </Dashboard>
  
  );
};

export default MethDash;
