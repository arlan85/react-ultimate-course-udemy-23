import { useEffect, useState } from "react";
import apiBaseUrl from "../configs/api";

export function useMovies(query){
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      // callback?.();
      const controller = new AbortController(); //browser API, not from react

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(`${apiBaseUrl}&s=${query}`, {
            signal: controller.signal,
          });

          if (!res.ok) {
            throw new Error("Something went wrong with fetching movies");
          }
          const data = await res.json();

          if (data.Response === "False") {
            throw new Error("Movie not found");
          }
          setMovies(data.Search); // this is not allowed in render logic, infinite loop update state, re-render component
          // console.log(data.Search);
          setError("");
        } catch (error) {
          if (error.name !== "AbortError") {
            setError(error.message);
          }
          console.error(error.message);
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      // handleCloseMovie();
      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );
  return { movies, isLoading, error };
}