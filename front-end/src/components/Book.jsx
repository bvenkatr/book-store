import React, {useState} from "react"

function Book({name, author, handleOnClick}) {
    let [showBookInfo, flipAuthorInfoFlag] = useState(false);

    let updateShowBookInfoFlag = () => {
        handleOnClick(name, author);
        flipAuthorInfoFlag(!showBookInfo);
    };

    return <div style={{border:'solid 1px red', margin: '10px 10px'}}>
                <h4
                    style={{border: 'solid 1px green'}}
                    onClick={() => {updateShowBookInfoFlag()}}
                >
                    {name}
                </h4>
            <div style={{border: 'solid 1px yellow',height:100, textAlign:'center'}}>
                Book Body
            </div>
    </div>;
}

export default Book;
