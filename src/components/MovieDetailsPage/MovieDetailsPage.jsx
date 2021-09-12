import { useEffect, useState, lazy, Suspense } from "react";
import { useParams } from "react-router";
import { Link, useRouteMatch, Route, useHistory, useLocation } from "react-router-dom";
import { getMovieDetails } from "../../api/api";
import Loader from "react-loader-spinner";
import './MovieDetailsPage.css'

const Cast = lazy(() => import('../Cast/Cast'));
const Reviews = lazy(() => import('../Reviews/Reviews'));


export default function MovieDetailsPage() {
    const history = useHistory();
    const location = useLocation();
    const { movieId } = useParams();
    const { url } = useRouteMatch();
    const [movie, setMovie] = useState();

    useEffect(() => {
        getMovieDetails(movieId).then(response => setMovie(response));
    }, [movieId])

    const clickHandler = () => {
        if (location.state.prevLocation === '/') {
            history.push(`${location.state.prevLocation}`)
        } else {
            history.push({
                pathname: location.state.prevLocation,
                search: `query=${location.state.query}`
            })
        }
    }

    return (
        <div className="MovieDetails">
            <button className="GoBackButton" onClick={clickHandler}>Go back</button>
            {movie &&
                <div className="MovieDetails-info">
                    <img className="MovieDetails-img"
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                        alt={movie.title} />
                    <div className="MovieDetails-info-wrapper">
                        <h3 className="MovieDetails-name">{movie.title} ({movie.release_date.split('-')[0]})</h3>
                        <p className="MovieDetails-text">User score: {movie.vote_average * 10}%</p>
                        <h4 className="MovieDetails-header">Overview</h4>
                        <p className="MovieDetails-text">{movie.overview}</p>
                        <h4 className="MovieDetails-header">Genres</h4>
                        <ul className="MovieDetails-genres">
                            {movie.genres.map(item => (
                                <li className="MovieDetails-text" key={item.id}>{item.name}</li>
                            ))}
                        </ul>
                    </div>
                </div>}
            <div className="MovieDetails-addInfoNav">
                <h5 className="MovieDetails-header">Additional information</h5>
                <ul>
                    <li className="MovieDetails-text">
                        <Link className="MovieDetails-add"
                            to={{
                                pathname: `${url}/cast`,
                                state: {
                                    prevLocation: location.state.prevLocation,
                                    query: location.state.query
                                }
                            }}>
                            Cast
                        </Link>
                    </li>
                    <li className="MovieDetails-text">
                        <Link className="MovieDetails-add"
                            to={{
                                pathname: `${url}/reviews`,
                                state: {
                                    prevLocation: location.state.prevLocation,
                                    query: location.state.query
                                }
                            }}>
                            Reviews
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="MovieDetails-addInfo">
                <Suspense fallback={<Loader
                    type="Puff"
                    color="#00BFFF"
                    height={200}
                    width={200}
                    className="Loader"
                />}>
                    <Route path={`${url}/cast`} render={() => <Cast movieId={movieId} />}/>
                    <Route path={`${url}/reviews`} render={() => <Reviews movieId={movieId} />}/>
                </Suspense>
            </div>
        </div>
    )
}