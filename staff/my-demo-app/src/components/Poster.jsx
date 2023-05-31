import './Poster.css';

function Poster({ params }) {
    return (
        <div className="halfPoster">
            <div className="poster">
                <p className="poster__title">Natus Vincere -</p>
                <p className="poster__subtitle">Online team management</p>
                <img className="poster__bg" src="https://placeimg.com/640/480/tech" alt="" />
                <p className="poster__goToSignIn">I have an account! <a className="goToSignIn__link" href="#">Click here</a></p>
            </div>
        </div>
    )
}

export default Poster