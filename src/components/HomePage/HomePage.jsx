import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getTrendingMovies } from "../../api/api";
import './HomePage.css'


export default function HomePage() {
    const [movies, setMovies] = useState([]);
    const location = useLocation();

    useEffect(() => {
        getTrendingMovies().then(response => setMovies(response))
    }, [])

    return (
        <div className="PopularMovies">
            <h2 className="MoviesList-header">Trending movies</h2>
            <ul className="MoviesList">
                {movies.map(item => (
                    <li className="MoviesList-item" key={item.id}>
                        <Link className="MoviesList-link" to={{pathname: `movies/${item.id}`, state: {prevLocation: location.pathname}}}>{item.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
    
}