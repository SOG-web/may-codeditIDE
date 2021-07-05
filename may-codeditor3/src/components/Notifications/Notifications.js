import React from 'react';
import Notification from '../Notification/Notification';

const Notifications = ({notifications, name}) => {
    return(
        <>
            {notifications.map((notification, i) => <div key={i}><Notification notification={notification} name={name} /></div>)}
        </>
    );
};


export default Notifications;