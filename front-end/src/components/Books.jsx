import React, {useState, useEffect} from "react"
import Book from "./Book";
import axios from 'axios';

function Books() {
    let [data, setData] = useState({});
    let [showBookInfo, setBookInfoState] = useState(false);
    let [bookMetaInfo, setBookMetaInfo] = useState({});

    useEffect(() => {
        axios.get("http://localhost:4000/books").then(res => {
            let newRes = res.data;
            console.log("newRes is : ", newRes);
            setData(newRes);
        });
    }, {}); // the second parameter for useEffect is mandatory

    let handleOnClick = (bookName = "No Name Found", authorName = "No Author Found") => {
        setBookInfoState(!showBookInfo);
        setBookMetaInfo({name: bookName, author: authorName});
    };

    if (showBookInfo) {
        return <div>
            <div style={{display: "flex"}}>
                Book Name is : {bookMetaInfo.name}
                <br/>
                Author Name : {bookMetaInfo.author}
            </div>
            <div
                onClick={() => {
                    setBookInfoState(!showBookInfo)
                }}
                style={{color: 'green'}}>
                Go Back
            </div>
        </div>
    } else {
        return <div>
            {
                Object.keys(data).map((key) => {
                    return <div key={key}><Book handleOnClick={handleOnClick} name={data[key].name}
                                                author={data[key].author}/></div>
                })
            }
        </div>
    }
}

export default Books;
