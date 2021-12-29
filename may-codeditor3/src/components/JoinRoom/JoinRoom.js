import React, { useState } from 'react';
import Chat from '../Chat/Chat';

const JoinRoom = () => {

  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [isData, setIsdata] = useState(false);

  const loginForm = () => {
    return (
      <>
        <div className="col" style={{marginTop: 150}}>
          <div>
              <h1>Welcome to Live Code Editor! <span role="img" aria-label="emoji">💬</span></h1>
              <h2>Created by and for People <span role="img" aria-label="emoji">❤️</span></h2>
              <h2>Try it out right now! <span role="img" aria-label="emoji">⬅️</span></h2>
          </div>
        </div>
        <div className="col" style={{marginTop: 100}}>
          <div className="card p-3 logincard" style={{width: '30rem'}}>
              <p className="text-center">JOIN A ROOM</p>

              <div className="card-body">
                <div className="mb-3">
                    <label  className="form-label">Username</label>
                    <input type="text" className="form-control" placeholder="Username" onChange= {(e) => setName(e.target.value)} />
                </div>
                <div className="mb-5">
                    <label className="form-label">Room Name</label>
                    <input type="text" className="form-control" placeholder="Room Name" onChange= {(e) => setRoom(e.target.value)}/>
                </div>
                <div className="d-grid gap-2">
                    <button className="btn btn-primary" onClick= {(e)=> (!name || !room) ? e.preventDefault() :  setIsdata(true) }>Proceed</button>
                </div>
                <div style={{textAlign: 'center', marginTop: '2px'}}>
                  <button className="btn btn-link" onClick={() =>  window.location.href='/'}>Home</button>
                </div>
              </div>
          </div>
        </div>
      </>
    );
  };

    return (

      <div className="container" >
        <div class="row">
          { isData === false ? loginForm() : <Chat room={room} name={name}/>}
        </div>
      </div>
    );
}


export default JoinRoom;