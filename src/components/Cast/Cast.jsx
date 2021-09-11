import { useEffect } from "react";
import { useState } from "react";
import { getMovieCast } from "../../api/api";
import './Cast.css'

export default function Cast({ movieId }) {
    const [cast, setCast] = useState();

    useEffect(() => {
        getMovieCast(movieId).then(response => setCast(response));
    }, [movieId])

    return (
        <div className="Cast-wrapper">
            <ul className="Cast-list">
                {cast &&
                cast.map(item => (
                    <li className="Cast-item" key={item.cast_id}>
                        {item.profile_path && <img className="Cast-img" src={`https://image.tmdb.org/t/p/w500/${item.profile_path}`} alt={item.name} />}
                        {item.name && <p className="Cast-text">{item.name}</p>}
                        {item.character && <p className="Cast-text">Character: {item.character}</p>}
                    </li>
                ))}
            </ul>
        </div>
    )
}