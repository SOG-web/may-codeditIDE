import React from 'react';

const Members = ({ users }) => {

    return(
        <div className="members">
            {
                users
                ?(
                    <div>
                        <ul className="list-group list-group-numbered">
                            {users.map(({name}) => (
                                <li className="list-group-item" key={name}>{name}</li>
                            ))}
                        </ul>
                    </div>
                )
                : null
            }
        </div>
    );
};
  
export default Members;