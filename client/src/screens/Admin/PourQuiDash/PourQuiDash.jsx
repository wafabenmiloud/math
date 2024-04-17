import React, { useState, useEffect } from "react";
import "./PourQuiDash.css";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { IoIosAddCircle } from "react-icons/io";
import Dashboard from "../Dashboard/Dashboard";
import Popup from "../Popups/Popup";

const PourQuiDash = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);
  const [sectionIdToDelete, setSectionIdToDelete] = useState(null);
  const [ssectionIdToDelete, setSsectionIdToDelete] = useState(null);


  //banner+bio
  const [qui, setQui] = useState([]);
  useEffect(() => {
    axios
      .get("/api/qui")
      .then((response) => {
        setQui(response.data);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }, []);

  //sections
  const [sections, setSections] = useState([]);
  useEffect(() => {
    axios
      .get("/api/quisec")
      .then((response) => {
        setSections(response.data);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }, []);
  async function handleDeleteSection(id) {
    try {
      await axios.delete(`/api/quisec/${id}`);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }
  async function handleDelete(id) {
    try {
      await axios.delete(`/api/qui/${id}`);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Dashboard>
      <h2>Pour qui ?</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/*  <div className="home_dash_control">
        <Link to={"/createqui"} className="edit_button">
          <IoIosAddCircle size={25} />
        </Link>
      </div>*/}

        {qui.map((q, index) => {
          return (
            <>
              {" "}
              <div style={{ border: "6px solid #b0d694" }} key={index}>
                <div className="pour_qui_dash_banner">
                  <img src={`/uploads/${q.cover}`} alt="cover" />{" "}
                </div>
                <div className="pour_qui_dash_bio">
                  <h3>{q.title} </h3>
                  <div dangerouslySetInnerHTML={{ __html: q.content }} />
                  <div className="control_buttons">
                    <div className="edit_button_wrapper">
                      <Link  to={`/editqui/${q.id}`}>
                        <FaRegEdit size={20} className="edit_button"/>
                      </Link>{" "}
                      
                    </div>
                    <div className="delete_button_wrapper">
                      <MdDelete
                        size={20}
                        className="delete_button"
                        onClick={() => {
                          setShowPopup(true);
                          setSectionIdToDelete(q.id); // Set the section id to delete
                        }}
                      />
                      
                    </div>
                  </div>
                </div>
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
          <Link to={"/createqui"} className="edit_button">
            <IoIosAddCircle size={60} />
          </Link>
        </div>

        <div className="pour_qui_dash_contact">
          {sections.map((sec, index) => {
            return (
              <div
                className="pour_qui_dash_wrapper"
                key={index}
                style={{ border: "6px solid #b0d694" }}
              >
                <div className="pour_qui_dash_about_text">
                  <div className="pour_qui_dash_title">
                    <h1>{sec.letter}</h1>
                    <h4>{sec.title}</h4>
                  </div>
                  <div dangerouslySetInnerHTML={{ __html: sec.content }} />
                </div>
                <Link to="#" className="aa">
                  {sec.button}
                </Link>{" "}
                <div className="control_buttons">
                  <div className="edit_button_wrapper">
                    <Link to={`/editquisec/${sec.id}`}>
                      <FaRegEdit size={20} className="edit_button" />
                    </Link>{" "}
                    
                  </div>
                  <div className="delete_button_wrapper">
                    <MdDelete
                      size={20}
                      className="delete_button"
                      onClick={() => {
                        setShowPopup2(true);
                        setSsectionIdToDelete(sec.id); // Set the ssection id to delete
                      }}
                    />
                    
                  </div>
                </div>
              </div>
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
            <Link to={"/createquisec"} className="edit_button">
              <IoIosAddCircle size={60} />
            </Link>
          </div>
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
      {showPopup2 && (
        <Popup
          message="Êtes-vous sûr(e) de vouloir continuer ?"
          onCancel={() => setShowPopup2(false)}
          onConfirm={() => {
            setShowPopup2(false);
            handleDeleteSection(ssectionIdToDelete);
          }}
        />
      )}
    </Dashboard>
  );
};
export default PourQuiDash;
