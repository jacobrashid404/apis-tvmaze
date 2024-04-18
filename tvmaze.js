const TVMAZE_BASE_URL = "http://api.tvmaze.com";
const DEFAULT_IMG_URL = "https://tinyurl.com/tv-missing";

/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */


async function getShowsByTerm(searchTerm) {
  const searchParams = new URLSearchParams({ q: searchTerm });
  const response = await fetch(`${TVMAZE_BASE_URL}/search/shows?${searchParams}`);
  const shows = await response.json();

  return shows.map(showAndScore => {
    return {
      id: showAndScore.show.id,
      name: showAndScore.show.name,
      summary: showAndScore.show.summary,
      image: (showAndScore.show.image === null)
        ? DEFAULT_IMG_URL
        : showAndScore.show.image.medium
    };
  });
}

/** Given a show ID, get from API and return (promise) array of episodes:
   *      { id, name, season, number }
   */
async function getEpisodesOfShow(id) {
  const response = await fetch(`${TVMAZE_BASE_URL}/shows/${id}/episodes`);
  const episodeData = await response.json();

  return episodeData.map(episode => {
    return {
      id: episode.id,
      name: episode.name,
      season: episode.season,
      number: episode.number
    };
  });
}

// ADD: other functions that will be useful for getting episode/show data

export { getShowsByTerm, getEpisodesOfShow };