import { useEffect, useState } from "react";
import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar, { Favourite, Search } from "./components/Navbar";
import { toast, Toaster } from "react-hot-toast";
import Loader from "./components/Loader";
import axios from "axios";
import Modal from "./components/Modal";
import { TrashIcon } from "@heroicons/react/24/outline";

function App() {
  const [characters, setCharacters] = useState([]);
  const [isload, setIsload] = useState(false);
  const [id, setId] = useState(null);
  const [query, setQuery] = useState("");
  const [fav_number, setFav_number] = useState(
    () => JSON.parse(localStorage.getItem("fav")) || []
  );
  const [open, setOpen] = useState(false);

  // useEffect(() => {
  //   async function datafetch(params) {
  //     try {
  //       setIsload(true);
  //       const res = await fetch("https://rickandmortyapi.com/api/character/");
  //       if (!res.ok) {
  //         throw new Error();
  //       } else {
  //         const data = await res.json();
  //         setCharacters(data.results);
  //       }
  //     } catch (error) {
  //       // in real api we have  2type of err=>request err and response err
  //       // in real proj=> error.response.data.message(we have access to response err)
  //       setTimeout(() => {
  //         setIsload(false);
  //       }, 3000);
  //       toast.error(error.message, {
  //         duration: 3000,
  //       });
  //     } finally {
  //       setTimeout(() => {
  //         setIsload(false);
  //       }, 3000);
  //     }
  //   }
  //   datafetch();
  // }, []);

  // useEffect(() => {
  //   fetch("https://rickandmortyapi.com/api/character/")
  //     .then((res) => res.json)
  //     .then((data) => setCharacters(data.results));
  // }, []);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function datafetch() {
      try {
        setIsload(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/?name=${query}`,
          { signal }
        );
        //this code for true statemant and stoping the loader
        setTimeout(() => {
          setIsload(false);
        }, 3000);
        setCharacters(data.results);
      } catch (error) {
        // in real api we have  2type of err=>request err and response err
        // in real proj=> error.response.data.message(or error)(we have access to response err)
        if (!axios.isCancel(error)) {
          setCharacters([]);
          setIsload(false);
          toast.error(error.response.data.error, {
            duration: 3000,
          });
        }
      }
    }
    datafetch();
    return () => {
      controller.abort();
    };
  }, [query]);

  // useEffect(() => {
  //   const y = setInterval(() => {
  //     setCount((c) => c + 1);
  //   }, 1000);

  //   return () => {
  //     clearInterval(y);
  //   };
  // }, [count]);

  const clickHandler = (id) => {
    setId((previd) => (previd === id ? null : id));
  };

  // const addtoFave_Handler = (selecteditem) => {
  //   return setFav_number((prevselecteditem) =>
  //     prevselecteditem === selecteditem
  //       ? null
  //       : [...prevselecteditem, selecteditem]
  //   );
  // };

  const addtoFave_Handler = (selecteditem) => {
    setFav_number((prevselecteditem) => [...prevselecteditem, selecteditem]);
  };

  const isAddedToFav = fav_number.map((fav) => fav.id).includes(id);

  const onShowFav = () => {
    setOpen(true);
  };

  const removeFromFavehandler = (id) => {
    let filterArr;
    filterArr = fav_number.filter((n) => n.id !== id);
    setFav_number(filterArr);
  };

  // useEffect(() => {
  //   JSON.stringify(localStorage.setItem("fav", fav_number));
  // }, [fav_number]);

  useEffect(() => {
    localStorage.setItem("fav", JSON.stringify(fav_number));
  }, [fav_number]);
  return (
    <div className="app">
      <Modal title={"your favorite characters:"} setOpen={setOpen} open={open}>
        {fav_number.length !== 0 ? (
          fav_number.map((c, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center" }}>
              <div
                key={c.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4rem",
                  paddingTop: "1rem",
                  justifyContent: "flex-start",
                  maxWidth: "29rem",
                  paddingLeft: "1rem",
                }}
              >
                <img
                  src={c.image}
                  alt={c.name}
                  style={{ width: "15%", borderRadius: "50%" }}
                />
                <h3 className="name" style={{ display: "flex" }}>
                  {c.name}
                </h3>
              </div>
              <div style={{ paddingLeft: "14rem" }}>
                <button
                  onClick={() => removeFromFavehandler(c.id)}
                  style={{ color: "white" }}
                >
                  <TrashIcon style={{ width: "30px" }} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p style={{ color: "white" }}>No favorite characters selected:)</p>
        )}
      </Modal>
      <Navbar searchresualt={characters.length}>
        <Search query={query} setQuery={setQuery} />
        <Favourite fav_number={fav_number.length} onShowFav={onShowFav} />
      </Navbar>
      <div className="main">
        <Toaster />
        {isload ? (
          <Loader />
        ) : (
          <CharacterList
            id={id}
            clickHandler={clickHandler}
            characters={characters}
          />
        )}
        <CharacterDetail
          id={id}
          addtoFave_Handler={addtoFave_Handler}
          fav_number={fav_number}
          noselection="select anyone:)"
          isload={isload}
          isAddedToFav={isAddedToFav}
        />
      </div>
    </div>
  );
}

export default App;
