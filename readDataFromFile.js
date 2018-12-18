const fs = require("fs");

const readDataFromFile = () => {
    try {
        let bookStore = fs.readFileSync(path.join(__dirname, "./persistent-book-store.json"), 'utf8');
        return bookStore;
    } catch (e) {
        return e;
    }

};

module.exports = {
    readDataFromFile: readDataFromFile
};
