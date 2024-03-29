const results = (function () {
  if (document.querySelector(".js-results")) {
    const body = document.querySelector("body");
    const resultsContainer = document.querySelector(".js-results");
    let userData = userDataFunctions.getUserData();

    function updateButton(buttonClicked, isAdding) {
      if (isAdding) {
        buttonClicked.innerText = "Remove from bookshelf";
        buttonClicked.classList.remove("add-button");
        buttonClicked.classList.add("remove-button");
        buttonClicked.removeEventListener("click", emitAddBook);
        buttonClicked.addEventListener("click", emitRemoveBook);
      } else {
        buttonClicked.innerText = "Add to bookshelf";

        buttonClicked.classList.remove("remove-button");
        buttonClicked.classList.add("add-button");
        buttonClicked.removeEventListener("click", emitRemoveBook);
        buttonClicked.addEventListener("click", emitAddBook);
      }
    }

    function emitRemoveBook(e) {
      const buttonClicked = e.currentTarget;
      const parentEl = e.currentTarget.parentNode.parentNode.parentNode;
      console.log("removing");
      updateButton(buttonClicked, false);

      events.emit("removeBook", parentEl.dataset.bookid);
    }

    function emitAddBook(e) {
      console.log("adding");
      const buttonClicked = e.currentTarget;
      const parentEl = e.currentTarget.parentNode.parentNode.parentNode;
      const bookInfo = {
        id: parentEl.dataset.bookid,
        title: parentEl.dataset.booktitle,
        author: parentEl.dataset.bookauthor,
        cover: parentEl.dataset.bookcover,
      };

      updateButton(buttonClicked, true);

      events.emit("addBook", bookInfo);
    }

    function populateData(data) {
      console.log(data)
      let htmlToAppend = "";
      data.docs.forEach((item) => {
        const itemInfo = {
          id: item.key.slice(7),
          title: item.title,
          author: `${item.author_name ? item.author_name[0] : ""}`,
          cover: `${
            item.cover_edition_key
              ? `https://covers.openlibrary.org/b/olid/${item.cover_edition_key}-L.jpg`
              : "https://openlibrary.org/images/icons/avatar_book-lg.png"
          }`,
        };
        htmlToAppend += createBookEl(itemInfo);
      });

      resultsContainer.innerHTML = htmlToAppend;

      document.querySelectorAll(".js-addRemovebook").forEach((item) => {
        if (item.classList.contains("add-button")) {
          item.addEventListener("click", emitAddBook);
        } else {
          item.addEventListener("click", emitRemoveBook);
        }
      });

      events.emit('pageChange', 'results');
    }

    function createBookEl(item) {
      return `<div
            class="grid-item"><a class="book-wrapper" data-bookid="${
              item.id
            }" data-booktitle="${item.title}" data-bookauthor="${
        item.author
      }" data-bookcover="${item.cover}">
        <div class="book-image-container">
          <div
            class="book-image"
            style="
              background-image: url(${item.cover});
            "
          ></div>
        </div>
        <div class="book-info">
          <h3 class="book-title">${item.title}<br />${item.author}</h3>
          <div class="book-subtitle">
          </div>
          <div class="book-details">${
            userData.bookIdArr.includes(item.id)
              ? `<button class="js-addRemovebook remove-button">Remove from bookshelf</button>`
              : `<button class="js-addRemovebook add-button">Add to bookshelf</button>`
          }</div>
          <time class="book-id">${item.id}</time>
        </div>
      </a>
      </div>`;
    }

    function updateUserData(data) {
      userData = data;
    }

    events.on("searchDataChange", populateData);
    events.on("userDataChange", updateUserData);

    return {
      createBookEl,
    };
  }
})();
