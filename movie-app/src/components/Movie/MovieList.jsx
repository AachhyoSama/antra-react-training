import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ movies }) => {
    return (
        <main>
            <section
                className="movie-container"
                role="list"
                aria-label="List of Movies"
            >
                {movies.map((movie) => (
                    <MovieCard key={movie.imdbID} movie={movie} />
                ))}
            </section>
        </main>
    );
};

export default MovieList;
