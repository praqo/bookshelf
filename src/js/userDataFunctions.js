const userDataFunctions = (function () {
  let userData = {
    booksData: [],
  };

  if (!localStorage.hasOwnProperty("bookshelfApp")) {
    updateLocalStorage();
  } else {
    userData = JSON.parse(localStorage.getItem("bookshelf"));
  }

  function updateLocalStorage() {
    localStorage.setItem("bookshelfApp", JSON.stringify(userData));
    events.emit("userDataChange", userData);
  }

  function addBook(bookInfo) {
    alert(bookInfo);
  }

  function removeBook(bookId) {
    const newBooksData = userData.booksdata.filter(
      (item) => item.id !== bookId
    );
    userData = { ...userData, booksData: newBooksData };

    updateLocalStorage();
  }

  events.on("addBook", addBook);
  events.on("removeBook", removeBook);
})();
