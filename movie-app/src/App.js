import React, { useEffect, useState } from "react";
import MovieList from "./components/Movie/MovieList";
import "./App.css";

const API_URL = "https://www.omdbapi.com/?s=starwars&apikey=263d22d8";

const App = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = () => {
            fetch(API_URL)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((data) => {
                    if (data.Response === "True") {
                        setMovies(data.Search);
                        setLoading(false);
                    } else {
                        throw new Error(data.Error);
                    }
                })
                .catch((error) => {
                    setError("Error fetching data: " + error.message);
                    setLoading(false);
                });
        };

        fetchMovies();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="App">
            <MovieList movies={movies} />
        </div>
    );
};

export default App;
