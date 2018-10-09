const ws_port = 3000;
let io = require('socket.io')(ws_port);
let SocketIOFileUpload = require('socketio-file-upload');
let fs = require('fs-extra')

console.log('\nWeb Socket Server running on port: ' + ws_port + '\n');


let userForUserId = new Object();
let userIdForSocket = new Object();
let reservedRooms = new Set(['authenticated']);
let connectedInstancesCountForUserId = new Object();
let roomForRoomId = new Object();

class User {
    constructor(id, profile_img) {
        this.id = id;
        this.profile_img = profile_img;
    }
}

class OutgoingMessage {
    constructor(sender_id, sender_profile_img, type, content) {
        this.sender_id = sender_id;
        this.sender_profile_img = sender_profile_img;
        this.type = type;
        this.content = content;
    }
}

class Room {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}


io.on('connection', (socket) => {
    console.log('socket: "' + socket.id + '" connected');

    let uploader = new SocketIOFileUpload();
    uploader.listen(socket);
    uploader.dir = 'tmp_uploads';

    uploader.on('start', (event) => {
        console.log('alo');
        event.file.meta.file_name = event.file.name;
        event.file.name = socket.currRoom + '_' + event.file.name;
    });

    uploader.on('saved', (event) => {
        console.log('saved');
        let filePath = 'tmp_uploads/' + socket.currRoom + '_' + event.file.meta.file_name;
        let user = getUser(socket.id);
        let msg = new OutgoingMessage(user.id, user.profile_img, 'file', event.file.meta.file_name);
        if (event.file.meta.file_name.endsWith('.png') ||
            event.file.meta.file_name.endsWith('.jpg')) {
                msg.type = 'img';
                msg.img = base64Encode(filePath);
        }
        
        io.to(socket.currRoom).emit('msg', msg);
    });

    socket.on('sign-in', (user_data) => {
        if (!authenticateUser(user_data.id, user_data.password)) {
            socket.emit('error', 'invalid credentials');
            socket.disconnect();
            return;
        }

        user = addUser(user_data.id, user_data.profile_img, socket.id);
        socket.join('authenticated');
        sendUsers();

        console.log('New Sign In:');
        console.log('\tid: ' + user.id);
        console.log('\tconnected instances: ' + getConnectedInstancesCount(user.id));
        console.log('\tsocket: ' + socket.id);
    });

    socket.on('send-file', (data) => {
        let filePath = 'tmp_uploads/' + socket.currRoom + '_' + data.file_name;
        socket.emit('file', { file: base64Encode(filePath), file_name: data.file_name });
    });

    socket.on('send-users', () => {
        if (authenticated())
            socket.emit('users', getUsersArray());
    });

    socket.on('send-groups', () => {
        if (authenticated())
            socket.emit('groups', getRoomsArray());
    });

    socket.on('join-one-to-one-room', (data) => {
        if (!authenticated())
            return;
        // check existence of users in database
        let room = getOneToOneRoomId(getUserId(socket.id), data.userId);
        console.log('room: ' + room);
        joinRoom(room);
    });

    socket.on('join-group-room', (data) => {
        if (!authenticated())
            return;
        // check if user can send messages to the given room
        joinRoom(data.room);
    });

    socket.on('create-group-room', (room) => {
        if (!authenticated())
            return;
        id = Object.keys(roomForRoomId).length;
        roomForRoomId[id] = new Room(id, room.name);
        console.log('new group: ' + room.name);
        joinRoom(id);
        sendGroups();
    });

    socket.on('send-msg', (data) => {
        if (!authenticated())
            return;
        // check if user can send messages to the given room
        user = getUser(socket.id);
        console.log('msg: ' + data.content);
        io.to(socket.currRoom)
            .emit('msg', new OutgoingMessage(user.id, user.profile_img, data.type, data.content));
    })

    socket.on('disconnect', function () {
        if (!authenticated())
            return;
        user = getUser(socket.id);
        if (user === undefined)
            return;
        decrementInstancesCount(user.id);
        sendUsers();
        console.log('user: ' + user.id + ' disconnected an instance.');
        console.log('\tconnected instances: ' + getConnectedInstancesCount(user.id));
    });

    function joinRoom(room) {
        console.log('joinRoom: ' + room);
        if (socket.currRoom != undefined)
            socket.leave(socket.currRoom);
        socket.currRoom = room;
        socket.join(room);
    }

    function authenticated() {
        return socket.authenticated ? true : false;
    }

    function authenticateUser(userId, password) {
        socket.authenticated = true;
        return true;
    }
});

function base64Encode(file) {
    var body = fs.readFileSync(file);
    return body.toString('base64');
}

function getRoomsArray() {
    let roomsArray = [];
    for (let key in roomForRoomId) {
        roomsArray.push(roomForRoomId[key]);
    }
    return roomsArray;
}


function getUsersArray() {
    let usersArray = [];
    for (let key in userForUserId) {
        user = userForUserId[key];
        let connected;
        if (getConnectedInstancesCount(key) > 0)
            connected = true;
        else
            connected = false;
        usersArray.push({
            id: user.id,
            profile_img: user.profile_img,
            connected: connected
        });
    }

    return usersArray;
}

function sendUsers() {
    io.to('authenticated').emit('users', getUsersArray());
}

function sendGroups() {
    io.to('authenticated').emit('groups', getRoomsArray());
}

function getOneToOneRoomId(username1, username2) {
    if (username1 > username2)
        return username1 + '_' + username2;
    else
        return username2 + '_' + username1;
}

function getUserId(socket_id) {
    return userIdForSocket[socket_id];
}

function getUser(socket_id) {
    return userForUserId[getUserId(socket_id)];
}

function addUser(user_id, profile_img, socket_id) {
    userIdForSocket[socket_id] = user_id;
    if (userForUserId.hasOwnProperty(user_id)) {
        incrementInstancesCount(user_id);
        user = userForUserId[user_id];
        user.profile_img = profile_img;
        return user;
    }
    connectedInstancesCountForUserId[user_id] = 1;
    return userForUserId[user_id] = new User(user_id, profile_img);
}

function incrementInstancesCount(user_id) {
    connectedInstancesCountForUserId[user_id]++;
}

function decrementInstancesCount(user_id) {
    connectedInstancesCountForUserId[user_id]--;
}

function getConnectedInstancesCount(user_id) {
    return connectedInstancesCountForUserId[user_id];
}