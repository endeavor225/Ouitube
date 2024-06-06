import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { convertFileToBlob, convertFileToLink } from "../../helpers/fileHelpers";
import { addVideo, updateVideo } from "../../api/api-video";
import Loading from "../Loading/Loading";
import { useDispatch } from "react-redux";
import { emitNotification } from "../../helpers/notificationHelpers";


export default function VideoFormModal({ hideModal, updateData, currentVideo }) {

  const dispatch = useDispatch()

  const [formData, setFormData] = useState(currentVideo || {
    title: "",
    description: "",
    poster: null,
    link: null,
    category: "",
    isAvailable: true
  })

  const [formErrors, setFormErrors] = useState({});
  const [posterPreview, setPosterPreview] = useState(currentVideo?.posterLink || "");
  const [videoPreview, setVideoPreview] = useState(currentVideo?.videoLink || "");
  const [formSubmitError, setFormSubmitError] = useState("");
  const [isSubmited, setIsSubmited] = useState(false);

  

  async function handleInputChange (evt) {
    const {name, value, type, files, checked} = evt.target

    const copyFormData = { ...formData }
    
    if (type === "checkbox") {
      copyFormData[name] = checked
    }else if (type === "file") {
      const file = files[0]
      const link = await convertFileToLink(file)
      
      if (name === "poster") {
        if (!file.type.startsWith("image/")) {
          return
        }
        setPosterPreview(link)
      }
      if (name === "link") {
        if (!file.type.startsWith("video/")) {
          return
        }
        setVideoPreview(link)
      }
      copyFormData[name] = file
    }else {
      copyFormData[name] = value
    }

    // Supprimer l'erreur si elle existe
    const copyErrors = {...formErrors}
    delete copyErrors[name]
    setFormErrors(copyErrors)

    // Mettre à jour le formulaire
    setFormData(copyFormData)
  }


  const handleSubmit = async (evt) => {
    evt.preventDefault()

    if(!validateForm()){
      return
    }

    try {
      setIsSubmited(true)
      const video = {...formData}

      let result
      if (currentVideo) {
        // Update
        if (video.poster instanceof File) {
          video.poster = await convertFileToBlob(video.poster)
        }

        if (video.link instanceof File) {
          video.link = await convertFileToBlob(video.link)
        }
        delete video?.videoLink
        delete video?.posterLink

        video.updated_at = new Date()
        result = await updateVideo(video)
        //console.log("🚀 ~ handleSubmit ~ result:", result)

      }else {
        // Create
        // Convertir en buffer
        video.created_at = new Date()
        video.poster = await convertFileToBlob(video.poster)
        video.link = await convertFileToBlob(video.link)
        
        result = await addVideo(video)
      }
      

      if (result?.isSuccess) {
        updateData()
        hideModal()

        if (currentVideo) {
          emitNotification(dispatch, "Video updated successfuly !", "ADD")
        }else {
          emitNotification(dispatch, "Video Added successfuly !", "ADD")
        }
      }
    } catch (error) {
      setFormSubmitError("Error, please try again later !")
      emitNotification(dispatch, "Error, please try again later! !", "ADD", 'danger')

    } finally {
      setIsSubmited(false)
    }
  }

  function validateForm() {
    const errors = {}

    if (!formData.title.trim()) {
      errors.title = 'Title is required'
    }

    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    }
    
    if (!formData.poster) {
      errors.poster = 'Poster file is required';
    }
    
    if (!formData.link) {
      errors.link = 'Video file is required';
    }

    if (!formData.category) {
      errors.category = 'Please select a category';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0
  }

  return (
    <div className="VideoFormModal">
      <Modal show={true} onHide={hideModal} scrollable size="lg" backdrop="static">
        <Modal.Header>
          <Modal.Title>Video Form</Modal.Title>
          <button className="btn-close" onClick={hideModal}></button>
        </Modal.Header>

        <Modal.Body>
          {isSubmited ?  <Loading /> : 
            <form action="">
              {formSubmitError && <div className="text-danger">{formSubmitError}</div>}
              <div className="form-group py-1">
                <label htmlFor="title">Title : </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className={`form-control ${formErrors.title ? 'is-invalid' : ''}`}
                  defaultValue={formData.title}
                  onChange={handleInputChange}
                />
                {formErrors.title && <div className='invalid-feedback'>{formErrors.title}</div>}
              </div>

              <div className="form-group py-1">
                <label htmlFor="description">Description : </label>
                <textarea
                  name="description"
                  id="description"
                  className={`form-control ${formErrors.description ? 'is-invalid' : ''}`}
                  defaultValue={formData.description}
                  onChange={handleInputChange}
                />
                {formErrors.description && <div className='invalid-feedback'>{formErrors.description}</div>}
              </div>

              <div className="form-group py-1">
                <label htmlFor="poster">Image (poster) :</label>
                <input
                  type="file"
                  name="poster"
                  id="poster"
                  accept="image/*" 
                  className={`form-control ${formErrors.poster ? 'is-invalid' : ''}`}
                  onChange={handleInputChange}
                />

                {posterPreview && <div className="preview-image card my-1">
                    <img src={posterPreview} className="img-fluid" width={'100%'} />
                  </div>
                }
              
                {formErrors.poster && <div className='invalid-feedback'>{formErrors.poster}</div>}
              </div>

              <div className="form-group py-1">
                <label htmlFor="video">Video :</label>
                <input
                  type="file"
                  name="link"
                  id="video"
                  accept="video/*" 
                  className={`form-control ${formErrors.link ? 'is-invalid' : ''}`}
                  onChange={handleInputChange}
                />

                {videoPreview && (
                  <div className="video-preview  card my-1">
                    <video controls src={videoPreview} width={'100%'}></video>
                  </div>
                )}

                {formErrors.link && <div className='invalid-feedback'>{formErrors.link}</div>}
              </div>

              <div className="form-group py-1">
                <label htmlFor="categories">Categories :</label>
                <select
                  accept="video/*"
                  name="category"
                  id="categories"
                  className={`form-control ${formErrors.category ? 'is-invalid' : ''}`}
                  defaultValue={formData.category}
                  onChange={handleInputChange}
                >
                  <option value="">Select video categories</option>
                  <option value="Politique">Politique</option>
                  <option value="Education">Education</option>
                  <option value="Culture">Culture</option>
                  <option value="Formation">Formation</option>
                </select>
                {formErrors.category && <div className='invalid-feedback'>{formErrors.category}</div>}
              </div>

              <div className="form-group py-1 form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="isAvailable"
                  id="isAvailable"
                  defaultChecked={formData.isAvailable}
                  onChange={handleInputChange}
                />
                <label className="px-2" htmlFor="isAvailable">
                  Is Available :
                </label>
              </div>
            </form>
          }
          
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={hideModal}>
            Cancel
          </Button>
          { currentVideo ? 
            <Button variant="warning" onClick={handleSubmit}>Update video</Button>
            :
            <Button variant="success" onClick={handleSubmit}>Save video</Button>
          } 
        </Modal.Footer>
      </Modal>
    </div>
  );
}
