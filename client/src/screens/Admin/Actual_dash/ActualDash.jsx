import React, { useState, useEffect } from "react";
import "./ActualDash.css";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoIosAddCircle } from "react-icons/io";
import Dashboard from "../Dashboard/Dashboard";
import Popup from "../Popups/Popup";

const ActualDash = () => {
  const [posts, setPosts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [sectionIdToDelete, setSectionIdToDelete] = useState(null);

  const initialSections = {
    ecr: true,
    temoin: false,
    centre: false,
    ecole: false,
    media: false,
  };

  const [sections, setSections] = useState(initialSections);
  const toggleSection = (section) => {
    const updatedSections = { ...initialSections, [section]: true };
    for (const key in updatedSections) {
      if (key !== section) {
        updatedSections[key] = false;
      }
    }
    setSections(updatedSections);
  };

  const [expandedDiv, setExpandedDiv] = useState(null);
  const handleShowExpand = (index) => {
    setExpandedDiv(index);
  };

  useEffect(() => {
    axios
      .get("/api/post")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }, []);

  //delete post
  async function handleDelete(id) {
    try {
      await axios.delete(`/api/post/${id}`);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  function renderSection(sectionName) {
    const filteredPosts = posts.filter((data) => data.type === sectionName);
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {filteredPosts.map((data, index) => {
          const isExpanded = expandedDiv === index;
          const date =
            data.date instanceof Date ? data.date : new Date(data.date);
          return (
            <>
              {" "}
              <div
                key={index}
                className={`actual_dash_div ${
                  isExpanded ? "actual_dash_div_not" : "actual_dash_div"
                }`}
              >
                <div
                  className={`actual_dash_div_img ${
                    isExpanded
                      ? "actual_dash_div_img_not"
                      : "actual_dash_div_img"
                  }`}
                >
                  {" "}
                  {data.cover != "" && (
                    <img src={`/uploads/${data.cover}`} alt="cover" />
                  )}
                </div>
                <div>
                  <div className="actual_dash_div_date">
                    {" "}
                    <h4>
                      {date.toLocaleDateString("fr-FR", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </h4>
                  </div>
                  <div className="actual_dash_div_content">
                    <h2>{data.title}</h2>
                    <p>{data.summary}</p>
                    <br />
                    {isExpanded && (
                      <div dangerouslySetInnerHTML={{ __html: data.content }} />
                    )}
                    {isExpanded && (
                      <>
                        <br />
                        <br />
                        <div className="control_buttons">
                          <div className="edit_button_wrapper">
                            <Link to={`/edit/${data.id}`}>
                              <FaRegEdit size={20} className="edit_button" />
                            </Link>
                          </div>
                          <div className="delete_button_wrapper">
                            <MdDelete
                              size={20}
                              className="delete_button"
                              onClick={() => {
                                setShowPopup(true);
                                setSectionIdToDelete(data.id);
                              }}
                            />
                          </div>
                        </div>
                      </>
                    )}
                    {!isExpanded && (
                      <div className="actual_dash_div_content_button">
                        <button onClick={() => handleShowExpand(index)}>
                          En savoir plus ...
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>{" "}
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
          <Link to={"/createpost"} className="edit_button">
            <IoIosAddCircle size={60} />
          </Link>
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
      </div>
    );
  }
  return (
    <Dashboard>
      <h2>Actualités</h2>
      <div className="actual_dash">
        <div className="actual_dash_wrapper">
          <div className="actual_dash_buttons_wrapper">
            <div className="actual_dash_buttons">
              <button
                onClick={() => toggleSection("ecr")}
                className={sections.ecr ? "actual_dash_buttonVisible" : ""}
              >
                Préparation aux ECR et certificat
              </button>
              <button
                onClick={() => toggleSection("temoin")}
                className={sections.temoin ? "actual_dash_buttonVisible" : ""}
              >
                Témoignages
              </button>
              <button
                onClick={() => toggleSection("centre")}
                className={sections.centre ? "actual_dash_buttonVisible" : ""}
              >
                Ouvrez votre centre mathOtop
              </button>
              <button
                onClick={() => toggleSection("ecole")}
                className={sections.ecole ? "actual_dash_buttonVisible" : ""}
              >
                Vie de l'école
              </button>
              <button
                onClick={() => toggleSection("media")}
                className={sections.media ? "actual_dash_buttonVisible" : ""}
              >
                Médias
              </button>
            </div>
          </div>

          <div className="actual_dash_content">
            {Object.keys(sections).map((section) => {
              if (sections[section]) {
                return (
                  <>
                    {section === "ecr" && renderSection("ecr")}
                    {section === "temoin" && renderSection("temoin")}
                    {section === "centre" && renderSection("centre")}
                    {section === "ecole" && renderSection("ecole")}
                    {section === "media" && renderSection("media")}
                  </>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default ActualDash;
