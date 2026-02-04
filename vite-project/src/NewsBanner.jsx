// NewsBanner.jsx
import React from "react";
import "./panels.css"; // reuse your existing styles

function NewsBanner({ data, onClose }) {
  if (!data) return null;

  return (
    <div className={`news-banner ${data ? "active" : ""}`}>
      <div className="news-banner-content">
        <strong>{data.title}</strong>
        <span className="news-category">({data.category})</span>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>
    </div>
  );
}

export default NewsBanner;
