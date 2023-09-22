const bookshelf = (function () {
  if (document.querySelector(".js-results")) {
    const bookshelfContainer = document.querySelector(".js-results");
    const bookshelfLink = document.querySelector(".js-bookshelf-link");
    let userData = userDataFunctions.userData;

    function removeElement(elementClicked) {
      bookshelfContainer.removeChild(elementClicked.parentNode);
    }

    function emitRemoveBook(e) {
      const buttonClicked = e.currentTarget;
      const parentEl = buttonClicked.parentNode;

      removeElement(buttonClicked);

      events.emit("removeBook", parentEl.dataset.bookid);
    }

    function populateData(data) {
      let htmlToAppend = "";

      if (data.length <= 0) {
        bookshelfContainer.innerHTML = `<p>Your bookshelf is empty`;
        return;
      }
      data.forEach((item) => {
        htmlToAppend += `<div class='single-book' data-bookid="${item.id}"><h3 class='book-title'>${item.title}</h3>
        <button class="js-addRemovebook remove-button">Remove from bookshelf</button>
        </div>`;
      });

      bookshelfContainer.innerHTML = htmlToAppend;

      document.querySelectorAll(".js-addRemovebook").forEach((item) => {
        item.addEventListener("click", emitRemoveBook);
      });
    }
    bookshelfLink.addEventListener("click", (e) => {
      e.preventDefault();
      populateData(userData.booksData);
    });

    function updateUserData(data) {
      userData = data;
    }

    events.on("userDataChange", updateUserData);
  }
})();
