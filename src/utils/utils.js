// IMPORT VARIABLES
import { SHORT_MOVIE } from "./constants";

// MAKE REQUEST TO THE SERVER
export function makeRequest(url, endpoint, method, credentials, body) {
  const headers = { "Content-Type": "application/json" };
  const config = { method, headers };
  if (credentials) {
    config.credentials = "include";
  }
  if (body !== undefined) {
    config.body = JSON.stringify(body);
  }
  return fetch(`${url}${endpoint}`, config).then((res) => {
    const result = res.json();
    return res.ok
      ? result
      : result.then((err) => Promise.reject(`${err.message}`));
  });
}

// CONVERT DURATION
export function convertDuration(duration) {
  const minutes = duration % 60;
  const hours = (duration - minutes) / 60;
  if (hours < 1) {
    return `${minutes}м`;
  } else {
    return `${hours}ч ${minutes}м`;
  }
}

// MOVIE FILTERING HANDLER
export function handleMovieFiltering(movies, isFilterOn, isSavedMovies) {
  if (!isSavedMovies) {
    localStorage.setItem("isMoviesFilterOn", isFilterOn);
  } else {
    localStorage.setItem("isSavedMoviesFilterOn", isFilterOn);
  }
  if (isFilterOn) {
    const result = movies.filter((movie) => movie.duration <= SHORT_MOVIE);
    return result;
  } else {
    return movies;
  }
}

// MOVIE SEARCH HANDLER
export function handleMovieSearch(movies, searchQuery, isSavedMovies) {
  const normalizeSearchQuery = searchQuery.toLowerCase().trim();
  const result = movies.filter((movie) => {
    const normalizeNameRu = movie.nameRU.toLowerCase().trim();
    const normalizeNameEn = movie.nameEN.toLowerCase().trim();
    return (
      normalizeNameRu.includes(normalizeSearchQuery) ||
      normalizeNameEn.includes(normalizeSearchQuery)
    );
  });
  if (!isSavedMovies) {
    localStorage.setItem("foundMovies", JSON.stringify(result));
    localStorage.setItem("moviesSearchQuery", normalizeSearchQuery);
  } else {
    localStorage.setItem("savedMoviesSearchQuery", normalizeSearchQuery);
  }
  return result;
}

// HANDLER SAVED STATUS
export function handleSavedStatus(savedCards, movieCard) {
  return savedCards.find((card) => {
    return card.movieId === (movieCard.id || movieCard.movieId);
  });
}

// HANDLER SMOOTH SCROLL EFFECT
export function handleScrollEffect(targetRef) {
  targetRef.current.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}
