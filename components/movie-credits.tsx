"use client";

import { useEffect, useState } from "react";
import { API_URL } from "../app/constants";
import styles from "../styles/movie-credits.module.css";

async function getCredits(id: string) {
  const response = await fetch(`${API_URL}/${id}/credits`);
  return response.json();
}

export default function MovieCredits({ id }: { id: string }) {
  const [credits, setCredits] = useState([]);

  useEffect(() => {
    getCredits(id).then(setCredits);
  }, [id]);

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
              onClick={() => {
                window.open(`https://www.themoviedb.org/person/${credit.id}`, "_blank");
              }}
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
