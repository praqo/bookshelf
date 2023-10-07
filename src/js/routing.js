const routing = (function() {
    const body = document.querySelector("body");

    function pageStateChange(page) {
        const pagesArray = ["home", "search", "results", "bookshelf"];
//   console.log(`${page} pagestatchange function`)
        window.scrollTo(0, 0);
  
        pagesArray.forEach((item) => {
          if (item !== page) {
            body.classList.remove(item);
          } else {
            body.classList.add(item);
          }
        });
      }

    function parseURL() {
        const href = (window.location.href).slice((window.location.href).indexOf('/#/'));
 const pageName = href.slice(3).slice(0, href.slice(3).indexOf('/'));
// console.log(href.slice(3))
            const data = {
                page: pageName,
                searchQuery: pageName === 'search' ? href.slice(href.indexOf('/search/') + 8) : null,
                bookID: pageName === 'book' ? href.slice(href.indexOf('/book/') + 6) : null
            };

            
            // console.log(data);

            return data;
    }

    function routePage(pageName) {

        if(pageName === 'home') {
            console.log('pushing homelink')
            events.emit('pageChange', 'home');
            return;
        }

        const pageInfo = parseURL();

        if(pageInfo.page === 'mybookshelf' || 'mybookshel') {
            events.emit('mybookshelf', userDataFunctions.userData.booksData);
        }

        if(pageInfo.page === 'search') {
            events.emit('searchData', pageInfo.searchQuery)
        }
    }

    window.addEventListener('DOMContentLoaded', function() {
        if(window.location.href.includes('/#/')) {
            routePage();
        }

        console.log('DOMContentLoaded')
    });

    function addURL(pageInfo) {
        console.log(`${window.location.origin + window.location.pathname}`)
        history.pushState({}, '', `${window.location.origin + window.location.pathname}#/${pageInfo.page}/${pageInfo.query}`);

        routePage(pageInfo);
    }

    window.addEventListener('hashchange', function() {
        console.log('hashchange')

        if(((window.location.origin + window.location.pathname) === window.location.href) ||((window.location.origin + window.location.pathname + '#/') === window.location.href)) {
            console.log('going home')
            routePage('home');

            return;
        }

        if(window.location.href.includes('/#/')) {
            console.log('routing')
            routePage();

            return;
        }
    });

    events.on('urlChange', routePage);
    events.on('pageChange', pageStateChange);
    events.on('addURL', addURL);
})();