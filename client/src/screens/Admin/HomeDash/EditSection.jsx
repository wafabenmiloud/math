import "react-quill/dist/quill.snow.css";
import { useState, useEffect } from "react";
import Editor from "../../../components/Editor/Editor";
import "./HomeDash.css";
import axios from "axios";
import { MdAddToPhotos } from "react-icons/md";
import { BsArrowLeftShort } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Popup from "../Popups/Popup";

export default function EditSection() {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [fileURLs, setFileURLs] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/section/${id}`)
      .then((response) => {
        setContent(response.data.secDoc.content);
       if (response.data.secDoc.files && response.data.secDoc.files.length > 0) {
          setFileURLs(response.data.secDoc.files.map(cover => `/uploads/${cover}`));
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }, []);

  const handleFileChange = (ev) => {
    setFiles([...files, ...ev.target.files]);
  };

  async function updateSection() {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("content", content);
    
    if (files.length > 0) {
      files.forEach((file) => {
        formData.append("files", file);
      });
    }
    try {
      const response = await axios.put("/api/section", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

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
            <BsArrowLeftShort onClick={() => setShowPopup2(true)} className="arr" />

      <form
        className="dash_create_form"
      >
        <h2>Média</h2>
        <label htmlFor="fileInput">
          <MdAddToPhotos
            color="#000"
            size={25}
            style={{ marginTop: "5px", cursor: "pointer" }}
          />
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleFileChange}
            multiple
          />
        </label>
        <div className="fileurls">
           {files.length > 0 &&
          files.map((file, index) => (
            <div key={index} >
              <img src={URL.createObjectURL(file)} alt={`Selected File ${index}`} />
            </div>
          ))}
        </div>
       
     <div className="fileurls">
        {files.length == 0 &&
          fileURLs.map((url, index) => (
            <div key={index} >
              <img src={url} alt={`Existing File ${index}`} />
            </div>
          ))}
     </div>
      
        <h2>Description</h2>

        <Editor value={content} onChange={setContent} />

        <button type="button" onClick={() => setShowPopup(true)}>
          Modifier
        </button>      </form>
        {showPopup && (
        <Popup
          message="Êtes-vous sûr(e) de vouloir continuer ?"
          onCancel={() => setShowPopup(false)}
          onConfirm={(ev) => {
            setShowPopup(false);
            updateSection(ev);
          }}
        />
      )}
      {showPopup2 && (
        <Popup
          message="Êtes-vous sûr(e) de vouloir quitter ?"
          onCancel={() => setShowPopup2(false)}
          onConfirm={(ev) => {
            setShowPopup2(false);
            navigate("/dashboard");
          }}
        />
      )}
    </div>
  );
}
