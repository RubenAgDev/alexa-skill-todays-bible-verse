const Axios = require("axios");
const jsdom = require("jsdom");

const { JSDOM } = jsdom;

const { BIBLE_BOOKS, BIBLE_BASE_URL } = require("./constants");

const getBibleVerse = async () => {
    const bookNumber = Math.floor(Math.random() * BIBLE_BOOKS.length);
    const book = BIBLE_BOOKS[bookNumber];
    const chapter = Math.ceil(Math.random() * 10);

    const url = `${BIBLE_BASE_URL}${bookNumber + 40}_${book}_${chapter}.htm`;
    
    const response = await Axios.get(url);
    const chapterDOM = new JSDOM(response.data);
    const verse = Math.ceil(Math.random() * 10);
    const pId = `#${book.substring(0, 3)}${chapter}-${verse}`;
    const verseHtml = chapterDOM.window.document.querySelector(pId);
    const text = `
        ${book.substring(0)} ${chapter} ${verse}
        ${verseHtml.lastChild.textContent}
    `;

    return text;
};

getBibleVerse().then(value => {
    console.log(value);
}).catch(error => {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.error(error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error", error.message);
    }
});
