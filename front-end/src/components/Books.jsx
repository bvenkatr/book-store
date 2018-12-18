import React, {useState, useEffect} from "react"
import Book from "./Book";
import axios from 'axios';

function Books() {
    let [data, setData] = useState({});

    useEffect(() => {
        axios.get("http://localhost:3000/books").then(res => {
            let newRes = res.data;
            console.log("newRes is : ", newRes);
            setData(newRes);
        });
    }, {}); // the second parameter for useEffect is mandatory

    return <div>
        {
            Object.keys(data).map((key) => {
                return <div key={key}><Book name={data[key].name} author={data[key].author}/></div>
            })
        }
    </div>
}

export default Books;
