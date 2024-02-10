"use client";

import { API_URL } from "../app/constants";
import styles from "../styles/movie-credits.module.css";

async function getCredits(id: string) {
  const response = await fetch(`${API_URL}/${id}/credits`);
  return response.json();
}

export default async function MovieCredits({ id }: { id: string }) {
  const credits = await getCredits(id);
  const onClick = () => {
    window.location.href = `https://www.themoviedb.org/person/${credits.id}`;
  };
  return (
    <div className={styles.container}>
      <div className={styles.title_container}>
        <h1>Credits</h1>
        <span>&rarr;</span>
      </div>
      <div className={styles.credits_container}>
        {credits.slice(0, 4).map((credit) => (
          <div className={styles.credits} key={credit.id}>
            <img
              className={styles.profile}
              src={credit.profile_path}
              alt={credit.name}
              onClick={onClick}
            />
            <div className={styles.profile_info}>
              <span>
                {credit.name.length > 15 ? `${credit.name.substring(0, 15)}` : credit.name}
              </span>
              <span>
                {credit.character.length > 20
                  ? `${credit.character.substring(0, 20)}`
                  : credit.character}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
