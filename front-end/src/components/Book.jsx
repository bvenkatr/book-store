import React from "react"

function Book({name, author}) {
    return <div style={{border:'solid 1px red'}}>
        <div>Book Name : {name}</div>
        <div>Author : {author}</div>
    </div>;
}

export default Book;
