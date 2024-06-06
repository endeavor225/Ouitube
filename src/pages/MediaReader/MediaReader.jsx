import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { searchVideoBySlug } from "../../api/api-video";
import { OuitubePlayer } from "ouitube-player";
import { convertBlobToUrl } from "../../helpers/fileHelpers";
import Loading from "../../components/Loading/Loading";
import PlayList from "../../components/PlayList/PlayList";

export default function MediaReader() {
  let { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [errorPage, setErrorPage] = useState(false);
  const [video, setVideo] = useState(undefined);
  const navigate = useNavigate()
  

  const runLocalData = async () => {
    if (slug) {
        try {
            const data = await searchVideoBySlug(slug);
            if (data.isSuccess === true) {
                const currentVideo = data.result;

                currentVideo.poster = convertBlobToUrl(currentVideo.poster);
                currentVideo.link = convertBlobToUrl(currentVideo.link);
                setVideo(data.result);
                setLoading(false);
            } else {
                setErrorPage(true)
            }
        } catch (error) {
            setErrorPage(true)
        }
    }
  };

  useEffect(() => {
    runLocalData();
  }, [slug]);

  if(errorPage){
    navigate('/error')
  }

  return (
    <div className="container-fluid">
      {loading ? 
        <Loading />
       : 
        video ? 
            <div className="MediaReader p-2">
            <div className="row">
                <div className="col-md-9 shadow-lg">
                {/* <OuitubePlayer src={video.link} /> */}
                <video controls src={video.link} width={'100%'}></video>
                <div className="">
                    <h2>{video.title}</h2>
                </div>
                <div className="video-description p-2">
                {video.description}
                </div>
                </div>
                <div className="col-md-3">
                <PlayList currentVideoId={video._id} />
                </div>
            </div>
            </div>
        : nul
      }
    </div>
  );
}
