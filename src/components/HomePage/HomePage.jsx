import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTrendingMovies } from "../../api/api";
import './HomePage.css'


export default function HomePage() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getTrendingMovies().then(response => setMovies(response))
    }, [])

    return (
        <div className="PopularMovies">
            <h2 className="MoviesList-header">Trending movies</h2>
            <ul className="MoviesList">
                {movies.map(item => (
                    <li className="MoviesList-item" key={item.id}>
                        <Link className="MoviesList-link" to={`movies/${item.id}`}>{item.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
    
}