const bookshelf = (function () {
  if (document.querySelector(".js-results")) {
    const body = document.querySelector("body");
    const bookshelfContainer = document.querySelector(".js-results");
    const bookshelfLink = document.querySelector('[data-pageLink="bookshelf"]');
    let userData = userDataFunctions.userData;

    function emitRemoveBook(e) {
      const buttonClicked = e.currentTarget;
      const parentEl = buttonClicked.parentNode.parentNode.parentNode;
      console.log(bookshelfContainer);

      bookshelfContainer.removeChild(parentEl);

      events.emit("removeBook", parentEl.dataset.bookid);
    }

    function populateData(data) {
      let htmlToAppend = "";

      if (data.length <= 0) {
        bookshelfContainer.innerHTML = `<p>Your bookshelf is empty`;
        return;
      }
      data.forEach((item) => {
        htmlToAppend += results.createBookEl(item);
      });

      bookshelfContainer.innerHTML = htmlToAppend;

      document.querySelectorAll(".js-addRemovebook").forEach((item) => {
        item.addEventListener("click", emitRemoveBook);
      });
      search.pageStateChange("bookshelf");
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
