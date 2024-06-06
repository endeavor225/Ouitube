import { useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import { getAllVideo } from "../../api/api-video";
import { convertBlobToUrl } from "../../helpers/fileHelpers";
import VideoCard from "../../components/VideoCard/VideoCard";
import { useLocation } from "react-router-dom";
import SearchBox from "../../components/SearchBox/SearchBox";

export default function Home() {
  const [loading, setLoading] = useState();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    setLoading(true)
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="Home container-fluid py-2">
          
          <SearchBox handleChange={setVideos} setLoading={setLoading} />
          <div className="row">
            {videos.map((video) => (
              <VideoCard key={video._id} video={video} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
