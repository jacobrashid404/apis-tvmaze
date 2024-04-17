import { getShowsByTerm, TVMAZE_BASE_URL } from "./tvmaze.js";

const $showsList = document.querySelector("#showsList");
const $episodesArea = document.querySelector("#episodesArea");
const $episodesList = document.querySelector("#episodesList");
const $searchForm = document.querySelector("#searchForm");

/** Given list of shows, create markup for each and append to DOM.
 *
 * A show is {id, name, summary, image}
 * */

function displayShows(shows) {
  $showsList.innerHTML = '';

  for (const show of shows) {

    const $show = document.createElement("div");
    $show.dataset.showId = show.id;
    $show.className = "Show col-md-12 col-lg-6 mb-4";

    $show.innerHTML = `
         <div class="media">
           <img
              src="${show.image}"
              alt="image for ${show.name}"
              class="w-25 me-3">
           <div class="media-body">
             <h5 class="text-primary">${show.name}</h5>
             <div><small>${show.summary}</small></div>
             <button class="btn btn-outline-light btn-sm Show-getEpisodes">
               Episodes
             </button>
           </div>
         </div>
      `;

    $showsList.appendChild($show);
  }
}

/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */

async function searchShowsAndDisplay() {
  const term = document.querySelector("#searchForm-term").value;
  const shows = await getShowsByTerm(term);
  // console.log('we arrived here and we got: ', shows);

  $episodesArea.style.display = "none";
  displayShows(shows);
  addButtonEventListeners();
}


/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

async function getEpisodesOfShow(id) {
  const response = await fetch(`${TVMAZE_BASE_URL}/shows/${id}/episodes`);
  const episodes = await response.json();

  return episodes.map(episode => {
    return {
      id: episode.id,
      name: episode.name,
      season: episode.season,
      number: episode.number
    };
  });
}

/** Given list of episodes, create markup for each and append to DOM.
 *
 * A episode is {id, name, season, number}
 * */

function displayEpisodes(episodes) {
  $episodesList.innerHTML = '';

  for (const episode of episodes) {
    const $episode = document.createElement('li');
    $episode.innerHTML = `
      ${episode.name} (season ${episode.season},
      number ${episode.number})`;
    $episodesList.appendChild($episode);
    console.log($episode);
  }
  $episodesArea.style.display = "block";
}

// add other functions that will be useful / match our structure & design
// and udpate start as necessary


/** Handle episode button press submission: get episodes from API and display.
 */
async function getEpisodesAndDisplay(showID) {
  console.log('arrived at getEpisodesDisplay');

  const episodes = await getEpisodesOfShow(showID);
  displayEpisodes(episodes);

}

/**
 * Attaches event listener to episodes button and shows list of episodes of
 * selected show
 */
function addButtonEventListeners() {
  $showsList.addEventListener('click', async function handleClick(evt) {
    if (!evt.target.matches('.Show-getEpisodes')) {
      return;
    } else {
      //TODO: correct syntax for this - hacky solution
      const showId = evt.target.closest(".media").parentNode.dataset.showId;
      console.log('showID: ', showId);
      await getEpisodesAndDisplay(showId);
    }
  });
}




/** Attach event listeners to show search form and show list  */

function start() {
  $searchForm.addEventListener("submit", async function handleSearchForm(evt) {
    evt.preventDefault();
    await searchShowsAndDisplay();
  });

}


export {
  displayShows,
  searchShowsAndDisplay,
  start,
};