const fs = require("fs");

const writeDataToFile = () => {
    // WriteFileSync returns null if it writtens data to file successfully else error message
    try {
        let err = fs.writeFileSync(path.join(__dirname, "./persistent-book-store.json"), JSON.stringify(bookStore));
        return err;
    } catch (e) {
        return e;
    }
};

module.exports = {
  writeDataToFile: writeDataToFile
};
