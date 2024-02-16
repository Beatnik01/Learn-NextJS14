import { API_URL } from "../app/constants";
import styles from "../styles/movie-info.module.css";
import MovieProductions from "./movie-productions";
import MovieVideos from "./movie-videos";

export async function getMovie(id: string) {
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
}

export default async function MovieInfo({ id }: { id: string }) {
  const movie = await getMovie(id);
  const year = new Date(movie.release_date).getFullYear();

  return (
    <div className={styles.container}>
      <img className={styles.poster} alt={movie.title} src={movie.poster_path} />
      <div className={styles.info}>
        <div className={styles.title_container}>
          <h1 className={styles.title}>{movie.title}</h1>

          <div className={styles.title_raiting}>
            <h3>RAITING</h3>
            <div>
              <span>⭐️ {movie.vote_average.toFixed(1)}</span>
              <span> / 10</span>
            </div>
          </div>

          <div className={styles.title_pop}>
            <h3>POPULARITY</h3>
            <div>
              <span>👍 {movie.popularity.toFixed(0)}</span>
            </div>
          </div>
        </div>

        <div className={styles.title_date}>
          <span>{year}</span>
          <span>•</span>
          <span>{movie.original_language.toUpperCase()}</span>
          <span>•</span>
          <span>{movie.runtime}m</span>
        </div>

        <div className={styles.intro}>
          {movie.tagline ? <span>“{movie.tagline}”</span> : null}
          <p>{movie.overview}</p>
        </div>

        <div className={styles.genres}>
          {movie.genres.map((genre) => (
            <div id={genre.id}>
              <span>{genre.name}</span>
            </div>
          ))}
        </div>

        <MovieVideos id={id} />
      </div>
    </div>
  );
}
