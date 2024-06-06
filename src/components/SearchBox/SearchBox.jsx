import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { findVideo, getAllVideo, getVideoByPage } from "../../api/api-video";
import { convertBlobToUrl } from "../../helpers/fileHelpers";
import Pagination from "../Pagination/Pagination";

export default function SearchBox({handleChange, setLoading}) {
    const currentSearchParams = new URLSearchParams(window.location.search)
    const pageQuery = parseInt(currentSearchParams.get('page') || '1')
    const searchQuery = currentSearchParams.get('searchVideo') || ''
    const location = useLocation()

    const [datas, setDatas] = useState({});
    const [currentPage, setCurrentPage] = useState(pageQuery);
    const [pageSize, setPageSize] = useState(5);
    
    

    const runLocalData = async () => {
        //const data = await getVideoByPage(currentPage, pageSize);
        const data = await findVideo(searchQuery, 'title', currentPage, pageSize);
        setDatas(data)
        if (data.isSuccess) {
          data.results.map((video) => {
            video.posterLink = convertBlobToUrl(video.poster)
            video.videoLink = convertBlobToUrl(video.link)
            return video;
          });
          // Recherche
          /* const filteredVideo = data.results.filter((video) => 
           video.title.toLowerCase().includes(searchQuery.toLowerCase())
          )*/
          handleChange(data.results);
         

          if (setLoading) setLoading(false);
        }
    };

    useEffect(() => {
        runLocalData()
    },[location.search, currentPage, pageSize])
  
    return (
    <div>
        {
            searchQuery !== "" &&
            <div className="HomeHeader">
              <h2>Search results</h2>
              <p>Displaying {datas?.allCount} video(s) matching the search query <strong>"{searchQuery}"</strong></p>
            </div>
        }
        <div className="d-flex justify-content-between">
            <Pagination 
                currentPage={datas?.currentPage}
                totalPages={datas?.totalPages}
                pageLinks={datas?.pageLinks}
                nextPage={datas?.nextPage}
                previousPage={datas?.previousPage}
                onPageChange={setCurrentPage}
            />

            <div>
                <select name="pageSize" id="pageSize" className="form-control" onChange={(e) => setPageSize(parseInt(e.target.value))}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>
        </div>
        
    </div>
  )
}
