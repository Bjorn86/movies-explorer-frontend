// IMPORT METHODS
import { makeRequest } from "./utils";

// IMPORT VARIABLES
import { MOVIES_API_URL } from "./constants";

// GET ALL MOVIES
export function getCards() {
  return makeRequest(MOVIES_API_URL, "/beatfilm-movies", "GET");
}
