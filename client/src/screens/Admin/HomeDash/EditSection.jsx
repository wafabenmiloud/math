import "react-quill/dist/quill.snow.css";
import { useState, useEffect } from "react";
import Editor from "../../../components/Editor/Editor";
import "./HomeDash.css";
import axios from "axios";
import { MdAddToPhotos, MdClose } from "react-icons/md";
import { BsArrowLeftShort } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Popup from "../Popups/Popup";

export default function EditSection() {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/section/${id}`)
      .then((response) => {
        setContent(response.data.secDoc.content);
        if (
          response.data.secDoc.files &&
          response.data.secDoc.files.length > 0
        ) {
          setFiles(response.data.secDoc.files);
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }, []);

  const handleFileChange = (ev) => {
    const selectedFiles = Array.from(ev.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const removeFile = async (indexToRemove) => {
    const fileToRemove = files[indexToRemove];
    if (typeof fileToRemove === "string") {
      try {
        await axios.delete(`/api/file/${id}`, {
          data: { fileName: fileToRemove },
        });
      } catch (error) {
        console.error("Error deleting file:", error);
      }
    }
    setFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove)
    );
  };

  async function updateSection() {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("content", content);

    if (files.length > 0) {
      files.forEach((file) => {
        if (file instanceof File) {
          formData.append("files", file);
        }
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

      <form className="dash_create_form">
        <h2>Média <span style={{ fontSize: "10px" }}>
            (.jpg, .jpeg, .png, .gif)
          </span></h2>
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
          {files.length > 0 && (
            <div>
              {files.map((file, index) => (
                <div
                  key={index}
                  style={{
                    position: "relative",
                    display: "inline-block",
                    marginRight: "10px",
                  }}
                >
                  <div
                    style={{ position: "relative", display: "inline-block",width:"100%" }}
                  >
                    {typeof file === "string" ? (
                      <img
                        src={`/uploads/${file}`}
                        alt="Selected File"
                        width={35}
                        height={35}
                      />
                    ) : (
                      <img
                        src={URL.createObjectURL(file)}
                        alt="Selected File"
                        width={35}
                        height={35}
                      />
                    )}
                    <div
                      style={{
                        position: "absolute",
                        top: "-10px",
                        right: "-10px",
                        backgroundColor: "white",
                        borderRadius: "50%",
                        boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.5)",
                        padding: "2px",
                        cursor: "pointer",
                      }}
                    >
                      <MdClose size={20} onClick={() => removeFile(index)} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <h2>Description</h2>
        <Editor value={content} onChange={setContent} />
        <button type="button" onClick={() => setShowPopup(true)}>
          Modifier
        </button>{" "}
      </form>
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
