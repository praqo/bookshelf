const bookshelf = (function () {
  if (document.querySelector(".js-results")) {
    const bookshelfLink = document.querySelector('[data-pageLink="bookshelf"]');
    const homeLinks = document.querySelectorAll('[data-pageLink="home"]');
    const bookshelfArea = document.querySelector(".js-bookshelfArea");
    let userData = userDataFunctions.userData;

    function emitRemoveBook(e) {
      const buttonClicked = e.currentTarget;
      const parentEl =
        buttonClicked.parentNode.parentNode.parentNode.parentNode;

      bookshelfArea.removeChild(parentEl);

      events.emit(
        "removeBook",
        buttonClicked.parentNode.parentNode.parentNode.dataset.bookid
      );

      if (userData.booksData.length <= 0) {
        emptyBookshelf();
      }
    }

    function emptyBookshelf() {
      bookshelfArea.innerHTML = `<div class="container text-center">
  <p>Your bookshelf is empty</p>
  <img
              class="hero-image"
              src="dist/images/bookshelf.png"
              alt="a bookshelf"
            />
</div>`;
    }

    function populateData(data) {
      let htmlToAppend = "";

      if (data.length <= 0) {
        emptyBookshelf();
      } else {
        data.forEach((item) => {
          htmlToAppend += results.createBookEl(item);
        });

        bookshelfArea.innerHTML = htmlToAppend;

        document.querySelectorAll(".js-addRemovebook").forEach((item) => {
          item.addEventListener("click", emitRemoveBook);
        });
      }
      
      events.emit('pageChange', 'bookshelf');
    }
    bookshelfLink.addEventListener("click", (e) => {
      e.preventDefault();
      populateData(userData.booksData);
    });

    homeLinks.forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        
        events.emit('pageChange', 'home');
      });
    });

    function updateUserData(data) {
      userData = data;
    }

    events.on("userDataChange", updateUserData);
  }
})();
