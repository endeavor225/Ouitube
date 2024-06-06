import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "./UploadModal.css";
import FileDrop from "../FileDrop/FileDrop";
import { convertFileToBlob, linkToBlob } from "../../helpers/fileHelpers";
import Loading from "../Loading/Loading";
import { addVideo } from "../../api/api-video";
import { emitNotification } from "../../helpers/notificationHelpers";
import { useDispatch } from "react-redux";

export default function UploadModal({ hideModal, updateData }) {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch()

  async function handleFileDrop(files) {
    
    setIsLoading(true);

    try {
        await Promise.all(
            await files.map(async (file) => {
              const fileNameParts = file.name.split(".");
              const extension = fileNameParts.pop();
              const title = fileNameParts.join(" ");
              const videoBlob = await convertFileToBlob(file);
              const imageLink = window.origin + "/assets/images/5569190_7d1c.jpg";
              const posterBlob = await linkToBlob(imageLink);
      
              const video = {
                title: title,
                description: title,
                link: videoBlob,
                poster: posterBlob,
                category: "Divers",
                isAvailable: false,
                created_at: new Date(),
              };
                    
              await addVideo(video)
            })
        )
          updateData()
          hideModal()
          emitNotification(dispatch, "All video Added successfuly !", "ADD")
    } catch (error) {
      emitNotification(dispatch, "Error, please try again later! !", "ADD", 'danger')
      console.error('Une erreur s\'est produite lors du traitement des fichiers :', error);
    } finally{
        setIsLoading(false)
    }
  }

  return (
    <div>
      <Modal show={true} onHide={hideModal} scrollable size="lg" centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>
          <h2>Upload Video</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isLoading ? <Loading /> : <FileDrop onFileDrop={handleFileDrop} />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideModal}>
            Close
          </Button>
          <Button variant="success">Confirm</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
