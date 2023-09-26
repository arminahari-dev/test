import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faFemale, faPerson } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import toast from "react-hot-toast";
import axios from "axios";
function CharacterDetail({
  id,
  addtoFave_Handler,
  noselection,
  isload,
  isAddedToFav,
}) {
  const [selecteditem, setSelecteditem] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [load, setLoad] = useState(false);
  // let selecteditem = characters.filter((character) => character.id === id);
  useEffect(() => {
    async function SingleCharacterFetch() {
      try {
        setLoad(true);
        const res = await fetch(
          `https://rickandmortyapi.com/api/character/${id}`
        );
        if (!res.ok) {
          throw new Error(`Request failed  (${res.status})`);
        } else {
          const data = await res.json();
          setSelecteditem(data);
        }
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/${id}`
        );
        const episodesId = data.episode.map((e) => e.split("/").at(-1));
        const episodesData = await fetch(
          `https://rickandmortyapi.com/api/episode/${episodesId}`
        );
        if (!episodesData.ok) {
          throw new Error(`Episode Request failed  (${res.status})`);
        } else {
          const data = await episodesData.json();
          setEpisodes([data].flat());
        }
      } catch (error) {
        setSelecteditem(null);
        toast.error(error.message, {
          duration: 3500,
        });
      } finally {
        setLoad(false);
      }
    }
    if (id) {
      SingleCharacterFetch();
    }
    if (id === null) {
      setSelecteditem(null);
    }
  }, [id]);

  if (load) {
    return <Loader />;
  }

  if (!selecteditem) {
    return <> {!isload && <p className="noselection">{noselection}</p>}</>;
  }

  if (selecteditem) {
    return (
      <>
        <div style={{ flex: 1 }}>
          <div className="character-detail">
            <img
              src={selecteditem.image}
              alt={selecteditem.name}
              className="character-detail__img"
            />
            <div className="character-detail__info">
              <h3 className="name">
                {selecteditem.name}
                <div className="info gender">
                  <span>Gender : {selecteditem.gender}</span> -
                  <span>
                    &nbsp;
                    {selecteditem.gender === "Male" ? (
                      <FontAwesomeIcon icon={faPerson} />
                    ) : (
                      <FontAwesomeIcon icon={faFemale} />
                    )}
                  </span>
                </div>
              </h3>
              <div className="info">
                <span
                  className={`status ${
                    (selecteditem.status === "Dead" && "red",
                    selecteditem.status === "unknown" && "unknown")
                  }`}
                ></span>
                <span>&nbsp;{selecteditem.status}</span>
                <span> - &nbsp;{selecteditem.species}</span>
              </div>
              <div className="location">
                <p>last known location:</p>
                <p>{selecteditem.location?.name}</p>
              </div>
              <div className="actions">
                {isAddedToFav ? (
                  <button className="btn btn--primary">
                    Already Added to Fav ✅
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      addtoFave_Handler(selecteditem);
                    }}
                    className="btn btn--primary"
                  >
                    <span>Add to Fav</span>
                    &nbsp; <FontAwesomeIcon icon={faHeart} />
                  </button>
                )}
              </div>
            </div>
          </div>
          <EpisodeList episodes={episodes} />
        </div>
      </>
    );
  }
}

export default CharacterDetail;

function EpisodeList({ episodes }) {
  const [sortBy, SetsortBy] = useState(true);
  let sortedEp;
  if (sortBy) {
    //صعودی
    sortedEp = [
      ...episodes
        .sort((a, b) => new Date(a.created) - new Date(b.created))
        .slice(0, 6),
    ];
  } else {
    //نزولی
    sortedEp = [
      ...episodes
        .sort((a, b) => new Date(b.created) - new Date(a.created))
        .slice(0, 6),
    ];
  }
  return (
    <div className="character-episodes">
      <div className="titel">
        <h2>list of Episodes:</h2>
        <button
          onClick={() => SetsortBy((is) => !is)}
          style={{ paddingRight: "1rem" }}
        >
          {sortBy ? (
            <ArrowUpCircleIcon className="arrow-button" />
          ) : (
            <ArrowDownCircleIcon className="arrow-button" />
          )}
        </button>
      </div>
      <hr
        style={{
          width: "99%",
          height: "2px",
          backgroundColor: "#94a3b8",
        }}
      />
      <ul>
        {sortedEp.map((ep, index) => (
          <li key={ep.id}>
            <div>
              {String(index + 0).padStart(2, "0")} {ep.episode}:
              <strong>{ep.name}</strong>
            </div>
            <div
              className="badge badge--secondary"
              style={{ marginTop: "2rem", padding: "10px" }}
            >
              {ep.air_date}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

