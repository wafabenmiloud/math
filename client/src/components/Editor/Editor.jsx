import React, { useState } from "react";
import ReactQuill from "react-quill";

export default function Editor({ value, onChange }) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['code-block', 'formula'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['link'],
      ['clean'],
      ['undo', 'redo'],
      ['horizontal']
    ],
  };

  const handleQuillClick = (event) => {
    const target = event.target;
    if (target.tagName === "A") {
      const href = target.getAttribute("href");
      if (href) {
        window.open(href, "_blank");
        // Prevent default behavior of ReactQuill
        event.preventDefault();
      }
    }
  };

  return (
    <div style={{ backgroundColor: "#e4f1de", width: "100%" }}>
      <ReactQuill
        value={value}
        theme={'snow'}
        onChange={onChange}
        modules={modules}
        onClick={handleQuillClick} // Add onClick event handler
      />
    </div>
  );
}
