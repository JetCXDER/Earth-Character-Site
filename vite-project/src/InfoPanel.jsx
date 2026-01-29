import React, { useState } from "react";

function InfoPanel({ title, children, onClose, pos, setPos }) {
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onMouseDown = (e) => {
    setDragging(true);
    setOffset({
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    });
  };

  const onMouseMove = (e) => {
    if (dragging) {
      setPos({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };

  const onMouseUp = () => setDragging(false);

  return (
    <div
      className="info-panel"
      style={{
        position: "absolute",
        left: pos.x,
        top: pos.y,
        width: 300,
        background: "rgba(255,255,255,0.85)",
        borderRadius: 8,
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        padding: 16,
        backdropFilter: "blur(6px)",
      }}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    >
      <div
        className="info-header"
        style={{
          cursor: "move",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        onMouseDown={onMouseDown}
      >
        <h3>{title}</h3>
        <button onClick={onClose}>✕</button>
      </div>
      <div className="info-content">{children}</div>
    </div>
  );
}

export default InfoPanel;
