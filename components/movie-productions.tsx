"use client";

import styles from "../styles/movie-info.module.css";

export default function MovieProductions({ id, movie }) {
  return (
    <div className={styles.production}>
      {movie.production_companies
        .filter((company) => !company.logo_path.includes("null"))
        .map((company) => (
          <div key={company.id}>
            <img alt={company.name} src={company.logo_path} />
          </div>
        ))}
    </div>
  );
}
