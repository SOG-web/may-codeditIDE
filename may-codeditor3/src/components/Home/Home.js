import React, { useState } from "react";
import JoinRoom from '../JoinRoom/JoinRoom';
import CreateRoom from '../CreateRoom/CreateRoom';

const Home = () => {
    const [createroom, setCreateRoom] = useState(false);
    const [joinroom, setJoinRoom] = useState(false);
    
    const homeForm = () =>{   
        return (
            <>
                <div className="col" style={{marginTop: 150}}>
                    <div>
                        <h1>Welcome to Live Code Editor <span role="img" aria-label="emoji">💬</span></h1>
                        <h2>Created by and for People <span role="img" aria-label="emoji">❤️</span></h2>
                        <h2>Try it out right now! <span role="img" aria-label="emoji">⬅️</span></h2>
                    </div>
                </div>
                <div className="col" style={{marginTop: 250}}>
                    <div className="card p-3 logincard" style={{width: '15rem', marginLeft:200}}>
                        <p className="text-center"><button className="btn btn-primary" style={{width: '10rem'}} onClick= {()=> setCreateRoom(true) }>Create Room</button></p>
                        <p className="text-center"><button className="btn btn-primary" style={{width: '10rem'}} onClick= {()=> setJoinRoom(true) }>Join Room</button></p>
                    </div>
                </div>
            </>
        );
    };

    return (
        <>
            <div className="container" >
                <div class="row">
                { joinroom === false && createroom === false ? homeForm() : joinroom === true ? <JoinRoom/> : <CreateRoom/>}
                </div>
            </div>
        </>
    );
};


export default Home;