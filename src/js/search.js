const search = (function () {
  if (document.querySelectorAll(".js-book-search")) {
    const bookSearchForm = document.querySelectorAll(".js-book-search");
    const bookSearchInput = document.querySelector("#bookSearch");

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

      events.emit('addURL', {
        page: 'search',
        query: searchValue
      });
    }

    function fetchBooks(bookQuery) {
      const apiUrl = "https://openlibrary.org/search.json?q=";
      fetchData(apiUrl + bookQuery);
    }

    

    bookSearchForm.forEach((item) =>
      item.addEventListener("submit", searchBooks)
    );

    events.on('searchData', fetchBooks);
  }
})();
