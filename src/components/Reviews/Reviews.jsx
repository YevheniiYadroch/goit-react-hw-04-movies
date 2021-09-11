import { useEffect } from "react";
import { useState } from "react";
import { getMovieReviews } from "../../api/api";
import './Reviews.css'

export default function Reviews({ movieId }) {
    const [revies, setReviews] = useState();
    
    useEffect(() => {
        getMovieReviews(movieId)
            .then(response => setReviews(response))
    }, [movieId])

    return (
        <div>
            <ul>
                {revies && revies[0] ? revies.map(item => (
                    <li className="Reviews-item" key={item.id}>
                        <p className="Reviews-author">Author: {item.author}</p>
                        <p className="Reviews-text">{item.content}</p>
                    </li>
                )) :
                <p className="Reviews-text">We don't have any reviews for this movie.</p>
                }
            </ul>
        </div>
    );
}