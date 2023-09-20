const userDataFunctions = (function () {
  let userData = {
    bookIdArr: [],
    booksData: [],
  };

  if (!localStorage.hasOwnProperty("bookshelfApp")) {
    updateLocalStorage();
  } else {
    userData = JSON.parse(localStorage.getItem("bookshelfApp"));
  }

  function updateLocalStorage() {
    localStorage.setItem("bookshelfApp", JSON.stringify(userData));
    events.emit("userDataChange", userData);
  }

  function addBook(bookInfo) {
    userData = {
      ...userData,
      bookIdArr: [...userData.bookIdArr, bookInfo.id],
      booksData: [...userData.booksData, bookInfo],
    };

    console.log(userData);

    updateLocalStorage();
  }

  function removeBook(bookId) {
    userData = {
      ...userData,
      bookIdArr: userData.bookIdArr.filter((item) => item !== bookId),
      booksData: userData.booksData.filter((item) => item.id !== bookId),
    };
    updateLocalStorage();
  }

  events.on("addBook", addBook);
  events.on("removeBook", removeBook);

  return {
    userData,
  };
})();
