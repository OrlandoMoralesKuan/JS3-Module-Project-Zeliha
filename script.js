function generateEpisodeCode(season, number) {
  return `S${season.toString().padStart(2, "0")}E${number
    .toString()
    .padStart(2, "0")}`;
}

function renderAllEpisodes() {
  const episodes = getAllEpisodes();
  const root = document.getElementById("root");

  const searchContainer = document.createElement("div");
  searchContainer.innerHTML = `<input type="text" id="search-input" placeholder="Search episodes..." />
<span id="episode-count"></span>`;

  document.body.insertBefore(searchContainer, root);

  function renderEpisodes(episodesToRender) {
    root.innerHTML = "";

    episodesToRender.forEach((episode) => {
      const episodeTemplate = document
        .getElementById("episode-template")
        .content.cloneNode(true);

      const episodeName = episodeTemplate.querySelector(".episode-name");
      episodeName.textContent = `${episode.name} - ${generateEpisodeCode(
        episode.season,
        episode.number
      )}`;

      const episodeImage = episodeTemplate.querySelector(".episode-image");
      episodeImage.src = episode.image.medium;
      episodeImage.alt = episode.name;

      const episodeSummary = episodeTemplate.querySelector(".episode-summary");
      episodeSummary.innerHTML = episode.summary;

      root.appendChild(episodeTemplate);
    });

    const episodeCount = document.getElementById("episode-count");
    episodeCount.innerText = `Total Episodes: ${episodesToRender.length}`;
  }

  renderEpisodes(episodes);

  function filterEpisodes() {
    const searchTerm = document.getElementById("search-input").value;
    const filteredEpisodes = episodes.filter((episode) => {
      const summary = episode.summary.toLowerCase();
      const name = episode.name.toLowerCase();
      const search = searchTerm.toLowerCase();
      return summary.includes(search) || name.includes(search);
    });
    return filteredEpisodes;
  }

  function updateDisplayedEpisodes() {
    const filteredEpisodes = filterEpisodes();
    renderEpisodes(filteredEpisodes);
  }

  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("input", updateDisplayedEpisodes);

  function addFooter() {
    const footer = document.createElement("footer");
    const attributionText = document.createTextNode("Data provided by ");
    const tvmazeLink = document.createElement("a");
    tvmazeLink.href = "https://www.tvmaze.com/";

    tvmazeLink.textContent = "TVMaze.com";
    tvmazeLink.target = "_blank";

    footer.appendChild(attributionText);
    footer.appendChild(tvmazeLink);
    document.body.appendChild(footer);
  }

  addFooter();
}

renderAllEpisodes();
