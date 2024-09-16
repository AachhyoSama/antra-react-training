import React from "react";

const MovieCard = ({ movie }) => {
    return (
        <article
            className="movie-card"
            role="listitem"
            aria-label={`Movie Card for ${movie.Title}`}
        >
            <img
                src={movie.Poster}
                alt={`Poster of the movie ${movie.Title}`}
                className="movie-poster"
            />
            <div className="movie-info">
                <h2>{movie.Title}</h2>
                <p>Year: {movie.Year}</p>
                <p>Type: {movie.Type}</p>
            </div>
        </article>
    );
};

export default MovieCard;
