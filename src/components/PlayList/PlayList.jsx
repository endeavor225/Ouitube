import { useEffect, useState } from "react";
import { findVideo, getAllVideo } from "../../api/api-video";
import { convertBlobToUrl } from "../../helpers/fileHelpers";
import PlayListItem from "../PlayListItem/PlayListItem";
import "./PlayList.css"
import { useLocation } from "react-router-dom"
import Pagination from "../Pagination/Pagination";

export default function PlayList({currentVideoId}) {
  const currentSearchParams = new URLSearchParams(window.location.search)
  const searchQuery = currentSearchParams.get('searchVideo') || ''
  const pageQuery = parseInt(currentSearchParams.get('page') || '1')
  const [videos, setVideos] = useState();
  const [currentPage, setCurrentPage] = useState(pageQuery);
  const [pageSize, setPageSize] = useState(5);
  const [datas, setDatas] = useState(null)
  const location = useLocation()

    const runLocalData = async () => {
        const data = await findVideo(searchQuery, 'title', currentPage, pageSize);
        setDatas(data)
        if (data.isSuccess) {
          data.results.map(video => {
            video.poster = convertBlobToUrl(video.poster)
            video.link = convertBlobToUrl(video.link)
            return video
          })
          setVideos(data.results)
        }
      }

    useEffect(() => {
        runLocalData()
    },[location.search])

  return (
    <div className="PlayList p-1">
      <div className="PlayListHeader shadow-lg p-2">
          <h2>PlayList</h2>
          <p> {datas?.allCount} videos </p>
          <Pagination 
            currentPage={datas?.currentPage}
            totalPages={datas?.totalPages}
            pageLinks={datas?.pageLinks}
            nextPage={datas?.nextPage}
            previousPage={datas?.previousPage}
            onPageChange={setCurrentPage}
          />
        </div>
        <div className="PlayListContent">
          {
            videos?.map(video => <PlayListItem key={video._id} video={video} currentVideoId={currentVideoId}  />)
          }
        </div>
    </div>
  )
}
