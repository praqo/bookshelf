const results = (function () {
  if (document.querySelector(".js-search-results")) {
    const searchResultsContainer = document.querySelector(".js-search-results");

    function emitAddBook(e) {
      const parentEl = e.currentTarget.parentNode;
      const bookInfo = {
        id: parentEl.dataset.bookid,
        title: parentEl.dataset.booktitle,
        author: parentEl.dataset.bookauthor,
        cover: parentEl.dataset.bookcover,
      };

      events.emit("addBook", bookInfo);
    }

    function populateData(data) {
      let htmlToAppend;
      data.docs.forEach((item) => {
        htmlToAppend += `<div class='single-book' data-bookid="${item.key.slice(
          7
        )}" data-booktitle="${item.title}" data-bookauthor="${
          item.author_name ? item.author_name[0] : ""
        }" data-bookcover="${
          item.cover_edition_key ? item.cover_edition_key : "default.jpg"
        }"><h3 class='book-title'>${item.title}</h3>
        <button class="js-addRemovebook">add to bookshelf</button>
        </div>`;
      });

      searchResultsContainer.innerHTML = htmlToAppend;

      document
        .querySelectorAll(".book-title")
        .forEach((item) => item.addEventListener("click", emitAddBook));

      document
        .querySelectorAll(".js-addRemovebook")
        .forEach((item) => item.addEventListener("click", emitAddBook));
    }

    events.on("searchDataChange", populateData);
  }
})();
