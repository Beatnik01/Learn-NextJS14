"use client";

import { useEffect, useState } from "react";
import { API_URL, COUNTRY_NAMES } from "../app/constants";
import styles from "../styles/movie-providers.module.css";

async function getProviders(id: string) {
  const response = await fetch(`${API_URL}/${id}/providers`);
  return response.json();
}

const ProviderTypeObj = {
  flatrate: "Stream",
  rent: "Rent",
  buy: "Buy",
};

export default function MovieProviders({ id }: { id: string }) {
  const [providers, setProviders] = useState({});
  const [codes, setCodes] = useState([]);
  const [code, setCode] = useState("");
  const [types, setTypes] = useState([]);
  const [type, setType] = useState("");

  useEffect(() => {
    getProviders(id).then((data) => {
      setProviders(data);
      const initCodes = Object.keys(data);
      setCodes(initCodes);
      if (initCodes.length > 0) {
        const initCode = initCodes[0];
        setCode(initCode);
        const initTypes = Object.keys(data[initCode]);
        setTypes(initTypes);
        if (initTypes.length > 1) {
          setType(initTypes[1]);
        }
      }
    });
  }, [id]);

  const handleCodeChange = (e) => {
    const newCode = e.target.value;
    setCode(newCode);
    setTypes(Object.keys(providers[code]));
    setType(Object.keys(providers[newCode])[1]);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title_container}>
        <h1>Providers</h1>
        <span>&rarr;</span>
      </div>
      <div className={styles.select_container}>
        <select onChange={handleCodeChange}>
          <optgroup label="Provider Country">
            {codes.map((code) => (
              <option key={code} value={code}>
                {COUNTRY_NAMES[code]}
              </option>
            ))}
          </optgroup>
        </select>

        {code && providers[code] ? (
          <select onChange={handleTypeChange}>
            <optgroup label="Provider Type">
              {types.slice(1).map((type) => (
                <option key={type} value={type}>
                  {ProviderTypeObj[type]}
                </option>
              ))}
            </optgroup>
          </select>
        ) : null}
      </div>
      <div className={styles.provider_container}>
        {code && type
          ? providers[code][type].map((provider) => (
              <div className={styles.provider} key={provider.provider_id}>
                <img
                  src={
                    type === "flatrate"
                      ? `https://image.tmdb.org/t/p/w300/${provider.logo_path}`
                      : provider.logo_path
                  }
                  alt={provider.provider_name}
                />
              </div>
            ))
          : null}
      </div>
      <div className={styles.credits_container}></div>
    </div>
  );
}
