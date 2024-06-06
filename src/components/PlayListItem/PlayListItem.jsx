import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import "./PlayListItem.css";

export default function PlayListItem({ video, currentVideoId }) {
  const navigate = useNavigate();
  const createdAt = moment(video?.created_at);

  const handleClick = (event) => {
    event.preventDefault();

    const currentSearchParams = new URLSearchParams(window.location.search);

    navigate("/reader/" + video.slug + "?" + currentSearchParams.toString());
  };

  return (
    <div
      className={
        "PlayListItem  my-3 card shadow-lg" +
        (currentVideoId == video._id ? " current" : "")
      }
    >
      <a onClick={handleClick} href="#" className="row">
        <div className="col-4">
          <img
            className="p-1 rounded"
            width={"100%"}
            src={video.poster}
            alt={video.title}
          />
        </div>
        <div className="col-8 d-flex align-items-center">
          <div className="">
            <div className="video-title">
              <strong>{video.title}</strong>
            </div>
            <div className="created_at">
              Published at <strong>{createdAt.fromNow()}</strong>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
