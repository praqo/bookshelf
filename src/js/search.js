const search = (function () {
  if (document.querySelector(".js-book-search")) {
    const bookSearchForm = document.querySelector(".js-book-search");
    const bookSearchInput = document.querySelector("#bookSearch");

    const apiUrl = "http://openlibrary.org/search.json?q=";

    async function fetchData(url) {
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        events.emit("searchDataChange", data);
      } catch (error) {
        console.error(error);
      }
    }

    function searchBooks(e) {
      e.preventDefault();

      const searchValue = bookSearchInput.value.replace(/ /g, "+");
      const data = fetchData(apiUrl + searchValue);
    }

    bookSearchForm.addEventListener("submit", searchBooks);
  }
})();
