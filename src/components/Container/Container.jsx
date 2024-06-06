import { useEffect, useState } from "react";
import VideoFormModal from "../VideoFormModal/VideoFormModal";
import { getAllVideo } from "../../api/api-video";
import { convertBlobToUrl } from "../../helpers/fileHelpers";
import ViewVideoModal from "../ViewVideoModal/ViewVideoModal";
import DeleteVideoModal from "../DeleteVideoModal/DeleteVideoModal";
import UploadModal from "../UploadModal/UploadModal";
import SearchBox from "../SearchBox/SearchBox";
import { Link } from "react-router-dom";
import moment from "moment";

export default function Container() {

  const [displayModal, setDisplayModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [uploadModal, setUploadModal] = useState(false)
  const [currentVideo, setCurrentVideo] = useState(null);
  const [videos, setVideos] = useState([]);


  const runLocalData = async () => {
    const data = await getAllVideo()
    if (data.isSuccess) {
      data.results.map(video => {
        video.posterLink = convertBlobToUrl(video.poster)
        video.videoLink = convertBlobToUrl(video.link)
        return video
      })
      setVideos(data.results)
    }
  }

  useEffect(() => {
  }, [])

  function handleView (id) {
    setViewModal(true)
    setCurrentVideo(id)
  }

  function handleEdit (id) {
    setDisplayModal(true)
    setCurrentVideo(id)
  }

  function handleAdd () {
    setDisplayModal(true)
    setCurrentVideo(undefined)
  }

  function handleDelete (video) {
    setCurrentVideo(video)
    setDeleteModal(true)
  }

  function handleUpload () {
    setCurrentVideo(undefined)
    setUploadModal(true)
  }



  return (
    <div className="container py-2">

      <SearchBox handleChange={setVideos} />

      <div className="d-flex gap-2 justify-content-between">
        <button className="btn btn-primary" onClick={handleAdd}>
          Add Vidéo
        </button>
        <button className="btn btn-danger" onClick={handleUpload}>
          Add Many
        </button>
      </div>

      

      {displayModal && 
        <VideoFormModal 
          hideModal={() => setDisplayModal(false)} 
          updateData={runLocalData}
          currentVideo={currentVideo}
        />
      }

      {uploadModal && 
        <UploadModal 
          hideModal={() => setUploadModal(false)} 
          updateData={runLocalData}
        />
      }

      {viewModal && currentVideo &&
        <ViewVideoModal 
          hideModal={() => setViewModal(false)} 
          videoId={currentVideo}
        />
      }

      {deleteModal && currentVideo &&
        <DeleteVideoModal 
          hideModal={() => setDeleteModal(false)} 
          currentVideo={currentVideo}
          updateData={runLocalData}
        />
      }

      <div className="video-list py-1">
        <table className="table table-bordered shadow-lg">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Poster</th>
              <th scope="col">Category</th>
              <th scope="col">Created At</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {videos.map((video) => (
              <tr key={video._id}>
                <th scope="row">{video._id}</th>
                <td>
                  <Link to={'/reader/' + video.slug}>
                    {video.title}
                  </Link>
                </td>
                <td>
                  <img
                    width={80}
                    src={video.posterLink}
                    alt="Formation React Js"
                  />
                </td>
                <td>{video.category}</td>
                <td>{moment(video?.created_at).format('MMMM D, YYYY')}</td>
                <td>
                  <button className="btn btn-success m-1" onClick={() => handleView(video._id)}>View</button>
                  <button className="btn btn-primary m-1" onClick={() => handleEdit(video)}>Edit</button>
                  <button className="btn btn-danger m-1" onClick={() => handleDelete(video)}>Delete</button>
                </td>
              </tr>
              )
            )}
            
          </tbody>
        </table>
      </div>
    </div>
  );
}
