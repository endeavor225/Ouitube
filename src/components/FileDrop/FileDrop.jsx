import { useState } from "react";
import "./FileDrop.css";

export default function FileDrop({onFileDrop}) {
  const [dragging, setDragging] = useState(false);

  const handleDragEnter = (event) => {
    event.preventDefault();
    setDragging(true);
  };
  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };
  const handleDragLeave = (event) => {
    event.preventDefault();
    setDragging(false);
  };
  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);

    const files = Array.from(event.dataTransfer.files);
    onFileDrop(files)
  };

  return (
    <div
      className={"upload-zone " + (dragging ? "dragging" : "")}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver} 
      onDrop={handleDrop}
    >
      <p>Glissez dépossez vos fichiers vidéos !</p>
    </div>
  );
}
