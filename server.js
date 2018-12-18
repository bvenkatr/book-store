/*
 * Server file which handles all the incoming requests and returns the response
 *
 * Primary file for API
 *
 */

const http = require("http");
const fs = require("fs");
const url = require("url");
const StringDecoder = require('string_decoder').StringDecoder;
const config = require("./config");
const path = require("path");

//Create an HTTP tunneling proxy
const httpServerPropxy = http.createServer((req, res) => {
    unifiedHandler(req, res);
});

httpServerPropxy.listen(config.httpPort, () => {
    var addr = httpServerPropxy.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('Listening on ' + bind);
});

// This is a common code used for handling http and https requests
const unifiedHandler = (req, res) => {

    // parse the url
    let parsedUrl = url.parse(req.url, true);

    // Get the path
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, "");

    // Get the query string as an object
    queryStringObject = parsedUrl.query;

    // Get the HTTP method
    let method = req.method.toLowerCase();

    // Get the HTTP headers as an object
    let headers = req.headers;

    let decoder = new StringDecoder("utf-8");
    let buffer = "";

    // Listen for incoming payload and process it
    req.on('data', function (data) {
        buffer += decoder.write(data);
    });

    req.on('end', () => {
        buffer += decoder.end();

        const chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFoundHandler;

        let data = {
            path: trimmedPath,
            method: method,
            queryStringObject: queryStringObject,
            headers: headers,
            payload: buffer
        };
        chosenHandler(data, (err, data) => {
            res.setHeader('Content-Type', 'application/json');
            if (err) {
                // Need to use the proper status codes
                res.writeHead(409);
            }
            res.end(JSON.stringify(data));
        });
    });
};

const handlers = {};

handlers.notFoundHandler = (data, callback) => {
    callback(404, "Not Found");
};

handlers.books = {};

/**
 * create a book in the store
 * @param data {name: "", author: "", isbn: ""}
 * @param callback
 */
handlers.books.post = (data, callback) => {
    let payloadData = JSON.parse(data.payload);
    let bookStore;
    try {
        bookStore = fs.readFileSync(path.join(__dirname, "./persistent-book-store.json"), 'utf8');
        bookStore = JSON.parse(bookStore);
    } catch (e) {
        callback(e, null)
    }

    //Search the book store if there is already a book with the given isbn number
    if (payloadData.isbn && !bookStore.books[payloadData.isbn]) {
        // Add the book to bookStore
        bookStore.books[payloadData.isbn] = {
            name: payloadData.name,
            author: payloadData.author
        };
        try {
            let err = fs.writeFileSync(path.join(__dirname, "./persistent-book-store.json"), JSON.stringify(bookStore));
            if (!err) {
                callback(null, "Successfully added the book to the store");
            } else {
                callback(err, null);
            }
        } catch (e) {
            callback(e, null);
        }
    } else {
        callback(null, "There is already a book with the given isbn");
    }
};

handlers.books.get = (data, callback) => {
    let bookStore;
    try {
        bookStore = fs.readFileSync(path.join(__dirname, "./persistent-book-store.json"), 'utf8');
        bookStore = JSON.parse(bookStore);
    } catch (e) {
        callback(e, null)
        return;
    }

    callback(null, bookStore.books)
};

handlers.books.delete = (data, callback) => {

    let isbn = data.queryStringObject.isbn;
    let bookStore;
    try {
        bookStore = fs.readFileSync(path.join(__dirname, "./persistent-book-store.json"), 'utf8');
        bookStore = JSON.parse(bookStore);
    } catch (e) {
        callback(e, null)
    }

    if (!bookStore.books[isbn]) {
        callback(null, "Given id didn't exist in datastore");
        return;
    } else {
        delete bookStore.books[isbn];
    }

    try {
        let err = fs.writeFileSync(path.join(__dirname, "./persistent-book-store.json"), JSON.stringify(bookStore));
        if (!err) {
            callback(null, "Successfully deleted the book to the store");
            return;
        } else {
            callback(err, null);
            return;
        }
    } catch (e) {
        callback(e, null);
        return;
    }
};

const router = {};
router.books = (data, callback) => {
    let books = {
        post: handlers.books.post,
        get: handlers.books.get,
        delete: handlers.books.delete
    };
    let acceptableMethods = ['post', 'get', 'put', 'delete'];
    if (acceptableMethods.indexOf(data.method) > -1) {
        books[data.method](data, callback);
    } else {
        callback("looks like there is no endpoint on this http method");
    }
};
