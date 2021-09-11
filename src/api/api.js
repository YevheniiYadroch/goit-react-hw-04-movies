import axios from "axios";
const API_KEY = '8e8cf8980e2b12ef25111534159b0aee';

async function getMovieReviews(movieId) {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${API_KEY}`)
        const data = response.data.results;
        return data;
    } catch (error) {
        console.log(error)
    }
    
}

async function getTrendingMovies() {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`)
                const data = response.data.results;
                return data;
            } catch (error) {
                console.log(error)
            }
}
    
async function getMovieCast(movieId) {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`)
                const data = response.data.cast;
                return data;
            } catch (error) {
                console.log(error)
            }
}

async function getMovieDetails(movieId) {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`)
                const data = response.data;
                return data;
            } catch (error) {
                console.log(error)
            }
}
    
async function searchMovies(query) {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`)
            const data = response.data.results;
            return data;
        } catch (error) {
            console.log(error)
        }
}
    

export {getMovieReviews, getTrendingMovies, getMovieCast, getMovieDetails, searchMovies};