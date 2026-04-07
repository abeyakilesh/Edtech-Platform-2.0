import Loading from "./Image/Loading.png";

function Course(props) {
  function handleBuyNow() {
    console.log("Purchased");
  }

  return (
    props.name && (
      <div className="card">
        <img src={props.image || Loading} alt="Course" />
        <div className="card-content">
          <div className="course-meta">
            <span className="course-level">{props.level}</span>
            <span className="course-rating">★ {props.rating}</span>
          </div>

          <h3>{props.name}</h3>
          <p className="course-description">{props.description}</p>

          <div className="course-footer">
            <div>
              <strong>₹{props.price}</strong>
              <span>{props.lessons}</span>
            </div>

            <button className="buy-btn" onClick={handleBuyNow}>
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default Course;
