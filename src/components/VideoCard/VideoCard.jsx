import { Link } from "react-router-dom";
import moment from "moment";
import "./VideoCard.css";

export default function VideoCard({ video }) {

  const createdAt = moment(video?.created_at)
  return (
    <div className="VideoCard col-lg-3 col-md-6 p-1">
      <Link to={"/reader/" + video.slug}>
        <div className="shadow-lg card">
          <img
            src={video.posterLink}
            className="card-img-top"
            alt={video.title}
            height={200}
          />

          <div className="card-body">
            <h5 className="card-title">{video.title}</h5>
            <p className="card-text">
            Published at <strong>{createdAt.fromNow()}</strong>
            </p>
            {/* Vous pouvez ajouter d'autres informations de la vidéo ici */}
          </div>
        </div>
      </Link>
    </div>
  );
}
