const users = [];

const createRoom = ({id, name, room}) => {
    name = name.trim().toLowerCase();
    room = room.trim();

    //logic for checking if current user name exist in given room
    const existingUser = users.find((user) => user.room === room && user.name === name);

    if(!name || !room) {
        return {error: 'Username and Room are Required.'};
    }

    if(existingUser){
        return {error: 'Username already Exist/Taken in this Room.'};
    }
    //else;
    const user = { id, name, room };

    //push new user to array of users
    users.push(user);

    return { user };
};

const addUser = ({id, name, room}) => {
    name = name.trim().toLowerCase();
    room = room.trim();

    const existingUser = users.find((user) => user.room === room && user.name === name);

    const notexistingRoom = users.find((user) => user.room !== room );

    if(!name || !room) {
        return {error: 'Username and Room are Required.'};
    }

    if(existingUser){
        return {error: 'Username already Exist/Taken.'};
    } 
    //if either room does not exist or no users in the array, return error
    if(notexistingRoom || users.length === 0){
        return {error: 'Room does not Exist.'};
    }

    const user = { id, name, room };

    users.push(user);

    return { user };
};

const removeUser = (id) => {
    const userId = users.findIndex((user) => user.id === id);

    if(userId !== -1) {
        return users.splice(userId, 1)[0];
    }
};

const getUser = (id) => {
   return users.find((user) => user.id === id);
};

const getRoomUsers = (room) => {
   return users.filter((user) => user.room === room);
};


module.exports = { createRoom, addUser, removeUser, getUser, getRoomUsers };