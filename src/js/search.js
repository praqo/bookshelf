const search = (function () {
  if (document.querySelectorAll(".js-book-search")) {
    const bookSearchForm = document.querySelectorAll(".js-book-search");
    const bookSearchInput = document.querySelector("#bookSearch");

    const apiUrl = "https://openlibrary.org/search.json?q=";

    async function fetchData(url) {
      events.emit('pageChange', "search");
      try {
        const response = await fetch(url);
        const data = await response.json();

        events.emit("searchDataChange", data);
      } catch (error) {
        console.error(error);
        alert("Error please try again later");
        events.emit('pageChange', "home");
      }
    }

    function searchBooks(e) {
      e.preventDefault();
      const searchInput = e.target.querySelector("input");
      if (!searchInput.value.replace(/ /g, "")) {
        return;
      }
      const searchValue = searchInput.value.replace(/ /g, "+");

      console.log("searching...");
      searchInput.value = "";

      events.emit('searchData', apiUrl + searchValue)
    }

    

    bookSearchForm.forEach((item) =>
      item.addEventListener("submit", searchBooks)
    );

    events.on('searchData', fetchData);
  }
})();
