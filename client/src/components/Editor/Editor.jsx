import React, { useState } from "react";
import ReactQuill from "react-quill";
import axios from "axios";
import { MdOutlineUploadFile } from "react-icons/md";

export default function Editor({ value, onChange }) {
  const [imageUrl, setImageUrl] = useState("");

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      ["code-block", "formula"],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["link", "upload"], // Add 'upload' button
      ["clean"],
      ["undo", "redo"],
      ["horizontal"],
    ],
    keyboard: {
      bindings: {
        "list autofill": {
          prefix: /^\s*()$/,
        },
      },
    },
  };

  const handleQuillClick = (event) => {
    const target = event.target;
    if (target.tagName === "A") {
      const href = target.getAttribute("href");
      if (href) {
        window.open(href, "_blank");
        event.preventDefault();
      }
    }
  };

  const handleFileUpload = async () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.onchange = async (e) => {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      try {
        const response = await axios.post("/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const imageURL = response.data.url;
        setImageUrl(imageURL); // Update the state with image URL
        const range = quillRef.getEditorSelection();
        if (range) {
          quillRef.getEditor().insertEmbed(range.index, "image", imageURL);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    };
    fileInput.click();
  };

  let quillRef;

  const quillRefCallback = (ref) => {
    if (ref) {
      quillRef = ref;
    }
  };

  return (
    <div style={{ backgroundColor: "#e4f1de", width: "100%" }}>
      <ReactQuill
        ref={quillRefCallback}
        value={value}
        theme={"snow"}
        onChange={onChange}
        modules={modules}
        onClick={handleQuillClick}
      />

      <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
        {imageUrl && (
          <div style={{ marginRight: "10px" }}>
            <span>{imageUrl}</span>
          </div>
        )}
        <MdOutlineUploadFile
          onClick={handleFileUpload}
          style={{ cursor: "pointer" }}
          size={25}
        />
      </div>
    </div>
  );
}
