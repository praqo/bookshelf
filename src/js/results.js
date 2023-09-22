const results = (function () {
  if (document.querySelector(".js-results")) {
    const resultsContainer = document.querySelector(".js-results");
    let userData = userDataFunctions.userData;

    function updateButton(buttonClicked, isAdding) {
      if (isAdding) {
        buttonClicked.innerText = "Remove from bookshelf";
      } else {
        buttonClicked.innerText = "Add to bookshelf";
      }
    }

    function emitRemoveBook(e) {
      const buttonClicked = e.currentTarget;
      const parentEl = e.currentTarget.parentNode;

      updateButton(buttonClicked, false);

      events.emit("removeBook", parentEl.dataset.bookid);
    }

    function emitAddBook(e) {
      const buttonClicked = e.currentTarget;
      const parentEl = e.currentTarget.parentNode;
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
      let htmlToAppend = "";
      console.log(htmlToAppend);
      data.docs.forEach((item) => {
        htmlToAppend += `<div class='single-book' data-bookid="${item.key.slice(
          7
        )}" data-booktitle="${item.title}" data-bookauthor="${
          item.author_name ? item.author_name[0] : ""
        }" data-bookcover="${
          item.cover_edition_key ? item.cover_edition_key : "default.jpg"
        }"><h3 class='book-title'>${item.title}</h3>
        ${
          userData.bookIdArr.includes(item.key.slice(7))
            ? `<button class="js-addRemovebook remove-button">Remove from bookshelf</button>`
            : `<button class="js-addRemovebook add-button">Add to bookshelf</button>`
        }
        </div>`;
      });

      resultsContainer.innerHTML = htmlToAppend;

      document.querySelectorAll(".js-addRemovebook").forEach((item) => {
        if (item.classList.contains("add-button")) {
          item.addEventListener("click", emitAddBook);
        } else {
          item.addEventListener("click", emitRemoveBook);
        }
      });
    }

    function updateUserData(data) {
      userData = data;
    }

    events.on("searchDataChange", populateData);
    events.on("userDataChange", updateUserData);
  }
})();
