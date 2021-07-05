import React from 'react';
import './InfoBar.css';

const InfoBar = ({room, lastedit}) => {
    return (
        <div className="infoBar">
            <div className="leftInnerContainer">
                <h5>Room name: <b>{room}</b></h5>
            </div>
            <div className="rightInnerContainer">
                Last edit: <h5>{lastedit ? lastedit : '' }</h5>
            </div>
        </div>
    );
};

export default InfoBar;