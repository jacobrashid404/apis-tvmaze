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


  // {
  //   id: 1767,
  //   name: "The Bletchley Circle",
  //   summary:
  //     `<p><b>The Bletchley Circle</b> follows the journey of four ordinary
  //        women with extraordinary skills that helped to end World War II.</p>
  //      <p>Set in 1952, Susan, Millie, Lucy and Jean have returned to their
  //        normal lives, modestly setting aside the part they played in
  //        producing crucial intelligence, which helped the Allies to victory
  //        and shortened the war. When Susan discovers a hidden code behind an
  //        unsolved murder she is met by skepticism from the police. She
  //        quickly realises she can only begin to crack the murders and bring
  //        the culprit to justice with her former friends.</p>`,
  //   image:
  //     "http://static.tvmaze.com/uploads/images/medium_portrait/147/369403.jpg"
  // }

}


// ADD: other functions that will be useful for getting episode/show data

export { getShowsByTerm };