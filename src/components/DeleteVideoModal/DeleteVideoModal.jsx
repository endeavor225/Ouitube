import React from "react";
import { Button, Modal } from "react-bootstrap";
import { deleteVideo } from "../../api/api-video";

export default function DeleteVideoModal({ hideModal, currentVideo, updateData }) {

  const handleDelete = async (event) => {
    await deleteVideo(currentVideo._id)

    updateData()
    hideModal()
  }

  return (
    <div>
      <Modal show={true} onHide={hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>You are sure you want to delete this video : <strong>{currentVideo.title}</strong> ? </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideModal}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
