const results = (function () {
  if (document.querySelector(".js-search-results")) {
    const searchResultsContainer = document.querySelector(".js-search-results");

    function emitAddBook(e) {
      console.log(e.currentTarget.dataset.bookid);
      events.emit("addBook", e.currentTarget.dataset.bookid);
    }

    function populateData(data) {
      let htmlToAppend;
      data.docs.forEach((item) => {
        htmlToAppend += `<h3 class='book-title' data-bookid=${item.key}>${item.title}</h3>`;
      });

      searchResultsContainer.innerHTML = htmlToAppend;

      document
        .querySelectorAll(".book-title")
        .forEach((item) => item.addEventListener("click", emitAddBook));
    }

    events.on("searchDataChange", populateData);
  }
})();
