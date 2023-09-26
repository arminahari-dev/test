import React, { useState } from "react";
import { EyeIcon } from "@heroicons/react/24/outline";
import { EyeSlashIcon } from "@heroicons/react/24/outline";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();
function CharacterList({ characters, clickHandler, id }) {
  return (
    <div
      // data-aos="fade-done"
      // data-aos-easing="ease-in-out"
      // data-aos-mirror="true"
      // data-aos-once="false"
      // data-aos-anchor-placement="top-center"
      className="characters-list"
    >
      {characters.map((character) => (
        <Character
          key={character.id}
          character={character}
          clickHandler={clickHandler}
          id={id}
        />
      ))}
    </div>
  );
}

export default CharacterList;

const Character = ({ character, clickHandler, id }) => {
  return (
    <div onClick={() => clickHandler(character.id)} className="list__item">
      <img src={character.image} alt={character.name} />
      <CharacterName character={character} />
      <button className="icon red">
        {id === character.id ? <EyeSlashIcon /> : <EyeIcon />}
      </button>
    </div>
  );
};
const CharacterName = ({ character }) => {
  return (
    <h3 className="name">
      <span>{character.gender === "Male" ? "👨‍🦰" : "👩‍🦱"}</span>
      <span>{character.name}</span>
    </h3>
  );
};
