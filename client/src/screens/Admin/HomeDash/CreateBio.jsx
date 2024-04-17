import "react-quill/dist/quill.snow.css";
import React, { useState, useEffect } from "react";
import "./HomeDash.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BsArrowLeftShort } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function CreateBio() {
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  async function createNewBio(ev) {
    ev.preventDefault();

    const payload = {
      bio: content,
    };

    try {
      const response = await axios.post("/api/bio", payload);

      if (response.status === 200) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="dash_create_form_wrapper">
      <Link to="/dashboard" className="arr">
        <BsArrowLeftShort />
      </Link>
      <form className="dash_create_form" onSubmit={createNewBio}>
        <input
          type="text"
          placeholder={"..."}
          value={content}
          onChange={(ev) => setContent(ev.target.value)}
        />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}
