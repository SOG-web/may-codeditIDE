import React, { useState } from 'react';
import Chat from '../Chat/Chat';

const CreateRoom = () => {

  const [name, setName] = useState('');
  const [isData, setIsdata] = useState(false);

  //GENERATION OF ROOM NAME
  const randomRoom = (length) => {
    var result = [];
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charLength = characters.length;

    //LOOP THROUGH LENGTH OF CHARACTERS H0WEVER MANY TIMES HAS BEEN SPECIFIED LATER ON IN PROG AND 
    //populate array with characters
    for( var i = 0; i < length; i++){
        result.push(characters.charAt(Math.floor(Math.random()*charLength)));
    };
     //populate result array with no space, to form room name
    return result.join('');
  };

  const loginForm = () => {
    return (
      <>
        <div className="col" style={{marginTop: 150}}>
          <div>
              <h1>Welcome to Insta Meet <span role="img" aria-label="emoji">💬</span></h1>
              <h2>Created by and for People <span role="img" aria-label="emoji">❤️</span></h2>
              <h2>Try it out right now! <span role="img" aria-label="emoji">⬅️</span></h2>
          </div>
        </div>
        <div className="col" style={{marginTop: 100}}>
          <div className="card p-3 logincard" style={{width: '30rem'}}>
              <p className="text-center">CREATE A ROOM</p>
              <div className="card-body">
                <div className="mb-5">
                    <label  className="form-label">Username</label>
                    <input type="text" className="form-control" placeholder="Username" onChange= {(e) => setName(e.target.value)} />
                </div>
                <p>Room Name will be Generated Automatically</p>
                <div className="d-grid gap-2">
                    {/* On the user clicking Proceed, check if no name or generated room name exist, dont load room page, else set join to true */}
                    <button className="btn btn-primary" onClick= {(e)=> (!name || !randomRoom(7)) ? e.preventDefault() :  setIsdata(true) }>Proceed</button>
                </div>
                <div style={{textAlign: 'center', marginTop: '2px'}}>
                  {/* reload page on onclick */}
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
          {/* Component is originally set to false by default and displays loginForm to create room 
          else, if set to true, pass room name (automatically gen), username, and create status (of true) to diff from join  */}
          { isData === false ? loginForm() : <Chat room={randomRoom(7)} name={name} create={true}/>}
        </div>
      </div>
    );
}

export default CreateRoom;