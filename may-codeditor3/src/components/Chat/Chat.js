import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/snippets/javascript";

import Members from '../Members/Members';
import Notifications from '../Notifications/Notifications';
import InfoBar from '../InfoBar/InfoBar';

let socket;


const Chat = (data) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [flag, setFlag]= useState({error: false, msg: ''});
    const [code, setCode] = useState('');
    const [lastedit, setLastEdit] = useState('');
    const [loading, setLoading] = useState(true);
    const ENDPOINT = 'http://localhost:5000/';

    //Component did mount, destructure data/args from reate and join room component
    //Do socket.io to create and join, accordingly

    useEffect(() => {
        const {name, room, create} = data;

        socket = io(ENDPOINT);

        setRoom(room);
        setName(name);

        if(create){
            //perform create function specified in socket.io for args user and error
            socket.emit('create', { name, room }, (error) => {
                setLoading(false); 
                if(error) {
                    setFlag({...flag, error: true, msg: error});
                }
            });
        }
        
        else{
            socket.emit('join', { name, room }, (error) => {
                setLoading(false);
                if(error) { 
                  setFlag({...flag, error: true, msg: error});
                }
            });
        }
        
    }, [ENDPOINT, data]);   //if endpoint is  reloaded, do useEffect 

    //Concatenation; set notification and spread in the array, also add the notification from socket.io 
    useEffect(() => {
        socket.on('notification', notification => {
            setNotifications(notifications => [ ...notifications, notification ]);
        });

        //perform the emit codeMessage from our socket.io, the we are setting code and lastedit
        socket.on('codeMessage', message => {
            setCode(message.text);
            setLastEdit(message.user);
        });
        
        //perform roomData function as in socket.io and destructure data to select only 'users' and set into the users array
        socket.on("roomData", ({users}) => {
            setUsers(users);
        });
    }, []);

    //responsible for passing change in contents of editor; onChange
    const validateInput = (value) => {
        socket.emit('sendCode', value);
    }

    if(flag.error == true){
        setTimeout(()=> {
            window.location.href='/';
        }, 1000);
    }



    const editor = () => {
        return (
        <div className="container" >
            <div class="row">
                <div className="col" style={{marginTop: 20}}>
                    <div className="card p-3 logincard" style={{width: '35rem'}}>
                        <InfoBar room={room} lastedit={lastedit} />
                        <AceEditor mode="javascript" theme="monokai" value={code} 
                        onChange={(value) => validateInput(value)} //onChange it should do validateInput function(which is to emit sendCode with our aceEditor value)
                        style={{width: '100%'}}
                            setOptions={{
                                enableLiveAutocompletion: true,
                            }}
                        />
                    </div>
                </div>
                <div className="col" style={{marginTop: 20, marginLeft: '100px'}}>
                    <div className="card p-3">
                        <h5 style={{textAlign: 'center'}}>Notifications</h5>

                        <div className="scroll">
                            <Notifications notifications={notifications} name={name} />
                        </div>
                    </div>
                    <div className="card p-3" style={{marginTop: '20px'}}>
                        <h5 style={{textAlign: 'center'}}>Members</h5>
                        <div className="scroll">
                            <Members users={users}/>
                        </div>
                        <br/><br/>
                        <a className="btn btn-danger" href="/">Leave</a>
                    </div>
                </div>
            </div>
        </div>
        );
    };

    const errorOccured = () => {
        return (
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
                <div className="alert alert-danger" role="alert" style={{width: '500px', marginTop: '20px'}}>
                    <h4 className="alert-heading">Error!</h4>
                    <p>An error occured, try again.</p>
                    <hr/>
                    <p className="mb-0">{flag.msg}.</p>
                </div>
            </div>
        );
    };

    const loadingScreen = () => {
        return (
            <div>
                <h2 style={{textAlign: "center", marginTop: '300px'}}>
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </h2>
          </div>
        );
    };

    
    return (
        <>{ loading === true ? loadingScreen() : flag.error === true ? errorOccured() : editor() }</>
    );
};


export default Chat;