import { useEffect, useRef, useState } from "react";
import StartRating from "./components/StartRating";
import apiBaseUrl from "./configs/api";
import { useKey } from "./hooks/useKey";
import { useLocalStorageState } from "./hooks/useLocalStorage";
import { useMovies } from "./hooks/useMovies";

const average = (arr, fixed = 2) => {
  const avg = arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
  const formattedAvg = avg.toFixed(fixed);
  return formattedAvg;
};

function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo></Logo>
      {children}
    </nav>
  );
}

function Search({ query, setQuery }) {
  // this is not the react way to doing this kinda thing.
  // React is declarative, not recommended to manually select elements like this.
  // useEffect(
  //   function () {
  //     const searchElem = document.querySelector('.search');
  //     console.log(searchElem)
  //     searchElem.focus();
  //   },
  //   []
  // );

  const searchInput = useRef(null);

  useKey("Enter", function (e) {
    if (document.activeElement === searchInput.current) {
      return;
    }
    searchInput.current.focus();
    setQuery("");
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={searchInput}
    />
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

// 114 passing elements as props alternative to children
// function Box({ element }) {
//   const [isOpen, setIsOpen] = useState(true);

//   return (
//     <div className="box">
//       <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
//         {isOpen ? "–" : "+"}
//       </button>
//       {isOpen && element}
//     </div>
//   );
// }

function MovieList({ movies, onSelectMovie, onCloseMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie
          key={movie.imdbID}
          movie={movie}
          onSelectMovie={onSelectMovie}
          onCloseMovie={onCloseMovie}
        ></Movie>
      ))}
    </ul>
  );
}

function Movie({ movie, onSelectMovie }) {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  // const avgRuntime = average(watched.map((movie) => movie.runtime), 0);
  // runtime should not be an average, it should be the total watched time from all movies watched
  const avgRuntime = watched
    .map((movie) => movie.runtime)
    .reduce((acc, cur) => acc + cur, 0);

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMovieList({ watched, onDeletWatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          key={movie.imdbID}
          movie={movie}
          onDeletWatched={onDeletWatched}
        ></WatchedMovie>
      ))}
    </ul>
  );
}

function WatchedMovie({ movie, onDeletWatched }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button
          className="btn-delete"
          onClick={() => onDeletWatched(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>⛔️</span> {message}
    </p>
  );
}

function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState({});
  const [error, setError] = useState("");
  const [userRating, setUserRating] = useState(0);
  const countRef = useRef(0);

  useEffect(
    function () {
      if (userRating) countRef.current++;
    },
    [userRating]
  );

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);

  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  // if(imdbRating > 8) {
  //   const [isTop, setIsTop] = useState(true)
  // }
  // if (imdbRating > 8) {
  //   return <p>Greatest ever!</p>
  // }

  // const [isTop, setIsTop] = useState(imdbRating > 8)
  // console.log(isTop)

  // useEffect(() => {
  //   if (imdbRating > 8) {
  //     setIsTop(true)
  //   }
  // }, [imdbRating])

  //best way is to use a derived state
  const isTop = imdbRating > 8;
  console.log(isTop);

  // const [avgRating, setAvgRating] = useState(0);

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating: userRating,
      countRatingDecisions: countRef.current,
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
    // this will not work to update because they are async actions
    // setAvgRating(Number(imdbRating));
    // alert(avgRating)
    // setAvgRating((avgRating + imdbRating) / 2);

    // correct way to update a state using a function
    // setAvgRating(avgRating =>(userRating + avgRating) / 2)
  }

  useEffect(
    function () {
      async function getMovieDetails() {
        try {
          setLoading(true);
          setError("");
          const res = await fetch(`${apiBaseUrl}&i=${selectedId}`);
          const data = await res.json();
          setMovie(data);
          setLoading(false);
        } catch (error) {
          setError(error.message);
          console.error(error.message);
        } finally {
          setLoading(false);
        }
      }
      getMovieDetails();
    },
    [selectedId]
  );

  useKey("Escape", onCloseMovie);

  // useEffect(
  //   function () {
  //     function callback(e) {
  //       if (e.key === "Escape") {
  //         onCloseMovie();
  //         console.log("CLOSING");
  //       }
  //     }

  //     document.addEventListener("keydown", callback);
  //     return function () {
  //       document.removeEventListener("keydown", callback);
  //     };
  //   },
  //   [onCloseMovie]
  // );

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      //cleaning up
      return function () {
        document.title = "usePopcorn App";
        // console.log(`clean up effect for movie ${title}`)
      };
    },
    [title]
  );

  return (
    <div className="details">
      {error && <ErrorMessage message={error}></ErrorMessage>}
      {loading && <Loader></Loader>}
      {!loading && !error && (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`${title} poster`} />
            <div className="details-overview">
              <h2>
                {year} - {title}
              </h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDB rating
              </p>
            </div>
          </header>
          {/* <p>{avgRating}</p> */}
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StartRating
                    maxRate={10}
                    size={24}
                    onSetRating={setUserRating}
                  ></StartRating>

                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to watched list{" "}
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated this movie with {watchedUserRating} <span>🌟</span>
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState("");

  const { movies, isLoading, error } = useMovies(query);

  const [watched, setWatched] = useLocalStorageState([], "watched");

  // useEffect(function(){
  //   console.log('After initial render')
  // },[])

  // useEffect(function(){
  //   console.log('After every render')
  // },)

  // useEffect(function(){
  //   console.log('D')
  // },[query] )

  function handleSelectedMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  // 152
  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
    // 163
    // localStorage.setItem("watched", JSON.stringify([...watched, movie]));
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  // setWatched([]) // this generates an error too , because generates a loop

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies}></NumResults>
      </NavBar>

      <Main>
        {/* // 114
        <Box element={<MovieList movies={movies}></MovieList>}/>
        <Box element={
          <>
            <WatchedSummary watched={watched} />
            <WatchedMovieList watched={watched} />
          </>
        }/> */}
        <Box>
          {/* {isLoading? <Loader></Loader>: <MovieList movies={movies}></MovieList>} */}
          {/* the next coditionals are mutually eclusive, that's why you can use it in this kinda way, 
            they will not make structure collitions*/}
          {isLoading && <Loader></Loader>}
          {!isLoading && !error && (
            <MovieList
              movies={movies}
              onSelectMovie={handleSelectedMovie}
            ></MovieList>
          )}
          {error && <ErrorMessage message={error}></ErrorMessage>}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            ></MovieDetails>
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeletWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
