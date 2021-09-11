import { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import './MoviesPage.css'
import { searchMovies } from "../../api/api";

export default function MoviesPage() {
    const history = useHistory();
    const location = useLocation();
    const [movies, setMovies] = useState([]);
    const searchQuery = new URLSearchParams(location.search).get('query');

    useEffect(() => {
        if (searchQuery) {
            searchMovies(searchQuery).then(response => setMovies(response))
        } else {
            setMovies([])
        }
    }, [searchQuery])

    function onSubmit(e) {
        e.preventDefault();
        searchMovies(e.target[0].value).then(response => setMovies(response))
        history.push({
            ...location,
            search: `query=${e.target[0].value}`
        })
        e.target.reset();
    }

    return (
        <div>
            <form className="SearchForm" onSubmit={onSubmit}>
                <input
                    className="SearchForm-input"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search movies"
                />
                <button type="submit" className="SearchForm-button">
                    <span className="SearchForm-button-label">Search</span>
                </button>
            </form>
            {movies[0] &&
                <ul className="MoviesList">
                    {movies.map(item => (
                        <li className="MoviesList-item" key={item.id}>
                            <Link className="MoviesList-link" to={`/movies/${item.id}`}>{item.title}</Link>
                        </li>
                    ))}
                </ul>}
        </div>
    )
}