import React, { useState, useEffect } from "react";
import "./TarifDash.css";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";
import { IoIosAddCircle } from "react-icons/io";
import Dashboard from "../Dashboard/Dashboard";
import Popup from "../Popups/Popup";

const TarifDash = () => {
  const [tarifs, setTarifs] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [sectionIdToDelete, setSectionIdToDelete] = useState(null);
  useEffect(() => {
    axios
      .get("/api/tarif")
      .then((response) => {
        setTarifs(response.data);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }, []);

  async function handleDelete(id) {
    try {
      await axios.delete(`/api/tarif/${id}`);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Dashboard>
      <h2> Cours et tarifs</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {tarifs.map((tarif, index) => {
          return (
            <>
              <div key={index} style={{ border: "4px solid #b0d694" }}>
                <div className="tarif_dash_about_text">
                  <h4>{tarif.title}</h4>
                  <div className="tarifcontent" dangerouslySetInnerHTML={{ __html: tarif.content }} />
                </div>
                <div className="control_buttons">
                  <div className="edit_button_wrapper">
                    <Link to={`/edittarif/${tarif.id}`}>
                      <FaRegEdit size={20} className="edit_button" /> 
                    </Link>{" "}
                  </div>
                  <div className="delete_button_wrapper">
                    <MdDelete
                      size={20}
                      className="delete_button"
                      onClick={() => {
                        setShowPopup(true);
                        setSectionIdToDelete(tarif.id);
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
            alignSelf: "center",
            width: "100px",
            height: "100px",
          }}
        >
          <Link to={"/createtarif"} className="edit_button">
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

export default TarifDash;
