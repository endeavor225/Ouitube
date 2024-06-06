import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { getVideo } from "../../api/api-video";
import Loading from "../Loading/Loading";
import { convertBlobToUrl } from "../../helpers/fileHelpers";
import { OuitubePlayer } from "ouitube-player";

export default function ViewVideoModal({hideModal, videoId}) {
  const [video, setVideo] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const runLocalData = async () => {
    const data = await getVideo(videoId);

    if (data.isSuccess) {
      const currentVideo = data.result
      currentVideo.poster = convertBlobToUrl(currentVideo.poster)
      currentVideo.link = convertBlobToUrl(currentVideo.link)
      setVideo(currentVideo);
    } else {
      console.log("Error getting");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    runLocalData();
  }, []);

  return (
    <div>
      <Modal show={true} onHide={hideModal} scrollable size="lg" >
        <Modal.Header>
          <Modal.Title>View Video </Modal.Title>
          <button className="btn-close" onClick={hideModal}></button>
        </Modal.Header>

        <Modal.Body>
            {isLoading ? 
                <Loading /> 
                :
                video ? 
                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <th>Title</th>
                        <td>{video.title} </td>
                      </tr>
                      <tr>
                        <th>Description</th>
                        <td>{video.description} </td>
                      </tr>
                      <tr>
                        <th>Category</th>
                        <td>{video.category} </td>
                      </tr>
                      <tr>
                        <th>Poster</th>
                        <td> <img src={video.poster} alt={video.poster} width={'100%'} className="img-fluid"/></td>
                      </tr>
                      <tr>
                       <th>Poster</th>
                       <td>
                        <div className="video">
                          <OuitubePlayer src={video.link}  />
                        </div>
                       </td>
                      </tr>
                    </tbody>
                  </table>
                  :
                  <p>Error</p>
            }
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={hideModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
