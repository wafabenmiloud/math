import React, { useState, useEffect } from "react";
import "./QuiNousDash.css";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";
import { IoIosAddCircle } from "react-icons/io";
import Dashboard from "../Dashboard/Dashboard";
import Popup from "../Popups/Popup";

const QuiNousDash = () => {
  const [quinous, setQuiNous] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [sectionIdToDelete, setSectionIdToDelete] = useState(null);

  useEffect(() => {
    axios
      .get("/api/quinous")
      .then((response) => {
        setQuiNous(response.data);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }, []);

  async function handleDelete(id) {
    try {
      await axios.delete(`/api/quinous/${id}`);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Dashboard>
      <h2> Qui sommes nous ?</h2>{" "}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {quinous.map((data, index) => {
          return (
            <>
              <div key={index} style={{ border: "4px solid #b0d694" }}>
                <div className="qui_dash_wrapper">
                  <div className="qui_dash_about_text">
                    <h4>{data.title}</h4>
                    <div dangerouslySetInnerHTML={{ __html: data.content }} />
                  </div>
                  <div className="qui_dash_about_slider">
                    <img src={`/uploads/${data.cover}`} alt="cover" />
                  </div>
                </div>
                <div className="control_buttons">
                  <div className="edit_button_wrapper">
                    <Link to={`/editquinous/${data.id}`}>
                      <FaRegEdit size={20} className="edit_button" /> 
                    </Link>{" "}
                  </div>
                  <div className="delete_button_wrapper">
                    <MdDelete
                      size={20}
                      className="delete_button"
                      onClick={() => {
                        setShowPopup(true);
                        setSectionIdToDelete(data.id); // Set the section id to delete
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
          <Link to={"/createquinous"} className="edit_button">
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

export default QuiNousDash;
