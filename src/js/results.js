const results = (function () {
  if (document.querySelector(".js-search-results")) {
    const searchResultsContainer = document.querySelector(".js-search-results");

    function populateData(data) {
      let htmlToAppend;
      data.docs.forEach((item) => {
        htmlToAppend += `<h3 class='book-title'>${item.title}</h3>`;
      });

      searchResultsContainer.innerHTML = htmlToAppend;
    }

    events.on("searchDataChange", populateData);
  }
})();
