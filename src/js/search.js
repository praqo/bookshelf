const search = (function () {
  if (document.querySelectorAll(".js-book-search")) {
    const body = document.querySelector("body");
    const bookSearchForm = document.querySelectorAll(".js-book-search");
    const bookSearchInput = document.querySelector("#bookSearch");

    const apiUrl = "https://openlibrary.org/search.json?q=";

    async function fetchData(url) {
      pageStateChange("search");
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        events.emit("searchDataChange", data);
      } catch (error) {
        console.error(error);
        alert("Error please try again later");
        pageStateChange("home");
      }
    }

    function searchBooks(e) {
      e.preventDefault();
      const searchInput = e.target.querySelector("input");
      if (!searchInput.value.replace(/ /g, "")) {
        return;
      }
      const searchValue = searchInput.value.replace(/ /g, "+");
      const data = fetchData(apiUrl + searchValue);

      console.log("searching...");
      searchInput.value = "";
    }

    function pageStateChange(page) {
      const pagesArray = ["home", "search", "results", "bookshelf"];

      if (page === "search") {
        window.scrollTo(0, 0);
        body.classList.add("search");
        return;
      }

      pagesArray.forEach((item) => {
        if (item !== page) {
          body.classList.remove(item);
        } else {
          body.classList.add(item);
        }
      });
    }

    bookSearchForm.forEach((item) =>
      item.addEventListener("submit", searchBooks)
    );

    return {
      pageStateChange,
    };
  }
})();
