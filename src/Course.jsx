import Loading from "./Image/Loading.png";

function Course(props) {
  return (
    props.name && (
      <article className="card" id={props.id}>
        <a className="card-media-link" href={props.detailsHref} aria-label={`View ${props.name}`}>
          <img src={props.image || Loading} alt={props.name} />
        </a>
        <div className="card-content">
          <div className="course-meta">
            <span className="course-level">{props.level}</span>
            <span className="course-rating">★ {props.rating}</span>
          </div>

          <a className="course-title-link" href={props.detailsHref}>
            <h3>{props.name}</h3>
          </a>
          <p className="course-description">{props.description}</p>

          <div className="course-footer">
            <div>
              <strong>₹{props.price}</strong>
              <span>{props.lessons}</span>
            </div>

            <a className="buy-btn" href={props.ctaHref}>
              Enroll Now
            </a>
          </div>
        </div>
      </article>
    )
  );
}

export default Course;
