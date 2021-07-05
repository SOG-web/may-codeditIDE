import React from 'react';
import ReactEmoji from 'react-emoji';

const Notification = ({ notification: {text, user}, name }) => {
    let sentByCurrentUser = false;

    const trimName = name.trim().toLowerCase();

    if(user === trimName) {  //if user equals to name that user inputs set whatever 
        //is sent by that user to true so that it does the true section in conditional rendering below
        sentByCurrentUser = true;
    }

    return (
        sentByCurrentUser
        ?(            
            <div className="list-group">
                <a className="list-group-item list-group-item-action" aria-current="true">
                    <div className="d-flex w-100 justify-content-between">
                    <p className="mb-1">{ReactEmoji.emojify(text)}</p>
                    <small>{trimName}</small> 
                    </div>
                </a>
            </div>
        )
        :(
            <div className="list-group">
                <a className="list-group-item list-group-item-action" aria-current="true">
                    <div className="d-flex w-100 justify-content-between">
                    <p className="mb-1">{ReactEmoji.emojify(text)}</p>
                    <small>{user}</small>
                    </div>
                </a>
            </div>
        )
    );
};

export default Notification;